
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ListSelect from '../components/ListSelect';
import { Link } from 'react-router-dom';

interface TypeLnaguage{
  name:string,
  code:string,
  is_active:boolean,

}

const rows :Array<TypeLnaguage> =[
  {name:"any name",is_active:true,code:"121212" },
  {name:"any name",is_active:true,code:"121212" },
  {name:"any name",is_active:true,code:"121212" },
  {name:"any name",is_active:true,code:"121212" },
  {name:"any name",is_active:true,code:"121212" },
  {name:"any name",is_active:true,code:"121212" },

  
];
export default function Lnaguage() {
  return (
 <>
 <div className="title-ui">
  <h1>Lnaguage</h1>
 </div>
              <div className="filter-data">
                 <div className="list">
             <ListSelect />
     
                 </div>
                 <div className="new-student">
                <Link to="/newLnaguage" className="btn">New Lnaguage </Link>  
     
                 </div>
                 </div>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">code</TableCell>
            <TableCell align="left">is Active</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="left">{row.code}</TableCell>
              <TableCell align="left">{row.is_active}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </>
  )
}
