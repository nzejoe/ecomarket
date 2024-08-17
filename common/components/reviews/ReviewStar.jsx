import React from "react";
// icons
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const ReviewStar = ({ rating = 3.5 }) => {
    return (
        <span className="flex">
            {Array.from({ length: 5 }).map((_, index) => {
                const isFilled = rating >= index + 1;
                const isHalfFilled = rating > index && rating < index + 1;

                return (
                    <span key={index} className="relative">
                        {isFilled ? (
                            <FaStar className="text-yellow-500" />
                        ) : isHalfFilled ? (
                            <FaStarHalfAlt className="text-yellow-500" />
                        ) : (
                            <FaRegStar className="text-yellow-500" />
                        )}
                    </span>
                );
            })}
        </span>
    );
};

export default ReviewStar;
