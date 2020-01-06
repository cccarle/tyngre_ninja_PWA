import React from 'react'
import useGlobal from '../store/store'

/** Material UI */
import PropTypes from 'prop-types'
import clsx from 'clsx'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import CloseIcon from '@material-ui/icons/Close'
import { green } from '@material-ui/core/colors'
import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import { makeStyles } from '@material-ui/core/styles'

const variantIcon = {
  success: CheckCircleIcon
}

const useStyles1 = makeStyles(theme => ({
  success: {
    backgroundColor: green[600]
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: 'flex',
    alignItems: 'center'
  }
}))

function MySnackbarContentWrapper(props) {
  const classes = useStyles1()
  const [globalState, globalActions] = useGlobal()
  const { className, message, onClose, variant, ...other } = props

  const Icon = variantIcon[variant]

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          onClick={() => globalActions.toggelChipModal(false)}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>
      ]}
      {...other}
    />
  )
}

MySnackbarContentWrapper.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['warning']).isRequired
}

export default function CustomizedSnackbars() {
  const [globalState, globalActions] = useGlobal()
  const [open, setOpen] = React.useState(false)

  const handleClick = () => {
    setOpen(true)
  }

  const closeAfterTreeSeconds = () => {
    if (globalState.showChip === true) {
      window.setTimeout(closeChip, 2000)
    }
  }

  const closeChip = () => {
    globalActions.toggelChipModal(false)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  return (
    <div>
      {closeAfterTreeSeconds()}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={globalState.showChip}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <MySnackbarContentWrapper
          onClose={handleClose}
          variant="success"
          message={'Vikt tillagd'}
        />
      </Snackbar>
    </div>
  )
}
