import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Validation from '../validations/SignUpValidation';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


function SignUp() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInput = (e) => {
    setValues(prev => ({...prev, [e.target.name]: e.target.value}))
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = Validation(values);
    setErrors(validationErrors);
    console.log(values);
    if(validationErrors.name === "" && validationErrors.email === "" && validationErrors.password === "") {
      axios.post('http://firstdb.cdsygs0ao1t2.eu-north-1.rds.amazonaws.com/sign-up', JSON.stringify(values), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        navigate('/login');
        Swal.fire({
          icon: 'success',
          title: 'Account created successfully!',
          showConfirmButton: false,
          timer: 2000
        });
      })
      .catch(err => console.log(err));
    }
  };


  return (
    <div className="container">
      <div className="row d-flex justify-content-center align-items-center vh-100">
        <div className="col-md-4 border rounded-4 p-4 my-5 shadow p-3 mb-5 bg-body rounded">
          <h2 className="text-center p-4">Sign Up</h2>
          <hr className="mb-4" />
          <Form className="d-grid gap-2" onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="text-start">Full Name</Form.Label>
              <Form.Control
                className="rounded-4"
                onChange={handleInput}
                type="name"
                placeholder="Tony Stark"
                name='name'
              />
              {errors.name && <span className='text-danger'>{errors.name}</span>}

            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                className="rounded-4"
                onChange={handleInput}
                type="email"
                placeholder="email@gmail.com"
                name='email'
              />
              {errors.email && <span className='text-danger'>{errors.email}</span>}

            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                className="rounded-4"
                onChange={handleInput}
                type="password"
                placeholder="Password"
                name='password'
              />
              {errors.password && <span className='text-danger'>{errors.password}</span>}

            </Form.Group>

            <Button className="rounded-4" variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          <p className="text-center mt-3">
            Already have an account?
            <span>
              <a
                href="/login"
                style={{ cursor: 'pointer', color: 'blue', textDecoration: 'none' }}
              >
                {' '}
                Login here.
              </a>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp
