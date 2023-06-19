import './home.css'
import React, { useRef } from 'react';
import istriano_bg from '../../images/Istriano_bg.png'
import antipasto1 from '../../images/antipasto1.jpg'
import antipasto2 from '../../images/antipasto2.jpg'
import antipasto3 from '../../images/antipasto3.jpg'
import primo1 from '../../images/primo1.jpg'
import primo2 from '../../images/primo2.jpg'
import primo3 from '../../images/primo3.jpg'
import secondo1 from '../../images/secondi1.jpg'
import secondo2 from '../../images/secondi2.jpg'
import secondo3 from '../../images/secondi3.jpg'
import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiOutlineArrowRight } from "react-icons/ai";

export default function Home () {

    const galleryRef = useRef(null);

  const scrollLeft = () => {
    galleryRef.current.scrollBy({ left: -1000, behavior: 'smooth' });
  };

  const scrollRight = () => {
    galleryRef.current.scrollBy({ left: 1000, behavior: 'smooth' });
  };

    return(
        
        <div className='home-main'>
            <section className='top-section'>
                <h1>L'Osteria Istriano: Ristorantino di pesce sulle rive di Trieste!</h1>
              
                <img src={istriano_bg} alt='dining-room' id='home-bg'/>
            </section>
            <section className='delivery-section'>
                <div className='delivery-section-header'>
                <h1>Ordina i tuoi piatti di pesce preferiti a domicilio!</h1>
                <button>Ordina adesso!</button>
                </div>
                <div className='food-gallery' ref={galleryRef}>
                    <img src={antipasto1} alt='food' id='food'/>
                    <img src={antipasto2} alt='food' id='food'/>
                    <img src={antipasto3} alt='food' id='food'/>
                    <img src={primo1} alt='food' id='food'/>
                    <img src={primo2} alt='food' id='food'/>
                    <img src={primo3} alt='food' id='food'/>
                    <img src={secondo1} alt='food' id='food'/>
                    <img src={secondo2} alt='food' id='food'/>
                    <img src={secondo3} alt='food' id='food'/>
                </div>
                <button className="scroll-button left" onClick={scrollLeft}><AiOutlineArrowLeft/></button>
                <button className="scroll-button right" onClick={scrollRight}><AiOutlineArrowRight/></button>
            </section>
        </div>
    )
}