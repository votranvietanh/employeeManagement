import React from 'react';
import { Box, IconButton } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import { FaTrashAlt } from "react-icons/fa";
import DetailAdvanceAdd from './DetailAdvanceAdd'

import { useDeleteAdvance } from "../../../api/Advance/useAdvance";

import dataGridTheme from '../../global/dataGridTheme';
import { ThemeProvider } from '@emotion/react';
import { useTranslation } from 'react-i18next';

const DetailAdvance = (props) => {

    const { t } = useTranslation();

    const panelHeadStyle = {
        height: 'fit-content',
        display: 'flex',
        justifyContent: 'space-between',
        fontWeight: 'bold',
        fontSize: '21px',
    }

    //Custom cell cho datagrid
    const renderButton = (params) => {
        return (
            <div>
                <IconButton onClick={() => onDeleteAdvance(params.row.id)}>
                    <FaTrashAlt size={18} style={{ color: "black" }} />
                </IconButton>
            </div>
        )
    }

    //Sử dụng delete api
    const deleteAdvance = useDeleteAdvance();
    const onDeleteAdvance = async (id) => {
        await deleteAdvance.mutateAsync(id);
    }

    //---------------------------------------

    const columns = [
        { field: 'no', headerName: 'No', width: 80 },
        { field: 'dateGetAdvance', headerName: `${t('table.header.dategetadvance')}`, width: 300 },
        { field: 'money', headerName: `${t('table.header.money')}`, width: 110 },
        { field: 'option', headerName: `${t('table.header.option')}`, minWidth: 30, renderCell: renderButton },
    ]

    const rows = (props.data.advance || []).map((row, index) => {
        return {
            ...row,
            id: row.advanceID,
            no: index + 1,
            money: row.money + "$"
        };
    });

    //--------------------------------------

    return (
        <div>
            <div style={panelHeadStyle}>
                <span style={{textTransform:"uppercase"}}>{t('detail.advances')}</span>
                <DetailAdvanceAdd data={props.data} isUserAllow={props.isUserAllow} />
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
                        disableRowSelectionOnClick={true}
                    />
                </ThemeProvider>
            </Box>
        </div>
    );
};

export default DetailAdvance;