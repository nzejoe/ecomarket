import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import UserReview from "./UserReview";
import ReviewEditForm from "./ReviewEditForm";
import axios from "axios";
// ui
import LoadingSpinner from "../reuseable/LoadingSpinner";
import { set } from "react-hook-form";
// style

const MyReview = ({ review, handleRefresh }) => {
    const { token } = useSelector((state) => state.users);
    const [edit, setEdit] = useState(false);
    const [remove, setRemove] = useState(false);
    const [sending, setSending] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);

    const handleEdit = (bool) => {
        setEdit(bool);
    };

    useEffect(() => {
        const sendDeleteRequest = async () => {
            if (!token) return;

            try {
                const response = await axios({
                    url: `/products/delete_review/${review.id}/`,
                    method: "DELETE",
                    headers: {
                        Authorization: `token ${token}`,
                    },
                });

                if (response.status === 200) {
                    setConfirmDelete(false);
                    setRemove(false);
                    handleRefresh();
                }
            } catch (error) {
                console.log({ ...error });
            } finally {
                setSending(false);
            }
        };

        if (confirmDelete && token) {
            setSending(true);
            sendDeleteRequest();
        }
    }, [confirmDelete, token, review, handleRefresh]);

    return (
        <div className={`my__review`}>
            {!edit && review ? (
                <div>
                    <h4>My review</h4>
                    <UserReview review={review} my_review={true} />
                </div>
            ) : (
                <ReviewEditForm userReview={review} handlePageRefresh={handleRefresh} handleEdit={handleEdit} />
            )}

            {!sending &&
                !remove &&
                !edit && ( // if remove button not yet pressed
                    <div className={`review__btn_container`}>
                        <button className={`btn__safe`} onClick={handleEdit}>
                            Edit review
                        </button>
                        <button className={`btn__danger`} onClick={() => setRemove(true)}>
                            Remove
                        </button>
                    </div>
                )}
            {remove && (
                <div className={`review__btn_container`}>
                    <h5>Are you sure you want to delete your review?</h5>
                    <button className={`btn__danger disabled:opacity-60`} onClick={setConfirmDelete} disabled={sending}>
                        Yes
                    </button>
                    <button
                        className={`btn__safe disabled:opacity-60`}
                        onClick={() => setRemove(false)}
                        disabled={sending}
                    >
                        Cancel
                    </button>
                </div>
            )}
        </div>
    );
};

export default MyReview;
