import React from 'react'
import useGlobal from '../../store/store'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import DatePicker from '../../components/datePicker'
import WeightPicker from '../../components/weightPicker'
import { makeStyles } from '@material-ui/core/styles'
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
  }
}))

function AddView() {
  const classes = useStyles()
  const [globalState, globalActions] = useGlobal()

  const tryAddWeightRecord = () => {
    globalActions.addWeightRecord(
      globalState.date,
      globalState.weight,
      globalActions,
      globalState
    )
  }
  return (
    <div className={classes.listContainer}>
      <span className="textFontHeader">Lägg till vikt</span>
      <span className={classes.margin}></span>
      <div>
        <DatePicker />
        <WeightPicker />
        <Button
          type="submit"
          variant="contained"
          className={classes.submit}
          onClick={() => tryAddWeightRecord()}
        >
          <span className="textFontButton">Lägg till vikt</span>
        </Button>
      </div>
    </div>
  )
}

export default AddView

// return (
//   <div>
//     <div className={classes.root}>
//       <div className={classes.cont}>
//         <span className="textFontHeader">Lägg till vikt</span>
//       </div>
//     </div>

//     <div className={classes.listContainer}>
//       <DatePicker />
//       <WeightPicker />
//       <Button
//         type="submit"
//         variant="contained"
//         className={classes.submit}
//         onClick={() => tryAddWeightRecord()}
//       >
//         <span className="textFontButton">Lägg till vikt</span>
//       </Button>
//     </div>
//   </div>
// )
