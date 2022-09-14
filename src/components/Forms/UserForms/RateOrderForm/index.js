import {Backdrop, Button, Dialog, DialogActions, DialogContent, DialogTitle, Rating} from '@mui/material';
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import orders from "../../../../store/actions/orders";

const RateOrderForm = ({id, isCompleted, rating}) => {
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [ratingValue, setRatingValue] = useState(rating);
    const [rated, setRated] = useState(!!rating);

    const handleOpen = () => setOpen(!open);
    const onChange = (e, value) => setRatingValue(value);
    const onSubmit = () => {
        dispatch(orders.rateOrder({id: id, rating: ratingValue}));
        setRated(!rated);
    };

    return (rated ? <Rating readOnly value={rating || ratingValue}/> : <>
        <Button disabled={!isCompleted} onClick={handleOpen}>Rate</Button>
        <Backdrop
            sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
            open={open}
            onClick={handleOpen}
        >
            <Dialog open={open} onClose={handleOpen}>
                <DialogTitle>Please, rate your completed order!</DialogTitle>
                <DialogContent>
                    <Rating
                        value={ratingValue}
                        onChange={onChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleOpen}>Close</Button>
                    <Button onClick={onSubmit}>Confirm</Button>
                </DialogActions>
            </Dialog>
        </Backdrop>
    </>)
};

export default RateOrderForm;