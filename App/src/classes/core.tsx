import React, { Dispatch, SetStateAction } from "react";
import INews from "../interfaces/INews";
import INewsResponse from "../interfaces/INewsResponse";
import dayjs, { Dayjs } from "dayjs";
import { TOP } from "../constants/appConstants";

export type SearchedState = {
    page: number;
    from: Dayjs | null;
    to: Dayjs | null;
    pageSize: number;
    keywords: string;
} | null;

export type StateApp = {
    page: number;
    country: number;
    mode: string;
    from: Dayjs | null;
    to: Dayjs | null;
    pageSize: number;
    keywords: string;
    searched: SearchedState
    setState: Dispatch<SetStateAction<StateApp>>;
};

export const defState: StateApp = {
    page: 1,
    country: 0,
    mode: TOP,
    from: dayjs().add(-1, 'day'),
    to: dayjs(),
    pageSize: 10,
    keywords: '', 
    searched: null, 
    setState: (): void => {
        throw new Error('must be overridden');
      },
};

export const AppContext = React.createContext(defState);

export const dateToStr: (date: Dayjs | null) => string = (date) => {
    if (date == null && date == undefined) return '';
    const cstDate = date.toDate()
    return date.toDate().toISOString();
}
export const screenDate: (date: string | null) => string = (date) => {
    return date !== null && date !== undefined ? dayjs(date).toDate().toLocaleDateString('es-AR') : '';
}

export const getnews: (
    url: string, 
    handleNews: (news: INews[]) => void, 
    handleLoading: (load: boolean) => void,
    handlePages: (p: number) => void)
    => Promise<void> = async (url, handleNews, handleLoading, handlePages) => {
    handleLoading(true);
    try {
        const response: Response = await fetch(url);
        const news = await response.json();
        const castedNews: INewsResponse = news as INewsResponse;
        if (castedNews.success) {
            handleNews(castedNews.data);
            handlePages(castedNews.matchingNews);
        }
        else {
            handleNews([]);
            handlePages(1);
            console.log(castedNews.error);
        }
        handleLoading(false);
    }
    catch (e) {
        console.log(e);
        handleLoading(false);
    }
}

export const buildSearchGet: (search: SearchedState) => string | null = (search) => {
    if(search === null) return null;
    const {keywords, from, to, pageSize, page } = search;
    if (keywords ===null || keywords.trim().length === 0) return null;

    let words: string[] = keywords.split(',');
    words = words
        .map(w => w.trim())
        .filter(w => w.length > 0);
    const keyParams: string = words.reduce((p, c, i) => p + `&keywords=${c}`);
    const dFr: string = dateToStr(from);
    const dTo: string = dateToStr(to);

    return `news/search?dateFrom=${dFr}&dateTo=${dTo}&page=${page}&pageSize=${pageSize}&keywords=${keyParams}`;
}

export const buildTopGet: (ctry: string, pg: number, sz: number) => string = (ctry, pg, sz) => {
    return `news/top-headlines?country=${ctry}&page=${pg}&pageSize=${sz}`;
}