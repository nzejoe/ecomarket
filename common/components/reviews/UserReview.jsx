import React from "react";
// utils
import { getDateTime } from "@/common/helpers/utils";
// ui
import ReviewStar from "./ReviewStar";

const UserReview = ({ review, my_review }) => {
    return (
        <div className={` text-sm mb-5`}>
            <div>
                <h4>{!my_review ? review.user : ""}</h4>
            </div>
            <div className="flex justify-between items-center mb-1">
                <ReviewStar rating={review.rating} />
                <span className={`text-sm`}>{getDateTime(review.updated)}</span>
            </div>
            <h5 className="font-medium">{review.subject}</h5>
            <p>{review.review}</p>
        </div>
    );
};

export default UserReview;
