import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(3),
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2)
    }
  },
  spinner: {
    colorRendering: 'red',
    color: 'red'
  }
}))

export default function Spinner() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <CircularProgress className={classes.spinner} size={50} />
    </div>
  )
}
