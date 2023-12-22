function Validation(values) {
  let error = {}
  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if(values.name === "") {
    error.name = "Enter your name"
  } else {
    error.name = ""
  }

  if(values.email === "") {
    error.email = "Enter your email address"
  }
  else if(!email_pattern.test(values.email)) {
    error.email = "Incorrect email"
  } else {
    error.email = ""
  }

  if(values.password === "") {
    error.password = "Enter your password"
  } else {
    error.password = ""
  }
  return error;
}

export default Validation;
