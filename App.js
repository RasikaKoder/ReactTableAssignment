import './App.css';
import React from 'react';
import {useState, useEffect} from 'react';
import { useTheme } from '@mui/material/styles';
import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import {TableContainer,Table,TableBody,TableRow,TableCell,TableHead,TableFooter,TablePagination,InputLabel,Select,MenuItem,Box,IconButton} from '@mui/material';
import filterimg from './filter.png';

function App() {
  const [data,setData] = useState();
  const [country,setCountry] = useState('');
  const [gender,setGender] = useState('');
  const [flag,setFlag] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);


const TableHeading=['ID','Image','Full Name','Gender','Designation','Location'];

 // Specify the API endpoint for user data
const apiUrl = 'https://dummyjson.com/users';

const fetchUsers = async (url) =>{
  try{
    const res = await fetch(apiUrl);
    const convertdata = await res.json();
    setData(convertdata.users);
    // console.log(convertdata);
    }
    catch(e)
    {
      console.log(e);
    }
  }

  useEffect(()=>{
    fetchUsers(apiUrl);
  },[]);


  const handleChangeCountry = (event: SelectChangeEvent) => {
    setCountry(event.target.value);
    setFlag(1);
  };
  const sortCountry = data.filter(sortdata  =>
    sortdata.address.city === country
  );
  console.log("testingCountry",sortCountry);

  const handleChangeGender = (event: SelectChangeEvent) => {
    setGender(event.target.value);
    setFlag(2);
  };
  const sortGender = data.filter(sortdata  =>
    sortdata.gender === gender
  );
  console.log("testing gender",sortGender);


   /* Mapping the sorted data into a new array of JSX nodes */
   const sortedCountryItems = sortCountry.map(sortdata =>
        <TableRow className='tablerow'>
          <TableCell>{sortdata.id}</TableCell>
          <TableCell><img style={{height:'40px',width:'40px'}} src={sortdata.image}/></TableCell>
          <TableCell>{sortdata.firstName} {sortdata.maidenName} {sortdata.lastName}</TableCell>
          <TableCell>{sortdata.gender}</TableCell>
          <TableCell>{sortdata.company.title}</TableCell>
          <TableCell>{sortdata.address.city}</TableCell>
        </TableRow>
      )

     const dataItems = data.map(data => 
        <TableRow className='tablerow'>
          <TableCell>{data.id}</TableCell>
          <TableCell><img style={{height:'40px',width:'40px'}} src={data.image}/></TableCell>
          <TableCell>{data.firstName} {data.maidenName} {data.lastName}</TableCell>
          <TableCell>{data.gender}</TableCell>
          <TableCell>{data.company.title}</TableCell>
          <TableCell>{data.address.city}</TableCell>
        </TableRow>
      ) 

      const sortedGenderItems = sortGender.map(sortdata =>
        <TableRow className='tablerow'>
          <TableCell>{sortdata.id}</TableCell>
          <TableCell><img style={{height:'40px',width:'40px'}} src={sortdata.image}/></TableCell>
          <TableCell>{sortdata.firstName} {sortdata.maidenName} {sortdata.lastName}</TableCell>
          <TableCell>{sortdata.gender}</TableCell>
          <TableCell>{sortdata.company.title}</TableCell>
          <TableCell>{sortdata.address.city}</TableCell>
        </TableRow>
      )

 


const handleChangePage = (
  event: React.MouseEvent<HTMLButtonElement> | null,
  newPage: number,
) => {
  setPage(5);
};

const handleChangeRowsPerPage = (
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
) => {
  setRowsPerPage(parseInt(event.target.value, 10));
  setPage(10);
};


interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void;
}
function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count = 5, page = 5, rowsPerPage = 5, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

  return (
    <div className="App">
      <div className='table-title'>
        <h4>Employees</h4>
        <img src= {filterimg} alt='filterimg img' style={{height:'50px',width:'50px',float:'right',paddingLeft:'800px',marginTop:'50px'}}/>
        <div className='menu'>
        <InputLabel style={{color:'black',fontWeight:'70px'}}>Country</InputLabel>
          <Select
            value={country}
            label="Country"
            onChange={handleChangeCountry}
            sx={{width:'110px',marginRight:'30px',marginLeft:'10px'}}
          >
            <MenuItem value={'New York'}>New York</MenuItem>
            <MenuItem value={'Houston'}>Houston</MenuItem>
            <MenuItem value={'Fort Worth'}>Fort Worth</MenuItem>
          </Select>
        <InputLabel style={{color:'black',fontWeight:'70px'}}>Gender</InputLabel>
          <Select
            value={gender}
            label="Gender"
            onChange={handleChangeGender}
            sx={{width:'110px',marginLeft:'10px'}}
          >
            <MenuItem value={'male'}>Male</MenuItem>
            <MenuItem value={'female'}>Female</MenuItem>
          </Select>
        </div>
        </div>
      <div className='style-div'>
      <TableContainer className='table-container' style={{marginTop:'50px'}}>
        <Table className='table'>
          <TableBody>
           <TableRow className='tablerow'>
              {TableHeading.map((arr)=>
              <TableCell align="left" style={{fontWeight:'bold'}}>{arr}</TableCell>
              )}
            </TableRow> 

            {flag === 1 ? sortedCountryItems
            : flag === 2 ? sortedGenderItems
            : dataItems  }  

          </TableBody>
          <TableFooter>
          <TableRow>
            <TablePagination
                 rowsPerPageOptions={[5, 10, 15, { label: 'All', value: -1 }]}
                 colSpan={5}
                 //count={data.length}
                 count={30}
                 rowsPerPage={5}
                 page={page}
                 slotProps={{
                 select: {
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                },
              }}
                 onPageChange={handleChangePage}
                 onRowsPerPageChange={handleChangeRowsPerPage}
                 ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
        </Table>
      </TableContainer>
      </div>
    </div>
  );
}

export default App;
