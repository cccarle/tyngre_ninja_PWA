import React, { useEffect } from 'react'
import useGlobal from '../../store/store'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import { ReactSVG } from 'react-svg'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'

import svg from '../../assets/img/ninja.svg'
import '../../App.css'

const useStyles = makeStyles(theme => ({
  listContainer: {
    display: 'flex',
    height: '100%',
    padding: 0,
    margin: 0,
    zIndex: -1,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  large: {
    width: theme.spacing(20),
    height: 'auto'
  },
  todaysNinja: {
    flexDirection: 'column',
    display: 'flex',
    height: 'auto',
    padding: 0,
    margin: 0,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  ninjaInformation: {
    marginTop: theme.spacing(5),
    width: '100%'
  },
  margin: {
    marginTop: theme.spacing(2)
  },
  svg: {
    margin: theme.spacing(2)
  },
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16)
    }
  },
  paper: {
    padding: '5%',
    backgroundColor: '#ededed'
  }
}))

function NinjaOfTheDayView() {
  const [globalState, globalActions] = useGlobal()
  const classes = useStyles()

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
          <span className="textFontXL2">Dagens Ninja</span>
          <div className={classes.margin}></div>

          <Avatar
            alt="Remy Sharp"
            src={globalState.ninjaOfTheDay.ninjaOfTheDayObj.img}
            className={classes.large}
            id="square"
            variant="rounded"
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

  return <div className={classes.listContainer}>{ninjaMessageToShow()}</div>
}

export default NinjaOfTheDayView
