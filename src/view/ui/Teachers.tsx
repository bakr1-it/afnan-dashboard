import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ListSelect from '../components/ListSelect';
import { Link } from 'react-router-dom';

interface TypeTeacher{
  name:string,
  email:string,
  phone:string,
  country:string,
 academic:string,
}

const rows :Array<TypeTeacher> =[
  {name:"any name",email:"dsfkl",phone:"dkslf",country:"kslf",academic:"sdklf"},
  {name:"any name",email:"dsfkl",phone:"dkslf",country:"kslf",academic:"sdklf"},
  {name:"any name",email:"dsfkl",phone:"dkslf",country:"kslf",academic:"sdklf"},
  {name:"any name",email:"dsfkl",phone:"dkslf",country:"kslf",academic:"sdklf"},
  {name:"any name",email:"dsfkl",phone:"dkslf",country:"kslf",academic:"sdklf"},
  {name:"any name",email:"dsfkl",phone:"dkslf",country:"kslf",academic:"sdklf"},

  
];

export default function Teachers() {
return (
  <>
              <div className="filter-data">
                 <div className="list">
             <ListSelect />
     
                 </div>
                 <div className="new-student">
                <Link to="/newTeacher" className="btn">New Teacher</Link>  
     
                 </div>
                 </div>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Phone</TableCell>
            <TableCell align="left">Country</TableCell>
            <TableCell align="left">Academic </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="left">{row.email}</TableCell>
              <TableCell align="left">{row.phone}</TableCell>
              <TableCell align="left">{row.country}</TableCell>
              <TableCell align="left">{row.academic}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </>
  );
}
