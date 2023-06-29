import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import INews from '../interfaces/INews';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';

const NewsCard: React.FC<INews> = ({ title, description, date, imageUrl, source }): React.ReactElement => {
  const screenDate: string = date != null && date != undefined ? dayjs(date).toDate().toLocaleDateString('es-AR') : '';
  
  return (
    <Card sx={{display: 'flex', flexGrow: '1', flexDirection: 'row' }}>
      <CardMedia sx={{ width: '30%', alignContent: 'center', p: 1  }}>
        <img src={imageUrl} style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '5%'}}></img>
      </CardMedia>
      <Box sx={{ width: '70%'}}>
        <CardContent sx={{height: '80%'}}>
          <Typography gutterBottom variant='h5' component='div'>
            {title}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {description}
          </Typography>
        </CardContent>
        <CardActions sx={{height: '20%', flexDirection: 'row', justifyContent: 'space-between'}}>
          <Typography variant='caption' color='text.secondary'>
            {screenDate}
          </Typography>
          <Button size='small' href={source}>Ver Mas</Button>
        </CardActions>
      </Box>
    </Card>
  );
};

export default NewsCard;
