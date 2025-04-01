import { Link } from "react-router-dom";
import logo from '../assets/logo_my_money.webp'

export function Footer() {

    return (
        <footer className="bgColor2 shadow-sm dark:bg-gray-900 m-4 !p-3 flex justify-between items-center">
            
                <button className="cursor-pointer color1 text-[28px]">My Money</button>
                <span className=" text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2025 <Link to="/" className="hover:underline">My Money</Link>. All Rights Reserved.</span>
           
        </footer>
    )

}