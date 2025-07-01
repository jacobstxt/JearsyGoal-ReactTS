import { Link } from "react-router-dom";
import {useGetAllCategoriesQuery} from "../../services/apiCategory.ts";
import React from "react";
import Banner from "../../components/ui/baner/productBaner.tsx";
import CategoriesGridOrSlider from "../../components/ui/slider/CategoriesGridOrSlider.tsx";

const UserHomePage: React.FC = () => {
    const { data: categories} = useGetAllCategoriesQuery();

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">

            <section
                className="
        relative bg-gray-100
        text-red-700 py-28 px-8 rounded-xl max-w-7xl mx-auto mb-16 shadow-lg overflow-hidden
      "
            >
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-5xl font-extrabold mb-6 tracking-wide">
                        Найсмачніша піца у Тернополі — з доставкою додому!
                    </h1>
                    <p className="text-xl mb-8 max-w-xl mx-auto text-gray-700">
                        Свіжоспечена, ароматна та з улюбленими інгредієнтами — зробіть замовлення вже зараз!
                    </p>
                    <Link
                        to="/menu/pizza"
                        className="
            inline-block bg-red-600 text-white font-bold px-8 py-4 rounded-full shadow-lg
            hover:bg-red-700 transition transform hover:-translate-y-1 hover:scale-105
          "
                    >
                        Замовити піцу
                    </Link>
                </div>

                {/* Декоративний елемент */}
                <div className="absolute top-0 right-0 w-72 h-72 bg-red-100 opacity-30 rounded-full blur-3xl animate-pulse"></div>
            </section>




            <div className="min-h-[250px] bg-white dark:bg-gray-900">
                <Banner />
            </div>

            <section className="px-8 max-w-7xl mx-auto">
                {categories && <CategoriesGridOrSlider categories={categories} />}
            </section>



        </div>
    );
};

export default UserHomePage;
