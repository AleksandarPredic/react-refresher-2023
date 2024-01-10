import {useNavigate} from 'react-router-dom';
import classes from './Modal.module.css';

function Modal({children, showModal, closeUrl}) {
  const navigate = useNavigate();

  function closeHandler() {
    navigate(closeUrl);
  }

  return (
    <>
      <div className={classes.backdrop} onClick={closeHandler} />
      {/*
        Passing open props is the same as we passed open={true}
      */}
      <dialog open={showModal} className={classes.modal}>
        {children}
      </dialog>
    </>
  );
}

export default Modal;