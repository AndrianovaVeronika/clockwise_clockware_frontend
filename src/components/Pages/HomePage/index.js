import React from 'react';
import './style.css';
import {withHeader} from '../../../functions/withHeader';
import {homePageText} from "../../../static/texts";
import OrderForm from "../../OrderForm";
import MUICustomisedHeader from '../../MUICustomisedHeader';

const HomePage = () => {
    return (
        <div className="homePage">
            <div className="content">
                <div className="text">{homePageText}</div>
                <OrderForm className="text"/>
            </div>
        </div>
    )
}

export default withHeader(HomePage);