"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "@/common/store/user-slice";
import useInput from "@/common/hooks/use-input";
import Input from "../reuseable/Input";
import LoadingSpinner from "../reuseable/LoadingSpinner";

const LoginForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [newError, setNewError] = useState(false);

    const { error, loginRedirect } = useSelector((state) => state.users);

    const dispatch = useDispatch();
    const router = useRouter();

    const validate = (value) => {
        return value.length !== 0;
    };

    const {
        value: email,
        isValid: emailIsValid,
        onChange: emailChange,
        onInputBlur: emailBlur,
        hasError: emailHasError,
    } = useInput(validate);
    const {
        value: password,
        isValid: passordIsValid,
        onChange: passwordChange,
        onInputBlur: passwordBlur,
        hasError: passwordHasError,
    } = useInput(validate);

    const formIsValid = emailIsValid && passordIsValid;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (formIsValid) {
                const cartItems = JSON.parse(localStorage.getItem("safekart_cartItem"));
                const data = {
                    username: email,
                    password: password,
                    cartItems: JSON.stringify(cartItems),
                };

                const resultPromise = await dispatch(userLogin(data));

                if (userLogin.fulfilled.match(resultPromise)) {
                    if (loginRedirect) {
                        router.replace(loginRedirect);
                    } else {
                        router.replace("/");
                    }
                }
            }
        } catch (error) {
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (error) {
            setNewError(true);
        }
    }, [error]);

    // remove error message whenever email or password value changes
    useEffect(() => {
        setNewError(false);
    }, [email, password]);

    return (
        <div className="user__form">
            <h2>User login</h2>
            <form onSubmit={handleSubmit}>
                <div className="message">
                    {newError && (
                        <p className="form__error">
                            {error?.non_field_errors[0]} {/* error msg from database */}
                        </p>
                    )}
                </div>
                <Input
                    type="email"
                    name="email"
                    label="Email"
                    placeholder="Enter email address"
                    value={email}
                    onChange={emailChange}
                    onBlur={emailBlur}
                    hasError={emailHasError}
                    errorMsg="Email cannot be empty!"
                />
                <Input
                    type="password"
                    name="password"
                    label="Password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={passwordChange}
                    onBlur={passwordBlur}
                    hasError={passwordHasError}
                    errorMsg="Please enter a password!"
                />
                <div className="form__actions">
                    <button
                        type="submit"
                        className="w-full rounded flex items-center justify-center disabled:opacity-50 mb-4"
                        disabled={isLoading}
                    >
                        <LoadingSpinner isLoading={isLoading} />
                        <span>Log in</span>
                    </button>
                    <p>
                        Need an account? <Link href="/accounts/signup">Register</Link>
                    </p>
                    <p>
                        Forgot password? <Link href="/accounts/password_reset">Reset password</Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
