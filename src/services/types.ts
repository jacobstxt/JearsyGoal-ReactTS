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




