
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import { useAcademicLanguage } from '../../context/AcademicLnaguage';
import { useAuth } from '../../context/AuthContext';



export default function Lnaguage() {
const {languagues } =  useAcademicLanguage();
  const {profile} = useAuth();
  if(profile.role !== "super admin" || profile.role !== "admin") return;

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
 
        <TableBody>
          {languagues.map((row) => (
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
