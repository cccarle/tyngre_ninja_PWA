import React, { Fragment, useState } from 'react'
import useGlobal from '../store/store'
import { makeStyles } from '@material-ui/core/styles'
import { setDate } from '../actions'
import svLocale from 'date-fns/locale/sv'
import DateFnsUtils from '@date-io/date-fns' // choose your lib
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: theme.spacing(1)
  }
}))
function DatePicker() {
  const [globalState, globalActions] = useGlobal()
  const [start, setStart] = useState()
  const classes = useStyles()

  const setStartingTime = date => {
    console.log(date)
    setStart(date)
    globalActions.setDate(date, globalActions)
  }

  return (
    <div className={classes.root}>
      <MuiPickersUtilsProvider utils={DateFnsUtils} svLocale={svLocale}>
        <Fragment>
          <DateTimePicker
            fullWidth
            variant="outlined"
            ampm={false}
            value={globalState.date}
            label="Ange datum"
            cancelLabel="Avsluta"
            onChange={setStartingTime}
          />
        </Fragment>
      </MuiPickersUtilsProvider>
    </div>
  )
}

export default DatePicker
