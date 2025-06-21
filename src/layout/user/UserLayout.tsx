import {Link, Outlet} from "react-router";
import { Pizza } from "lucide-react";
import React from "react";

const UserLayout: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col bg-white text-gray-900 dark:bg-gray-900 dark:text-white">

            <header className="w-full py-4 px-6 bg-red-600 text-white shadow-lg flex justify-between items-center">
                <h1 className="text-2xl font-bold tracking-wide flex items-center gap-2">
                    <Pizza className="w-6 h-6" />
                    Pizza 39
                </h1>
                <nav className="space-x-4">
                    <Link to="/menu" className="hover:underline">Меню</Link>
                    <Link to="/cart" className="hover:underline">Кошик</Link>
                    <Link to="/admin/home" className="bg-white text-red-600 px-3 py-1 rounded hover:bg-red-100 font-semibold">Адмін панель</Link>
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
