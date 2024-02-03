import { Box, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <>
      <Box sx={{
        borderBottom: '2px solid #000',
      }}>
        <Container maxWidth="xl">
          <Typography variant="h4">
            <Link style={{
              textDecoration: 'none',
              color: 'black',
            }} to='/'>
              News
            </Link>
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default Header;