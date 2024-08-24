"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
// redux
import { userPasswordChange, userLogout } from "@/common/store/user-slice";
// hooks
import useInput from "@/common/hooks/use-input";
//ui
import Input from "../reuseable/Input";
import LoadingSpinner from "../reuseable/LoadingSpinner";

const PasswordChangeForm = () => {
    const { error, authUser } = useSelector((state) => state.users);
    const [formHasError, setFormHasError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const router = useRouter();
    const token = authUser && authUser.token;

    const validatePassword = (password) => {
        return password.length > 5;
    };

    // current password
    const {
        value: currentPassword,
        isValid: currentPasswordIsValid,
        onChange: currentPasswordChange,
        onInputBlur: currentPasswordBlur,
        hasError: currentPasswordHasError,
    } = useInput(validatePassword);
    // new password
    const {
        value: newPassword,
        isValid: newPasswordIsValid,
        onChange: newPasswordChange,
        onInputBlur: newPasswordBlur,
        hasError: newPasswordHasError,
    } = useInput(validatePassword);
    // new password confirm
    const validatePassword2 = (password2) => {
        return password2 === newPassword;
    };
    const {
        value: newPassword2,
        isValid: newPassword2IsValid,
        onChange: newPassword2Change,
        onInputBlur: newPassword2Blur,
        hasError: newPassword2HasError,
    } = useInput(validatePassword2);

    const formIsValid = currentPasswordIsValid && newPasswordIsValid && newPassword2IsValid;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (formIsValid) {
                const data = {
                    password: currentPassword,
                    new_password: newPassword,
                    new_password2: newPassword2,
                };
                const requestPromise = await dispatch(userPasswordChange(data));
                if (userPasswordChange.fulfilled.match(requestPromise)) {
                    setSuccess(true);
                    dispatch(userLogout(token));

                    let timer;
                    clearTimeout(timer);
                    timer = setTimeout(() => {
                        router.replace("/accounts/login/");
                    }, 5000);
                }
            } else {
                setFormHasError(true);
            }
        } catch (error) {
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setFormHasError(false);
    }, [currentPassword, newPassword, newPassword2]);

    return (
        <div className="user__form">
            <h2>Password change</h2>
            {
                // while still editing
                !success && (
                    <form onSubmit={handleSubmit}>
                        <div className="messages">
                            {formHasError && <p className="form__error">Please fill form properly.</p>}
                            {error && error.current_password && <p className="form__error">{error.current_password}</p>}
                        </div>
                        <Input
                            type="password"
                            name="current_password"
                            label="Current password"
                            placeholder="Current password"
                            value={currentPassword}
                            onChange={currentPasswordChange}
                            onBlur={currentPasswordBlur}
                            hasError={currentPasswordHasError}
                            errorMsg={"Current password is required!"}
                        />
                        <Input
                            type="password"
                            name="new_password"
                            label="new password"
                            placeholder="new password"
                            value={newPassword}
                            onChange={newPasswordChange}
                            onBlur={newPasswordBlur}
                            hasError={newPasswordHasError}
                            errorMsg={
                                newPassword
                                    ? "Password should be more than 5 characters."
                                    : "New password cannot be empty!"
                            }
                        />
                        <Input
                            type="password"
                            name="new_password2"
                            label="Confirm password"
                            placeholder="Confirm password"
                            value={newPassword2}
                            onChange={newPassword2Change}
                            onBlur={newPassword2Blur}
                            hasError={newPassword2HasError}
                            errorMsg={"The new password did not match!"}
                        />
                        <div className="form__actions">
                            <button
                                type="submit"
                                className="w-full rounded flex items-center justify-center disabled:opacity-50 mb-4"
                                disabled={isLoading}
                            >
                                <LoadingSpinner isLoading={isLoading} />
                                <span> Change password</span>
                            </button>
                        </div>
                    </form>
                )
            }
            {success && (
                <p className="form__success">
                    Your new password has been saved successfully. <br />
                    We are going to log you out, so you can test your new password. <br />
                    <span>Please wait...</span>
                </p>
            )}
        </div>
    );
};

export default PasswordChangeForm;
