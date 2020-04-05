import React, { useEffect } from 'react'
import useGlobal from '../../store/store'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import { ReactSVG } from 'react-svg'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'

import svg from '../../assets/img/ninja.svg'
import '../../App.css'

const useStyles = makeStyles((theme) => ({
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
    flexDirection: 'column',
  },
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
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
    textAlign: 'center',
  },
  todaysNinjaUpperContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '101%',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  todaysNinjaLowContainer: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),

    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'start',
  },
  cont: {
    display: 'flex',
    flexDirection: 'column',
    width: '70%',
    alignContent: 'center',
    alignItems: 'flex-start',
    justifyContent: 'center',
    textAlign: 'start',
  },
  todaysNinjaUpperContainerText: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
  },
  ninjaInformation: {
    marginTop: theme.spacing(5),
    width: '100%',
  },
  margin: {
    marginTop: theme.spacing(2),
  },
  margin2: {
    marginTop: theme.spacing(5),
  },
  svg: {
    margin: theme.spacing(2),
  },
}))

function NinjaOfTheDayView() {
  const [globalState, globalActions] = useGlobal()
  const classes = useStyles()

  const renderNinjaOfTheDayText = (text) => {
    if (text.length > 10) {
      return <span className="textFontTodaysNinjaSmall">{text}</span>
    } else {
      return <span className="textFontTodaysNinja">{text}</span>
    }
  }

  const renderMessage = () => {
    if (globalState.ninjaOfTheDay.user) {
      return (
        <div>
          <span className="textFontBig">
            {globalState.ninjaOfTheDay.user} har vägt in på:{' '}
            {globalState.ninjaOfTheDay.weight} kg
          </span>
          <br />
          <br />
        </div>
      )
    }
  }

  const ninjaMessageToShow = () => {
    if (globalState.ninjaOfTheDay.message) {
      return (
        <div className={classes.waitingForNinja}>
          <ReactSVG
            beforeInjection={(svg) => {
              svg.classList.add('svg-class-name')
              svg.setAttribute('style', 'width:200px')
            }}
            src={svg}
            className={classes.svg}
          />

          {renderMessage()}

          <span className="textFontBig">
            {globalState.ninjaOfTheDay.message}
          </span>
        </div>
      )
    }

    const ifWeightDifferens = (user) => {
      if (user.weightDiff != 0) {
        return (
          <span className="textFontSmall">
            <span className="textFontSmallBold"> Total viktnedgång:</span>{' '}
            {user.weightDiff} KG
          </span>
        )
      }
    }

    if (globalState.ninjaOfTheDay.ninjaOfTheDayObj != undefined) {
      return (
        <div className={classes.todaysNinja}>
          <span className="textFontXL">Dagens Ninja</span>
          <div className={classes.todaysNinjaUpperContainer}>
            <ReactSVG
              beforeInjection={(svg) => {
                svg.classList.add('svg-class-name')
                svg.setAttribute('style', 'width:140px')
              }}
              src={svg}
              className={classes.svg}
            />

            <div className={classes.todaysNinjaUpperContainerText}>
              <div className="main">
                <div>
                  {renderNinjaOfTheDayText(
                    globalState.ninjaOfTheDay.ninjaOfTheDayObj.user
                  )}
                </div>
              </div>

              <span className="textFont">
                Vikt: {globalState.ninjaOfTheDay.ninjaOfTheDayObj.weight} KG
              </span>
              <span className="textFont">
                Differens:{' '}
                {
                  globalState.ninjaOfTheDay.ninjaOfTheDayObj
                    .weightDiffFromLatest
                }{' '}
                KG
              </span>
            </div>
          </div>

          <div className="hairline-border "></div>

          <div className="row">
            <div className="column">
              <div className={classes.todaysNinjaLowContainer}>
                <Avatar
                  alt="Remy Sharp"
                  src={globalState.ninjaOfTheDay.ninjaRecords[0].img}
                  className={classes.large}
                  variant="rounded"
                />
                <div className={classes.cont}>
                  <span className="textFontSmall">
                    {globalState.ninjaOfTheDay.ninjaRecords[0].user}
                  </span>
                  <span className="textFontSmall">
                    <span className="textFontSmallBold">Dagsvikt:</span>{' '}
                    {globalState.ninjaOfTheDay.ninjaRecords[0].weight} KG
                  </span>
                  <span className="textFontSmall">
                    <span className="textFontSmallBold">Startvikt:</span>{' '}
                    {globalState.ninjaOfTheDay.ninjaRecords[0].startWeight} KG
                  </span>
                  {ifWeightDifferens(globalState.ninjaOfTheDay.ninjaRecords[0])}
                  <span className="textFontSmall">
                    <span className="textFontSmallBold">
                      {' '}
                      Differens från senaste invägning:
                    </span>{' '}
                    {
                      globalState.ninjaOfTheDay.ninjaRecords[0]
                        .weightDiffFromLatest
                    }{' '}
                    KG
                  </span>
                </div>
              </div>
            </div>
            <div className="column">
              <div className={classes.todaysNinjaLowContainer}>
                <Avatar
                  alt="Remy Sharp"
                  src={globalState.ninjaOfTheDay.ninjaRecords[1].img}
                  className={classes.large}
                  variant="rounded"
                />
                <div className={classes.cont}>
                  <span className="textFontSmall">
                    {globalState.ninjaOfTheDay.ninjaRecords[1].user}
                  </span>
                  <span className="textFontSmall">
                    <span className="textFontSmallBold"> Dagsvikt:</span>{' '}
                    {globalState.ninjaOfTheDay.ninjaRecords[1].weight} KG
                  </span>
                  <span className="textFontSmall">
                    <span className="textFontSmallBold"> Startvikt:</span>{' '}
                    {globalState.ninjaOfTheDay.ninjaRecords[1].startWeight} KG
                  </span>
                  {ifWeightDifferens(globalState.ninjaOfTheDay.ninjaRecords[1])}

                  <span className="textFontSmall">
                    <span className="textFontSmallBold">
                      {' '}
                      Differens från senaste invägning:
                    </span>{' '}
                    {
                      globalState.ninjaOfTheDay.ninjaRecords[1]
                        .weightDiffFromLatest
                    }{' '}
                    KG
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }

  return <div className={classes.listContainer}>{ninjaMessageToShow()}</div>
}

export default NinjaOfTheDayView
