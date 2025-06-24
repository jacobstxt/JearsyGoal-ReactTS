import {Link, Outlet, useNavigate} from "react-router";
import { Pizza } from "lucide-react";
import React from "react";
import {useAppDispatch, useAppSelector} from "../../store";
import {APP_ENV} from "../../env";
import {logout} from "../../store/authSlice.ts";

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


                <nav className="space-x-4">
                    {user ? (
                        <div className="flex items-center gap-2">
                            <img src={`${APP_ENV.IMAGES_50_URL}${user?.image}`}
                                 alt="Avatar" className="rounded-circle mx-3"
                                 // onClick={ () =>  navigate("Orders") }
                            />
                            <span className={"mx-3 text-white"}>{user.email}</span>
                            <button className={"mx-3 btn btn btn-light"} onClick={logoutUser}>Вийти</button>
                        </div>
                    ) : (

                        <nav className="space-x-4">
                            <Link to="/account/login" className="hover:underline">Вхід</Link>
                            <Link to="/account/register" className="hover:underline">Реєстрація</Link>
                        </nav>
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
