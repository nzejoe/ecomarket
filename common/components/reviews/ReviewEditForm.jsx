import React, { useState } from "react";
// 3rd party
import { useSelector } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";
import LoadingSpinner from "../reuseable/LoadingSpinner";

import RatingStar from "./RatingStar";
// style
import styles from "@/common/modules/Review.module.css";

const ReviewEditForm = ({ userReview, handlePageRefresh, handleEdit }) => {
    const { token } = useSelector((state) => state.users);
    const [rating, setRating] = useState(userReview.rating);
    const [subject, setSubject] = useState(userReview.subject);
    const [review, setReview] = useState(userReview.review);
    const [formHasError, setFormHasError] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const handleRateChange = (e) => {
        setRating(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!token) return;

        setIsSaving(true);

        if (rating && token) {
            const data = {
                product: userReview.product,
                rating,
                subject,
                review,
            };

            try {
                const response = await axios({
                    url: `products/update_review/${userReview.id}/`,
                    method: "PUT",
                    headers: {
                        "X-CSRFToken": Cookies.get("csrftoken"),
                        Authorization: `token ${token}`,
                    },
                    data: data,
                });

                if (response.status === 200) {
                    handlePageRefresh();
                    handleEdit(false);
                }
            } catch (error) {
                console.log({ ...error });
            } finally {
                setIsSaving(false);
            }
        } else {
            setFormHasError(true);
        }
    };

    return (
        <div className={styles.review__form}>
            <h3>Edit your review</h3>
            <form onSubmit={handleSubmit}>
                {formHasError && <p>Please rate this product.</p>}
                <RatingStar onChange={handleRateChange} rating={rating} />
                <input
                    type="text"
                    placeholder="Enter subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                />
                <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    className="w-full max-w-full"
                    placeholder="Write a short note about this product."
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                ></textarea>
                <div className={`${styles.btn__container} w-full`}>
                    <button
                        type="submit"
                        className="w-full rounded flex items-center justify-center disabled:opacity-50 mb-4"
                        disabled={isSaving}
                    >
                        <LoadingSpinner isLoading={isSaving} />
                        <span> Save</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ReviewEditForm;
