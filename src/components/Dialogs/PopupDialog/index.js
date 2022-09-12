import {Backdrop, Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import React, {useState} from "react";
import useStyles from "../../../styles/useStyles";
import CloseButton from "../../Forms/FormsComponents/CloseButton";

const PopupDialog = ({
                         openButtonText,
                         dialogTitleText,
                         Content,
                         Actions
                     }) => {
    const styles = useStyles();

    const [open, setOpen] = useState(false);
    const doOpen = () => setOpen(true);
    const doClose = () => setOpen(false);

    return (<>
        <Button onClick={doOpen}>{openButtonText}</Button>
        <Backdrop
            className={styles.backdrop}
            open={open}
        >
            <Dialog open={open} onClose={doClose}>
                <CloseButton onCancel={doClose}/>
                <DialogTitle>
                    {dialogTitleText}
                </DialogTitle>
                <DialogContent>
                    <Content closeAction={doClose}/>
                </DialogContent>
                <DialogActions>
                    {Actions}
                </DialogActions>
            </Dialog>
        </Backdrop>
    </>)
}

export default PopupDialog;