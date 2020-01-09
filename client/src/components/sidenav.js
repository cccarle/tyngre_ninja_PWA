import React from 'react'
import useGlobal from '../store/store'
import { signOutUser } from '../actions'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'
import Settings from '@material-ui/icons/Settings'
import Typography from '@material-ui/core/Typography'
import '../App.css'
const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
  },
  margin: {
    marginTop: '29%'
  },
  submit: {
    backgroundColor: '#d30d2b',
    color: 'white'
  }
})

export default function TemporaryDrawer() {
  const classes = useStyles()
  const [globalState, globalActions] = useGlobal()

  const [state, setState] = React.useState({
    right: false
  })

  const toggleDrawer = (side, open) => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    setState({ ...state, [side]: open })
  }

  const sideList = side => (
    <div className={classes.list}>
      <List>
        <ListItem button>
          <ListItemIcon>
            <span className={'fontText'}>
              Hej! {globalState.loggedInUserEmail}
            </span>
          </ListItemIcon>
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <span className={'fontText'}>
              {' '}
              Startvikt: {globalState.startWeightFromDB}KG
            </span>
          </ListItemIcon>
        </ListItem>
        <ListItem button>
          <Button
            onClick={() => globalActions.toggelStartWeightModal(true)}
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
          >
            <span className="textFontButton">Uppdatera</span>
          </Button>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button>
          <Button
            onClick={toggleDrawer('right', false)}
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
          >
            <span className="textFontButton">Tillbaka</span>
          </Button>
        </ListItem>
        <ListItem button>
          <Button
            onClick={() => signOutUser()}
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
          >
            <span className="textFontButton">Logga ut</span>
          </Button>
        </ListItem>
      </List>

      <Divider />
      <List>
        <ListItem>
          <div>
            <span className="textFont">
              {' '}
              Icons made by{' '}
              <a
                href="https://www.flaticon.com/authors/freepik"
                title="Freepik"
              >
                Freepik
              </a>{' '}
              from{' '}
              <a href="https://www.flaticon.com/" title="Flaticon">
                www.flaticon.com
              </a>
            </span>
          </div>
        </ListItem>
      </List>
    </div>
  )

  return (
    <div>
      <div className={classes.margin}></div>
      <Settings onClick={toggleDrawer('right', true)} />
      <Drawer
        anchor="right"
        open={state.right}
        onClose={toggleDrawer('right', false)}
      >
        {sideList('right')}
      </Drawer>
    </div>
  )
}
