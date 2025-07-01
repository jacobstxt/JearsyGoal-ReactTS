import {Table, TableBody, TableCell, TableHeader, TableRow} from "../../../../components/ui/table";
import {APP_ENV} from "../../../../env";
import LoadingOverlay from "../../../../components/ui/loading/LoadingOverlay.tsx";
import React from "react";
import {useGetAllUsersQuery} from "../../../../services/apiAccount.ts";
import {Button, Space} from "antd";
import {CloseCircleFilled, EditOutlined} from "@ant-design/icons";

const AdminUsersListPage: React.FC = () => {
    const {data: users, isLoading} = useGetAllUsersQuery();



    const getBadgeColor = (type: string) => {
        switch (type.toLowerCase()) {
            case 'google':
                return 'bg-blue-500 text-white';
            case 'facebook':
                return 'bg-blue-700 text-white';
            case 'password':
                return 'bg-green-500 text-white';
            case 'twitter':
                return 'bg-sky-400 text-white';
            default:
                return 'bg-gray-400 text-white';
        }
    };


    return (
        <>
            {isLoading && <LoadingOverlay/>}
            <div
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
                <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                        Users
                    </h3>
                </div>

                <div className="max-w-full overflow-x-auto">
                    <Table>
                        <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
                            <TableRow>
                                <TableCell isHeader className="py-3 text-start">№</TableCell>
                                <TableCell isHeader className="py-3 text-start">Ім'я та прізвище</TableCell>
                                <TableCell isHeader className="py-3 text-start">email</TableCell>
                                <TableCell isHeader className="py-3 text-start">Фото</TableCell>
                                <TableCell isHeader className="py-3 text-start">Інформація про вхід</TableCell>
                                <TableCell isHeader className="py-3 text-start">Дії</TableCell>
                            </TableRow>
                        </TableHeader>

                        <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {
                                users?.map((user) => {
                                        const image = user.image;
                                        return (
                                            <TableRow key={user.id}>

                                                <TableCell className="py-3 font-medium text-gray-800 dark:text-white/90">
                                                    {user.id}
                                                </TableCell>

                                                <TableCell className="py-3 font-medium text-gray-800 dark:text-white/90">
                                                    {user.firstName} {user.lastName}
                                                </TableCell>

                                                <TableCell className="py-3 text-gray-600 dark:text-gray-300">
                                                    {user.email}
                                                </TableCell>


                                                <TableCell className="py-3">
                                                    <div className="h-[80px] w-[80px] overflow-hidden rounded-md">
                                                        {image ? (
                                                            <img
                                                                src={`${APP_ENV.IMAGES_400_URL}${image}`}
                                                                alt={user.firstName}
                                                                className="h-full w-full object-cover"
                                                            />
                                                        ) : (
                                                            <div
                                                                className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                                                                No image
                                                            </div>
                                                        )}
                                                    </div>
                                                </TableCell>

                                                <TableCell className="py-3 text-gray-600 dark:text-gray-300 flex gap-2 flex-wrap">
                                                    {user.loginTypes.map((type, index) => (
                                                        <span
                                                            key={index}
                                                            className={`text-xs font-semibold px-2 py-1 rounded-full ${getBadgeColor(type)}`}
                                                        >
                                                        {type}
                                                        </span>
                                                    ))}
                                                </TableCell>



                                                <TableCell className="py-3">
                                                    <Space size="middle">
                                                        {/*<Link to={`edit/${category.id}`}>*/}
                                                            <Button icon={<EditOutlined />} />
                                                        {/*</Link>*/}
                                                        {<Button danger icon={<CloseCircleFilled />}  />}
                                                    </Space>
                                                </TableCell>



                                                {/*<TableCell className="py-3 text-gray-500 dark:text-gray-400">*/}
                                                {/*    <div className="flex space-x-4">*/}
                                                {/*        <Link*/}
                                                {/*            to={`edit/${product.id}`}*/}
                                                {/*            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"*/}
                                                {/*        >*/}
                                                {/*            <EditOutlined className="mr-1"/>*/}
                                                {/*            <span className="font-medium underline">Edit</span>*/}
                                                {/*        </Link>*/}

                                                {/*        <div*/}
                                                {/*            className="flex items-center cursor-pointer text-red-600 hover:text-red-800 transition-colors duration-200">*/}
                                                {/*            <DeleteOutlined className="mr-1"/>*/}
                                                {/*            <span className="font-medium underline">Remove</span>*/}
                                                {/*        </div>*/}
                                                {/*    </div>*/}
                                                {/*</TableCell>*/}

                                            </TableRow>
                                        );
                                    }
                                )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    );
};


export default AdminUsersListPage;