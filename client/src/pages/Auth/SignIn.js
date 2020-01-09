import React, { useState } from 'react'
import useGlobal from '../../store/store'
import history from '../../config/history'

// Material-UI
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Spinner from '../../components/spinner'
import { ReactSVG } from 'react-svg'
import svg from '../../assets/img/ninja.svg'
import '../../App.css'
const useStyles = makeStyles(theme => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Fix IE 11 issue.
    justifyContent: 'center',
    minHeight: '100%',
    zIndex: 2
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(
      3
    )}px`,
    [theme.breakpoints.up(500 + theme.spacing(3))]: {
      width: 600,
      height: 800,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#d30d2b',
    color: 'white'
  },
  errorText: {
    color: 'red'
  },
  notchedOutline: {
    borderWidth: '1px',
    borderColor: '#d30d2b !important'
  }
}))

export default function SignIn() {
  const [globalState, globalActions] = useGlobal()
  const classes = useStyles()
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: ''
  })

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const attemtToSignIn = async () => {
    if (values.email && values.password) {
      let err = await globalActions.signIn(values, globalActions)
      console.log(err)

      if (err) {
        setValues({ error: 'Något gick fel, pröva igen.' })
      }
    } else {
      setValues({ error: 'Email eller Lösenord saknas' })
    }
  }

  const renderSignInInput = () => {
    if (globalState.showSpinner) {
      return (
        <div className={classes.container}>
          <Spinner />
          <Typography className={classes.margin} variant="overline">
            Loggar in
          </Typography>
        </div>
      )
    } else {
      return (
        <div className={classes.container}>
          <ReactSVG
            beforeInjection={svg => {
              svg.classList.add('svg-class-name')
              svg.setAttribute('style', 'width:200px')
            }}
            src={svg}
          />
          <Typography variant="overline">Ninja Projektet</Typography>
          <div className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  InputProps={{
                    classes: {
                      notchedOutline: classes.notchedOutline
                    }
                  }}
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label={<Typography variant="overline">Email</Typography>}
                  name="email"
                  autoComplete="email"
                  onChange={handleChange('email')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  InputProps={{
                    classes: {
                      notchedOutline: classes.notchedOutline
                    }
                  }}
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label={<Typography variant="overline">Lösenord</Typography>}
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={handleChange('password')}
                />
                <Typography className={classes.errorText} variant="overline">
                  {values.error}
                </Typography>
              </Grid>
            </Grid>
            <Button
              onClick={() => attemtToSignIn()}
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
            >
              <Typography variant="overline"> Logga in</Typography>
            </Button>
          </div>
        </div>
      )
    }
  }

  return (
    <div className={classes.main}>
      <Container component="main" maxWidth="xl">
        <CssBaseline />
        <div className={classes.container}>
          <div>{renderSignInInput()}</div>
        </div>
      </Container>
    </div>
  )
}
