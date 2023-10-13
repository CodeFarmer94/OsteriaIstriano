import "./profile.css";
import React, { useEffect, useState } from "react";
import { useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsLoggedIn } from "../../store/store";
export default function Profile() {
  const [username, setUsername] = useState();
  const [userOrders, setUserOrders] = useState([])
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [surname, setSurname] = useState("");
  const [mobile, setMobile] = useState("");
  const [option, setOption] = useState("user-data");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch("http://localhost:8030/api/profile", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        if (data) {
          setUsername(data.User.username);
          setSurname(data.surname);
          setLocation(data.location);
          setName(data.name);
          setMobile(data.mobile);
          dispatch(setIsLoggedIn(true));
        }
      
      } catch (error) {
        navigate('/')
        console.error("Error fetching user details:", error);
      }
    };
    const fetchUserOrders = async () => {
      try{
          const response =  await fetch('http://localhost:8030/api/user-orders', {
            method:'GET',
            credentials:'include'
          })
          const data = await response.json()
          if(data) {
            setUserOrders(data)
          }
      }catch(error) {
        console.error("Error fetching user orders:", error);
      }
    }
    fetchUserOrders();
    fetchUserDetails();
  }, [dispatch, navigate]);

  const handleSubmitProfile = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8030/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.toLowerCase(),
          name,
          location,
          surname,
          mobile,
        }),
        credentials: "include",
      });
      // Handle the response
      if (response.ok) {
        // Successful registration
        console.log("Updated successfully");
      } else {
        // Error handling for failed registration
        console.error("Update failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8030/api/logout", {
        method: "POST",
      });
      if (response.ok) {
        console.log("Logged out successfully");
        dispatch(setIsLoggedIn(false));
        navigate("/");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  
  const userOrdersParseList = userOrders.map((order) => {
    const parsedItems = order.cart.map((item) => {
      const parsedItem = JSON.parse(item);
      return parsedItem;
    });
    parsedItems.push({total:order.total})
    parsedItems.unshift({date: order.createdAt})
    return parsedItems;
  });
  
  const userOrdersList = userOrdersParseList.map( (order,index) =>( <div key={index} className="profile-order">
    {order.map((item, index) => {
    
    if(index === order.length -1) {
      return <p className="order-total">Total: €{item.total},00</p>
    }
    if(index === 0){
      const date = new Date(item.date);
      const year = date.getFullYear();
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const day = ("0" + date.getDate()).slice(-2);
      const formattedDate = `${year}-${month}-${day}`;
      return <p className='order-date'>Ordinato in data: {formattedDate}</p>;
    }
    return(
       <li key={index} >
      <div className='item-details'>
        <h2 className='item-name'>{item.name}</h2>
        <div className='item-info'>
        <p>{item.price}</p><p>x {item.quantity}</p>
        </div>
      </div>
    </li>
    )
   }
  )}
  </div>
    ))

  console.log(userOrdersParseList)
  return (
    <div className="profile-container">
      <div className="profile-form">
        <div className="options-container">
          <button type="options" onClick= { () => setOption('user-data')}>Il mio Account</button>
          <button type="options" onClick= { () => setOption('user-orders')}>I miei Ordini</button>
        </div>
        { option === 'user-data' ?  
          <form onSubmit={handleSubmitProfile}>
            <div className="profile-form-group">
              <label htmlFor="username">Email</label>
              <input
                id="username"
                type="email"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div className="profile-form-group">
              <label htmlFor="location">Indirizzo di Consegna</label>
              <input
                id="location"
                type="text"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
              />
            </div>
            <div className="profile-form-group">
              <label htmlFor="mobile">Numero di Telefono</label>
              <input
                id="mobile"
                type="text"
                value={mobile}
                onChange={(event) => setMobile(event.target.value)}
              />
            </div>
            <div className="profile-form-group">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="profile-form-group">
              <label htmlFor="surname">Cognome</label>
              <input
                id="surname"
                type="text"
                value={surname}
                onChange={(event) => setSurname(event.target.value)}
              />
            </div>
            <div className="profile-form-group">
              <button type="submit">Salva Modifiche</button>
            </div>
          </form> :
         <div className="profile-order-container">
          {userOrdersList}
         </div>
        }
       
        <div className="profile-form-group">
          <button type="logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
