import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import history from '../../config/history'
import '../../App.css'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  submit: {
    margin: theme.spacing(3, 1, 2),
    backgroundColor: '#d30d2b',
    color: 'white'
  }
}))

function NotFoundView() {
  const classes = useStyles()

  return (
    <div className="center">
      <span className="textFontXL">Sidan du söker finns inte.</span>
      <span className="textFontPublic">
        Prova besök någon av följande sidor
      </span>
      <div className={classes.spinner}>
        <Button
          type="submit"
          variant="contained"
          className={classes.submit}
          onClick={() => history.push('/')}
        >
          <span className="textFontButton">Dagens Ninja</span>
        </Button>
        <Button
          type="submit"
          variant="contained"
          className={classes.submit}
          onClick={() => history.push('/login')}
        >
          <span className="textFontButton">Logga in</span>
        </Button>
      </div>
    </div>
  )
}

export default NotFoundView
