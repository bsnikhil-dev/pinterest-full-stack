import React from 'react';
import './error.css';

interface ErrorComponentProps {
    errorMessage?: string;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({ errorMessage = "" }) => {
    return (
        <div className="error-container show">
            <div className="error-content">
                <p className="error-message">{errorMessage}</p>
                <div className="error-actions">
                    <button className="retry-button" onClick={() => window.location.reload()}>Retry</button>
                </div>
            </div>
        </div>
    );
};

export default ErrorComponent;
