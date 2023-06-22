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
import verticalImg from '../../images/home-vertical-image.jpeg'
import verticalImg2 from '../../images/home-vertical-image2.jpeg'
import verticalImg3 from '../../images/home-vertical-image3.jpeg'
import verticalImg4 from '../../images/home-vertical-image4.jpeg'
import verticalImg5 from '../../images/home-vertical-image5.jpeg'
import verticalImg6 from '../../images/home-vertical-image6.jpeg'
import deco from '../../images/decor-gold.png'
import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from 'react-router-dom';

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
                  <div className='home-order-container'>
                    <h1>Ordina i tuoi piatti di pesce preferiti a domicilio!</h1>
                    <p>Visualizza il <Link to='/menu'>Menù</Link> per ordinare!</p>
                    <img src={deco} alt=''/>
                  </div>
                
                  <div className='home-vertical-img-container'>
                    <img src={verticalImg} alt='' id='vertical-img'/>
                    <img src={verticalImg2} alt='' id='vertical-img2'/>
                    <img src={antipasto1} alt='' id='vertical-img3'/>
                  </div>
                </div>
                <div className='delivery-section-header'>
                  <div className='home-vertical-img-container'>
                    
                    <img src={verticalImg6} alt='' id='vertical-img4'/>
                    <img src={verticalImg5} alt='' id='vertical-img5'/>
                    <img src={verticalImg4} alt='' id='vertical-img6'/>
                  </div>
                  <div className='home-order-container'>
                    <h1>Oppure... <br/>Prenota il tuo <span>tavolo!</span></h1>
                    <img src={deco} alt=''/>
                    <p style={{fontSize: '1.2rem', padding:'1rem'}}>Se vuoi essere sicuro di passare una bella serata,
                     oppure se non vuoi perdere l’occasione di pranzare da noi, prenota<br/>  chiamando: <span>040 306664 </span>
                       oppure scrivi a: <span>info@osteriaistriano.com</span></p>
                  </div>
                </div>
                <section className='contacts-section'>
                  <div className='open-hours'>
                    <h1>Orario di Apertura</h1>
                    <img src={deco} alt=''/>
                    <p>
                        Venite a trovarci, non rimarrete delusi!<br/>
                        da Martedì a Domenica a pranzo<br/>
                        12:30 – 14:00 / 19:30 – 22:00<br/>
                        Domenica aperto solo a pranzo.<br/>
                        Lunedì siamo chiusi. 
                    </p>
                  </div>
              </section>
            </section>
        </div>
    )
}