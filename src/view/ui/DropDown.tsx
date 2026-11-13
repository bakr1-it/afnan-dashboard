import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import {  MdLogout, MdLanguage } from "react-icons/md";
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { clearStudentCache } from './Users';
import { useLanguageContext } from '../../context/LanguageContext';

export default function DropDown() {
  const {signOut,profile} = useAuth();
  const {t, toggleChangeLnaguage} = useLanguageContext();
  const  Navigate = useNavigate();
  const handelLogOut = async ()=>{
try{
  await signOut();
  Navigate("/login",{replace:true});
clearStudentCache();
 
  
  
}catch(error){

  console.log(error);
}
  }
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title={t("accountSettings")}>
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open}
          >
            <Avatar sx={{ width: 32, height: 32 }}>{profile?.name.slice(0,1).toUpperCase()}</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar className="navbarAvatar" /> <p className='rtl:mx-2'>{t("profile")}</p>
        </MenuItem>
        <Divider />
        <MenuItem  onClick={toggleChangeLnaguage}>
          <ListItemIcon>
            <MdLanguage fontSize="small" />
          </ListItemIcon>
          {t("lang")}
        </MenuItem>
        <Divider />
        <MenuItem  onClick={handelLogOut}>
          <ListItemIcon>
            <MdLogout fontSize="small" />
          </ListItemIcon>
          {t("logout")}
        </MenuItem>
      </Menu>
    </React.Fragment>
  )
}
