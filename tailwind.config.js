/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        fontFamily: {
            inter: ["var(--font-inter)"],
        },
        screens: {
            "max-xs": { max: "320px" }, // => @media (max-width: 320px) { ... }
            sm: "640px", // => @media (min-width: 640px) { ... }

            md: "768px", // => @media (min-width: 768px) { ... }

            lg: "1024px", // => @media (min-width: 1024px) { ... }

            xl: "1280px", // => @media (min-width: 1280px) { ... }

            "2xl": "1536px", // => @media (min-width: 1536px) { ... }
            "short-device": { raw: "(max-height: 700px)" }, // devices with height less than 700px
        },
        maxWidth: {
            sm: "37.5rem",
            md: "48rem",
            lg: "64.631rem",
            xl: "80rem",
            "2xl": "64.938rem", // 1039px
            "next-max": "69.375rem",
        },
        extend: {
            boxShadow: {
                round: "0px 0px 40px rgba(0, 0, 0, 0.05)",
                dashboard: "0px 4px 20px rgba(0, 0, 0, 0.05)",
                "fixed-button": "0px -10px 60px rgba(0, 0, 0, 0.1)",
                light: "0px 4px 4px rgba(0, 0, 0, 0.05)",
            },
            borderRadius: {
                x: "0.625rem", // 10px
                xv: "0.875rem", // 14px
                xx: "1.25rem", // 20px
                xx2: "2.5rem", // 40px
            },
            fontSize: {
                "xxs-2": "0.5rem", //8px
                xxs: "0.625rem", //10px
                "2xxl": "1.75rem", //28px
                "3xxl": "2.0rem", // 32px
                header: "2.25rem", // 36px
                "7.5xl": "5rem",
                "extra-large": "3rem", // 48px
            },
            colors: {
                primary: {
                    blue: " #152952",
                    darker: "#1335A5",
                    dark: "#216ED6",
                    DEFAULT: "#56acbf",
                    light: "#DCF1FF",
                    bg: "#F2F4F9",
                    bgdark: "#EBF4FF",
                    text: "#596780",
                    "bg-base": "#E9E9E9",
                },
                secondary: {
                    dark: "#252173",
                    DEFAULT: "#252173",
                    light: "#FFEBDC",
                },
                dark: {
                    DEFAULT: "#333333",
                    light: "#D9D9D9",
                },
                black: {
                    dark: "#181818",
                    DEFAULT: "#040404",
                    light: "#808080",
                },
                white: {
                    DEFAULT: "#fffefe",
                },
                grey: {
                    DEFAULT: "#DFDFDF",
                    light: "#FAFAFA",
                    bg: "#0B1221",
                    footer: "#EFEFEF",
                },
            },

            padding: {
                4.5: "1.125rem", // 18px
            },
            zIndex: {
                1: "1",
                2: "2",
                3: "3",
                4: "4",
                5: "5",
                6: "6",
                7: "7",
                12: "12",
            },
        },
    },
    plugins: [require("daisyui")],
    daisyui: {
        styled: true,
        themes: [
            {
                mytheme: {
                    primary: "#56acbf",
                    "primary-focus": "#216ED6",
                    "primary-content": "#ffffff",
                    secondary: "#252173",
                    "secondary-focus": "#FDA565",
                    "secondary-content": "#FFEBDC",
                    accent: "#ffc805",
                    "accent-focus": "#E5B404",
                    "accent-content": "#ffffff",
                    neutral: "#2a2e37",
                    "neutral-focus": "#000000",
                    "neutral-content": "#ffffff",
                    "base-100": "#ffffff",
                    "base-200": "#f9fafb",
                    "base-300": "#FFFBF2",
                    "base-content": "#2a2e37",
                    info: "#2094f3",
                    success: "#00B2A0",
                    warning: "#ff9900",
                    error: "#FF3B00",
                },
            },
        ],
        base: true,
        utils: true,
        logs: true,
        rtl: false,
        prefix: "",
    },
};
