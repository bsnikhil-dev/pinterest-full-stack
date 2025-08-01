import React from 'react';
import './error.css';

interface ErrorComponentProps {
    isError: boolean;
    errorCode: string;
    errorMessage: string;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({ isError, errorCode, errorMessage }) => {
    return (
        <div className={`error-container ${isError ? 'show' : ''}`}>
            <div className="error-content">
                <h1 className="error-code">{errorCode}</h1>
                <p className="error-message">{errorMessage}</p>
                <div className="error-actions">
                    <button className="retry-button" onClick={() => window.location.reload()}>Retry</button>
                    <a href="mailto:support@yourdomain.com" className="support-link">Contact Support</a>
                </div>
            </div>
        </div>
    );
};

export default ErrorComponent;
