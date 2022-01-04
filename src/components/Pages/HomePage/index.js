import React from 'react';
import './style.css';
import {withHeader} from '../../../functions/withHeader';
import {homePageText} from "../../../static/texts";
import OrderForm from "../../OrderForm";
import {wrapContent} from '../../../functions/wrapContent';

const HomePage = () => {
    return (
        <div className="text">
            <div>{homePageText}</div>
            <OrderForm className="text"/>
        </div>
    )
}

export default withHeader(wrapContent(HomePage));