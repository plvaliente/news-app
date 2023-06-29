import React, { Dispatch, SetStateAction } from "react";
import INews from "../interfaces/INews";
import INewsResponse from "../interfaces/INewsResponse";
import dayjs, { Dayjs } from "dayjs";
import { TOP } from "../constants/appConstants";

export type StateApp = {
    page: number;
    country: number;
    mode: string;
    from: Dayjs | null;
    to: Dayjs | null;
    pageSize: number;
    keywords: string;
    setState: Dispatch<SetStateAction<StateApp>>;
}

export const defState: StateApp = {
    page: 1,
    country: 0,
    mode: TOP,
    from: dayjs().add(-1, 'day'),
    to: dayjs(),
    pageSize: 10,
    keywords: '', 
    setState: (): void => {
        throw new Error('must be overridden');
      },
};

export const AppContext = React.createContext(defState);

export const getnews: (url: string, handleNews: (news: INews[]) => void, handleLoading: (load: boolean) => void) => Promise<void> = async (url, handleNews, handleLoading) => {
    handleLoading(true);
    try {
        const response: Response = await fetch(url);
        const news = await response.json();
        const castedNews: INewsResponse = news as INewsResponse;
        if (castedNews.success) {
            handleNews(castedNews.data);
        }
        else {
            console.log(castedNews.error);
        }
        handleLoading(false);
    }
    catch (e) {
        console.log(e);
        handleLoading(false);
    }
}

export const buildSearchGet: (keywords: string) => string = (keywords) => {
    let words: string[] = keywords.split(',');
    words = words
        .map(w => w.trim())
        .filter(w => w.length > 0);

    return words.reduce((p, c, i) => (i === 1 ? `keywords=${p}` : p) + `&keywords=${c}`);
}

export const buildTopGet: () => string = () => {
    return 'news/top-headlines?country=AR&page=2&pageSize=5';
}