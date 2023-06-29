import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import CssBaseline from '@mui/material/CssBaseline';
import HeaderBar from './components/HeaderBar';
import INews from './interfaces/INews';
import newsMock from './mocks/newsMock';
import NewsCard from './components/NewsCard';
import "./styles.css";
import INewsResponse from './interfaces/INewsResponse';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const mock: INews = newsMock;

const PaginationBar: (pages: number, onPageChg: (p: number) => void) => React.JSX.Element = (pages, onPageChg) => {
  return (
    <Stack spacing={1}>
      <Pagination count={pages} variant="outlined" onChange={(_, page) => { onPageChg(page) }} />
    </Stack>
  );
}

const Spinner = () => <div className="loader"></div>;

const getnews: (url: string, handleLoading: (load: boolean) => void) => Promise<void> = async (url, handleLoading) => {
  handleLoading(true);
  try {
    const response: Response = await fetch(url);
    const news = await response.json();
    const castedNews: INewsResponse = news as INewsResponse;
    handleLoading(false);
  }
  catch (e) {
    console.log(e);
    handleLoading(false);
  }
}

export default function App() {
  const [loading, setLoading] = React.useState(false);

  return (
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
            {[...Array(10)].map((_, i) => {
              return (
                <Box key={i} sx={{ m: 1 }}>
                  <NewsCard {...newsMock} />
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
  );
}
