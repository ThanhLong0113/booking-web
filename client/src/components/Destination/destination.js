import React from "react";
import { useLocation } from 'react-router-dom';

const Destination = () => {
    const location = useLocation();
    const destinationData = location.state;
    console.log(destinationData)
    return (
        <div></div>
    )
}

export default Destination