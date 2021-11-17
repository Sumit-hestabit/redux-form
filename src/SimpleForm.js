import React from 'react';
import { Field, reduxForm } from 'redux-form';
import axios from 'axios';



// Form validation part :

const validate = values => {
  const errors = {}
  if (!values.firstName) {
    errors.firstName = 'Required First Name'
  } else if (values.firstName.length > 15) {
    errors.firstName = 'Must be 15 characters or less'
  }
  if (!values.lastName) {
    errors.lastName = 'Required Last Name'
  } else if (values.lastName.length > 15) {
    errors.lastName = 'Must be 15 characters or less'
  }
  if (!values.email) {
    errors.email = 'Required Email'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.password) {
    errors.password = 'Required password';
  }
  if (!values.gender){
    errors.myRadio = 'Required to Choose any one';
}
  return errors
}



const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) =>
  <div>
    <label>
      {label}
    </label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched &&
        ((error &&
          <span className="error">
            {error}
          </span>) ||
          (warning &&
            <span className="warning">
              {warning}
            </span>))}
    </div>
  </div>

const Submit = async (values) => {
    let data = {
        user: {
            // type: values.type,
            // firstName: values.firstName,
            // lastName: values.lastName,
            email: values.email,
            // password: values.password,
            // gender: values.gender,
        },
    }
    console.log("data->>>>>",data);
    axios
      .post(`https://jsonplaceholder.typicode.com/users`, { data })
      .then(res => {
        console.log(res);
        console.log(res.data);
      });
}

const SimpleForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props

  //
  const options = [
    {'label': 'Germany', 'value': 'DE'},
    {'label': 'Russian Federation', 'value': 'RU'},
    {'label': 'United States', 'value': 'US'}
  ];

  return (
    <form onSubmit={handleSubmit((values) => Submit(values))}>
    <div className="row">
		<div className="col-md-6">
      <Field
        name="firstName"
        type="text"
        component={renderField}
        label="First Name"
      />
      </div>
      </div>

      <div className="row">
	  <div className="col-md-6">
      <Field
        name="lastName"
        type="text"
        component={renderField}
        label="Last Name"
      />
      </div>
      </div>

      <div className="row">
	  <div className="col-md-6">
      <Field name="email" type="email" component={renderField} label="Email" />
      </div>
      </div>

      <div className="row">
	  <div className="col-md-6">
      <Field name="password" type="password" component={renderField} label="Password" />
      </div>
      </div>


      <div className="row">
	   <div className="col-md-6">
     
        <label>Gender</label>
        <div>
          <label><Field name="gender" component="input" type="radio" value="male"/> Male</label>
          <label><Field name="gender" component="input" type="radio" value="female"/> Female</label>
        </div>
      </div> 
      </div>

      <div className="row">
	  <div className="col-md-6">
        <label>Favorite Color</label>
          <Field name="favoriteColor" component="select">
            <option value="color">Select Favorite Color</option>
            <option value="ff0000">Red</option>
            <option value="00ff00">Green</option>
            <option value="0000ff">Blue</option>
          </Field>
        </div>
      </div>
      
        <button type="submit" disabled={submitting}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
    </form>
  )
}

export default reduxForm({
  form: 'simple', 
  validate, // form validation 
})(SimpleForm)