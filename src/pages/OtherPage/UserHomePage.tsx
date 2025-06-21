import { Link } from "react-router-dom";
import {useGetAllCategoriesQuery} from "../../services/apiCategory.ts";
import {APP_ENV} from "../../env";
import React from "react";

const UserHomePage: React.FC = () => {
    const { data: categories, error, isLoading } = useGetAllCategoriesQuery();

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">


            <section className="px-6 pt-20 pb-32 text-center bg-gradient-to-b from-red-200 to-white dark:from-gray-800 dark:to-gray-900">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                    Смачна доставка у Тернополі
                </h1>
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
                    Ви не уявляєте своє життя без смачної їжі й шукаєте, де замовити швидку доставку піци в Тернополі?<br/>
                    <strong>Pizza 39 — це ваш найкращий вибір!</strong>
                </p>
                <Link
                    to="/menu"
                    className="inline-block bg-red-600 hover:bg-red-500 text-white
                    text-lg font-semibold py-3 px-6 rounded-lg shadow-lg transition">
                    Переглянути меню
                </Link>
            </section>


            <section className="px-6 max-w-7xl mx-auto mt-10">
                {isLoading && (
                    <p className="text-center text-gray-500 dark:text-gray-400">Завантаження...</p>
                )}
                {error && (
                    <p className="text-center text-red-600 dark:text-red-400">
                        Помилка завантаження категорій
                    </p>
                )}
                {categories && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                        {categories.map((category) => (
                            <Link
                                to={`/menu/${category.slug}`}
                                key={category.id}
                                className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition">
                                <img
                                    src={`${APP_ENV.IMAGES_1200_URL}${category.image}`}
                                    alt={category.name}
                                    className="w-full h-64 object-cover rounded-xl
                                    transition-transform duration-500 ease-in-out group-hover:scale-110
                                    group-hover:brightness-75"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/40  transition">
                                    <span className="text-white text-xl font-semibold">{category.name}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default UserHomePage;
