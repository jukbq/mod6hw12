import { LoginResponse } from "./accoumt";
import { ComponentsResponse } from "./components";


export interface GoodsRequest {
    component: ComponentsResponse;
    link: ComponentsResponse;
    titel: ComponentsResponse;
    name: string;
    compound: string;
    weight: string;
    price: number;
    images: string;
    count: number;

}

export interface GoodsResponse extends GoodsRequest {
    id: number;
}