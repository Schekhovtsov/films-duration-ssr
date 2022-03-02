import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import React, { FC, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';

const Navbar: FC = () => {
  const router = useRouter();
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event: any) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            <Image
            src="/logo.png"
            alt={'Films Duration SSR'}
            width={210}
            height={60}
          />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem>
                <Typography textAlign="center">
                  <Link href="/">
                    <span className={router.pathname == '/' ? 'active' : ''}>
                      Home
                    </span>
                  </Link>

                </Typography>
              </MenuItem>
              <MenuItem>
                <Typography textAlign="center">

                  <Link href="/about">
                    <span
                      className={router.pathname == '/about' ? 'active' : ''}
                    >
                      About
                    </span>
                  </Link>
                </Typography>
              </MenuItem>
            </Menu>
          </Box>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            
            <Image
            src="/../public/logo.png"
            alt={'Films Duration SSR'}
            width={210}
            height={60}
          />


          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <MenuItem>
              <Typography textAlign="center">
                <Link href="/">
                  <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                    <span className={router.pathname == '/' ? 'active' : ''}>
                      Home
                    </span>
                  </Button>
                </Link>
              </Typography>
            </MenuItem>

            <MenuItem>
              <Typography textAlign="center">
                <Link href="/about">
                  <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                    <span
                      className={router.pathname == '/about' ? 'active' : ''}
                    >
                      About
                    </span>
                  </Button>
                </Link>
              </Typography>
            </MenuItem>
            
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;