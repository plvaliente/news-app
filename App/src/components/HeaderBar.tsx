import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import SearchIcon from '@mui/icons-material/Search';
import 'dayjs/locale/es';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import countries from '../constants/countries.json'
import { SEARCH, TOP } from '../constants/appConstants';
import { AppContext } from '../classes/core';

const HeaderBar: React.FC<{}> = (): React.ReactElement => {
  const state = React.useContext(AppContext);
  const {keywords, from, to, mode, country, pageSize, page, setState } = state;


  const PageSize: () => React.JSX.Element = () => {
    return (
      <FormControl sx={{ gridArea: 'pageSize' }}>
        <InputLabel id="demo-simple-select-label">Noticias</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={pageSize}
          label="Noticias"
          onChange={(e) => setState({...state, pageSize: e.target.value as number})}
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
        </Select>
      </FormControl>
    );
  }

  const ModeSelector: () => React.JSX.Element = () => {
    return (
      <Box sx={{ gridArea: 'toggle', display: 'flex', justifyContent: 'center' }}>
        <ToggleButtonGroup
          value={mode}
          exclusive
          onChange={(_, val) => setState({...state, mode: val})}
          aria-label='Modo'
        >
          <ToggleButton value={TOP}>Top</ToggleButton>
          <ToggleButton value={SEARCH}>Buscar</ToggleButton>
        </ToggleButtonGroup>
      </Box>
    );
  }

  const Countries: () => React.JSX.Element = () => {
    return (
      <FormControl sx={{ gridArea: 'country' }}>
        <InputLabel id="demo-simple-select-label">Pais</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={country}
          label="Pais"
          onChange={(e) => setState({...state, country: e.target.value as number})}
        >
          {countries.map((_, idx) => {
            return (<MenuItem key={idx} value={idx}>{countries[idx].name}</MenuItem>);
          })}

        </Select>
      </FormControl>
    );
  }

  const DateRange: () => React.JSX.Element = () => {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'es'}>
        <DatePicker
          label='Desde'
          sx={{ gridArea: 'from' }}
          value={from}
          onChange={(val) => setState({...state, from:val})}
          maxDate={to} />
        <DatePicker
          label='Hasta'
          sx={{ gridArea: 'to' }}
          value={to}
          onChange={(val) => setState({...state, to:val})}
          minDate={from} />
      </LocalizationProvider>
    );
  }

  const Search: () => React.JSX.Element = () => {
    return (
      <Box sx={{ gridArea: 'search', width: 'fit-content' }}>
        <TextField
        id="input-with-icon-textfield"
        label="Keywords"
        placeholder='Ej: futbol, pelota, messi'
        value={keywords}
        onChange={(e: any) => setState({...state, keywords:e.target.value})}
        InputProps={{
          'aria-label': 'search news',
          endAdornment: (
            <InputAdornment 
            position="start"
            onClick={() => { setState({...state, searched:{page, pageSize, from, to, keywords} })}}
            aria-label='search'>
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, mb: 1 }}>
      <AppBar position='static'>
        <Toolbar
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 1,
            gridTemplateRows: '1',
            gridTemplateAreas: `'pageSize toggle toggle country'`
          }}
        >
          <Countries />
          <ModeSelector />
          <PageSize />
        </Toolbar>
        {mode == SEARCH && <Toolbar
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: 1,
            gridTemplateRows: '1',
            gridTemplateAreas: `'from to . search search'`,
            mt: 1
          }}
        >
          <DateRange />
          {Search()}
        </Toolbar>}
      </AppBar>
    </Box>
  );
}

export default HeaderBar;