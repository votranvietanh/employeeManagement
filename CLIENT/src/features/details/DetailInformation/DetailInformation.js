import React from 'react';
import { Box, Grid } from '@mui/material'
import { useTranslation } from 'react-i18next';

const DetailInformation = (props) => {

    const { t } = useTranslation();

    const labelStyle = {
        border: '1px solid #c7c7c7',
        padding: '8px',
        borderRadius: '5px',
        backgroundColor: '#f5f5f5'
    }

    const panelHeadStyle = {
        padding:'16px 0',
        fontWeight: 'bold',
        fontSize: '21px',
    }

    return (
        <>
        <div style={panelHeadStyle}>
            <span style={{textTransform:"uppercase"}}>{t('detail.information')}</span>
        </div>
        <Box sx={{ flexGrow: 1, height: 'fit-content' }}>
            <Grid container spacing={4} rowSpacing={3}>
                <Grid item xs={6}>
                    <div style={labelStyle} >
                        {t('detail.startdate')}: {props.data.startDate}</div>
                </Grid>
                <Grid item xs={6}>
                    <div style={labelStyle} >
                    {t('detail.team')}: {props.data.teamName}</div>
                </Grid>
                <Grid item xs={6}>
                    <div style={labelStyle} >
                    {t('detail.address')}: {props.data.address}</div>
                </Grid>
                <Grid item xs={6}>
                    <div style={labelStyle} >
                    {t('detail.sallaryperhour')}: {props.data.moneyPerHour}$</div>
                </Grid>
            </Grid>
        </Box>
        </>
    );
};

export default DetailInformation;