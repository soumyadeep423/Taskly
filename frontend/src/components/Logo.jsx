import { Box } from '@mui/material';

const Logo = ({ width = 80, height = 80 }) => {
  return (
    <Box
      component="img"
      src="/logo.png"
      alt="Taskly Logo"
      sx={{
        width: width,
        height: height,
        objectFit: 'contain'
      }}
    />
  );
};

export default Logo; 