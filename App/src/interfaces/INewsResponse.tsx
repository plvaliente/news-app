import INews from "./INews";

export default interface INewsResponse {
    data: INews[];
    matchingNews: number;
    success: boolean;
    error: string;
}