import React from 'react'
import useGlobal from '../../store/store'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import DatePicker from '../../components/datePicker'
import WeightPicker from '../../components/weightPicker'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  headText: {
    fontSize: 22
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#d30d2b',
    color: 'white'
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
    <div className="componentContainer">
      <div>
        <Typography className={classes.headText} variant="overline">
          Lägg till vikt
        </Typography>
      </div>
      <div className={classes.root}>
        <DatePicker />
        <WeightPicker />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          className={classes.submit}
          onClick={() => tryAddWeightRecord()}
        >
          <Typography variant="overline">Lägg till </Typography>
        </Button>
      </div>
    </div>
  )
}

export default AddView
