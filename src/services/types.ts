export interface ICategoryItem {
    id: string;
    name: string;
    slug: string;
    image: string;
}

export interface ICategoryCreate {
    name: string;
    slug: string;
    image: string;
}

export interface ICategoryEdit {
    id: number;
    name: string;
    slug: string;
    image: string;
}

export interface ICategoryDelete {
    id: number;
}

export interface ServerError {
    status: number;
    data: {
        errors: Record<string, string[]>;
    };
}

export interface IRegister
{
    Name: string;
    Surname: string;
    Email: string;
    Password: string;
    ConfirmPassword: string;
    Avatar: string;
}


export interface CategoryItemModel {
    id: number;
    name: string;
    slug: string;
    image: string;
}

export interface ProductSizeModel {
    id: number;
    name: string;
}

export interface ProductIngredientModel {
    id: number;
    name: string;
    image: string;
}

export interface ProductImageModel {
    id: number;
    name: string;
    priority: number;
}

export interface ProductItemModel {
    id: number;
    name: string;
    slug: string;
    price: number;
    weight: number;
    category?: CategoryItemModel;
    productSize?: ProductSizeModel;
    productIngredients?: ProductIngredientModel[];
    productImages?: ProductImageModel[];
}

export interface IProductCreate {
    name: string;
    slug: string;
    price: number;
    weight: number;
    categoryId: number;
    productSizeId: number;
    ingredientIds?: number[];
    imageFiles?: File[];
}




