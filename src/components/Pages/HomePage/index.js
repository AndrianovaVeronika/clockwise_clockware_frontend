import React from 'react';
import {withHeader} from '../../../functions/withHeader';
import {homePageText} from "../../../static/texts";
import OrderForm from "../../OrderFormDialog";
import {wrapContent} from '../../../functions/wrapContent';
import {compose} from "redux";

const HomePage = () => {
    return (
        <div className="text">
            <div>{homePageText}</div>
            <OrderForm openButtonOnClickText={'Сделать заказ'}/>
        </div>
    )
}

export default compose(withHeader, wrapContent)(HomePage);