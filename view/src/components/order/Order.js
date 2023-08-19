import { selectCart, selectIsLoggedIn, selectOrder } from '../../store/store'
import './order.css'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setOrder } from '../../store/store'
import { selectTotal, selectUserId } from '../../store/store'
import getTime from '../../helpers/getTime'
export default function Order () {

    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [surname, setSurname] = useState('');
    const [mobile, setMobile] = useState('')
    const [time, setTime] = useState('')
    const [note, setNote] = useState('')
    const order = useSelector(selectOrder)
    const total = useSelector(selectTotal)
    const isLoggedIn = useSelector(selectIsLoggedIn)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cart = useSelector(selectCart)
    const cartList = cart.map(item => item )
    const userId = useSelector(selectUserId)
    useEffect(()=> {
      
      if(!isLoggedIn){
        navigate('/login')
      }
    },[])
    
    useEffect(() => {
      const fetchUserDetails = async () => {
        try {
          const response = await fetch('http://localhost:8030/api/profile', { method: 'GET', credentials:'include'});
          const data = await response.json();
          if (data) {
            setSurname(data.surname)
            setLocation(data.location)
            setName(data.name)
            setMobile(data.mobile)
          }
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      };
      fetchUserDetails();
    }, []);

    const handleConfirmSubmit =  async (event) => {
      event.preventDefault();
      dispatch(setOrder({ total, userData: { name, surname, location, mobile, time, note}, status:'Pending', cart }))
      
      try {
          const response = await fetch('http://localhost:8030/api/order',
          { method: 'POST', 
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ total, status: 'pending', cart: cartList, userId, time, note}),
          credentials:'include'}
         )  
         if(response.ok) {
          
          console.log('order created')
         }
          else {
            console.log('error')
         }
      } catch(error){

      }
      try {
          const response = await fetch('http://localhost:8030/api/create-payment', 
            { method: 'POST' ,
            headers: {'Content-Type': 'application/json',
            },
            body: JSON.stringify({total, title: 'Osteria Istriano a domicilio'})})
            if(response.ok) {
              const data = await response.text()
              window.location.href = data
            }
          } catch(error) {
            console.error('An error occured', error)
       }
    }
    return ( 
        <div className="order-container">
            <form  className="order-form" onSubmit = { handleConfirmSubmit}>
            <h2>Conferma i dati per la consegna</h2>
            <div className="form-group">
          <label htmlFor="location">Indirizzo di Consegna</label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Nome</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="surname">Cognome</label>
          <input
            id="surname"
            type="text"
            value={surname}
            onChange={(event) => setSurname(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="mobile">Numero di Telefono</label>
          <input
            id="mobile"
            type="text"
            value={mobile}
            onChange={(event) => setMobile(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="orario">Orario di consegna</label>
          <select
            id="orario"
            type=""
            value={time}
            onChange={(event) => setTime(event.target.value)}
          >
            {getTime().map( (d, index) => <option  selected={index === 0} key={index} value={d}>{d}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="note">Lascia una nota per il ristorante</label>
          <input
            id="note"
            type="textarea"
            value={note}
            onChange={(event) => setNote(event.target.value)}
          />
        </div>
        <button type="submit">Continua</button>
            </form>
        </div>
    )
}