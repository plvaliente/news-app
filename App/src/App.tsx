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

const API_URL: string = 'http://localhost:5000/api';

const PaginationBar: (pages: number, onPageChg: (p: number) => void) => React.JSX.Element = (pages, onPageChg) => {
  return (
    <Stack spacing={1}>
      <Pagination count={pages} variant="outlined" onChange={(_, page) => { onPageChg(page) }} />
    </Stack>
  );
}

const Spinner = () => <div className="loader"></div>;

const buildSearchGet: (keywords: string ) => string = (keywords) => {
  let words: string[] = keywords.split(',');
  words = words
    .map(w => w.trim())
    .filter(w => w.length > 0);
  
    return words.reduce( (p, c, i) => (i === 1 ? `keywords=${p}` : p) + `&keywords=${c}`);
  }

  const buildTopGet: () => string = () => {
      return 'news/top-headlines?country=AR&page=2&pageSize=5';
    }
  
const getnews: (url: string, handleNews: (news: INews[]) => void, handleLoading: (load: boolean) => void) => Promise<void> = async (url, handleNews,handleLoading) => {
  handleLoading(true);
  try {
    const response: Response = await fetch(url);
    const news = await response.json();
    const castedNews: INewsResponse = news as INewsResponse;
    if(castedNews.success){
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

export default function App() {

  const [news, setNews] = React.useState<INews[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  
  React.useEffect(() => {
    getnews(`${API_URL}/${buildTopGet()}`, (n)=> setNews(n), l => setLoading(l));
  }, []);

  console.log(buildSearchGet('adasd ,asdasda,adad,sasa,'))
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
  );
}
