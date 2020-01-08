import React from 'react'
import useGlobal from '../../store/store'
import Typography from '@material-ui/core/Typography'
import RecordsList from '../../components/recordsList'
import { makeStyles } from '@material-ui/core/styles'
import '../../App.css'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  headText: {
    fontSize: 22,
    marginLeft: 20
  },
  cont: {
    backgroundColor: '#ededed',
    display: 'flex',
    height: '8%',
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
    marginBottom: '5rem',
    marginTop: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(
      3
    )}px`,
    [theme.breakpoints.up(500 + theme.spacing(3))]: {
      marginTop: '11%',
      marginBottom: '5rem'
    },
    [theme.breakpoints.down(500 + theme.spacing(3))]: {
      marginTop: '30%',
      marginBottom: '5rem'
    },
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
          <span className="textFontHeader">Historik</span>
        </div>
      </div>

      <div className={classes.listContainer}>
        <RecordsList />
      </div>
    </div>
  )
}

export default HistoryView
