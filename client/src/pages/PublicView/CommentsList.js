import React from 'react'
import useGlobal from '../../store/store'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import CommentIcon from '@material-ui/icons/Chat'

import '../../App.css'
const moment = require('moment')

const useStyles = makeStyles(theme => ({
  root: {
    width: 'auto',
    height: 'auto',
    overflow: 'hidden',
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
  },
  medium: {
    width: theme.spacing(5),
    height: theme.spacing(5)
  }
}))

export default function CommentsList() {
  const [globalState, globalActions] = useGlobal()
  const classes = useStyles()

  const tryDeleteRecord = record => {
    // deleteRecord(record, globalActions)
  }

  const renderCommentsList = () => {
    if (
      globalState.publicComments !== undefined &&
      globalState.publicComments.length === 0
    ) {
      return (
        <div>
          {' '}
          <span className="textFontHeaderSmall">Inga kommentarer.</span>
        </div>
      )
    }

    if (globalState.publicComments !== undefined) {
      return globalState.publicComments.map(comment => (
        <ListItem key={comment.id} className={classes.item}>
          <ListItemAvatar>
            <Avatar
              src={comment.img}
              className={classes.medium}
              variant="rounded"
            >
              <CommentIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={`Från: ` + comment.sender}
            secondary={comment.msg}
          />
        </ListItem>
      ))
    }
  }

  return <List className={classes.root}>{renderCommentsList()}</List>
}
