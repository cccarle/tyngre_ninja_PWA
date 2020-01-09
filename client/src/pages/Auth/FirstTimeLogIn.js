import React from 'react'
import useGlobal from '../../store/store'
import Button from '@material-ui/core/Button'
import WeightPicker from '../../components/weightPicker'
import {
  addStartWeightRecord,
  updateFirstTimeLogInStatus1
} from '../../actions'
import { makeStyles } from '@material-ui/core/styles'
import '../../App.css'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputAdornment from '@material-ui/core/InputAdornment'
import history from '../../config/history'
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
  },
  textPadding: {
    padding: '3%'
  }
}))

function AddView() {
  const classes = useStyles()
  const [globalState, globalActions] = useGlobal()

  const [values, setValues] = React.useState({
    weight: ''
  })

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
    let weight = event.target.value
  }

  const tryAddWeightRecord = () => {
    if (values.weight != '') {
      addStartWeightRecord(values.weight, globalActions)
      updateFirstTimeLogInStatus1()
      history.push('/dashboard')
    }
  }
  return (
    <div className={classes.listContainer}>
      <span className="textFontHeader">Lägg till startvikt</span>

      <div className={classes.textPadding}>
        <span className="textFont">
          Startvikten är till för att jämföra differensen mellan din dagliga
          vikt och vikten du började på, på så sätt utser vi en daglig vinnare
          (ninja)
        </span>
      </div>

      <span className={classes.margin}></span>
      <div>
        <OutlinedInput
          type="number"
          fullWidth
          onChange={handleChange('weight')}
          endAdornment={<InputAdornment position="end">KG</InputAdornment>}
          inputProps={{
            'aria-label': 'weight'
          }}
        />
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
