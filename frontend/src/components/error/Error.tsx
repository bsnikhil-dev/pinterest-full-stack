import React from 'react';
import './error.css';
import { useMatch, useNavigate } from 'react-router';

interface ErrorComponentProps {
    errorMessage?: string;
    errorCode?: number;
    onRetry?: () => void;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({ errorMessage = "", errorCode = null, onRetry }) => {

    const match = useMatch("/");
    const navigate = useNavigate();

    return (
        <div className="error-container">
            <div className="error-card">
                <h1>{`${errorCode} : ${errorMessage}`}</h1>
                <p>Oops! Something went wrong. <br />
                    We apologize for the inconvenience. Kindly try again in a few moments.</p>
                <div className="error-buttons">
                    <button onClick={onRetry}>Retry</button>
                    {!match && <button onClick={() => navigate("/")}>Return to Homepage</button>}
                </div>
            </div>
        </div>
    );
};

export default ErrorComponent;
