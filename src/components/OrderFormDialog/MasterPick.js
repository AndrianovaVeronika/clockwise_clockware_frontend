import React from "react";
import MastersTable from "../MastersTable";

const MasterPick = ({onMasterIdChange}) => {
    return (
        <MastersTable
            withCheckbox={false}
            onRowClick={onMasterIdChange}
        />
    )
}

export default MasterPick;