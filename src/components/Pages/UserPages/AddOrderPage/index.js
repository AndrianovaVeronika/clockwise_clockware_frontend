import withRedirectAfterLogout from "../../../../functions/withRedirectAfterLogout";
import OrderForm from "../../../Forms/OrderForm";
import withSidebar from "../../../../functions/withSidebar";
import {withHeader} from "../../../../functions/withHeader";
import {compose} from "redux";
import {addOrder} from "../../../../store/actions/orders";
import {Paper} from "@mui/material";

const AddOrderPage = () => {
    return (
        <div style={{marginLeft: '50px', marginTop: '100px'}}>
            <Paper
                style={{
                    marginLeft: '50px',
                    marginTop: '150px',
                    maxHeight: '400px',
                    maxWidth: '700px',
                    minHeight: '300px',
                    minWidth: '500px',
                    padding: '40px 30px',
                    margin: '10px auto',
                    flexDirection: 'column',
                }}>
                <OrderForm submitAction={addOrder}/>
            </Paper>
        </div>
    )
}

export default compose(withHeader, withSidebar, withRedirectAfterLogout)(AddOrderPage);