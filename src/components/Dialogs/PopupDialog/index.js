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
    const onOpen = () => setOpen(true);
    const onClose = () => setOpen(false);

    return (<>
        <Button onClick={onOpen}>{openButtonText}</Button>
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
                    <Content closeAction={onClose}/>
                </DialogContent>
                <DialogActions>
                    {Actions}
                </DialogActions>
            </Dialog>
        </Backdrop>
    </>)
}

export default PopupDialog;