import axios from "axios";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

import RatingStar from "./RatingStar";
// style
import "../../styles/reviews.css";

const ReviewForm = ({ productId, handlePageRefresh }) => {
    const { token } = useSelector((state) => state.users);
    const [rating, setRating] = useState(null);
    const subjectRef = useRef();
    const reviewRef = useRef();
    const [formhasError, setFormHasError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (rating && token) {
            const data = {
                product: productId,
                rating,
                subject: subjectRef.current.value,
                review: reviewRef.current.value,
            };

            try {
                const response = await axios({
                    url: "products/add_review/",
                    method: "POST",
                    headers: {
                        "X-CSRFToken": Cookies.get("csrftoken"),
                        Authorization: `token ${token}`,
                    },
                    data: data,
                });

                if (response.status === 200) {
                    handlePageRefresh();
                }
            } catch (error) {}
        } else {
            setFormHasError(true);
        }
    };

    const handleRateChange = (e) => {
        setRating(parseFloat(e.target.value));
        if (formhasError) {
            setFormHasError(false);
        }
    };

    return (
        <div className={`review__form `}>
            <h3>How do you rate this product?</h3>
            <form onSubmit={handleSubmit}>
                {formhasError && <p className="text-error">Please rate this product.</p>}
                <RatingStar onChange={handleRateChange} rating={rating} />
                <input type="text" placeholder="Enter subject" ref={subjectRef} />
                <textarea name="" id="" placeholder="Write a short note about this product." ref={reviewRef}></textarea>
                <div className={`btn__container`}>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default ReviewForm;
