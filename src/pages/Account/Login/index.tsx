import { useNavigate } from 'react-router-dom';
import { Form, type FormProps, Input } from 'antd';
import {type ILoginRequest, useLoginMutation} from "../../../services/apiAccount.ts";
import {getUserFromToken,loginSuccess} from "../../../store/authSlice.ts";
import {useAppDispatch} from "../../../store";
import React from "react";
import { useGoogleLogin } from '@react-oauth/google';


const LoginPage: React.FC = () => {
    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onFinish: FormProps<ILoginRequest>["onFinish"] = async (values) => {
        try {
            const response = await login(values).unwrap();
            const { token } = response;
            dispatch(loginSuccess(token));

            const user = getUserFromToken(token);
            console.log("user", user);
            if (!user || !user.roles.includes("Admin")) {
                navigate('/');
            }
            else {
                navigate('/admin/home');
            }

        } catch (err) {
            console.log("error", err);
            alert("Login failed");
        }
    };


    const loginUseGoogle = useGoogleLogin({
        onSuccess: tokenResponse => console.log(tokenResponse),
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-6 text-center">Вхід</h2>
                <Form<ILoginRequest>
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <Form.Item<ILoginRequest>
                        name="email"
                        label="Email"
                        rules={[{ required: true, message: "Enter your email" }]}
                    >
                        <Input type="email" placeholder="you@example.com" />
                    </Form.Item>

                    <Form.Item<ILoginRequest>
                        name="password"
                        label="Password"
                        rules={[{ required: true, message: "Enter your password" }]}
                    >
                        <Input.Password placeholder="••••••••" />
                    </Form.Item>

                    <button
                        type="submit"
                        className="bg-orange-500 hover:bg-orange-600 transition text-white font-semibold px-4 py-2 rounded w-full mt-4"
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>


                    <button
                        onClick={(event) => {
                            event.preventDefault();
                            loginUseGoogle();
                        }}
                        className="flex items-center justify-center gap-2 bg-white
                         text-gray-700 border border-gray-300 hover:shadow-md
                         transition px-4 py-2 rounded w-full mt-4 font-medium"
                    >
                        <img
                            src="https://www.svgrepo.com/show/475656/google-color.svg"
                            alt="Google"
                            className="w-5 h-5"
                        />
                        Увійти через Google
                    </button>



                </Form>
            </div>
        </div>
    );
};

export default LoginPage;
