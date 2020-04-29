import React from 'react'
import {Link} from 'react-router-dom'
const Navbar = () => {
    return (
        <nav>
            <ul>
                <li>
                    COVID19 - Tracker
                </li>
                <li>
                    <Link to="/">All countries</Link>
                </li>
                <li>
                    <Link to="/tracked">Your tracked</Link>
                </li>
                <li>
                    <Link to="/global">Global summary</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
