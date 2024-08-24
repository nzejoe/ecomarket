"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export const PassResetConfirmPage = ({ params }) => {
    const router = useRouter();

    // Access the uidb64 and token from the URL query parameters
    const { uidb64, token } = params; // Extracting uidb64 and token from the dynamic route params

    useEffect(() => {
        if (!uidb64 || !token) {
            // Redirect to login page if the uidb64 or token is missing
            router.replace("/accounts/login");
        }
    }, [uidb64, token, router]);

    return <div>PassResetConfirmPage</div>;
};

export default PassResetConfirmPage;
