import React, {useState} from "react";
import {Dialog, DialogContent, DialogTitle} from "@mui/material";
import CloseButton from "../../Forms/FormSelect/CloseButton";
import OrderForm from "../../Forms/OrderForm";

const OrderFormDialog = (props) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const {OpenButton} = props;

    return (
        <>
            <OpenButton onClick={handleOpen}/>
            <Dialog open={open}>
                <CloseButton onCancel={handleClose}/>
                <DialogTitle>Введите данные</DialogTitle>
                <DialogContent>
                    <OrderForm
                        isDialog
                        closeOnSubmit={handleClose}
                        {...props}
                    />
                </DialogContent>
            </Dialog>
        </>
    )
}

export default React.memo(OrderFormDialog);