import { Box, Container, Typography } from '@mui/material';

const Header = () => {
  return (
    <>
      <Box sx={{
        borderBottom: '2px solid #000',
      }}>
        <Container maxWidth="xl">
          <Typography variant="h4">
            News
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default Header;