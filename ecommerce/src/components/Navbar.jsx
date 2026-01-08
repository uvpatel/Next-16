"use client";

import React, { useState } from "react";
import {
    // Existing
    IconHome,
    IconUser,
    IconMessage,
    IconCalendarEvent,
    IconUsers,
    IconChevronDown,
    IconHistory,
    IconFileText,
    IconX,
    IconMenu,

    // 🛒 Shop / Orders
    IconShoppingCart,
    IconShoppingBag,
    IconPackage,
    IconTruck,

    // ❤️ Wishlist / Rewards
    IconHeart,
    IconStar,
    IconGift,

    // 🎁 Gift Card
    IconCreditCard,
    IconGiftCard,

    // 👤 Profile
    IconUserCircle,
    IconSettings,

    // 🔔 Notifications
    IconBell,
    IconBellRinging,

    // 🎧 Support / Headphones
    IconHeadphones,
    IconHeadset,

    // ⬇️ Download App
    IconDownload,
    IconDeviceMobile,
    IconBrandAndroid,
    IconBrandApple,
} from "@tabler/icons-react";

import Link from "next/link";

export function Navbar() {
    const [isFlashbackOpen, setIsFlashbackOpen] = useState(false); // Desktop Flashback
    const [isReportsOpen, setIsReportsOpen] = useState(false); // Desktop Reports
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileFlashbackOpen, setIsMobileFlashbackOpen] = useState(false);
    const [isMobileReportsOpen, setIsMobileReportsOpen] = useState(false);

    const baseNavItems = [
        {
            name: "User",
            link: "#User",
            icon: <IconUserCircle className="h-5 w-5" />,
        },
        {
            name: "Cart",
            link: "#Cart",
            icon: <IconShoppingCart className="h-5 w-5" />,
        },
        {
            name: "Become Seller",
            link: "#Contact",
            icon: <IconPackage className="h-5 w-5" />,
        },
    ];

    const flashbackItems = [
        {
            label: "2022-23",
            url: "https://gfgbvm.github.io/gfgweb/core-team-2022/index.html",
        },
        {
            label: "2023-24",
            url: "https://gfgbvm.github.io/gfgweb/core-team-2023.html",
        },
        { label: "2024-25", url: "https://gfgbvm.github.io/gfgweb" },
    ];

    // Replace these with actual report URLs (e.g., PDFs) when available
    const reportsItems = [
        { label: "2022-23", url: "#" }, // e.g., "https://gfgbvm.github.io/gfgweb/reports/2022-23.pdf"
        { label: "2023-24", url: "#" }, // e.g., "https://gfgbvm.github.io/gfgweb/reports/2023-24.pdf"
        { label: "2024-25", url: "#" }, // e.g., "https://gfgbvm.github.io/gfgweb/reports/2024-25.pdf"
    ];

    return (
        <div className="relative w-full">
            {/* 📱 Mobile Navbar with Hamburger */}
            <nav className="md:hidden fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800">
                <h1 className="text-xl font-semibold text-neutral-900 dark:text-white">
                    GeeksForGeeks
                </h1>

                <button
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="text-neutral-700 dark:text-neutral-300"
                >
                    <IconMenu className="h-7 w-7" />
                </button>
            </nav>

            {/* Mobile Slide-over Menu */}
            {isMobileMenuOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black/50 z-50"
                        onClick={() => {
                            setIsMobileMenuOpen(false);
                            setIsMobileFlashbackOpen(false);
                            setIsMobileReportsOpen(false);
                        }}
                    />

                    <div className="fixed right-0 top-0 h-full w-80 bg-white dark:bg-neutral-900 shadow-2xl z-50 flex flex-col">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-800">
                            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                                Menu
                            </h3>
                            <button
                                onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    setIsMobileFlashbackOpen(false);
                                    setIsMobileReportsOpen(false);
                                }}
                                className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
                            >
                                <IconX className="h-6 w-6" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto py-4">
                            {baseNavItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.link}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center gap-4 px-6 py-4 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
                                >
                                    {item.icon}
                                    <span className="text-lg">{item.name}</span>
                                </Link>
                            ))}

                            {/* Mobile Flashback Submenu */}
                                {/* Flipcart : Myprofile, orders, whishlist, coupan,giftcard,notification, logout */}
                                {/* cart */}
                                {/* become seller */}
                                {/* drower notification prefrence, customercare drower, advetisement, download app */}
                            {/* Mobile Reports Submenu */}
                        </div>
                    </div>
                </>
            )}

            {/* 💻 Desktop Navbar */}
            <nav className="hidden md:flex justify-between items-center px-10 py-4 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 shadow-sm fixed top-0 left-0 w-full z-50">
                <h1 className="text-xl font-semibold text-neutral-900 dark:text-white">
                    GeeksForGeeks
                </h1>

                <div className="flex space-x-8 items-center">
                    {baseNavItems.map((item, idx) => (
                        <Link
                            key={idx}
                            href={item.link}
                            className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition"
                        >
                            {item.icon}
                            <span>{item.name}</span>
                        </Link>
                    ))}
                </div>
            </nav>

            {/* Content Section */}
            <div className="w-full relative pt-20 md:pt-20">
                <div className="absolute inset-0 bg-grid-black/[0.05] dark:bg-grid-white/[0.1]" />
            </div>
        </div>
    );
}
