import React from 'react'
import useGlobal from '../../store/store'
import Typography from '@material-ui/core/Typography'
import RecordsList from '../../components/recordsList'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
    justifyItems: 'center',
    marginTop: '17%'
  },
  headText: {
    fontSize: 22,
    marginLeft: 20
  },
  cont: {
    backgroundColor: '#ededed',
    display: 'flex',
    height: '10%',
    width: 'auto',
    minWidth: '100%',
    position: 'fixed',
    top: 60,
    zIndex: 1,
    alignContent: 'center',
    alignItems: 'center',
    justifyItems: 'center'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#d30d2b',
    color: 'white'
  },
  listContainer: {
    marginTop: '17%',
    marginBottom: '17%',
    zIndex: -1
  }
}))

function HistoryView() {
  const classes = useStyles()
  const [globalState, globalActions] = useGlobal()

  return (
    <div>
      <div className={classes.root}>
        <div className={classes.cont}>
          <Typography className={classes.headText} variant="overline">
            Historik
          </Typography>
        </div>
      </div>

      <div className={classes.listContainer}>
        <RecordsList />
      </div>
    </div>
  )
}

export default HistoryView
