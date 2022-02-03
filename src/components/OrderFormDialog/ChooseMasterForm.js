import React from "react";
import MastersTable from "../MastersTable";

const ChooseMasterForm = ({onMasterIdChange}) => {
    return (
        <MastersTable
            withCheckbox={false}
            onRowClick={onMasterIdChange}
        />
    )
}

export default ChooseMasterForm;