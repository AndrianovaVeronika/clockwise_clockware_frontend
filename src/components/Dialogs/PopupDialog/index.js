import {Backdrop, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import React from "react";
import useStyles from "../../../styles/useStyles";
import CloseButton from "../../Forms/FormsComponents/CloseButton";

const PopupDialog = ({
                         open,
                         onClose,
                         dialogTitleText,
                         Content,
                         Actions
                     }) => {
    const styles = useStyles();

    return (<>
        <Backdrop
            className={styles.backdrop}
            open={open}
        >
            <Dialog open={open} onClose={onClose}>
                <CloseButton onCancel={onClose}/>
                <DialogTitle>
                    {dialogTitleText}
                </DialogTitle>
                <DialogContent>
                    {Content}
                </DialogContent>
                <DialogActions>
                    {Actions}
                </DialogActions>
            </Dialog>
        </Backdrop>
    </>)
}

export default PopupDialog;