import React from 'react';
import {Link} from 'react-router-dom';
import ThemeContext from '../../contexts/theme'
import './navbar.css'

export default function Navbar({toggleTheme}){

    //using theme from ThemeContext
    const theme = React.useContext(ThemeContext);
    
    
    return (
        
    <div className="heading-container">
        <h1><Link  style={theme==='light'?{color:'#343a40'}:{color:'white'}} className="header-logo" to='/'>450-DSA</Link></h1>
        <div className='header-navlink'>
            <h2>
                <Link className="header-link" style={theme==='light'?{color:'#343a40'}:{color:'white'}} to="/about">About</Link>
            </h2>
            <h2><a className="header-link" style={theme==='light'?{color:'#343a40'}:{color:'white'}} href="https://github.com/AsishRaju/450-DSA">GitHub</a></h2>
            <button
                style={{fontSize: 30}}
                className='btn-clear'
                onClick={toggleTheme}
                >
                {theme === 'light' ? '🌘' : '🌞'}
            </button>
        </div>
    </div>
       
    );
}

