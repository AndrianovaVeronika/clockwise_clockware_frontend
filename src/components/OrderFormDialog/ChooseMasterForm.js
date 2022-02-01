import React, {useState} from "react";
import MastersTable from "../MastersTable";

const ChooseMasterForm = () => {
    const [id, setId] = useState(0);

    const ifChecked = (e) => {
        console.log(e);
        return true;
    }


    return (
        <MastersTable withCheckbox={false}/>
    )
}

export default ChooseMasterForm;