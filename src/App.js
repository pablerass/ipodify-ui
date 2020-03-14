import React, { Component } from 'react';

import { Button, Navbar, NavDropdown } from 'react-bootstrap';

import './App.css';

function LoginButton() {
  return (
    <Button onClick={() => window.location.href = 'http://localhost:5000/login'}>Login</Button>
  )
}

class User extends Component {
  constructor() {
    super()
    this.state = {
      isLoaded: false,
      isLogedIn: false,
      user: ""
    }
  }

  componentDidMount() {
    fetch("http://localhost:5000/me", { credentials: 'include' })
      .then((response) => {
        if (response.status === 200) {
          response.json().then((result) => {
            this.setState({
              isLoaded: true,
              isLoggedIn: true,
              user: result.id
            });
          })
        } else if (response.status === 401) {
          this.setState({
            isLoaded: true,
            isLoggedIn: false
          });
        } else {
          // TODO: Raise error and break things
        }
      }
    )
  }

  render() {
    const { isLoaded, isLoggedIn, user } = this.state;
    if (!isLoaded) {
      return <p>Loading...</p>
    } else if (!isLoggedIn) {
      return <LoginButton />
    } else {
      return (
        <NavDropdown title={user} id="basic-nav-dropdown">
          <NavDropdown.Item>Log Out</NavDropdown.Item>
        </NavDropdown>
      )
    }
  }
}

function App() {
  return (
    <Navbar bg="primary">
      <Navbar.Brand href="#home">ipodify</Navbar.Brand>
      <User />
    </Navbar>
  );
}

export default App;
