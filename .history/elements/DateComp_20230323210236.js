import {DatePicker,LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {Box,InputLabel,TextField} from "@mui/material";
import React,{useState} from "react";

const DateComp =({attributeName,attributeDisplayName,attributeComponent,
formik,min,max,customFunctionCallUponSettingDate}) =>{
    const [value,setValue] = useState(null);
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box display="flex" flexDirection="column">
                <InputLabel htmlFor={attributeName} variant="standard" 
                sx={{mt:2}}>
                    {attributeDisplayName}
                </InputLabel>
                <DatePicker value={value} onChange={(newValue)=>{setValue(newValue)
                if(customFunctionCallUponSettingDate){
                    customFunctionCallUponSettingDate(newValue);
                }
                if(formik && attributeName){
                    formik.setFieldValue(
                        attributeName,
                        String(newValue)
                    );
                }
                }}
                renderInput={(params)=>(
                    <TextField
                    sx={{width:"95%",background:"#fff"}}
                    {...params}
                    />
                )}/>
            </Box>
        </LocalizationProvider>
    )
}