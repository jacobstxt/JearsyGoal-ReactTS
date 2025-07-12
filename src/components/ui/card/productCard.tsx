import {Card, Col, Tooltip, Image} from 'antd';
import {APP_ENV} from "../../../env";
import React from "react";

interface Ingredient {
    id: number;
    name: string;
    image: string;
}

interface ProductCardProps {
    product: {
        id: number;
        name: string;
        slug: string;
        price: number;
        weight: number;
        productSize?: { name: string };
        ingredients?: Ingredient[];
        productImages?: { name: string }[];
    };
}

export const ProductCard: React.FC<ProductCardProps> = ({product}) => {
    const mainImage = product.productImages?.[0]?.name;
    const ingredients = product.ingredients || [];
    const visible = ingredients.slice(0, 2);
    const hidden = ingredients.slice(2);

    return (
        <Col xs={24} sm={12} md={8} lg={6}>
            <div className="h-full flex">
                <Card
                    hoverable
                    className="w-full flex flex-col"
                    cover={
                        mainImage ? (
                            <div className={"p-2 border-b border-gray-200"}>
                            <img
                                alt={product.name}
                                src={`${APP_ENV.IMAGES_800_URL}${mainImage}`}
                                className="h-[330px] w-full  object-cover"
                            />
                            </div>
                        ) : null
                    }
                    title={product.name}
                >
                    <div className="flex flex-col justify-between flex-1">
                        <div>
                            <p><strong>Ціна:</strong> {product.price} грн</p>
                            <p><strong>Вага:</strong> {product.weight} г</p>

                            {product.productSize && (
                                <p><strong>Розмір:</strong> {product.productSize.name}</p>
                            )}

                            {ingredients.length > 0 && (
                                <div>
                                    <strong>Інгредієнти:</strong>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {visible.map((ingredient) => (
                                            <Tooltip title={ingredient.name} key={ingredient.id}>
                                                <Image
                                                    src={`${APP_ENV.IMAGES_400_URL}${ingredient.image}`}
                                                    alt={ingredient.name}
                                                    width={40}
                                                    height={40}
                                                    className="rounded-full"
                                                    preview={false}
                                                />
                                            </Tooltip>
                                        ))}

                                        {hidden.length > 0 && (
                                            <Tooltip
                                                title={
                                                    <div className="flex flex-wrap gap-2">
                                                        {hidden.map((ingredient) => (
                                                            <Tooltip title={ingredient.name} key={ingredient.id}>
                                                                <Image
                                                                    src={`${APP_ENV.IMAGES_400_URL}${ingredient.image}`}
                                                                    alt={ingredient.name}
                                                                    width={40}
                                                                    height={40}
                                                                    className="rounded-full"
                                                                    preview={false}
                                                                />
                                                            </Tooltip>
                                                        ))}
                                                    </div>
                                                }
                                            >
                                                <div
                                                    className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-semibold cursor-pointer text-sm leading-none shrink-0 self-center"
                                                >
                                                    +{hidden.length}
                                                </div>
                                            </Tooltip>
                                        )}
                                    </div>
                                </div>
                            )}

                            <div className="flex justify-end">
                            <button
                                className=" inline-block bg-red-600 text-white font-bold px-5 py-2 rounded-full shadow-lg
                                hover:bg-red-700 transition transform hover:-translate-y-1 hover:scale-103"
                            >
                                Додати в кошик
                            </button>
                           </div>

                        </div>
                    </div>
                </Card>
            </div>
        </Col>
    );
};

export default ProductCard;