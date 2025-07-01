import { Link } from "react-router-dom";
import React from "react";

const Banner: React.FC = () => {
    return (
        <section className="max-w-7xl mx-auto my-12 px-6 py-12 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-xl text-center md:text-left">
                <h3 className="text-3xl font-semibold text-gray-900 dark:text-white mb-2">
                    Акції та спеціальні пропозиції!
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Отримайте знижку 10% на перше замовлення або безкоштовну доставку при замовленні від 300 грн.
                </p>
                <Link
                    to="/menu/promotions"
                    className="inline-block bg-red-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-700 transition"
                >
                    Переглянути акції
                </Link>
            </div>
            <img
                src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=400&q=80"
                alt="Спеціальна пропозиція"
                className="w-full max-w-xs rounded-lg shadow-lg object-cover"
            />
        </section>
    );
};

export default Banner;
