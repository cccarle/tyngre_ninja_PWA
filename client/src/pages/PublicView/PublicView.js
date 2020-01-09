import React, { useEffect } from 'react'
import useGlobal from '../../store/store'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import { ReactSVG } from 'react-svg'
import Navbar from '../../components/navbar'

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
    textAlign: 'center',
    flexDirection: 'column'
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
  margin2: {
    marginTop: theme.spacing(5)
  },
  svg: {
    margin: theme.spacing(2)
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
          <span className="textFontXL">Dagens Ninja</span>
          <div className={classes.margin}></div>
          <Avatar
            alt="Remy Sharp"
            src={globalState.ninjaOfTheDay.ninjaOfTheDayObj.img}
            className={classes.large}
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

  return (
    <div className="appContainer">
      <Navbar />
      <div id="bg-public" className={classes.listContainer}>
        <div className={classes.margin2}></div>

        {ninjaMessageToShow()}
      </div>
    </div>
  )
}

export default NinjaOfTheDayView
