import React, { useState } from "react";
import hotelTab from './hotelTab.module.css'

const HotelTab = ({ allDestinations }) => {
    const [tabFocus, setTabFocus] = useState(0)
    return (
        <div className={hotelTab.wrapper}>
            <h1 className={hotelTab.title}>Những khách sạn nổi bật đề xuất cho bạn</h1>
            <div className={hotelTab.tabBar}>
                {allDestinations.slice(0, 5).map((element, index) => {
                    return (
                        <button className={tabFocus === index ? hotelTab.tabButtonFocus : hotelTab.tabButton}
                        onClick={() => setTabFocus(index)}>{element.name}</button>
                    )
                })}
            </div>
        </div>
    )
}

export default HotelTab