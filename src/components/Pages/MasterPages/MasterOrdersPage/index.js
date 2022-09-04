import {Box, Typography} from "@mui/material";
import useStyles from "../../../../styles/useStyles";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import orders from "../../../../store/actions/orders";
import {getCurrentMasterOrdersSelector, getCurrentUserOrdersSelector} from "../../../../store/selectors/ordersSelector";
import Page from "../../../../styles/Page";
import {DataGrid} from "@mui/x-data-grid";
import {compose} from "redux";
import {withHeader} from "../../../../functions/withHeader";
import withSidebar from "../../../../functions/withSidebar";
import withRedirectAfterLogout from "../../../../functions/withRedirectAfterLogout";
import withRedirectIfNotMaster from "../../../../functions/withRedirectIfNotMaster";

function renderStatus({value}) {
    const color = value ? 'green' : 'red';
    const text = value ? 'Completed' : 'Not completed';
    return <Typography sx={{color: color}}>{text}</Typography>;
}

const columns = [
    {
        field: 'id', headerName: 'ID', width: 50
    },
    {
        field: 'name', headerName: 'Name', width: 150
    },
    {
        field: 'email', headerName: 'Mail', width: 200,
    },
    {
        field: 'clockType', headerName: 'Clock size', width: 80,
    },
    {
        field: 'city', headerName: 'City', width: 80,
    },
    {
        field: 'date', headerName: 'Date', width: 150,
    },
    {
        field: 'time', headerName: 'Time', width: 120,
    },
    {
        field: 'master', headerName: 'Master', width: 90,
    },
    {
        field: 'price', headerName: 'Price', width: 80,
    },
    {
        field: 'isCompleted',
        headerName: 'Status',
        width: 150,
        renderCell: renderStatus,
        type: 'boolean'
    },
];

const UserOrdersPage = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(orders.getCurrentMasterOrders());
    }, [dispatch]);

    const currentUserOrders = useSelector(getCurrentMasterOrdersSelector);

    return (
        <Page>
            <Box className={classes.profileContent}>
                <Box className={classes.dataTable}>
                    <DataGrid
                        rows={currentUserOrders}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                    />
                </Box>
            </Box>
        </Page>
    )
}

export default compose(withHeader, withSidebar, withRedirectAfterLogout, withRedirectIfNotMaster)(UserOrdersPage);