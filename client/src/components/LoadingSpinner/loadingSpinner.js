import React from "react";
import { ClipLoader } from "react-spinners";
import loadingSpinner from "./loadingSpinner.module.css";

const LoadingSpinner = () => {
    return (
        <div className={loadingSpinner.container}>
            <ClipLoader color='#006ce4' speedMultiplier={1} />
        </div>
    )
}

export default LoadingSpinner