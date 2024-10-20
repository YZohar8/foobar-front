import React from 'react';
import './ErrorNote.css';

const ErrorNote = ({ message, onClose }) => {
    return (
        <div className="error-notification">
            <span>{message}</span>
            <button onClick={onClose} className="close-button">✖</button>
        </div>
    );
};

export default ErrorNote;