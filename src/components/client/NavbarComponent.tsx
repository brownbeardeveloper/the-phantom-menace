"use client";

import UserDropmenuComponent from "./UserDropmenuComponent";
import { FaHome, FaGlobeEurope } from "react-icons/fa";
import { BiMessageSquareDetail } from "react-icons/bi";
import { RiAccountBoxFill } from "react-icons/ri";
import { IoCalendarNumberSharp } from "react-icons/io5";
import { redirect, usePathname } from 'next/navigation';
import Link from 'next/link'

interface NavbarProps {
    user: {
        name: string;
        last_name: string;
        email: string;
    };
}

const NavbarComponent = ({ user }: NavbarProps) => {

    const pathname = usePathname(); // Get the url path

    const defaultIconStyle = "fill-neutral-600"; // For inactive icons
    const activeIconStyle = "fill-white"; // For active icons

    const iconWrapperDefault = "flex items-center justify-center p-2 mx-px hover:bg-violet-200 rounded transition-colors duration-200 ease-in-out"; // For default icon container
    const iconWrapperActive = "flex items-center justify-center p-2 mx-px bg-violet-300 rounded transition-colors duration-200 ease-in-out"; // For active icon container

    return (
        <div className="fixed left-1/2 transform -translate-x-1/2 top-0 h-auto w-auto p-2 bg-white rounded shadow-lg z-10">
            <div className="w-full h-full flex justify-between items-center px-4">
                <Link href={`/`} className={pathname === '/' ? iconWrapperActive : iconWrapperDefault}>
                    <FaHome className={pathname === '/' ? activeIconStyle : defaultIconStyle} size={40} />
                </Link>
                <Link href={`/about-us`} className={pathname === '/about-us' ? iconWrapperActive : iconWrapperDefault}>
                    <BiMessageSquareDetail className={pathname === '/about-us' ? activeIconStyle : defaultIconStyle} size={40} />
                </Link>
                <Link href={`/globe`} className={pathname === '/globe' ? iconWrapperActive : iconWrapperDefault}>
                    <FaGlobeEurope className={pathname === '/globe' ? activeIconStyle : defaultIconStyle} size={40} />
                </Link>
                {/* <Link href={`/account`} className={pathname === '/account' ? iconWrapperActive : iconWrapperDefault}>
                    <RiAccountBoxFill className={pathname === '/account' ? activeIconStyle : defaultIconStyle} size={40} />
                </Link> */}
                <Link href={`/calendar`} className={pathname === '/calendar' ? iconWrapperActive : iconWrapperDefault}>
                    <IoCalendarNumberSharp className={pathname === '/calendar' ? activeIconStyle : defaultIconStyle} size={40} />
                </Link>
                <div className={iconWrapperDefault}>
                    <UserDropmenuComponent fullname={user.name + " " + user.last_name} email={user.email} />
                </div>
            </div>
        </div>
    );
};


export default NavbarComponent;
