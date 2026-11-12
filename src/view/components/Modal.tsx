import Box from '@mui/material/Box';
import ModalShow  from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #0F766E',
  boxShadow: 24,
  p: 4,
};

interface TypePropsModalAcceptUser{
    open:boolean,
    onClose:()=>void,
    width?:number,
    children:React.ReactNode
}
export default function Modal({open,onClose,children,width=400}:TypePropsModalAcceptUser) {


  return (
    <div>
      <ModalShow
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{...style , width:'90%' , maxWidth:width}}>
      {children}
        </Box>
      </ModalShow>
    </div>
  );
}
