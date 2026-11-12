import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface TypePropsModalAcceptUser{
    open:boolean,
    onClose:()=>void,
    children:React.ReactNode
}
export default function ModalAcceptUser({open,onClose,children}:TypePropsModalAcceptUser) {


  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
      {children}
        </Box>
      </Modal>
    </div>
  );
}
