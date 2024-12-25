import './NovebarFeed.css'
import DarkModeToggle from '../darkModeToggle/DarkModeToggle.js'
import { useRef } from 'react';

function NovebarFeed({ handleSearch, handleCancelSearch }) {
    const textSearch = useRef();
    return (
        <nav className="navbar navbar-expand-lg fixed-top custom-navbar">
            <div className="container-fluid d-flex align-items-center">
                {/* Left side: Facebook icon and text */}
                <DarkModeToggle />
                <i className="bi bi-facebook"></i>
                <a className="navbar-brand" href="/">oobar</a>
                {/* Right side: Remove collapse, keep icons visible */}
                <div className="d-flex justify-content-end flex-grow-1 align-items-center">
                    <form className="d-flex" role="search">
                        <input className="form-control me-2 custom-input" type="search" placeholder="Search" aria-label="Search" ref={textSearch} />
                        <button type="button" className="btn btn-outline-primary btn-color-nov" onClick={() => handleSearch(textSearch.current.value)}>
                            <i className="bi bi-search"></i>
                        </button>
                        <button type="button" className="btn btn-outline-primary btn-color-nov" onClick={() => handleCancelSearch()}>
                            <i class="bi bi-x-square"></i>
                        </button>
                    </form>
                </div>
            </div>
        </nav>
    );
}

export default NovebarFeed;