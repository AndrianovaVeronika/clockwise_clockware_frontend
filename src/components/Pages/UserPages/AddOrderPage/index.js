import withRedirectAfterLogout from "../../../../functions/withRedirectAfterLogout";
import OrderForm from "../../../Forms/AddOrderForm";
import withSidebar from "../../../../functions/withSidebar";
import {withHeader} from "../../../../functions/withHeader";
import {compose} from "redux";

const AddOrderPage = () => {
    return (
        <>
            <div style={{marginLeft: '50px', marginTop: '100px'}}>
                <OrderForm/>
            </div>
        </>
    )
}

export default compose(withHeader, withSidebar, withRedirectAfterLogout)(AddOrderPage);