import React, { useEffect } from 'react'
import useGlobal from '../../store/store'
import { openAddCommentModal } from '../../actions'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import { ReactSVG } from 'react-svg'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import alexImage from '../../assets/img/alex.jpg'
import andreasImage from '../../assets/img/andreas.jpg'
import AddCommentModal from '../../components/addCommentModal'
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
    width: theme.spacing(15),
    height: theme.spacing(15)
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
  todaysNinjaUpperContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '101%',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
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
    textAlign: 'start'
  },
  cont: {
    display: 'flex',
    flexDirection: 'column',
    width: '72%',
    alignContent: 'center',
    alignItems: 'flex-start',
    justifyContent: 'center',
    textAlign: 'start'
  },
  todaysNinjaUpperContainerText: {
    display: 'flex',
    flexDirection: 'column'
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
  },
  submit: {
    margin: theme.spacing(1, 0, 0),
    backgroundColor: '#d30d2b',
    color: 'white'
  }
}))

function NinjaOfTheDayView() {
  const [globalState, globalActions] = useGlobal()
  const classes = useStyles()

  const OpenCommentModal = user => {
    globalActions.toggleShowAddCommentModal(true)
    globalActions.selectWhichHost(user)
  }

  const ninjaMessageToShow = () => {
    return (
      <div className={classes.todaysNinja}>
        <span className="textFontRes">Styrkekommentarer</span>
        <span className="textFont">
          Skicka styrkekommentarer till våra kära värdar.
        </span>
        <div className={classes.margin}></div>

        <div className="hairline-border "></div>

        <div className="row">
          <div className="column">
            <div className={classes.todaysNinjaLowContainer}>
              <Avatar
                alt="Remy Sharp"
                src={alexImage}
                className={classes.large}
                variant="rounded"
              />
              <div className={classes.cont}>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  className={classes.submit}
                  onClick={() => OpenCommentModal('Alex')}
                >
                  <span className="textFontButton">Skicka till Alex</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="column">
            <div className={classes.todaysNinjaLowContainer}>
              <Avatar
                alt="Remy Sharp"
                src={andreasImage}
                className={classes.large}
                variant="rounded"
              />
              <div className={classes.cont}>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  className={classes.submit}
                  onClick={() => OpenCommentModal('Andreas')}
                >
                  <span className="textFontButton"> Skicka till Andreas</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={classes.listContainer}>
      <AddCommentModal />
      {ninjaMessageToShow()}
    </div>
  )
}

export default NinjaOfTheDayView
