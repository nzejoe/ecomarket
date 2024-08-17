import React from "react";
import { BsSearch } from "react-icons/bs";

const StoreEmptyState = () => {
    return (
        <div className="h-80 w-full flex justify-center items-center">
            <div className="text-center">
                <BsSearch className="mx-auto mb-10 text-5xl" />
                <p>Sorry, the product you are looking for is unavailable. </p>
            </div>
        </div>
    );
};

export default StoreEmptyState;
