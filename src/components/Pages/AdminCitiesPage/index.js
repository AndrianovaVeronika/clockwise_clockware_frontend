import React from 'react';
import {withHeader} from '../../../functions/withHeader';
import FormDialog from "../../Forms/FormDialog";
import CitiesTable from "../../DataTables/CitiesTable";
import AddCityForm from "../../Forms/AddCityForm";
import {compose} from "redux";
import withRedirectAfterLogout from "../../../functions/withRedirectAfterLogout";
import withSidebar from "../../../functions/withSidebar";
import withRedirectIfNotAdmin from "../../../functions/withRedirectIfNotAdmin";

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

export default compose(withHeader, withSidebar, withRedirectAfterLogout)(AdminCitiesPage);