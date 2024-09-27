import './LeftMenuFeed.css'
import { Link } from 'react-router-dom';


function LeftMenuFeed() {
    return (
        <div className="sidebar">
            <h5 className="menu-header">Menu</h5>
            <ul className="nav flex-column">
                <li className="nav-item">
                    <a className="nav-link">
                        <i className="bi bi-house-door-fill icon"></i>
                        <span>Home</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link">
                        <i className="bi bi-person-fill icon"></i>
                        <span>Profile</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link">
                        <i className="bi bi-envelope-fill icon"></i>
                        <span>Messages</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link">
                        <i class="bi bi-shop-window icon"></i>
                        <span>Marketplace</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link">
                        <i className="bi bi-gear-fill icon"></i>
                        <span>Settings</span>
                    </a>
                </li>
                <li className="nav-item">
                    <Link to='/' className="nav-link">
                        <i className="bi bi-box-arrow-right icon"></i>
                        <span>Logout</span>
                    </Link>
                </li>
            </ul>
        </div>
    );

}

export default LeftMenuFeed;