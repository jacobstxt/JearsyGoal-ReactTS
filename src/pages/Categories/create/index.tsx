import {Button, Form, type FormProps, Input, Upload} from "antd";
import type {ICategoryCreate} from "../../../services/types.ts";
import { PlusOutlined } from '@ant-design/icons';
import { useCreateCategoryMutation } from "../../../services/apiCategory.ts";
import Swal from 'sweetalert2';
import React from "react";

const CategoriesCreatePage: React.FC = () => {
    const [createCategory] = useCreateCategoryMutation();


    const onFinish: FormProps<ICategoryCreate>['onFinish'] = (values) => {
        console.log('Submit Form:', values);
        createCategory(values)
            .unwrap()
            .then(async () => {
                await Swal.fire({
                    icon: 'success',
                    title: 'Успіх',
                    text: 'Категорію успішно створено!',
                    timer: 2000,
                    showConfirmButton: false,
                });
                console.log('Категорія створена');
            })
            .catch(async (error) => {
                await Swal.fire({
                    icon: 'error',
                    title: 'Помилка',
                    text: 'Не вдалося створити категорію. Перевірте введені дані.',
                });
                console.error('Помилка створення:', error);
            });
    };

    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    return (
      <>
        <div
            className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
            <div className="max-w-full overflow-x-auto">
                <h1 className="text-2xl font-bold mb-6 text-center">Додати категорію</h1>

                <Form labelCol={{span: 7}}
                wrapperCol={{span: 10}}
                onFinish={onFinish}
                layout="horizontal">

                    <Form.Item<ICategoryCreate>
                        label="Назва"
                        name="name"
                        rules={[{ required: true, message: "Вкажіть назву категорії" }]}>
                        <Input placeholder="Введіть назву категорії" />
                    </Form.Item>

                <Form.Item<ICategoryCreate>
                    label="Слаг"
                    name="slug"
                    rules={[{required: true, message: 'Вкажіть слаг категорії'}]}>
                    <Input placeholder="Введіть слаг категорії"/>
                </Form.Item>


                <Form.Item<ICategoryCreate> label="Фото" name="image" valuePropName="fileList" getValueFromEvent={normFile}>
                    <Upload listType="picture-card"
                            beforeUpload={() => false}>
                        <button
                            style={{ color: 'inherit', cursor: 'inherit', border: 0, background: 'none' }}
                            type="button">
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Додати Фото</div>
                        </button>
                    </Upload>
                </Form.Item>

                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                        Додати
                    </Button>
                </Form.Item>
            </Form>
            </div>
        </div>
      </>
    );
}

export default CategoriesCreatePage;