import React from "react";
import "./SignIn.css";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sign_in_email: "",
      sign_in_password: "",
    };
  }

  on_email_change = (event) => {
    this.setState({ sign_in_email: event.target.value });
  };

  on_password_change = (event) => {
    this.setState({ sign_in_password: event.target.value });
  };

  on_submit_sign_in = () => {
    console.log(this.state);
    fetch("https://guarded-cliffs-74542.herokuapp.com/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.sign_in_email,
        password: this.state.sign_in_password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.id) {
          this.props.load_user(data);
          this.props.on_route_change("home");
        }
      });
  };

  render() {
    const { on_route_change } = this.props;
    return (
      <div>
        <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 glass-box center">
          <main className="pa4 black-80">
            <div className="measure">
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f4 fw6 ph0 mh0 center">Sign In</legend>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="email-address">
                    Email
                  </label>
                  <input
                    onChange={this.on_email_change}
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="email"
                    name="email-address"
                    id="email-address"
                  />
                </div>
                <div className="mv3">
                  <label className="db fw6 lh-copy f6" htmlFor="password">
                    Password
                  </label>
                  <input
                    onChange={this.on_password_change}
                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="password"
                    name="password"
                    id="password"
                  />
                </div>
              </fieldset>
              <div className="tc">
                <input
                  onClick={this.on_submit_sign_in}
                  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                  type="submit"
                  value="Sign in"
                />
              </div>
              <div className="lh-copy mt3 tc">
                <p
                  onClick={() => on_route_change("register")}
                  className="f6 link dim black db pointer"
                >
                  Register
                </p>
              </div>
            </div>
          </main>
        </article>
      </div>
    );
  }
}

export default SignIn;
