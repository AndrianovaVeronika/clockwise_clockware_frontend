import {IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import * as React from "react";

const CloseButton = ({onCancel}) => {
  return(
      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
          <IconButton onClick={onCancel}><CloseIcon/></IconButton>
      </div>
  )
}

export default CloseButton;