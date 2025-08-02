import React from 'react';
import './error.css';
import { useMatch } from 'react-router';

interface ErrorComponentProps {
    errorMessage?: string;
    errorCode?: number;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({ errorMessage = "", errorCode = null }) => {

    const match = useMatch("/");
    
    return (
        <div className="error-container">
            <div className="error-card">
                <h1>{`${errorCode} : ${errorMessage}`}</h1>
                <p>Oops! Something went wrong. <br />
                    We’re already working on it. Please try again in a moment.</p>
                <div className="error-buttons">
                    <button >Retry</button>
                    {match ? null : <button >Go Home</button>}
                </div>
            </div>
        </div>
    );
};

export default ErrorComponent;
