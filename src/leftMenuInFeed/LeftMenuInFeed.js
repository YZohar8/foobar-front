import './LeftMenuFeed.css'
import { useNavigate } from 'react-router-dom';


function LeftMenuFeed() {
    const navigate = useNavigate();

    const handleLogout = () => {
        document.body.classList.remove('dark-mode');
        navigate('/loading', { state: { destination: '/' } });
    }


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
                <li className="nav-item" on onClick={() => handleLogout()}>
                    <a className="nav-link">
                        <i className="bi bi-box-arrow-right icon"></i>
                        <span>Logout</span>
                    </a>
                </li>
            </ul>
        </div>
    );

}

export default LeftMenuFeed;