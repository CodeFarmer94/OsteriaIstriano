import './menuItem.css'
import { useState } from 'react'
import { AiFillMinusCircle,AiFillPlusCircle } from "react-icons/ai";

export default function MenuItem({name,price}){

const [ quantity, setQuantity ] = useState(0)

    return(
        <div className="menu-item">
            <h2 className='name'>{name}</h2>
            <h2 className='price'>€{price}
            <span>
                <div id='minus'>
                <AiFillMinusCircle/>
                </div>
                {quantity}
                <div id='plus'>
                <AiFillPlusCircle/>
                </div>
                </span>
            </h2>
    
        </div>
    )
}