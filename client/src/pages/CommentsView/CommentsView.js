import React from 'react'
import useGlobal from '../../store/store'
import Typography from '@material-ui/core/Typography'
import RecordsList from '../../components/recordsList'
import { makeStyles } from '@material-ui/core/styles'
import '../../App.css'
import CommentsList from '../../components/commentsList'

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
    width: '100%',
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
  smalltextCont: {
    width: '100%',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    justifyItems: 'center',
    flexDirection: 'column',
    textAlign: 'start'
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
    marginTop: '0.5%'
    //  marginLeft: '2%'
  }
}))

function CommentsView() {
  const classes = useStyles()
  const [globalState, globalActions] = useGlobal()

  const renderEmptyRecord = () => {
    if (
      globalState.comments !== undefined &&
      globalState.comments.length === 0
    ) {
      return (
        <div className={classes.margin}>
          {' '}
          <span className="textFontHeaderSmall">
            {' '}
            Inga kommentarer att godkänna.
          </span>
        </div>
      )
    }
  }

  return (
    <div>
      <div className={classes.root}>
        <div className={classes.cont}>
          <span className="textFontHeader">Kommentarer</span>
          <div className={classes.smalltextCont}>
            <span className="textFontSmallMargin">
              Godkänn vilka kommentarer du vill ska vara publika.
            </span>{' '}
          </div>
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
