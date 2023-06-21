import React from 'react'
import TinySlider from "tiny-slider-react";
import 'tiny-slider/dist/tiny-slider.css';
import destinationSlider from './destinationSlider.module.css'

const DestinationSlider = () => {
    const settings = {
        gutter: 20,
        fixedWidth: 160,
        controlsText: ['', ''],
        controlsContainer: ['.prevButton', '.nextButton'],
        autoplay: true,
        speed: 300,
        autoplayTimeout: 1000,
        loop: false,
        rewind: true,
        lazyload: true,
        mouseDrag: true
    }

    return (
        <div className={destinationSlider.wrapper}>
            <TinySlider settings={settings}>

            </TinySlider>
        </div>
    )
}

export default DestinationSlider