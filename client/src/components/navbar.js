import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import useGlobal from '../store/store'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Badge from '@material-ui/core/Badge'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import MailIcon from '@material-ui/icons/Mail'
import { ReactSVG } from 'react-svg'
import svg from '../assets/img/ninja.svg'
import SideNav from './sidenav'
import Settings from '@material-ui/icons/Settings'
import '../App.css'
import { checkIfUserIsLoggedIn } from '../actions'
const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  navTextHead: {
    fontFamily: 'myFirstFont'
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  avatar: {
    margin: 5,
    border: '1px solid white',
    borderRadius: 200
  },
  bg: {
    backgroundColor: '#1B1B1E'
  },
  navText: {
    marginLeft: '2vh'
  }
}))

export default function Navbar() {
  const classes = useStyles()
  const [globalState, globalActions] = useGlobal()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)

  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  function handleMobileMenuClose() {
    setMobileMoreAnchorEl(null)
  }

  function handleMenuClose() {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  const menuId = 'primary-search-account-menu'
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>s</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  )

  const mobileMenuId = 'primary-search-account-menu-mobile'
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    />
  )

  const checkIfPublic = () => {
    if (globalState.loggedInUserEmail.length > 0) {
      return <SideNav />
    }
  }

  return (
    <div className={classes.grow}>
      <AppBar className={classes.bg} position="fixed">
        <Toolbar>
          <ReactSVG
            beforeInjection={svg => {
              svg.classList.add('svg-class-name')
              svg.setAttribute('style', 'height:25px')
            }}
            src={svg}
          />

          <div className={classes.navText}>
            <span className="textFontNav">ninja-projektet</span>
          </div>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <MenuItem>{checkIfPublic()}</MenuItem>
          </div>
          <div className={classes.sectionMobile}>
            <MenuItem>{checkIfPublic()}</MenuItem>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  )
}
