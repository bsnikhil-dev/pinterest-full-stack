import React from 'react';
import './index.css';

const SmallSpinner: React.FC<{ message: string }> = ({ message }) => {
    return (
        <div className="loading-container">
            <div className="spinner"></div>
            <span className="loading-message">{message}</span>
        </div>
    );
};

export default SmallSpinner;
