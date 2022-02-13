import React, { Component } from "react";
// import "./Register.css";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registration_email: "",
      registration_password: "",
      registration_name: "",
    };
  }

  on_email_change = (event) => {
    this.setState({ registration_email: event.target.value });
  };

  on_password_change = (event) => {
    this.setState({ registration_password: event.target.value });
  };

  on_name_change = (event) => {
    this.setState({ registration_name: event.target.value });
  };

  on_submit_register = () => {
    console.log(this.state);
    fetch("http://localhost:3002/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.registration_email,
        password: this.state.registration_password,
        name: this.state.registration_name,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          this.props.load_user(user);
          this.props.on_route_change("signin");
        }
      });
  };

  render() {
    return (
      <div>
        <article className='br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 glass-box center'>
          <main className='pa4 black-80'>
            <div className='measure'>
              <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
                <legend className='f4 fw6 ph0 mh0 center'>Register</legend>
                <div className='mt3'>
                  <label className='db fw6 lh-copy f6' htmlFor='email-address'>
                    Name
                  </label>
                  <input
                    onChange={this.on_name_change}
                    className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                    type='text'
                    name='name'
                    id='name'
                  />
                </div>
                <div className='mt3'>
                  <label className='db fw6 lh-copy f6' htmlFor='email-address'>
                    Email
                  </label>
                  <input
                    onChange={this.on_email_change}
                    className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                    type='email'
                    name='email-address'
                    id='email-address'
                  />
                </div>
                <div className='mv3'>
                  <label className='db fw6 lh-copy f6' htmlFor='password'>
                    Password
                  </label>
                  <input
                    onChange={this.on_password_change}
                    className='b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                    type='password'
                    name='password'
                    id='password'
                  />
                </div>
              </fieldset>
              <div className='tc'>
                <input
                  onClick={this.on_submit_register}
                  className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib'
                  type='submit'
                  value='Register'
                />
              </div>
            </div>
          </main>
        </article>
      </div>
    );
  }
}

export default Register;
