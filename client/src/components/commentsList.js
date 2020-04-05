import React from 'react'
import useGlobal from '../store/store'
import { makeStyles } from '@material-ui/core/styles'
import { deleteRecord } from '../actions'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import DeleteIcon from '@material-ui/icons/Delete'
import CommentIcon from '@material-ui/icons/Chat'
import CheckCircleIcon from '@material-ui/icons/CheckCircleOutline'
import Button from '@material-ui/core/Button'
import { green, red } from '@material-ui/core/colors'

import '../App.css'
const moment = require('moment')

const useStyles = makeStyles(theme => ({
  root: {
    width: 'auto',
    height: 'auto',
    overflow: 'hidden',
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
    justifyItems: 'center',
    marginTop: theme.spacing(15)
  },
  item: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyItems: 'center'
  },
  margin: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  confirm: {
    backgroundColor: green[600]
  },
  delete: {
    backgroundColor: red[600]
  }
}))

export default function CommentsList() {
  const [globalState, globalActions] = useGlobal()
  const classes = useStyles()

  const tryDeleteRecord = record => {
    deleteRecord(record, globalActions)
  }

  const renderCommentsList = () => {
    if (
      globalState.comments !== undefined &&
      globalState.comments.length === 0 &&
      globalState.comments.map(commentss => commentss.confirmed != true)
    ) {
      return (
        <div>
          {' '}
          <span className="textFontHeaderSmall">
            Inga kommentarer att godkänna
          </span>
        </div>
      )
    }

    if (globalState.comments !== undefined) {
      return globalState.comments
        .filter(comment => comment.confirmed != true)
        .map(comment => (
          <ListItem key={comment.id} className={classes.item}>
            <ListItemAvatar>
              <Avatar>
                <CommentIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={comment.sender} secondary={comment.msg} />

            <Button className={classes.confirm} variant="contained">
              <CheckCircleIcon
                onClick={() => globalActions.confirmComment(comment)}
              />
            </Button>

            <div className={classes.margin}></div>

            <Button className={classes.delete} variant="contained">
              <DeleteIcon
                onClick={() => globalActions.deleteComment(comment)}
              />
            </Button>
          </ListItem>
        ))
    }
  }

  return <List className={classes.root}>{renderCommentsList()}</List>
}
