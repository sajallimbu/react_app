import React from "react";
import axios from "axios";

const initialState = {
  email: "",
  password: "",
  emailError: "",
  passwordError: "",
};

export default class LoginForm extends React.Component {
  state = initialState;

  // change handler
  handleChange = (event) => {
    console.log(event.target.name);
    this.setState({
      // event.target.name is your prop name i.e. email or password in the name tag of the html
      // here we set the value for the name tag to whatever you type
      // the input is controlled in the sense that the state is always watching your typed value
      [event.target.name]: event.target.value,
    });
  };

  // submit handler
  handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      const url = "http://localhost:8080/login";
      let userEmail = this.state.email;
      let userPassword = this.state.password;
      const requestBody = {
        email: userEmail,
        password: userPassword,
      };
      const options = {
        headers: { "Content-Type": "application/json" },
      };
      // FYI your login POST request in backend should allow OPTIONS in it's methods
      // cause we send two request here one is our request body and the second is options
      // i.e. two requests are send in sequence
      await axios
        .post(url, JSON.stringify(requestBody), options)
        .then((response) => {
          if (response.status === 200) {
            alert("Logged in successfully");
            // reset the form
            this.setState(initialState);
          }
        })
        .catch((error) => {
          console.log(error.stringify);
        });
    }
  };

  validate = () => {
    let emailError = "";
    let passwordError = "";

    // error if the string is not an email
    if (!this.state.email.includes("@")) {
      emailError = "Invalid email";
    }
    // error if the string is empty
    if (!this.state.email) {
      emailError = "Email cannot be empty";
    }
    // error if the password is empty
    if (!this.state.password) {
      passwordError = "Password cannot be empty";
    }
    // if there are errors set the state accordingly
    if (emailError || passwordError) {
      this.setState({ emailError, passwordError });
      // return false since the form is not valid
      return false;
    }
    // return true if the form is valid
    return true;
  };

  render() {
    return (
      <div className="w-full max-w-xs mx-auto">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={this.handleSubmit}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            {this.state.emailError ? (
              <div
                className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-2"
                role="alert"
              >
                {this.state.emailError}
              </div>
            ) : null}
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="password"
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            {this.state.passwordError ? (
              <div
                className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-2"
                role="alert"
              >
                {this.state.passwordError}
              </div>
            ) : null}
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    );
  }
}
