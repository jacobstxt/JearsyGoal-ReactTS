import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface ICartItem {
    id?: number;
    productId?: number;
    categoryId?: number;
    name?: string;
    categoryName?: string;
    quantity?: number;
    price?: number;
    sizeName?: string;
    imageName?: string;
}

export  interface ICartState {
    items: ICartItem[];
    totalPrice: number;
}


const initialState: ICartState = JSON.parse(localStorage.getItem('cart') || 'null') || {
    items: [],
    totalPrice: 0,
};



const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        createUpdateCartLocal: (state, action: PayloadAction<ICartItem>) => {
            const newItem = action.payload;

            if (!state.items) {
                state.items = [];
            }
            const index = state.items!.findIndex(cartItem => cartItem.productId === newItem.productId);
            if (index >= 0) {
                state.items[index].quantity! = newItem.quantity!;

                if (state.items[index].quantity! <= 0) {
                    state.items.splice(index, 1);
                }
            } else {
                state.items.push(newItem);
            }
            localStorage.setItem('cart', JSON.stringify(state));
        },

        // removeCartItemLocal: (state, action: PayloadAction<IRemoveCartItem>) => {
        //     const removeCart = action.payload;
        //
        //     state.localCart.items = state.localCart.items.filter(el  => el.productId != removeCart.id);
        //     localStorage.setItem('cart', JSON.stringify(state.localCart));
        // },
        //
        // clearLocalCartLocal: (state) => {
        //     state.localCart.items = [];
        //     localStorage.removeItem('cart');
        // },
    },
});

export const { createUpdateCartLocal } = cartSlice.actions;


export default cartSlice.reducer;
