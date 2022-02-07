import React from 'react';
import {withHeader} from '../../../functions/withHeader';
import {wrapContent} from '../../../functions/wrapContent';
import FormDialog from "../../FormDialog";
import CitiesTable from "../../CitiesTable";
import AddCityForm from "../../AddCityForm";

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

export default withHeader(wrapContent(AdminCitiesPage));