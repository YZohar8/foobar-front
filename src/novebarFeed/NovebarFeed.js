import './NovebarFeed.css'
import { Link } from 'react-router-dom';

function NovebarFeed() {
    return (
        <nav className="navbar navbar-expand-lg fixed-top custom-navbar">
            <div className="container-fluid d-flex align-items-center">
                {/* Left side: Facebook icon and text */}
                <i className="bi bi-facebook"></i>
                <a className="navbar-brand" href="#">oobar</a>
                <button type="button" className="btn btn-outline-primary">
                    <Link to='/' className="bi bi-door-open"></Link>
                </button>

                {/* Right side: Remove collapse, keep icons visible */}
                <div className="d-flex justify-content-end flex-grow-1 align-items-center">
                    <form className="d-flex" role="search">
                        <input className="form-control me-2 custom-input" type="search" placeholder="Search" aria-label="Search" />
                        <button type="button" className="btn btn-outline-primary">
                            <i className="bi bi-search"></i>
                        </button>
                    </form>
                </div>
            </div>
        </nav>
    );
}

export default NovebarFeed;