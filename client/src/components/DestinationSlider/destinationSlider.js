import React from 'react'
import TinySlider from "tiny-slider-react";
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import 'tiny-slider/dist/tiny-slider.css';
import destinationSlider from './destinationSlider.module.css'
import './navButton.css'

const DestinationSlider = ({ allDestinations }) => {
    const settings = {
        gutter: 20,
        fixedWidth: 180,
        controlsText: ['', ''],
        prevButton: '.prevButton',
        nextButton: '.nextButton',
        items: 6,
        slideBy: 1,
        speed: 300,
        loop: false,
        lazyload: true,
        mouseDrag: true
    }

    return (
        <div className={destinationSlider.wrapper}>
            <button className='prevButton'>
                <FiChevronLeft/>
            </button>
            <TinySlider settings={settings}>
                {allDestinations.map((element, index) => (
                    <div key={index}>
                        <img src={element.image} alt='' className={destinationSlider.image}></img>
                        <p className={destinationSlider.name}>{element.name}</p>
                    </div>
                ))}
            </TinySlider>
            <button className='nextButton'>
                <FiChevronRight/>
            </button>
        </div>
    )
}

export default DestinationSlider