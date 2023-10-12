import React from 'react';
import { Link } from 'react-router-dom';

// import ConfirmDeleteDialog from '../global/ConfirmDeleteDialog';
import { useTranslation } from 'react-i18next';

import { Box, IconButton, Select, MenuItem, FormControl } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import CustomPagination from '../global/CustomPagination';
import dataGridTheme from '../global/dataGridTheme';
import { ThemeProvider } from '@emotion/react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';

import { FaInfo } from "react-icons/fa";
import { useGetUser, useUpdateUserRole } from '../../api/User/useUser';
import LoadingScreen from '../global/LoadingScreen';

const AdminUserList = () => {

    //style
    function isOverflown(element) {
        return (
            element.scrollHeight > element.clientHeight ||
            element.scrollWidth > element.clientWidth
        );
    }

    const GridCellExpand = React.memo(function GridCellExpand(props) {
        const { width, value } = props;
        const wrapper = React.useRef(null);
        const cellDiv = React.useRef(null);
        const cellValue = React.useRef(null);
        const [anchorEl, setAnchorEl] = React.useState(null);
        const [showFullCell, setShowFullCell] = React.useState(false);
        const [showPopper, setShowPopper] = React.useState(false);

        const handleMouseEnter = () => {
            const isCurrentlyOverflown = isOverflown(cellValue.current);
            setShowPopper(isCurrentlyOverflown);
            setAnchorEl(cellDiv.current);
            setShowFullCell(true);
        };

        const handleMouseLeave = () => {
            setShowFullCell(false);
        };

        React.useEffect(() => {
            if (!showFullCell) {
                return undefined;
            }

            function handleKeyDown(nativeEvent) {
                // IE11, Edge (prior to using Bink?) use 'Esc'
                if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
                    setShowFullCell(false);
                }
            }

            document.addEventListener('keydown', handleKeyDown);

            return () => {
                document.removeEventListener('keydown', handleKeyDown);
            };
        }, [setShowFullCell, showFullCell]);

        return (
            <Box
                ref={wrapper}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                sx={{
                    alignItems: 'center',
                    lineHeight: '24px',
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    display: 'flex',
                }}
            >
                <Box
                    ref={cellDiv}
                    sx={{
                        height: '0',
                        width: "100%",
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                    }}
                />
                <Box
                    ref={cellValue}
                    sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                >
                    {value}
                </Box>
                {showPopper && (
                    <Popper
                        open={showFullCell && anchorEl !== null}
                        anchorEl={anchorEl}
                        style={{ width, marginLeft: -17 }}
                    >
                        <Paper
                            elevation={1}
                            style={{ minHeight: wrapper.current.offsetHeight - 3, width: "fit-content" }}
                        >
                            <Typography variant="body2" style={{ padding: 16 }}>
                                {value}
                            </Typography>
                        </Paper>
                    </Popper>
                )}
            </Box>
        );
    });

    GridCellExpand.propTypes = {
        value: PropTypes.string.isRequired,
        width: PropTypes.number.isRequired,
    };

    function renderCellExpand(params) {
        return (
            <GridCellExpand value={params.value || ''} width={params.colDef.computedWidth} />
        );
    }

    renderCellExpand.propTypes = {
        /**
         * The column of the row that the current cell belongs to.
         */
        colDef: PropTypes.object.isRequired,
        /**
         * The cell value.
         * If the column has `valueGetter`, use `params.row` to directly access the fields.
         */
        value: PropTypes.string,
    };

    //*END OF STYLING*//
    //-------------------------------------------------------------------------------------------------------------

    const { t } = useTranslation();

    const { data, isLoading, error } = useGetUser();

    const updateUserRole = useUpdateUserRole();

    const onUpdateUserRole = async (user, userID) => {
        await updateUserRole.mutateAsync({
            user,
            userID
        });
    }

    const onRoleChange = (e, userID) => {
        const role = e.target.value;
        onUpdateUserRole({ role }, userID)
    }


    if (isLoading) {
        return <LoadingScreen />
    }

    if (error) {
        return <div>{error.message}</div>;
    }

    //Custom cell của datagrid
    const renderButton = (params) => {
        return (
            <div style={{ display: "flex" }}>
                <Link to={`/employee/${params.row.id}`}>
                    <IconButton>
                        <FaInfo className="datagrid-icon" size={18} style={{ color: '#428af5' }} />
                        <span className="icon-text">Info</span>
                    </IconButton>
                </Link>
                {/* <ConfirmDeleteDialog
                    isUserAllow={isUserAllow}
                    onDeleteEmployee={props.onDeleteEmployee}
                    rowID={params.row.id}
                    data={props.data} /> */}
            </div>
        )
    }
    //Custome cell để chọn role
    const renderRoleSelector = (params) => {
        if (params.row.role !== "ROLE_ADMIN") {
            return (
                <FormControl fullWidth>
                    <Select
                        id={params.row.id}
                        value={params.row.role}
                        onChange={(e) => onRoleChange(e, params.row.id)}
                    >
                        <MenuItem value="ROLE_USER"><span style={{ fontSize: "13px" }}>ROLE_USER</span></MenuItem>
                        <MenuItem value="ROLE_EDITOR"><span style={{ fontSize: "13px" }}>ROLE_EDITOR</span></MenuItem>
                    </Select>
                </FormControl>
            )
        }
        return (
            <div style={{ textAlign: "center", width: "100%" }}>{params.row.role}</div>
        )
    }

    const columns = [
        { field: 'no', headerName: "No", width: 50 },
        { field: 'username', headerName: `Account name`, width: 130 },
        { field: 'roles', headerName: `Roles`, width: 160, renderCell: renderRoleSelector },
        { field: 'email', headerName: `Email`, width: 120, renderCell: renderCellExpand },
        { field: 'option', headerName: `${t('table.header.option')}`, minWidth: 40, renderCell: renderButton, sortable: false },
    ]

    //đảo chiều list để hiển thị USER mới nhất
    const empData = data;

    const reverseEmpData = [...empData].reverse();
    const rows = (reverseEmpData || []).map((row, index) => {
        return {
            ...row,
            id: row.userID,
            no: index + 1,
        };
    });
    return (
        <>
        <Box style={{ height: 375, width: '100%', background: "white" }}>
            <ThemeProvider theme={dataGridTheme}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5
                            }
                        }
                    }}
                    slots={{
                        pagination: CustomPagination,
                    }}
                    // pageSizeOptions={[5, 10, 20]}
                    key="user-list"
                    disableRowSelectionOnClick={true}
                />
            </ThemeProvider>
        </Box>

        </>
    );
};
export default AdminUserList;