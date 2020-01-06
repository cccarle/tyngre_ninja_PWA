import React from 'react'
import clsx from 'clsx'
import useGlobal from '../store/store'
import { makeStyles } from '@material-ui/core/styles'
import { setWeight } from '../actions'
import IconButton from '@material-ui/core/IconButton'
import Input from '@material-ui/core/Input'
import FilledInput from '@material-ui/core/FilledInput'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  margin: {
    margin: theme.spacing(1)
  },
  withoutLabel: {
    marginBottom: theme.spacing(1)
  },
  textField: {}
}))

export default function InputAdornments() {
  const classes = useStyles()
  const [globalState, globalActions] = useGlobal()
  const [values, setValues] = React.useState({
    weight: ''
  })

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
    let weight = event.target.value

    if (globalState.showStartWeightModal) {
      globalActions.setStartWeight(weight, globalActions)
    } else {
      globalActions.setWeight(weight, globalActions)
    }
  }

  const renderLabel = () => {
    if (!globalState.showStartWeightModal) {
      return (
        <FormHelperText className={classes.withoutLabel}>
          Ange vikt
        </FormHelperText>
      )
    }
  }

  const whichValueToRender = () => {
    if (globalState.showStartWeightModal) {
      return globalState.startWeight
    } else {
      return globalState.weight
    }
  }

  return (
    <div className={classes.root}>
      <FormControl
        fullWidth
        className={clsx(classes.margin, classes.textField)}
      >
        {renderLabel()}
        <OutlinedInput
          type="number"
          fullWidth
          value={whichValueToRender()}
          onChange={handleChange('weight')}
          endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
          inputProps={{
            'aria-label': 'weight'
          }}
        />
      </FormControl>
    </div>
  )
}
