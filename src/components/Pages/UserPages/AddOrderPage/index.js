import withRedirectAfterLogout from "../../../../functions/withRedirectAfterLogout";
import OrderForm from "../../../Forms/OrderForm";
import withSidebar from "../../../../functions/withSidebar";
import {withHeader} from "../../../../functions/withHeader";
import {compose} from "redux";
import {addOrder} from "../../../../store/actions/orders";
import {Box, Paper} from "@mui/material";
import Page from "../../../../styles/Page";
import useStyles from "../../../../styles/useStyles";

const AddOrderPage = () => {
    const classes = useStyles();

    return (
        <Page>
            <Box className={classes.profileContent}>
                <Paper className={classes.orderFormPaper}>
                    <OrderForm submitAction={addOrder}/>
                </Paper>
            </Box>
        </Page>
    )
}

export default compose(withHeader, withSidebar, withRedirectAfterLogout)(AddOrderPage);