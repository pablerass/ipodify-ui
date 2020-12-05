import React, { Component } from 'react';

import { Button, Col, Container, Navbar, NavDropdown, Row } from 'react-bootstrap';
import Playlists from './components/Playlists';

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
          // TODO: Find a better way to manage errors
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
      })
  }

  logOut() {
    window.location.href = 'http://localhost:5000/logout'
  }

  render() {
    const { isLoaded, isLoggedIn, user } = this.state;
    if (!isLoaded) {
      return <LoginButton />
    } else if (!isLoggedIn) {
      return <LoginButton />
    } else {
      return (
        <NavDropdown title={user} alignRight id="dropdown-menu-align-right">
          <NavDropdown.Item onClick={() => this.logOut()}>Log Out</NavDropdown.Item>
        </NavDropdown>
      )
    }
  }
}

function App() {
  return (
    <div>
      <Navbar>
        <Navbar.Brand>ipodify</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <User />
        </Navbar.Collapse>
      </Navbar>
      <Container>
        <Row>
          <Col>
            <Playlists />
          </Col>
          <Col>2 of 3</Col>
          <Col>3 of 3</Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
