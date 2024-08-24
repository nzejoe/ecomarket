"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

// hooks
import useInput from "@/common/hooks/use-input";

// ui
import Input from "../reuseable/Input";
import LoadingSpinner from "../reuseable/LoadingSpinner";

const csrftoken = Cookies.get("csrftoken");

const PasswordResetCompleteForm = () => {
    const [linkValid, setLinkValid] = useState(true);
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    // new password
    const validate = (password) => {
        return password.length > 5;
    };

    const {
        value: password,
        isValid: passwordIsValid,
        onChange: passwordChange,
        onInputBlur: passwordBlur,
        hasError: passwordHasError,
    } = useInput(validate);

    //confirm password
    const validatePassword2 = (password2) => {
        return password2 === password;
    };

    const {
        value: password2,
        isValid: password2IsValid,
        onChange: password2Change,
        onInputBlur: password2Blur,
        hasError: password2HasError,
    } = useInput(validatePassword2);

    const formIsValid = passwordIsValid && password2IsValid;

    // check if link is valid
    useEffect(() => {
        const user_id = sessionStorage.getItem("user_id");
        if (!user_id) {
            setLinkValid(false);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (formIsValid) {
                const data = {
                    user_id: sessionStorage.getItem("user_id"),
                    password,
                    password2,
                };

                const response = await axios({
                    url: "/accounts/password_reset_complete/",
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                        "X-CSRFToken": csrftoken,
                    },
                    data: data,
                });

                if (response.data.done) {
                    setSuccess(true);
                    sessionStorage.removeItem("user_id");
                    setTimeout(() => {
                        router.replace("/accounts/login/");
                    }, 4000);
                }
                try {
                } catch (error) {
                    // const err = { ...error };
                    console.log(error);
                    setLinkValid(false);
                    setSuccess(false);
                }
            }
        } catch (error) {
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="user__form">
            {linkValid && !success && (
                <React.Fragment>
                    <h2>Set new password</h2>
                    <form onSubmit={handleSubmit}>
                        <Input
                            type="password"
                            name="password"
                            value={password}
                            label="New password"
                            placeholder="New password"
                            onChange={passwordChange}
                            onBlur={passwordBlur}
                            hasError={passwordHasError}
                            errorMsg={
                                password ? "Password should not be less than 5 characters." : "Field cannot be empty!"
                            }
                        />
                        <Input
                            type="password"
                            name="password2"
                            value={password2}
                            label="confirm password"
                            placeholder="confirm password"
                            onChange={password2Change}
                            onBlur={password2Blur}
                            hasError={password2HasError}
                            errorMsg={password2 ? "Password did not match!" : "Field cannot be empty!"}
                        />
                        <div className="form__actions">
                            <button
                                type="submit"
                                className="w-full rounded flex items-center justify-center disabled:opacity-50 mb-4"
                                disabled={isLoading}
                            >
                                <LoadingSpinner isLoading={isLoading} />
                                <span>Set password</span>
                            </button>
                        </div>
                    </form>
                </React.Fragment>
            )}
            {success && linkValid && (
                <p className="form__success">
                    Your new password was set successfully. <br />
                    You will be redirect to login page. <br />
                    <span>Please wait...</span>
                </p>
            )}
            {!success && !linkValid && <h3>invalid link</h3>}
        </div>
    );
};

export default PasswordResetCompleteForm;
