import withRedirectAfterLogout from "../../../../functions/withRedirectAfterLogout";
import OrderForm from "../../../Forms/OrderForm";
import withSidebar from "../../../../functions/withSidebar";
import {withHeader} from "../../../../functions/withHeader";
import {compose} from "redux";

const AddOrderPage = () => {
    return (
        <>
            <div style={{flexDirection: 'column', marginLeft: '50px', marginTop: '50px'}}>
                <OrderForm/>
            </div>
        </>
    )
}

export default compose(withHeader, withSidebar, withRedirectAfterLogout)(AddOrderPage);