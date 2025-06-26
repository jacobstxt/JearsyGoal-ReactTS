import './App.css'
import {BrowserRouter as Router, Route, Routes} from "react-router";
import UserLayout from "./layout/user/UserLayout.tsx";
import UserHomePage from "./pages/OtherPage/UserHomePage.tsx";
import AdminLayout from "./layout/admin/AdminLayout.tsx";
import DashboardHome from "./pages/Dashboard/DashboardHome.tsx";
import CategoriesListPage from "./admin/pages/Сategories/List";
import NotFound from "./pages/OtherPage/NotFound.tsx";
import React from "react";
import CategoriesCreatePage from "./admin/pages/Сategories/Create";
import CategoriesEditPage from "./admin/pages/Сategories/Edit";
import LoginPage from "./pages/Account/Login";
import RegistrationPage from "./pages/Account/Register";
import ProductsPage from "./pages/Products";
import AdminProductListPage from "./admin/pages/Products/List/AdminProductListPage.tsx";
import AdminProductCreatePage from "./admin/pages/Products/Create/AdminProductCreatePage.tsx";

const App: React.FC = () => {
    return (
        <>
            <Router>
                <Routes>
                    {/*<Route index element={<UserLayout>}></Route>*/}

                    <Route path="/" element={<UserLayout />}>
                        <Route index element={<UserHomePage />} />

                        <Route path={"products"} element={<ProductsPage/>}>
                            <Route index element={<ProductsPage/>} />
                        </Route>

                        <Route path="account">
                            <Route  path={"login"} element={<LoginPage/>} />
                            <Route  path={"register"} element={<RegistrationPage/>} />
                        </Route>


                    </Route>

                    <Route path={"admin"} element={<AdminLayout />}>
                        <Route path="home" element={<DashboardHome />}/>

                        <Route path="categories">
                            <Route index  element={<CategoriesListPage />} />
                            <Route  path={"create"} element={<CategoriesCreatePage/>} />
                            <Route  path={"edit/:id"} element={<CategoriesEditPage/>} />
                        </Route>

                        <Route path="products">
                            <Route index  element={<AdminProductListPage />} />
                            <Route path={"create"} element={<AdminProductCreatePage/>}/>
                        </Route>
                    </Route>



                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </>
    )
}

export default App