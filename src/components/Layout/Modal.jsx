import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Button from "../UI/Button";
import CloseIcon from "../Icons/CloseIcon";

function Modal({ heading, children, open, className, closeFn }) {
  const dialogRef = useRef();
  let classes = "modal";

  if (className) {
    classes += ` ${className}`;
  }

  useEffect(() => {
    if (open) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }

    // return () => dialogRef.current.close();
  }, [open]);

  return createPortal(
    <dialog ref={dialogRef} className={classes} onClose={closeFn}>
      <div className="modal-inner">
        <div className="modal-header">
          <h3 className="modal-heading">{heading}</h3>
          <Button
            textOnly
            onClick={closeFn}
            type="button"
            className="modal-close__button"
          >
            <CloseIcon className="modal-close__icon" />
          </Button>
        </div>
        {children}
      </div>
    </dialog>,
    document.getElementById("modal-wrapper")
  );
}

export default Modal;
