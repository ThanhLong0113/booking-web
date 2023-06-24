import React from "react";
import { ClipLoader } from "react-spinners";
import loadingClip from "./loadingClip.module.css";

const LoadingClip = () => {
    return (
        <div className={loadingClip.container}>
            <ClipLoader color='#006ce4' speedMultiplier={1} />
        </div>
    )
}

export default LoadingClip