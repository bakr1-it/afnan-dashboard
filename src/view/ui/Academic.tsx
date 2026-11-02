
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import { getTable } from '../../services/subepaseServicese';
import { useEffect, useState } from 'react';
import Loading from '../components/Loading';

interface TypeLnaguage{
  name:string,
  email:string,
  id:string,
  created_at:string,

}


export default function Academic() {
const [isLoading,setIsLoading]=useState(false);
  const [rows,setRows]=useState <Array<TypeLnaguage>>([]);
  useEffect(()=>{
    setIsLoading(true);
  getTable("academies")
  .then((data)=>{
    setRows(data);
  }).catch((error)=>{
  }).finally(()=>{
    setIsLoading(false);
  })
  
  },[]);


 return (
 <>
<div className="container-header-academies container-components">
 <div className="title-ui">
  <h1>Academic</h1>

 </div>
       <Link to="/NewAcademic" className="btn">New Academic </Link> 
</div>
    
          
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">email</TableCell>
            <TableCell align="left">Action</TableCell>
          </TableRow>
        </TableHead>
        {isLoading 
        ?<TableBody >
          <TableRow>
            <TableCell align="left" colSpan={3}><Loading /></TableCell>
          </TableRow>
        </TableBody>
      : 
        <TableBody>
          
          {rows.map((row) => (
            <TableRow
            key={row.name} 
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="left">{row.email}</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          ))}
        </TableBody>
        }
      </Table>
    </TableContainer>
  </>
  )
}
