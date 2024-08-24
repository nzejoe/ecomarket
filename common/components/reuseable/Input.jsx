import React from "react";
//style
import styles from "../../modules/Input.module.css";

const Input = ({ type, name, placeholder, label, value, onChange, onBlur, hasError, errorMsg, className, ...rest }) => {
    return (
        <div className={`${className}`}>
            <div className={`${styles.form__group} mb-3`}>
                <input
                    {...rest}
                    type={type}
                    placeholder={placeholder}
                    id={name}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                />
                <label htmlFor={name}>{label}</label>
            </div>
            {hasError && <p className={`${styles.error} h-5`}>{errorMsg}</p>}
        </div>
    );
};

export default Input;
