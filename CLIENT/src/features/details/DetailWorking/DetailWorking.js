import React from 'react';
import { Box, IconButton } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import { FaTrashAlt } from "react-icons/fa";
import DetailWorkingAdd from './DetailWorkingAdd'

import { useDeleteWorkdate } from "../../../api/Workdate/useWorkdate";

import dataGridTheme from '../../global/dataGridTheme';
import { ThemeProvider } from '@emotion/react';
import { useTranslation } from 'react-i18next';

const DetailWorking = (props) => {


    const { t } = useTranslation();

    const panelHeadStyle = {
        height: 'fit-content',
        display: 'flex',
        justifyContent: 'space-between',
        fontWeight: 'bold',
        fontSize: '21px',
    }

    //Custom cho cell của DataGrid
    const renderButton = (params) => {
        return (
            <div>
                <IconButton onClick={() => onDeleteWorkdate(params.row.id)}>
                    <FaTrashAlt size={18} style={{ color: "black" }} />
                </IconButton>
            </div>
        )
    }

    const deleteWorkdate = useDeleteWorkdate();

    //---------------------------------------

    const onDeleteWorkdate = async (id) => {
        await deleteWorkdate.mutateAsync(id);
    }

    //---------------------------------------
    const columns = [
        { field: 'no', headerName: 'No', width: 80 },
        { field: 'dateOfWork', headerName: `${t('table.header.dateofwork')}`, width: 300 },
        { field: 'hour', headerName: `${t('table.header.hour')}`, width: 110 },
        { field: 'option', headerName: `${t('table.header.option')}`, minWidth: 30, renderCell: renderButton },
    ]
    const empData = props.data.workdate;
    const reverseEmpData = [...empData].reverse();
    const rows = (reverseEmpData || []).map((row, index) => {
        return {
            ...row,
            id: row.workdateID,
            no: index + 1,
        };
    });

    //--------------------------------------

    return (
        <div>
            <div style={panelHeadStyle}>
                <span style={{ textTransform: "uppercase" }}>{t('detail.working')}</span>
                <DetailWorkingAdd data={props.data} isUserAllow={props.isUserAllow} />
            </div>
            <Box style={{ height: 270, width: '100%' }}>
                <ThemeProvider theme={dataGridTheme}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 3
                                }
                            }
                        }}
                        pageSizeOptions={[3, 6, 12]}
                        key="working-grid"
                        disableRowSelectionOnClick={true}
                    />
                </ThemeProvider>
            </Box>
        </div>
    );
};

export default DetailWorking;