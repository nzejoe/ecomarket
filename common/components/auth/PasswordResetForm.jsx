"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import Input from "../reuseable/Input";
import useInput from "@/common/hooks/use-input";
import LoadingSpinner from "../reuseable/LoadingSpinner";
import { userPasswordReset } from "@/common/store/user-slice";

const PasswordResetForm = () => {
    const { error } = useSelector((state) => state.users);
    const [formHasError, setFormHasError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    function validateEmail(email) {
        const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const { value, isValid, onChange, onInputBlur, hasError } = useInput(validateEmail);

    const formIsValid = isValid;

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        try {
            if (formIsValid) {
                const data = {
                    email: value.toLowerCase(),
                };
                const resultPromise = await dispatch(userPasswordReset(data));
                if (userPasswordReset.fulfilled.match(resultPromise)) {
                    setSuccess(true);
                }
            }
        } catch (error) {
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (error) {
            setFormHasError(true);
        }
    }, [error]);

    return (
        <React.Fragment>
            {!success && (
                <div className="user__form">
                    <h2>Password reset</h2>
                    <p>Please enter email address linked to your account.</p>
                    <form onSubmit={handleSubmit}>
                        <div className="message">
                            {formHasError && error && (
                                <p className="form__error">
                                    {error.email[0]} {/* error msg from database */}
                                </p>
                            )}
                        </div>
                        <Input
                            type="email"
                            name="email"
                            value={value}
                            label="Email address"
                            placeholder="Email address"
                            onChange={onChange}
                            onBlur={onInputBlur}
                            hasError={hasError}
                            errorMsg={value ? "Email is not valid!" : "Email cannot be empty!"}
                        />
                        <div className="form__actions">
                            <button
                                type="submit"
                                className="w-full rounded flex items-center justify-center disabled:opacity-50 mb-4"
                                disabled={isLoading}
                            >
                                <LoadingSpinner isLoading={isLoading} />
                                reset password
                            </button>
                        </div>
                        <p>
                            Already have an account? <Link href="/accounts/login/">Log in</Link>
                        </p>
                    </form>
                </div>
            )}
            {success && (
                <div className="form__success" style={{ width: "40rem", margin: "auto" }}>
                    <h3>Password reset done.</h3>
                    <p>
                        {` A link on how to set new password has been sent to your email address.
                        Please endeavour to check your spam folder if you haven't seen the message.`}
                    </p>
                </div>
            )}
        </React.Fragment>
    );
};
export default PasswordResetForm;
