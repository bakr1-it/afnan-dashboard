
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link, Navigate } from 'react-router-dom';
import { useAcademicLanguage } from '../../context/AcademicLnaguage';
import { useAuth } from '../../context/AuthContext';
import { useLanguageContext } from '../../context/LanguageContext';


export default function Academic() {

const {academies} = useAcademicLanguage();
  const {profile} = useAuth();
  const {t} = useLanguageContext();
  if(profile?.role !== "super admin" )  return <Navigate to="/dashboard" replace/>;
 return (
 <>
<div className="container-header-academies container-components">
 <div className="title-ui">
  <h1>{t("academic")}</h1>

 </div>
       <Link to="/NewAcademic" className="btn">{t("newAcademic")}</Link> 
</div>
    
          
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">{t("name")}</TableCell>
            <TableCell align="left">{t("email")}</TableCell>
            <TableCell align="left">{t("action")}</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          
          {academies.map((row) => (
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
        
      </Table>
    </TableContainer>
  </>
  )
}
