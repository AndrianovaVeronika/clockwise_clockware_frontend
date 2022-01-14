import React from "react";
import {useSelector} from "react-redux";
import {
    Avatar,
    Checkbox,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    MenuItem,
    Rating
} from "@mui/material";
import {getMastersSelector} from "../../store/selectors/mastersSelector";

const MasterStep = ({master_id, handleMasterChange}) => {
    const masters = useSelector(getMastersSelector).map((master) => {
        return <ListItem
            key={master.id}
            secondaryAction={
                <Checkbox
                    edge="end"
                    onChange={handleMasterChange}
                    value={master.id}
                    checked={this.key === master_id}
                />
            }
            disablePadding
        >
            <ListItemButton>
                <ListItemText id={master.id} primary={master.name} />
                <Rating readOnly value={master.rating}/>
            </ListItemButton>
        </ListItem>
    })

    return (
        <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {masters}
        </List>
    )
}

export default MasterStep;