"use client";

import React, { useEffect } from "react";
import axios from "axios";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";

import { Inter } from "next/font/google";
import "./globals.css";

// swiperjs
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/navigation";
import "swiper/css/pagination";

import store from "@/common/store/reducer";
import Navbar from "@/common/components/reuseable/Navbar";
import Footer from "@/common/components/reuseable/Footer";
import OurServices from "@/common/components/reuseable/OurServices";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
    // Create a client
    const queryClient = new QueryClient();

    // set axios default baseURL
    axios.defaults.baseURL = "https://safekart.onrender.com";
    // axios.defaults.baseURL = "http://localhost:8000";
    axios.defaults.withCredentials = true;

    const router = useRouter();

    useEffect(() => {
        const currentPath = window.location.pathname;
        const specificUrlPattern = /^\/accounts\/password_reset_confirm\/[a-zA-Z0-9-]+\/[a-zA-Z0-9-]+\//;

        // Check if the current path matches the specific URL pattern
        if (specificUrlPattern.test(currentPath)) {
            const newPath = currentPath.replace("/accounts/", "/auth/"); // Replace 'accounts' with 'auth'
            router.replace(newPath); // Redirect to the new path
        }
    }, [router]);

    return (
        <html lang="en">
            <body className={inter.className}>
                <QueryClientProvider client={queryClient}>
                    <Provider store={store}>
                        <Navbar />
                        <div className="pt-[70px]">{children}</div>
                        <OurServices />
                        <Footer />
                    </Provider>
                </QueryClientProvider>
            </body>
        </html>
    );
}
