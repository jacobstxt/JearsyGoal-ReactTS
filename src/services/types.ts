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


