import type React from "react";
import "./authPage.css";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { loginUserThunk, registerUserThunk } from "../../features/authentication/authentication";

const AuthPage = (): React.ReactElement => {
    const [error, setError] = useState<boolean>(false);
    const [isRegistered, setRegisteredStatus] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    const authenticationDetails = useAppSelector((state) => state.authentication);

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>, type: string) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        let data;

        if (type === "register") {
            data = Object.fromEntries(formData.entries()) as {
                username: string;
                displayName: string;
                email: string;
                password: string;
            };

            dispatch(registerUserThunk(data));
            return;
        }

        data = Object.fromEntries(formData.entries()) as {
            email: string;
            password: string;
        };

        dispatch(loginUserThunk(data));
    }

    return (
        <div className="authPage">
            <div className="container">
                <img src="/general/logo.png" alt="" />
                <h1>{isRegistered ? "Create an Account" : "Login to your account"}</h1>
                {isRegistered ? (
                    <form className="register" onSubmit={(e) => handleFormSubmit(e, "register")}>
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
                        <p onClick={() => setRegisteredStatus(false)}>
                            Do you have an account already ? <b>Login</b>
                        </p>
                        {error && <p className="error">{error}</p>}
                    </form>) : (
                    <form className="loginForm" onSubmit={(e) => handleFormSubmit(e, "login")}>

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
                        <button type="submit">Login</button>
                        <p onClick={() => setRegisteredStatus(true)}>
                            Don&apos;t have an account? <b>Register</b>
                        </p>
                        {error && <p className="error">{error}</p>}
                    </form>
                )}
            </div>
        </div>
    )
}

export default AuthPage;