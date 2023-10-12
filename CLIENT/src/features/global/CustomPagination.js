import React from 'react';
import {
    gridPageCountSelector,
    gridPageSelector,
    useGridApiContext,
    useGridSelector,
} from '@mui/x-data-grid';
import PaginationItem from '@mui/material/PaginationItem';
import Pagination from '@mui/material/Pagination';
import createTheme from '@mui/material/styles/createTheme';
import { ThemeProvider } from '@emotion/react';

// import CustomPagination from "../global/CustomPagination";
const CustomPagination = () => {

    const theme = createTheme({
        components: {
            MuiPaginationItem: {
                styleOverrides: {
                    root: {
                        margin: "0",
                        borderRadius: "0",
                        color: "#007bff",
                        '&.Mui-selected': {
                            background: "#007bff",
                            color: "white",
                            '&:hover': {
                                backgroundColor: "#0753a6",
                            }
                        }
                    },
                },
            },
        }
    })

    const paginationItemStyle = {
        "&:active": {
            backgroundColor: "black"
        }
    }

    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);

    return (
        <ThemeProvider theme={theme}>
            <Pagination
                color="primary"
                variant="outlined"
                shape="rounded"
                page={page + 1}
                count={pageCount}
                // @ts-expect-error
                renderItem={(props2) => <PaginationItem sx={paginationItemStyle} {...props2} disableRipple />}
                onChange={(event, value) => apiRef.current.setPage(value - 1)}
            />
        </ThemeProvider >
    );
}

export default CustomPagination;