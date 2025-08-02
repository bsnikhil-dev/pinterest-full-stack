import type React from "react";
import "./authPage.css";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { loginUserThunk, registerUserThunk } from "../../features/authentication/authentication";
import AsyncLoaderComponent from "../../components/customAsyncComponent/AsyncLoader";
import Spinner from "../../components/spinner/Spinner";
import { useNavigate } from "react-router";

const AuthPage = (): React.ReactElement => {
    const [showError, setShowError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [isRegistered, setRegisteredStatus] = useState<boolean>(true);

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        displayName: "",
        email: "",
        password: ""
    });

    const dispatch = useAppDispatch();
    const { status: loadingStatus, user: userDetails, error: errorStatus, isAuthenticated } = useAppSelector((state) => state.authentication);

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>, type: string) => {
        e.preventDefault();

        if (type === "register") {
            dispatch(registerUserThunk(formData));
            return;
        }
        dispatch(loginUserThunk({
            email: formData.email,
            password: formData.password
        }));

    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(() => {
        errorStatus ? (setShowError(true), setErrorMessage(errorStatus)) : (setShowError(false), setErrorMessage(""));
    }, [errorStatus])

    useEffect(() => {
        setFormData({ username: "", displayName: "", email: "", password: "" });
        setShowError(false);
        setErrorMessage("");
    }, [isRegistered]);

    useEffect(() => {
        if (isAuthenticated) {
            const token = userDetails.token.split(' ')[1];
            sessionStorage.setItem("token", token);
            navigate("/", { replace: true });
        }
    }, [isAuthenticated, navigate]);


    return (
        <AsyncLoaderComponent
            isLoading={loadingStatus ? true : false}
            loaderComponent={<Spinner />}
            contentComponent={
                (<div className="authPage">
                    <div className="container">
                        <img src="/general/logo.png" alt="" />
                        <h1>{isRegistered ? "Create an Account" : "Login to your account"}</h1>
                        {showError && <p className="error">{errorMessage}</p>}
                        {isRegistered ? (
                            <form className="register" onSubmit={(e) => handleFormSubmit(e, "register")}>

                                <div className="formGroup">
                                    <label htmlFor="displayName">Name</label>
                                    <input
                                        type="displayName"
                                        placeholder="Name"
                                        required
                                        name="displayName"
                                        id="displayName"
                                        value={formData.displayName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="formGroup">
                                    <label htmlFor="username">Username</label>
                                    <input
                                        type="username"
                                        placeholder="Username"
                                        required
                                        name="username"
                                        id="username"
                                        value={formData.username}
                                        onChange={handleInputChange}
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
                                        value={formData.email}
                                        onChange={handleInputChange}
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
                                        value={formData.password}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <button type="submit">Register</button>
                                <p onClick={() => setRegisteredStatus(false)}>
                                    Do you have an account already ? <b>Login</b>
                                </p>

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
                                        value={formData.email}
                                        onChange={handleInputChange}
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
                                        value={formData.password}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <button type="submit">Login</button>
                                <p onClick={() => setRegisteredStatus(true)}>
                                    Don&apos;t have an account? <b>Register</b>
                                </p>
                            </form>
                        )}
                    </div>
                </div>)
            }
        />

    )
}

export default AuthPage;