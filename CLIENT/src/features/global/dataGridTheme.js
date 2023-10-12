import createTheme from '@mui/material/styles/createTheme';

const dataGridTheme = createTheme({
    components: {
        MuiDataGrid: {
            styleOverrides: {
                root: {
                    '& .MuiDataGrid-row:nth-of-type(odd)': {
                        backgroundColor: 'rgba(0, 0, 0, 0.06)',
                    },
                },
                columnHeader: {
                    color: 'black',
                    fontFamily: "'Segoe UI', Impact, Geneva, Verdana, sans-serif",
                    fontSize: "16px",
                },
            },
        },
    },
});

export default dataGridTheme;