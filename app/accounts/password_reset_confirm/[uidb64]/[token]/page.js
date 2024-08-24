"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import styles from "@/common/modules/UserPage.module.css";
import axios from "axios";
import Cookies from "js-cookie";

export const PassResetConfirmPage = ({ params }) => {
    const [linkValid, setLinkValid] = useState(true);
    const router = useRouter();

    // Access the uidb64 and token from the URL query parameters
    const { uidb64, token } = params; // Extracting uidb64 and token from the dynamic route params

    useEffect(() => {
        if (!uidb64 || !token) {
            // Redirect to login page if the uidb64 or token is missing
            router.replace("/accounts/login");
        }
    }, [uidb64, token, router]);

    const sendRequest = useCallback(async () => {
        try {
            const response = await axios({
                url: `/accounts/password_reset_confirm/${uidb64}/${token}/`,
                method: "POST",
                headers: {
                    "X-CSRFToken": Cookies.get("csrftoken"),
                },
            });

            if (response.data.done) {
                sessionStorage.setItem("user_id", response.data.user_id);
                router.replace("/accounts/password_reset_complete/");
            }
        } catch (err) {
            console.log(err);
            setLinkValid(false);
        }
    }, [uidb64, token, router]);

    useEffect(() => {
        sendRequest();
    }, [sendRequest]);

    return (
        <section className={`section ${styles.user__page}`}>
            <div className="section__wrapper">
                {linkValid ? <h3>please wait...</h3> : <h3 className={styles.invalid__link}>Invalid link</h3>}
            </div>
        </section>
    );
};

export default PassResetConfirmPage;
