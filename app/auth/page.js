"use client";

import React, { Suspense } from "react";
import { useRouter } from "next/navigation";

const AuthPage = () => {
    const router = useRouter();
    router.replace("/auth/login");
    return <Suspense fallback={<div>Loading...</div>} />;
};

export default AuthPage;
