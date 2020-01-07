import React, { Fragment, useState } from 'react'
import useGlobal from '../store/store'
import { makeStyles } from '@material-ui/core/styles'
import svLocale from 'date-fns/locale/sv'
import { setDate } from '../actions'
import FormHelperText from '@material-ui/core/FormHelperText'

import DateFnsUtils from '@date-io/date-fns' // choose your lib
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: theme.spacing(1)
  },
  withoutLabel: {
    marginBottom: theme.spacing(1)
  }
}))
function DatePickers() {
  const [globalState, globalActions] = useGlobal()
  const classes = useStyles()

  const setStartingTime = date => {
    globalActions.setDate(date, globalActions)
  }

  return (
    <div className={classes.root}>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={svLocale}>
        <Fragment>
          <FormHelperText className={classes.withoutLabel}>
            Ange datum
          </FormHelperText>
          <DatePicker
            color="red"
            fullWidth
            variant="outlined"
            ampm={false}
            inputVariant="outlined"
            value={globalState.date}
            cancelLabel="Avsluta"
            onChange={setStartingTime}
          />
        </Fragment>
      </MuiPickersUtilsProvider>
    </div>
  )
}

export default DatePickers
