import React from 'react'
import useGlobal from '../../store/store'
import Typography from '@material-ui/core/Typography'
import CommentsList from './CommentsList'
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
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    justifyItems: 'center',
    flexDirection: 'column',
    textAlign: 'start',
    marginTop: theme.spacing(2)
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
  },
  margin: {
    marginTop: '1%'
  }
}))

function CommentsView() {
  const classes = useStyles()
  const [globalState, globalActions] = useGlobal()

  const renderEmptyRecord = () => {
    if (
      globalState.comments !== undefined &&
      globalState.comments.length === 0 &&
      globalState.comments.map(commentss => commentss.confirmed != true)
    ) {
      return (
        <div className={classes.margin}>
          {' '}
          <span className="textFontHeaderSmall">Inga kommenterar.</span>
        </div>
      )
    }
  }

  return (
    <div>
      <div className={classes.root}>
        <div className={classes.cont}>
          <span className="textFontHeader">Styrkekommentarer</span>
        </div>
      </div>
      {renderEmptyRecord()}

      <div className={classes.listContainer}>
        <CommentsList />
      </div>
    </div>
  )
}

export default CommentsView
