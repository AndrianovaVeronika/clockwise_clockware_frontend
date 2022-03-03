import React from 'react';
import {withHeader} from '../../../../functions/withHeader';
import FormDialog from "../../../Dialogs/FormDialog";
import CitiesTable from "../../../DataTables/CitiesTable";
import AddCityForm from "../../../Forms/CityForm";
import withRedirectAfterLogout from "../../../../functions/withRedirectAfterLogout";
import withSidebar from "../../../../functions/withSidebar";
import withRedirectIfNotAdmin from "../../../../functions/withRedirectIfNotAdmin";
import {compose} from "redux";

const AdminCitiesPage = () => {
    return (
        <div style={{marginTop: '100px', marginLeft: '50px'}}>
            <CitiesTable/>
            <div style={{width: '150px', marginTop: '50px', marginLeft: '50px'}}>
                <FormDialog
                    openDialogButtonText={'Добавить'}
                    dialogTitle={'Введите название города'}
                    submitButtonParams={{
                        submitButtonText: 'Добавить',
                        type: 'submit',
                        form: 'city-form'
                    }}
                >
                    <AddCityForm/>
                </FormDialog>
            </div>
        </div>
    )
}

export default compose(withHeader, withSidebar, withRedirectAfterLogout, withRedirectIfNotAdmin)(AdminCitiesPage);