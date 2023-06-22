import './menu.css'
import deco from '../../images/decor-gold.png'
import { useState, useEffect } from 'react'
import MenuItem from './menu-item/MenuItem'
import { useDispatch, useSelector } from 'react-redux'
import { selectMenuData, setMenuData} from '../../store/store'
import { selectCart } from '../../store/store'
import Cart from '../cart/Cart'

export default function Menu() {

const cart = useSelector(selectCart)
const menu = useSelector(selectMenuData)
const dispatch = useDispatch()

useEffect(() => {
    const fetchMenu = async () => {
        try {
            const response = await fetch('http://localhost:8030/api/menu', { method: 'GET' })
            const data = await response.json()
            if (data) {
                dispatch(setMenuData(data))   
            }
        } catch (err) {
            console.error('Error fetching menu', err)
        }
    }
    fetchMenu()
}, [dispatch])

const antipasti = menu.map(item=> item.category === 'Antipasti' && <MenuItem name={item.name} price={item.price}/>)
const primi = menu.map(item=> item.category === 'Primi piatti' && <MenuItem name={item.name} price={item.price}/>)
const secondi = menu.map(item=> item.category === 'Secondi piatti' && <MenuItem name={item.name} price={item.price}/>)
const viniDolci = menu.map(item=> item.category === 'Dolci e Vini' && <MenuItem name={item.name} price={item.price}/>)


    return(
        <div className='menu-page'>
            <form>
                <section className='food-section'>
                    <div className='food-category'>
                        <h1>
                            Antipasti
                        </h1>
                            <img src={deco} alt='' id='deco'/>
                            {antipasti}
                    </div>
                    <div className='food-category'>
                        <h1>
                            Primi Piatti
                        </h1>
                             <img src={deco} alt='' id='deco'/>
                            {primi}
                    </div>
                    <div className='food-category'>
                        <h1>
                            Secondi Piatti
                        </h1>
                            <img src={deco} alt='' id='deco'/>
                            {secondi}
                    </div>
                    <div className='food-category'>
                        <h1>
                            Vini e Dolci
                        </h1>
                        <img src={deco} alt='' id='deco'/>
                            {viniDolci}
                    </div>
                </section>
                
                    <Cart/>
              
            </form>
        </div>
    )
}