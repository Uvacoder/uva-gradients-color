import React from 'react';
import '../Styles/Header.css';
import logo from '../Assets/logo.png';

function Header(props) {
    return (
        <div className='header-container'>
            <img src={logo} alt='logo'></img>
            <h1>
                Make-a-Gradient
                <span
                    style={{
                        fontFamily: 'Times New Roman',
                        fontWeight: 'bold',
                        fontSize: '37px',
                    }}
                >
                    .
                </span>
                png
            </h1>
            
        </div>
    );
}

export default Header;
