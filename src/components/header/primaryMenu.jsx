"use client";

import { useEffect, useState } from "react";
import { LogOut, User, Heart, ShoppingCart, Menu } from "lucide-react";
import Image from "next/image";
import SearchBox from "@/app/_components/produccts/SearchBox";
import MobileSearchBox from "@/app/_components/produccts/MobileSearchBox";
import Link from "next/link";
import TopMenu from "./topMenu";
import { usePathname } from "next/navigation";

import UserDropdown from "./dashboard";
import Login from "@/app/_components/user/Login";
import { useSelector, useDispatch } from "react-redux";
import { addOldUserData, handleLoginFunc } from "@/helper/helper";
import { loadOldData } from "@/redux/slices/userSlice";


export default function PrimaryMenu() {
    const [category, setCategory] = useState("All Categories");
    const [cartCount, setCartCount] = useState(2); // Example cart count
    const [isOpen, setIsOpen] = useState(false);
    const isUserLogin = useSelector((state)=>state.user.isUserLogin);
   
    const dispatch = useDispatch();

useEffect(()=>
{
//dispatch((loadOldData()));
addOldUserData(dispatch);
//console.log("Old data is called!");
},[])
    return (
        <>
            {/* Login Modal */}

            <Login />

            {/* Lg Devices */}


            <nav className="hidden lg:block fixed top-8 left-0 w-full bg-white shadow-sm z-[9999] !important">
                <div className="flex px-6 h-20 items-center justify-between">
                    <div className=" flex gap-10 items-center w-1/2 justify-between">
                        <div>
                            <Link href={`${process.env.NEXT_PUBLIC_FRONT_DOMAIN}`}>    <Image
                                src={`/images/logo.png`} // Ensure the image is inside the 'public' folder
                                alt="Logo"
                                width={125}
                                height={23}
                            />
                            </Link>


                        </div>
                        {/* category and search box */}


                        <SearchBox />
                        {/* category and search box */}
                    </div>
                    {/* add to cart whislist and use menu */}
                    <div className="flex items-center gap-6">




                        {/* Add to Cart */}
                        <button className="flex items-center gap-2 text-gray-700 hover:text-secondary transition relative">
                            <ShoppingCart size={22} />
                            <span className="hidden md:inline text-sm font-medium">Cart</span>
                            {/* Cart Item Badge */}
                            {/* <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                3
                            </span> */}
                        </button>


                        {/* Wishlist */}
                        <button className="flex items-center gap-2 text-gray-700 hover:text-red-500 transition">
                            <Heart size={22} />
                            <span className="hidden md:inline text-sm font-medium">Wishlist</span>
                        </button>
                        {/* User Login and logout */}
                        {!isUserLogin ?

                            <button className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition" onClick={() => handleLoginFunc(dispatch)}>
                                <User size={22} />
                                <span className="hidden md:inline text-sm font-medium">Login</span>
                            </button>

                            :
                            <UserDropdown />
                        }


                    </div>
                    {/* End whishlist add to cart , user  */}
                </div>


                {/* Modal box */}


            </nav>


            {/* Mobile Device */}
            <nav className="lg:hidden fixed top-0 left-0 w-full bg-white shadow-md z-50">
                <div className="flex flex-col  gap-4 mx-4">
                    <div className="flex flex-row justify-between items-center pt-3">
                        <div>
                            <Link href={`${process.env.NEXT_PUBLIC_FRONT_DOMAIN}`}>
                                <Image
                                    src="/images/logo.png" // Ensure the image is inside the 'public' folder 
                                    alt="Logo"
                                    width={120}
                                    height={100}
                                />
                            </Link>
                        </div>
                        <div className="relative"><button onClick={() => setIsOpen(!isOpen)}>
                            <Menu size={30} />
                        </button>  </div>


                    </div>
                    <MobileSearchBox />
                </div>
                {/* Dropdown Menu */}
                {isOpen && (
                    <div className="bg-gray-50 shadow-md p-4 rounded-b-md w-full absolute">
                        <ul className="flex flex-col gap-3">
                            <li className="thin-border-bottom"> <Link href={`${process.env.NEXT_PUBLIC_FRONT_DOMAIN}`}> Home</Link></li>
                            <li className="thin-border-bottom" onClick={() => setIsOpen(!isOpen)}> <Link href={`${process.env.NEXT_PUBLIC_FRONT_DOMAIN}category/jeans`} > Jeans</Link></li>
                            <li className="thin-border-bottom" onClick={() => setIsOpen(!isOpen)}> <Link href={`${process.env.NEXT_PUBLIC_FRONT_DOMAIN}category/t-shirts`}> T-Shirts</Link></li>
                        </ul>

                    </div>
                )}


            </nav>

        </>
    );
}
