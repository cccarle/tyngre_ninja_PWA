export const validateUserCredentials = (password1, password2, email) => {
  let errors = []

  if (isPasswordEqual(password1, password2) && isEmailValid(email)) return true
  if (!isPasswordEqual(password1, password2))
    errors.passwordError = 'Password no not match'
  if (!isEmailValid(email)) errors.emailError = 'Email badly formatted'

  return errors
}

export const allFieldsIsNotEmpty = values => {
  let notEmpty = false
  Object.keys(values).map(function(key, index) {
    if (values[key].length > 0 || values[key] !== false) {
      return (notEmpty = true)
    } else {
      return (notEmpty = false)
    }
  })

  return notEmpty
}

const isPasswordEqual = (password1, password2) => {
  if (password1 === password2) return true
  else {
    return false
  }
}

const isEmailValid = email => {
  const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regEx.test(String(email).toLowerCase())
}
