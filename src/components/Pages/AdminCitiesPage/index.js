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
                formId='add-city-form'
                openDialogButtonText={'Добавить'}
                dialogTitle={'Введите название города'}
            >
                <AddCityForm/>
            </FormDialog>
        </>
    )
}

export default withHeader(wrapContent(AdminCitiesPage));