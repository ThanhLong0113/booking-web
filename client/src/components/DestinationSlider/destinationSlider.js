import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TinySlider from "tiny-slider-react";
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import 'tiny-slider/dist/tiny-slider.css';
import destinationSlider from './destinationSlider.module.css'
import './navButton.css'

const DestinationSlider = ({ allDestinations }) => {
    const [showBlurLeft, setShowBlurLeft] = useState(false)
    const [showBlurRight, setShowBlurRight] = useState(true)
    const navigate = useNavigate()

    const settings = {
        fixedWidth: 190,
        controlsText: ['', ''],
        prevButton: '.prevButton',
        nextButton: '.nextButton',
        items: 6,
        slideBy: 1,
        speed: 300,
        loop: false,
        rewind: true,
        lazyload: true,
        mouseDrag: true,
        nav: false,
    }

    return (
        <div className={destinationSlider.wrapper}>
            <h1 className={destinationSlider.title}>Những địa điểm du lịch nổi tiếng tại Việt Nam</h1>
            <div className={destinationSlider.slider}>
                {showBlurLeft && (<div className={destinationSlider.blurLeft}></div>)}
                <button className='prevButton'>
                    <FiChevronLeft color='white' size={24} />
                </button>
                <TinySlider settings={settings} onIndexChanged={(e) => {
                    if (e.index === 0) {
                        setShowBlurLeft(false)
                        setShowBlurRight(true)
                    }
                    else if (e.index === allDestinations.length - settings.items) {
                        setShowBlurLeft(true)
                        setShowBlurRight(false)
                    }
                    else {
                        setShowBlurLeft(true)
                        setShowBlurRight(true)
                    }
                }}>
                    {allDestinations.map((element, index) => (
                        <div key={index} onClick={() => navigate(`/destination/${element._id}`, {
                            state: element
                        })}>
                            <img src={element.image} alt='' className={destinationSlider.image}></img>
                            <p className={destinationSlider.name}>{element.name}</p>
                        </div>
                    ))}
                </TinySlider>
                <button className='nextButton'>
                    <FiChevronRight color='white' size={24} />
                </button>
                {showBlurRight && (<div className={destinationSlider.blurRight}></div>)}
            </div>
        </div>
    )
}

export default DestinationSlider