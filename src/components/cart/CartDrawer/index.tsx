import {Badge, Button, Drawer, List, Space, Image, Typography, Divider} from "antd";
import {useAppSelector} from "../../../store";
import React, {useState} from "react";
import {type ICartItem} from "../../../store/localCartSlice.ts";
import {APP_ENV} from "../../../env";
import {useCart} from "../../../hooks/useCart.ts";
import {ShoppingCart} from "lucide-react";
import OrderForm from "../OrderForm";

const {Text} = Typography;

const CartDrawer: React.FC = () => {
    const [open, setOpen] = useState(false);
    const {user} = useAppSelector(state => state.auth);

    const {cart, addToCart, removeFromCart} = useCart(user != null);

    return (
        <>
            <Badge count={cart?.reduce(function (acc:number, obj: ICartItem) {
                return acc + obj.quantity!;
            }, 0)} showZero>
                <ShoppingCart onClick={() => setOpen(true)}
                              className="cursor-pointer w-7 h-7 text-gray-700 hover:text-gray-800 transform transition-transform duration-200 hover:scale-110" />
            </Badge>

            <Drawer
                title="Ваш кошик"
                onClose={() => setOpen(false)}
                open={open}
                width={400}
            >

                <List
                    dataSource={cart}
                    locale={{emptyText: "Кошик порожній"}}
                    renderItem={(item: ICartItem) => (
                        <List.Item
                            actions={[
                                <Button
                                    danger
                                    onClick={() => removeFromCart(item.productId!)}
                                >
                                    Видалити
                                </Button>
                            ]}
                        >
                            <Space align="start">
                                <Image
                                    src={`${APP_ENV.IMAGES_200_URL}${item.imageName}`}
                                    width={64}
                                    height={64}
                                    preview={false}
                                />
                                <div>
                                    <Text strong>
                                        {item.name}
                                    </Text>
                                    <br/>
                                    <Text type="secondary">{item.categoryName}</Text>
                                    <br/>
                                    <div style={{display: "flex", alignItems: "center", gap: 8, margin: "8px 0"}}>
                                        <Button
                                            size="small"
                                            onClick={() =>
                                                item.quantity! > 1 && addToCart({...item, quantity: -1})
                                            }
                                        >
                                            -
                                        </Button>
                                        <Text>{item.quantity}</Text>
                                        <Button
                                            size="small"
                                            onClick={() =>
                                                addToCart({...item, quantity: 1})
                                            }
                                        >
                                            +
                                        </Button>
                                    </div>
                                    <Text>Ціна: {item.price} ₴</Text>
                                </div>
                            </Space>
                        </List.Item>
                    )}
                />

                <Divider/>

                <OrderForm/>
            </Drawer>
        </>
    );
};

export default CartDrawer;
