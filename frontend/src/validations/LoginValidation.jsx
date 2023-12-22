function Validation(values) {
  let error = {}
  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const password_pattern = /^.+$/

  if(values.email === "") {
    error.email = "Enter your email address"
  }
  else if(!email_pattern.test(values.email)) {
    error.email = "Email didn't match"
  } else {
    error.email = ""
  }

  if(values.password === "") {
    error.password = "Enter your password"
  }
  else if(!password_pattern.test(values.password)) {
    error.password = "Incorrect password"
  } else {
    error.password = ""
  }
  return error;
}

export default Validation;
