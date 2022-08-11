import React from "react";
import { Dialog, DialogTitle } from "@mui/material";
import Style from "./popup.module.css";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

const Popup = ({
  isOpen,
  handleClose,
  title,
  width = 475,
  borderRadius = 15,
  isFullScreen = false,
  isShowHeader = true,
  childClassName,
  containerClassName,
  children,
}) => {
  const closePopup = () => {
    handleClose?.(true);
  };
  return (
    <div>
      <Dialog
        maxWidth="xxl"
        open={isOpen}
        // onClose={handleClose}
        fullScreen={isFullScreen}
        aria-describedby="alert-dialog-slide-description"
        className={Style.dialog}
        PaperProps={{
          style: {
            backgroundColor: "white",
            backdropFilter: "blur(1px)",
            width: width,
            minHeight: 150,
            borderRadius: borderRadius,
          },
        }}
      >
        <div className={`${Style.container} ${containerClassName}`}>
          {isShowHeader && (
            <DialogTitle>
              <div className={Style.title}>
                <div>
                  <h5>{title}</h5>
                </div>
                <div className={Style.closeIcon}>
                  <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    onClick={closePopup}
                  >
                    <CloseIcon />
                  </IconButton>
                </div>
              </div>
            </DialogTitle>
          )}
          <div className={`${Style.content} ${childClassName}`}>{children}</div>
        </div>
      </Dialog>
    </div>
  );
};

export default Popup;
