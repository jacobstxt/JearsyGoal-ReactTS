import {useDeleteCategoryByIdMutation, useGetAllCategoriesQuery} from "../../services/apiCategory.ts";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../../components/ui/table";
import {APP_ENV} from "../../env";
import {CloseCircleFilled, EditOutlined} from '@ant-design/icons';
import {useNavigate} from "react-router";
import React, { useRef } from "react";
import DeleteConfirmModal, {type DeleteConfirmModalRef} from "../../components/common/DeleteConfirmModal.tsx";
import {Button} from "antd";

const CategoriesListPage: React.FC = () => {
    const navigate = useNavigate();
    const { data: categories, isLoading, isError } = useGetAllCategoriesQuery();
    const [deleteCategory, { isLoading: isDeleting }] = useDeleteCategoryByIdMutation();
    const modalRef = useRef<DeleteConfirmModalRef>(null);


    if (isLoading) return <p>Loading...</p>;
    if (isError || !categories) return <p>Something went wrong.</p>;




    // @ts-ignore
    function handleEdit(id) {
        navigate("edit/"+ id);
    }

    const handleDelete = async (id: number) => {
        await deleteCategory(id);
    };


    return (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
            <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                    Categories
                </h3>
                <div className="flex items-center gap-3">
                    <button className="btn">Filter</button>
                    <button className="btn">See all</button>
                </div>
            </div>

            <div className="max-w-full overflow-x-auto">
                <Table>
                    <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
                        <TableRow>
                            <TableCell isHeader className="py-3 text-start">Category</TableCell>
                            <TableCell isHeader className="py-3 text-start">Slug</TableCell>
                            <TableCell isHeader className="py-3 text-start">Image</TableCell>
                            <TableCell isHeader className="py-3 text-start">Action</TableCell>
                        </TableRow>
                    </TableHeader>

                    <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {categories.map((category) => (
                            <TableRow key={category.id}>
                                <TableCell className="py-3 font-medium text-gray-800 dark:text-white/90">
                                    {category.name}
                                </TableCell>

                                <TableCell className="py-3 text-gray-500 dark:text-gray-400">
                                    {category.slug}
                                </TableCell>

                                <TableCell className="py-3">
                                    <div className="h-[80px] w-[80px] overflow-hidden rounded-md">
                                        <img
                                            src={`${APP_ENV.IMAGES_400_URL}${category.image}`}
                                            alt={category.name}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                </TableCell>

                                <TableCell className="py-3">
                                    <Button
                                        onClick={() => handleEdit(category.id)}
                                        className="mr-3"
                                        aria-label={`Edit ${category.name}`}>
                                        <EditOutlined/>
                                    </Button>

                                    <Button danger icon={<CloseCircleFilled />} onClick={() => modalRef.current?.open(category.id)} />
                                </TableCell>
                                
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <DeleteConfirmModal ref={modalRef} onDelete={handleDelete} loading={isDeleting} />
        </div>
    );
}

export default CategoriesListPage;