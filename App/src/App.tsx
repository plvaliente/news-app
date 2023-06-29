import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import CssBaseline from '@mui/material/CssBaseline';
import dayjs from 'dayjs';

import HeaderBar from './components/HeaderBar';
import INews from './interfaces/INews';
import NewsCard from './components/NewsCard';
import { AppContext, StateApp, buildTopGet, defState, getnews } from './classes/core';
import { API_URL, TOP } from './constants/appConstants';
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

  const [news, setNews] = React.useState<INews[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [state, setState] = React.useState<StateApp>(defState);
  React.useEffect(() => {
    getnews(`${API_URL}/${buildTopGet()}`, (n)=> setNews(n), l => setLoading(l));
  }, []);

  return (
    <AppContext.Provider value={{...state, setState}}>

    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="md">
        {loading && <div className="pos-center">
          <Spinner />
        </div>}
        {!loading && <Box sx={{ m: 2 }}>
          <HeaderBar searchCallback={(a, b, c) => { }} />
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
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1}}>
            {PaginationBar(1, (_) => { })}
          </Box>
        </Box>}
      </Container>
    </ThemeProvider>
        
    </AppContext.Provider>
  );
}
