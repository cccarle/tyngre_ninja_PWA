import React, { useEffect } from 'react'
import {} from '../../actions'
import useGlobal from '../../store/store'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import { ReactSVG } from 'react-svg'
import { shadows } from '@material-ui/system'
import Paper from '@material-ui/core/Paper'

import svg from '../../assets/img/ninja.svg'
import '../../App.css'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
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
    display: 'flex',
    height: '100vh',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    zIndex: -1
  },
  large: {
    width: theme.spacing(25),
    height: theme.spacing(25)
  },
  todaysNinja: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  ninjaInformation: {
    marginTop: theme.spacing(5),
    width: '100%'
  },
  margin: {
    marginTop: theme.spacing(2)
  },
  waitingForNinja: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(
      3
    )}px`,
    [theme.breakpoints.up(500 + theme.spacing(3))]: {}, // mobile
    [theme.breakpoints.down(500 + theme.spacing(3))]: {
      marginTop: '55%'
    },
    marginBottom: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(
      3
    )}px`, // desktop
    [theme.breakpoints.up(500 + theme.spacing(3))]: {
      marginTop: '40%'
    }, // mobile
    [theme.breakpoints.down(500 + theme.spacing(3))]: {
      marginTop: '55%'
    }
  },
  svg: {
    margin: theme.spacing(2)
  },
  rootPaper: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16)
    }
  }
}))

function NinjaOfTheDayView() {
  const [globalState, globalActions] = useGlobal()
  const classes = useStyles()
  useEffect(() => {}, [])

  const ninjaMessageToShow = () => {
    if (globalState.ninjaOfTheDay.message) {
      return (
        <div className={classes.waitingForNinja}>
          <ReactSVG
            beforeInjection={svg => {
              svg.classList.add('svg-class-name')
              svg.setAttribute('style', 'width:200px')
            }}
            src={svg}
            className={classes.svg}
          />

          <span className="textFontBig">
            {globalState.ninjaOfTheDay.message}
          </span>
        </div>
      )
    }

    if (globalState.ninjaOfTheDay.ninjaOfTheDayObj != undefined) {
      return (
        <div className={classes.todaysNinja}>
          <Avatar
            alt="Remy Sharp"
            src={globalState.ninjaOfTheDay.ninjaOfTheDayObj.img}
            className={classes.large}
          />

          <div className={classes.margin}></div>

          <span className="textFont">
            {globalState.ninjaOfTheDay.ninjaOfTheDayObj.user}
          </span>

          <span className="textFont">
            Dagsvikt: {globalState.ninjaOfTheDay.ninjaOfTheDayObj.weight} KG
          </span>
          <span className="textFont">
            Startvikt: {globalState.ninjaOfTheDay.ninjaOfTheDayObj.startWeight}{' '}
            KG
          </span>

          <span className="textFont">
            Differens: {globalState.ninjaOfTheDay.ninjaOfTheDayObj.weightDiff}{' '}
            KG
          </span>
        </div>
      )
    }
  }

  return (
    <div>
      <div className={classes.root}>
        <div className={classes.cont}>
          <span className="textFontHeader">Dagens Ninja</span>
        </div>
      </div>
      <div className={classes.listContainer}>{ninjaMessageToShow()}</div>
    </div>
  )
}

export default NinjaOfTheDayView
