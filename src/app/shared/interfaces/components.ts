export interface CopmponentsRequest {
    titel: string;
    link: string;
    images: string;

}

export interface ComponentsResponse extends CopmponentsRequest {
    id: number;
}