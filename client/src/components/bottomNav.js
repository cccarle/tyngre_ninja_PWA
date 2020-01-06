import React from 'react'
import useGlobal from '../store/store'
import { makeStyles } from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import AddWeight from '@material-ui/icons/Add'
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople'
import AssignmentIcon from '@material-ui/icons/Assignment'
import Icon from '@material-ui/core/Icon'
import variabels from '../config/variabels'

const useStyles = makeStyles({
  stickToBottom: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    flexGrow: 2,
    backgroundColor: '#1B1B1E'
  },
  icon: {
    color: '#E8ECEC'
  }
})

export default function ButtonNav() {
  const [globalState, globalActions] = useGlobal()

  const classes = useStyles()
  const [value, setValue] = React.useState(0)

  return (
    <BottomNavigation
      className={classes.stickToBottom}
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue)
      }}
      showLabels
    >
      <BottomNavigationAction
        value={0}
        onChange={(event, newValue) => {
          setValue(newValue)
        }}
        onClick={() => globalActions.setView(variabels.ninjaView)}
        label="Nuvarande Ninja"
        className={classes.icon}
        icon={
          <Icon className={classes.icon}>
            <EmojiPeopleIcon />
          </Icon>
        }
      />
      <BottomNavigationAction
        value={1}
        label="Lägg till vikt"
        icon={
          <Icon className={classes.icon}>
            <AddWeight color={classes.text} />}
          </Icon>
        }
        className={classes.icon}
        onChange={(event, newValue) => {
          setValue(newValue)
        }}
        onClick={() => globalActions.setView(variabels.addView)}
      />

      <BottomNavigationAction
        value={2}
        onChange={(event, newValue) => {
          setValue(newValue)
        }}
        onClick={() => globalActions.setView(variabels.historyView)}
        label="Historik"
        className={classes.icon}
        icon={
          <Icon className={classes.icon}>
            <AssignmentIcon />
          </Icon>
        }
      />
    </BottomNavigation>
  )
}
