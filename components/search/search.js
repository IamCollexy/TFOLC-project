import { Box, FormControl, OutlinedInput } from '@mui/material';
import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState('');
  const salesDelivery = useSelector((state) => state.delivery);
  const router = useRouter();

  useEffect(() => {
    const foundDelivery = salesDelivery.find(
      (delivery) =>
        delivery.customer.toLowerCase() === searchInput.toLowerCase()
    );

    if (foundDelivery) {
      router.replace({
        pathname: '/dashboard/foundDelivery',
        query: { id: foundDelivery.id },
      });
    }
  }, [searchInput]);

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <Box
      sx={{
        width: '95%',
        margin: '0 auto',
      }}
    >
      <FormControl fullWidth my={2}>
        <OutlinedInput
          onKeyUp={handleSearch}
          sx={{
            height: '40px',
          }}
          endAdornment={
            <SearchIcon
              sx={{
                fill: 'text.disabled',
              }}
            />
          }
          type="text"
          placeholder="search delivery"
        />
      </FormControl>
    </Box>
  );
};

export default SearchBar;
