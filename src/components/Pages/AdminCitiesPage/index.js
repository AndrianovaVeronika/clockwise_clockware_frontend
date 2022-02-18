import React from 'react';
import {withHeader} from '../../../functions/withHeader';
import {wrapContent} from '../../../functions/wrapContent';
import FormDialog from "../../Forms/FormDialog";
import CitiesTable from "../../DataTables/CitiesTable";
import AddCityForm from "../../Forms/AddCityForm";
import {compose} from "redux";
import withRedirectAfterLogout from "../../../functions/withRedirectAfterLogout";

const AdminCitiesPage = () => {
    return (
        <>
            <CitiesTable/>
            <FormDialog
                openDialogButtonText={'Добавить'}
                dialogTitle={'Введите название города'}
                submitButtonParams={{
                    submitButtonText: 'Добавить',
                    type: 'submit',
                    form: 'add-city-form'
                }}
            >
                <AddCityForm/>
            </FormDialog>
        </>
    )
}

export default compose(withHeader, wrapContent, withRedirectAfterLogout)(AdminCitiesPage);