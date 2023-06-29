export default interface INews {
    title: string;
    description: string;
    content: string;
    author: string;
    date: Date | null;
    source: string;
    imageUrl: string;
}