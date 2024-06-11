export interface IData {
    id: number,
    attributes: {
        name: string,
        alternativeText: string | null,
        caption: string | null,
        width: number,
        height: number,
        formats: {
            thumbnail: {
                name: string,
                hash: string,
                ext: string,
                mime: string,
                path: string | null,
                width: number,
                height: number,
                size: number,
                sizeInBytes: number,
                url: string | null,
            },
        },
        hash: string,
        ext: string
        mime: string
        size: 2.75,
        url: string,
        previewUrl: string | null,
        provider: string
        provider_metadata: string | null,
        createdAt: Date,
        updatedAt: Date,
    }
}

export interface IFooterList {
    title: string,
    list:
    {
        title: string,
        url: string
    }[]
}

export interface UpdateUserData {
    password: string,
    currentPassword: string,
    passwordConfirmation: string
}

export interface PostUser {
    agreement: boolean,
    birth: Date,
    confirm: string,
    email: string,
    name: string,
    password: string,
    phone: string,
    prefix: string,
    surname: string,
}

export interface AuthUser {
    identifier: string,
    password: string,
}

export interface IUser {
    id?: number,
    username: string,
    surname: string,
    email: string,
    provider?: string,
    confirmed?: boolean,
    blocked?: boolean,
    createdAt?: Date,
    updatedAt?: Date,
    phoneNumber: string,
    birth: string
}

export interface IUserData {
    jwt: string,
    user: IUser
}


export interface ICategory {
    id: number,
    attributes: {
        title: string,
        url: string,
        createdAt: string,
        updatedAt: string,
        publishedAt: string,
        population: boolean,
        products: {
            data: IProduct[]
        },
        categoryImage: {
            data: {
                id: number,
                attributes: {
                    name: string,
                    alternativeText: string | null,
                    caption: string | null,
                    width: number,
                    height: number,
                    formats: {
                        thumbnail: {
                            name: string,
                            hash: string,
                            ext: string,
                            mime: string,
                            path: string | null,
                            width: number,
                            height: number,
                            size: number,
                            sizeInBytes: number,
                            url: string | null,
                        },
                        small: {
                            name: string,
                            hash: string,
                            ext: string,
                            mime: string,
                            path: string | null,
                            width: number,
                            height: number,
                            size: number,
                            sizeInBytes: number,
                            url: string | null,
                        },
                    },
                    hash: string,
                    ext: string
                    mime: string
                    size: 2.75,
                    url: string,
                    previewUrl: string | null,
                    provider: string
                    provider_metadata: string | null,
                    createdAt: Date,
                    updatedAt: Date,
                }
            }
        },
    }
}



export interface ISlider {
    id: number,
    attributes: {
        url: string,
        createdAt: Date,
        updatedAt: Date,
        publishedAt: Date,
        banner: {
            data: {
                id: number,
                attributes: {
                    name: string,
                    alternativeText: string | null,
                    caption: string | null,
                    width: number,
                    height: number,
                    formats: {
                        thumbnail: {
                            name: string,
                            hash: string,
                            ext: string,
                            mime: string,
                            path: string | null,
                            width: number,
                            height: number,
                            size: number,
                            sizeInBytes: number,
                            url: string | null,
                        },
                        small: {
                            name: string,
                            hash: string,
                            ext: string,
                            mime: string,
                            path: string | null,
                            width: number,
                            height: number,
                            size: number,
                            sizeInBytes: number,
                            url: string | null,
                        },
                        medium: {
                            name: string,
                            hash: string,
                            ext: string,
                            mime: string,
                            path: string | null,
                            width: number,
                            height: number,
                            size: number,
                            sizeInBytes: number,
                            url: string | null,
                        },
                        large: {
                            name: string,
                            hash: string,
                            ext: string,
                            mime: string,
                            path: string | null,
                            width: number,
                            height: number,
                            size: number,
                            sizeInBytes: number,
                            url: string | null,
                        },
                    },
                    hash: string,
                    ext: string
                    mime: string
                    size: 2.75,
                    url: string,
                    previewUrl: string | null,
                    provider: string
                    provider_metadata: string | null,
                    createdAt: Date,
                    updatedAt: Date,
                }
            }[]
        }
    },
}

export interface IProductCardProps {
    imageUrl: string;
    title: string;
    price: string;
    id: number;
    countProduct: number;
}

export interface IProduct {
    id: number,
    attributes: {
        name: string,
        description: string,
        createdAt: Date,
        updatedAt: Date,
        publishedAt: Date,
        newProduct: boolean,
        price: string,
        gallery: {
            data: IData[]
        },
        avatar: {
            data: IData[]
        },
        category: {
            data: IData[]
        }

    },
}[]

export interface IStrapi<T> {
    data: [T];
    meta: {
        pagination: {
            page: number,
            pageSize: number,
            pageCount: number,
            total: number,
        }
    }
}


export interface IOrders {
    id: 1,
    attributes: {
        createdAt: string,
        updatedAt: string,
        publishedAt: string,
        products: IProductCardProps[],
        totalPrice: string,
        users_permissions_user: {
            data: null | IUser
        }
    }
}

export interface PostOrder {
    data: {
        products: IProductCardProps[]
        users_permissions_user: string | null,
        totalPrice: string
    }
}