import React from "react";

const LoadingSpinner = ({ size, isLoading, color = "" }) => {
    /**
     * This spinner is a daisyui spinner
     * @isLoading makes the spinner visible
     * @size  is optional and should in a format: loading-sm, loading-xs etc.
     * @color is optional and should be a tailwind text color: text-primary, etc.
     */
    return (
        <span
            className={`${isLoading ? "loading loading-spinner  mr-2" : "hidden"} ${size || "loading-sm"} ${
                color || "text-white"
            }`}
        ></span>
    );
};

export default LoadingSpinner;
