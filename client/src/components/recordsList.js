import React from 'react'
import useGlobal from '../store/store'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import ImageIcon from '@material-ui/icons/Image'
import WorkIcon from '@material-ui/icons/Work'
import BeachAccessIcon from '@material-ui/icons/BeachAccess'
const moment = require('moment')

const useStyles = makeStyles(theme => ({
  root: {
    width: 'auto',
    height: 'auto',
    overflow: 'scroll',
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
    justifyItems: 'center'
  },
  item: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyItems: 'center'
  }
}))

export default function RecordsList() {
  const [globalState, globalActions] = useGlobal()
  const classes = useStyles()

  return (
    <List className={classes.root}>
      {globalState.records !== undefined
        ? globalState.records.map(record => (
            <ListItem className={classes.item}>
              <ListItemAvatar>
                <Avatar>
                  <BeachAccessIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={record.weight + 'KG'}
                secondary={moment(record.recordDate).format('MMMM D, YYYY')}
              />
            </ListItem>
          ))
        : null}
    </List>
  )
}
