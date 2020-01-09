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
import CheckIcon from '@material-ui/icons/Check'
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

  console.log(globalState.records.length)

  const tryDeleteRecord = record => {
    deleteRecord(record, globalActions)
  }

  const renderRecordList = () => {
    if (globalState.records !== undefined && globalState.records.length === 0) {
      console.log('jksdfsdnfdsj')
      return (
        <div>
          {' '}
          <span className="textFontHeaderSmall">
            Inga tidigare vikter inlagda.
          </span>
        </div>
      )
    }

    if (globalState.records !== undefined) {
      return globalState.records.map(record => (
        <ListItem
          onClick={() => tryDeleteRecord(record)}
          key={record.id}
          className={classes.item}
        >
          <ListItemAvatar>
            <Avatar>
              <CheckIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={record.weight + 'KG'}
            secondary={record.recordDate}
          />
          <DeleteIcon />
        </ListItem>
      ))
    }
  }

  return <List className={classes.root}>{renderRecordList()}</List>
}
