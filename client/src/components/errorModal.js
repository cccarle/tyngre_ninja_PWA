import React from 'react'
import useGlobal from '../store/store'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

function rand() {
  return Math.round(Math.random() * 20) - 10
}

function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  }
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 'auto',
    minWidth: '70%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  submit: {
    backgroundColor: '#d30d2b',
    color: 'white'
  }
}))

export default function SimpleModal() {
  const classes = useStyles()
  const [globalState, globalActions] = useGlobal()
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle)
  const [open, setOpen] = React.useState(true)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={globalState.showModal}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Något gick fel</h2>
          <p id="simple-modal-description">Vänligen försök igen</p>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
            onClick={() => handleClose()}
          >
            <Typography variant="overline">Stäng </Typography>
          </Button>
        </div>
      </Modal>
    </div>
  )
}
