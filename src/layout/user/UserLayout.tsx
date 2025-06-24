import {Link, Outlet, useNavigate} from "react-router";
import { Pizza } from "lucide-react";
import {useAppDispatch, useAppSelector} from "../../store";
import {APP_ENV} from "../../env";
import {logout} from "../../store/authSlice.ts";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import React from "react";


const UserLayout: React.FC = () => {
    const { user } = useAppSelector(state=>state.auth);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();


    function logoutUser() {
        dispatch(logout());
        navigate('/');
    }


    return (
        <div className="min-h-screen flex flex-col bg-white text-gray-900 dark:bg-gray-900 dark:text-white">

            <header className="w-full py-4 px-6 bg-red-600 text-white shadow-lg flex justify-between items-center">
                <h1 className="text-2xl font-bold tracking-wide flex items-center gap-2">
                    <Pizza className="w-6 h-6" />
                    Pizza 39
                </h1>


                <nav>
                    {user ? (
                         user.roles.includes("Admin") ? (
                        <DropdownMenu.Root>
                            <DropdownMenu.Trigger asChild>
                                <button className="flex items-center gap-2 focus:outline-none">
                                    <img
                                        src={`${APP_ENV.IMAGES_50_URL}${user?.image}`}
                                        alt="Avatar"
                                        className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                                    />
                                    <span className="font-medium hidden sm:inline">{user.email}</span>
                                </button>
                            </DropdownMenu.Trigger>

                            <DropdownMenu.Content
                                sideOffset={8}
                                className="z-50 mt-2 min-w-[140px] bg-white rounded-md shadow-lg border border-gray-200 p-1"
                            >
                                <DropdownMenu.Item
                                    onClick={logoutUser}
                                    className="text-red-600
                                    hover:bg-red-100 px-3 py-2 rounded
                                    cursor-pointer text-sm transition-colors">
                                    Вийти
                                </DropdownMenu.Item>
                                <DropdownMenu.Item
                                    className="text-red-600
                                    hover:bg-red-100 px-3 py-2 rounded
                                    cursor-pointer text-sm transition-colors">
                                    Профіль
                                </DropdownMenu.Item>

                                <DropdownMenu.Item asChild>
                                    <Link
                                        to="/Admin/home"
                                        className="text-red-600
                                    hover:bg-red-100 px-3 py-2 rounded
                                    cursor-pointer text-sm transition-colors">
                                        Адмін панель
                                    </Link>
                                </DropdownMenu.Item>
                            </DropdownMenu.Content>
                        </DropdownMenu.Root>
                         ) : (
                             <DropdownMenu.Root>
                                 <DropdownMenu.Trigger asChild>
                                     <button className="flex items-center gap-2 focus:outline-none">
                                         <img
                                             src={`${APP_ENV.IMAGES_50_URL}${user?.image}`}
                                             alt="Avatar"
                                             className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                                         />
                                         <span className="font-medium hidden sm:inline">{user.email}</span>
                                     </button>
                                 </DropdownMenu.Trigger>

                                 <DropdownMenu.Content
                                     sideOffset={8}
                                     className="z-50 mt-2 min-w-[140px] bg-white rounded-md shadow-lg border border-gray-200 p-1"
                                 >
                                     <DropdownMenu.Item
                                         onClick={logoutUser}
                                         className="text-red-600
                                    hover:bg-red-100 px-3 py-2 rounded
                                    cursor-pointer text-sm transition-colors">
                                         Вийти
                                     </DropdownMenu.Item>
                                     <DropdownMenu.Item
                                         className="text-red-600
                                    hover:bg-red-100 px-3 py-2 rounded
                                    cursor-pointer text-sm transition-colors">
                                         Профіль
                                     </DropdownMenu.Item>
                                 </DropdownMenu.Content>
                             </DropdownMenu.Root>
                         )
                    ) : (
                        <div className="flex gap-4">
                            <Link
                                to="/account/login"
                                className="bg-white text-red-600 hover:bg-gray-100 font-semibold py-1.5 px-4 rounded-lg shadow transition duration-200"
                            >
                                Вхід
                            </Link>
                            <Link
                                to="/account/register"
                                className="bg-white text-red-600 hover:bg-gray-100 font-semibold py-1.5 px-4 rounded-lg shadow transition duration-200"
                            >
                                Реєстрація
                            </Link>
                        </div>
                    )}

                </nav>


            </header>

            <main className="flex-1 p-4 md:p-6">
                <Outlet />
            </main>


            <footer className="w-full py-6 px-6 bg-red-700 text-white text-sm text-center">
                <div className="mb-3 font-semibold text-lg">🍕 Pizza 39 — Смачна доставка у Тернополі</div>

                <p>© 2025 Pizza 39 | Усі права захищено</p>

                <div className="mt-3">
                    <p>📞 Замовлення по телефону:</p>
                    <p className="font-medium">
                        +38 (098) 39 39 239 &nbsp; | &nbsp; +38 (050) 39 39 239
                    </p>
                </div>

                <div className="mt-3">
                    <p>📍 Адреса: вул. Коновальця, 39, м. Тернопіль</p>
                    <p>🕐 Працюємо щодня: 10:00 – 23:00</p>
                </div>
            </footer>

        </div>
    );
};

export default UserLayout;
