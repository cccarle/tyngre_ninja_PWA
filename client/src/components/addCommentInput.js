import React from 'react'
import useGlobal from '../store/store'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      marginTop: theme.spacing(2),
      display: 'flex'
    }
  }
}))

export default function AddCommentInput() {
  const classes = useStyles()
  const [globalState, globalActions] = useGlobal()
  const [value, setValue] = React.useState('Controlled')

  const handleChange = event => {
    setValue(event.target.value)

    globalActions.handleCommentOnChange(event.target.value)
  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        onChange={event =>
          globalActions.addCommentSenderName(event.target.value)
        }
        id="outlined-helperText"
        label="Namn"
        variant="outlined"
      />
      <div>
        <TextField
          fullWidth
          id="outlined-multiline-static"
          label="Kommentar"
          multiline
          rows="4"
          rowsMax="2"
          inputProps={{
            maxLength: 55
          }}
          placeholder={`Kämpa ${globalState.selectedHost}`}
          variant="outlined"
          onChange={handleChange}
        />
      </div>
    </form>
  )
}
