import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import CssBaseline from '@mui/material/CssBaseline';
import HeaderBar from './components/HeaderBar';
import INews from './interfaces/INews';
import NewsCard from './components/NewsCard';
import { AppContext, StateApp, buildSearchGet, buildTopGet, defState, getnews } from './classes/core';
import { API_URL, SEARCH, TOP } from './constants/appConstants';
import countries from './constants/countries.json'
import "./styles.css";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const PaginationBar: (pages: number, onPageChg: (p: number) => void) => React.JSX.Element = (pages, onPageChg) => {
  return (
    <Stack spacing={1}>
      <Pagination count={pages} variant="outlined" onChange={(_, page) => { onPageChg(page) }} />
    </Stack>
  );
}

const Spinner = () => <div className="loader"></div>;


export default function App() {

  {/* STATE */ }
  const [news, setNews] = React.useState<INews[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [pages, setPages] = React.useState<number>(1);
  const [state, setState] = React.useState<StateApp>(defState);

  {/* UPDATERS */ }
  React.useEffect(() => {
    topNews()
  }, []);
  React.useEffect(() => {
    state.mode === TOP && topNews()
  }, [state.pageSize, state.country, state.mode]);
  React.useEffect(() => {
    state.mode === SEARCH && state.searched != null ? searchNews(state.page) : topNews();
  }, [state.page]);
  React.useEffect(() => {
    state.mode === SEARCH && searchNews(null);
  }, [state.searched]);

  {/* FUNS */ }
  const searchNews: (p: number | null ) => void = (p) => {
    const params = state.searched;
    p != null && params != null ? params.page = p : params;
    getnews(
    `${API_URL}/${buildSearchGet(params)}`,
    (n) => setNews(n),
    l => setLoading(l),
    (p) => setPages(Math.ceil(p / state.pageSize)));
    }

  const topNews: () => void = () => getnews(
    `${API_URL}/${buildTopGet(countries[state.country].code, state.page, state.pageSize)}`,
    (n) => setNews(n),
    l => setLoading(l),
    (p) => setPages(Math.ceil(p / state.pageSize)));

  function handlerPageChange(p: number): void {
    setState({ ...state, page: p })
  }

  return (
    <AppContext.Provider value={{ ...state, setState }}>

      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Container maxWidth="md">
          {loading && <div className="pos-center">
            <Spinner />
          </div>}
          {!loading && <Box sx={{ m: 2 }}>
            <HeaderBar />
            <Box
              sx={{ maxHeight: '75vh', overflowY: 'auto' }}>
              {news.map((aNews, i) => {
                return (
                  <Box key={i} sx={{ m: 1 }}>
                    <NewsCard {...aNews} />
                  </Box>
                );
              })}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
              {PaginationBar(pages, handlerPageChange)}
            </Box>
          </Box>}
        </Container>
      </ThemeProvider>

    </AppContext.Provider>
  );
}
