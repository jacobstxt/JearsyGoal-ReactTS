import {useNavigate} from "react-router";
import {Form, type FormProps, Input, message} from "antd";
import type {IRegister, ServerError} from "../../../services/types.ts";
import {useFormServerErrors} from "../../../utilities/useFormServerErrors.ts";
import LoadingOverlay from "../../../components/ui/loading/LoadingOverlay.tsx";
import ImageUploadFormItem from "../../../components/ui/form/ImageUploadFormItem.tsx";
import {loginSuccess} from "../../../store/authSlice.ts";
import {useDispatch} from "react-redux";
import {useRegisterMutation} from "../../../services/apiAccount.ts";
import React from "react";

const RegistrationPage: React.FC = () => {

    const navigate = useNavigate();

    const [register, {isLoading}] = useRegisterMutation();

    const [form] = Form.useForm<IRegister>();
    const setServerErrors = useFormServerErrors(form);

    const dispatch = useDispatch();

    const onFinish: FormProps<IRegister>['onFinish'] = async (values) => {
        try {
            const result = await register(values).unwrap();
            dispatch(loginSuccess(result.token));
            navigate('/');
        } catch (error) {
            const serverError = error as ServerError;

            if (serverError?.status === 400 && serverError?.data?.errors) {
                setServerErrors(serverError.data.errors);
            } else {
                message.error("Сталася помилка при створенні акаунта");
            }
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center mt-7 px-4">
            <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-800 animate-fade-in">
                {isLoading && <LoadingOverlay />}

                <h2 className="text-2xl font-semibold mb-6 text-center">Реєстрація</h2>

                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    className="space-y-4"
                >
                    <Form.Item<IRegister>
                        label={<span className="text-gray-700 dark:text-white font-medium">Email</span>}
                        name="Email"
                        rules={[{ required: true, message: 'Вкажіть email' }]}
                    >
                        <Input
                            className="rounded-lg py-2 px-4 border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-orange-400 transition"
                        />
                    </Form.Item>

                    <div className="flex gap-4">

                    <Form.Item<IRegister>
                        label={<span className="text-gray-700 dark:text-white font-medium">Ім'я</span>}
                        name="Name"
                        rules={[{ required: true, message: 'Вкажіть email' }]}
                    >
                        <Input
                            className="rounded-lg py-2 px-4 border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-orange-400 transition"
                        />
                    </Form.Item>

                    <Form.Item<IRegister>
                        label={<span className="text-gray-700 dark:text-white font-medium">Прізвище</span>}
                        name="Surname"
                        rules={[{ required: true, message: 'Вкажіть email' }]}
                    >
                        <Input
                            className="rounded-lg py-2 px-4 border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-orange-400 transition"
                        />
                    </Form.Item>

                    </div>

                    <div className="flex gap-4">

                    <Form.Item<IRegister>
                        label={<span className="text-gray-700 dark:text-white font-medium">Пароль</span>}
                        name="Password"
                        rules={[{ required: true, message: 'Вкажіть пароль' }]}
                    >
                        <Input.Password
                            className="rounded-lg py-2 px-4 border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-orange-400 transition"
                        />
                    </Form.Item>


                    <Form.Item<IRegister>
                        label={<span className="text-gray-700 dark:text-white font-medium">Підтвердіть пароль</span>}
                        name="ConfirmPassword"
                        rules={[{ required: true, message: 'Вкажіть пароль' }]}
                    >
                        <Input.Password
                            className="rounded-lg py-2 px-4 border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-orange-400 transition"
                        />
                    </Form.Item>

                    </div>

                    <ImageUploadFormItem name="Avatar" label="Фото" />


                    <button
                        type="submit"
                        className="bg-red-500 hover:bg-red-700 transition
                        text-white font-semibold px-4 py-2 rounded w-full mt-4">
                        {isLoading ? 'Logging in...' : 'Зареєструватися'}
                    </button>


                </Form>
            </div>
        </div>

    );
}

export default RegistrationPage;