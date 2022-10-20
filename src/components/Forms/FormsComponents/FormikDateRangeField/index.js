import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {LocalizationProvider, MobileDateRangePicker} from "@mui/lab";
import * as React from "react";
import {Box, TextField, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";

const FormikDateRangeField = ({value, handleChange, ...props}) => {
    const {t} = useTranslation();

    return (<Box className={props.className}>
        <Typography>{t("forms.labels.date")}</Typography>
        <LocalizationProvider
            dateAdapter={AdapterDateFns}
            localeText={{start: t("forms.dateRangeForm.start"), end: t("forms.dateRangeForm.start")}}
        >
            <MobileDateRangePicker
                value={value}
                onChange={handleChange}
                renderInput={(startProps, endProps) => (
                    <React.Fragment>
                        <TextField {...startProps} />
                        <Box sx={{mx: 2}}> {t("forms.dateRangeForm.to")} </Box>
                        <TextField {...endProps} />
                    </React.Fragment>
                )}
            />
        </LocalizationProvider>
    </Box>)
};

export default FormikDateRangeField;