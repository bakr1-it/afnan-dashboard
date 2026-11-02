
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import { getTable } from '../../services/subepaseServicese';
import { useEffect, useState } from 'react';
interface TypeLnaguage{
  name:string,
  code:string,
  is_active:boolean,

}


export default function Lnaguage() {
  const [isLoading,setIsLoading]=useState(false);
    const [rows,setRows]=useState <Array<TypeLnaguage>>([]);
      useEffect(()=>{
    setIsLoading(true);
  getTable("languages")
  .then((data)=>{
    setRows(data);
    debugger;
  }).catch((error)=>{
  }).finally(()=>{
    setIsLoading(false);
  })
  
  },[]);

  return (
 <>
 <div className="container-header-academies container-components">
 <div className="title-ui">
  <h1>Lnaguage</h1>

 </div>
    <Link to="/newLnaguage" className="btn">New Lnaguage </Link> 
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
              <TableCell align="left">{row.code}</TableCell>
              <TableCell align="left">{row.is_active}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      }
      </Table>
    </TableContainer>
  </>
  )
}
