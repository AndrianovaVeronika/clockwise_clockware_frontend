import React from 'react';
import {withHeader} from '../../../../functions/withHeader';
import FormDialog from "../../../Forms/FormDialog";
import CitiesTable from "../../../DataTables/CitiesTable";
import AddCityForm from "../../../Forms/AddCityForm";
import {compose} from "redux";
import withRedirectAfterLogout from "../../../../functions/withRedirectAfterLogout";
import withSidebar from "../../../../functions/withSidebar";

const AdminCitiesPage = () => {
    return (
        <>
            <div style={{marginTop: '50px', marginLeft: '50px'}}>
                <CitiesTable/>
            </div>
            <div style={{width: '150px', marginTop: '50px', marginLeft: '50px'}}>
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
            </div>
        </>
    )
}

export default compose(withHeader, withSidebar, withRedirectAfterLogout)(AdminCitiesPage);