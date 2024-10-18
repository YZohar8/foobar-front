import React from 'react';
import './ErrorNotification.css';

const ErrorNotification = ({ message, onClose }) => {
    return (
        <div className="error-notification">
            <span>{message}</span>
            <button onClick={onClose} className="close-button">✖</button>
        </div>
    );
};

export default ErrorNotification;