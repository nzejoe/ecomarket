import React from "react";
import { FaStar, FaStarHalf } from "react-icons/fa";

const RatingStar = ({ onChange, rating }) => {
    const starArray = [
        { value: 5 },
        { value: 4.5 },
        { value: 4 },
        { value: 3.5 },
        { value: 3 },
        { value: 2.5 },
        { value: 2 },
        { value: 1.5 },
        { value: 1 },
        { value: 0.5 },
    ];

    return (
        <div className="rating__container">
            <span className="rating__stars">
                {starArray.map((item, idx) => (
                    <React.Fragment key={idx}>
                        <input
                            type="radio"
                            name="rating"
                            id={`star-${item.value}`}
                            value={item.value}
                            onChange={onChange}
                            defaultChecked={rating === item.value}
                            className="rating__input"
                        />
                        <label
                            htmlFor={`star-${item.value}`}
                            className={`rating__label ${Number.isInteger(item.value) ? "" : "half"}`}
                        >
                            {Number.isInteger(item.value) ? (
                                <FaStar className="relative" />
                            ) : (
                                <FaStarHalf className="absolute" />
                            )}
                        </label>
                    </React.Fragment>
                ))}
            </span>
        </div>
    );
};

export default RatingStar;
