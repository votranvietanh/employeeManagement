import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
const SearchBar = (props) => {
    const [searchQuery, setSearchQuery] = useState('');

    const onSearchQueryChanged = (e) => {
        setSearchQuery(e.target.value)
    }

    useEffect(() => {
        props.handleSearch(searchQuery);
    }, [searchQuery, props]);


    return (
        <>
        <Box>
            {/* InputProps để thêm alternate component */}
            <TextField
                sx={{
                    "& .MuiInputBase-root": {
                        height: 48,
                        width: 250
                    }
                }}
                value={searchQuery}
                onChange={onSearchQueryChanged}
                placeholder="Search employee by name"
                variant="outlined"
                id="input-with-icon-textfield"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />
        </Box>
        </>
    );
};

export default SearchBar;