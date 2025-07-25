import type React from "react";
import "./authPage.css";
import { useState } from "react";

const AuthPage = (): React.ReactElement => {
    const [error, setError] = useState<boolean>(false);
    return (
        <div className="authPage">
            <div className="container">
                <img src="/general/logo.png" alt="" />
                <h1>Login to your account</h1>
                <form className="loginForm">
                    <div className="formGroup">
                        <label htmlFor="username">Username</label>
                        <input
                            type="username"
                            placeholder="Username"
                            required
                            name="username"
                            id="username"
                        />
                    </div>
                    <div className="formGroup">
                        <label htmlFor="displayName">Name</label>
                        <input
                            type="displayName"
                            placeholder="Name"
                            required
                            name="displayName"
                            id="displayName"
                        />
                    </div>
                    <div className="formGroup">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            placeholder="Email"
                            required
                            name="email"
                            id="email"
                        />
                    </div>
                    <div className="formGroup">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            name="password"
                            id="password"
                        />
                    </div>
                    <button type="submit">Register</button>
                    <p>
                        Do you have an account? <b>Login</b>
                    </p>
                    {error && <p className="error">{error}</p>}
                </form>
            </div>
        </div>
    )
}

export default AuthPage;