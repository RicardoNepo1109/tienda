export interface producto{

    id:number;
    title:string;
    price:number;
    description:string;
    category:string;
    imageUrl:string;
    rating: {
    rate: 3.9,
    count: 120
    };
}

//Extraccion de las propiedades necesarias para crear un producto
export type ProductInput = Pick<producto,'title' | 'price'|'description'|'category'|'imageUrl'>