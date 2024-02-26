import * as React from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import NotificationsIcon from '@mui/icons-material/Notifications';
// import { useGetDataQuery } from '../../../store/slices/requestSlice';
import { Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/system';

export default function NotificationsList() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();

  //   const { data: productData, refetch } = useGetDataQuery(
  //     userFromStorage ? `users/users/${userFromStorage}` : null
  //   );

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <Tooltip title="Notifications">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{
              ml: { xs: 3, md: 0 },
            }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <NotificationsIcon />
            <Typography
              sx={{
                position: 'absolute',
                bottom: 12,
                left: '26px',
                color: 'red',
                fontWeight: 'bold',
                fontSize: '14px',
              }}
            >
              2
            </Typography>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="notifications-list"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      >
        <MenuItem
          onClick={handleClose}
          style={{ color: theme.palette.common.black }}
        >
          <NotificationsIcon
            sx={{
              fill: theme.palette.primary.dark,
            }}
          />
        </MenuItem>

        <Box
          style={{
            textDecoration: 'none',
            color: theme.palette.common.black,
          }}
        >
          <MenuItem onClick={handleClose} style={{ color: 'black' }}>
            <Stack direction={'row'}>
              <Typography variant="body2">
                Pickup Available!
              </Typography>
              <Typography variant="body2">2:15pm</Typography>
            </Stack>
          </MenuItem>
        </Box>

        <Divider />
        <MenuItem onClick={handleClose} style={{ color: 'black' }}>
          <Stack direction={'row'}>
            <Typography variant="body2">
              Delivery Cancelled
            </Typography>
            <Typography variant="body2">3:25pm</Typography>
          </Stack>
        </MenuItem>

        <Divider />
      </Menu>
    </>
  );
}
