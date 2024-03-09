import React from "react"
import {Link, Outlet} from "react-router-dom"
import Parrot from "../assets/parrot.png"


export default function Nav() {
    return (
        <div className="banner-img">     
            <div className="nav-links">
            <Link to="/"> Translate </Link>
            <Link to="/chat"> Chat </Link> 
            </div>    
        
            <div className= "flex">
                <img className="logo" src={Parrot} />
                <div className="">
                    <h1 className="title"> PollyGlot </h1>
                    <h3 className="sub-title"> Perfect Translation Every Time </h3>
                </div>
            </div>
            
            <Outlet />
        </div>
    )
}

