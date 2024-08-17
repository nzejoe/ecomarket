"use client";

import React from "react";
import axios from "axios";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";

import { Inter } from "next/font/google";
import "./globals.css";

import store from "@/common/store/reducer";
import Navbar from "@/common/components/reuseable/Navbar";
import Footer from "@/common/components/reuseable/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
    // Create a client
    const queryClient = new QueryClient();

    // set axios default baseURL
    axios.defaults.baseURL = "https://safekart.onrender.com";
    // axios.defaults.baseURL = "http://localhost:8000";
    axios.defaults.withCredentials = true;

    return (
        <html lang="en">
            <body className={inter.className}>
                <QueryClientProvider client={queryClient}>
                    <Provider store={store}>
                        <Navbar />
                        {children}
                        <Footer />
                    </Provider>
                </QueryClientProvider>
            </body>
        </html>
    );
}
