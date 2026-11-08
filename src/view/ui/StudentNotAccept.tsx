import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getPendingUser } from '../../services/subepaseServicese';
import { useEffect, useState } from 'react';
import Loading from '../components/Loading';
 interface UserData {
  id: string;
  name: string;
  email: string;
  language_code?: string | null;


}
let pendingStudent: UserData[] | null= null;
export default function StudentNotAccept() {
    const [loading,setLoading]=useState(true);
    const [rows,setRows]= useState<UserData[]>([]);

    useEffect(()=>{
        if(pendingStudent){
            debugger;
            return setRows(pendingStudent);
        }
        setLoading(true);
        getPendingUser()
        .then((data)=>{
            debugger;
            pendingStudent=data;
            setRows(data);
            console.log("done data");
            
        })
        .catch((error)=>{
            console.log(error)
        })
        .finally(()=>{
            setLoading(false);

        })

    },[])
    
  return (
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Id</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Lnaguage</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
            {!loading ?
            <TableBody>
                {rows.length>0 ? rows.map((row)=>(
                             <TableRow
         
         sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
         >
     
              <TableCell align="right">{row.id}</TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.language_code}</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
                )) :
                         <TableRow
         
         sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
         >
     
              <TableCell align="right" colSpan={5}>no Pending Student</TableCell>
         
            </TableRow>
                }

            
         

    
             
         </TableBody>
         : 
         <TableBody >
         

            <TableRow
         
         sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
         >
     
              <TableCell align="right" colSpan={5}> <Loading /></TableCell>
        
            </TableRow>
             </TableBody>
    }
      </Table>
    </TableContainer>
  )
}
