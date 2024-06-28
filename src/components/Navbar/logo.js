import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
    return (
        <div className="my-auto">
            <a href="/">
                <img className="w-20 h-20" src="https://i.imgur.com/utVCQHK.png" alt="Logo" />
            </a>
        </div>
    );
}

export default Logo;
