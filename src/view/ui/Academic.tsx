
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
  email:string,

}

const rows :Array<TypeLnaguage> =[
  {name:"any name",email:"true" },
  {name:"any name",email:"true" },
  {name:"any name",email:"true" },
  {name:"any name",email:"true" },
  {name:"any name",email:"true" },
  {name:"any name",email:"true" },

  
];
export default function Academic() {
 return (
 <>
 <div className="title-ui">
  <h1>Academic</h1>
 </div>
              <div className="filter-data">
                 <div className="list">
             <ListSelect />
     
                 </div>
                 <div className="new-student">
                <Link to="/NewAcademic" className="btn">New Academic </Link>  
     
                 </div>
                 </div>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">email</TableCell>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </>
  )
}
