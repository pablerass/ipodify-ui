import React, { Component } from 'react';

import { Button, Table } from 'react-bootstrap';


class Playlists extends Component {
  constructor() {
    super()
    this.state = {
      isLoaded: false,
      playlists: []
    }
  }

  componentDidMount() {
    fetch("http://localhost:5000/playlists", { credentials: 'include' })
      .then((response) => {
        if (response.status === 200) {
          // TODO: Find a better way to manage errors
          response.json().then((result) => {
            this.setState({
              isLoaded: true,
              playlists: result.playlists
            });
          })
        } else {
          // TODO: Raise error and break things
        }
      })
  }

  addPlaylist() {
    fetch('http://localhost:5000/playlists', {
        credentials: 'include',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'name' }),
    })
  }

  render() {
    const { isLoaded, playlists } = this.state;
    if (!isLoaded) {
      return <p>Loading...</p>
    } else {
      return (
        <div>
        <Button onClick={() => this.addPlaylist()}>Add</Button>
            <Table striped bordered hover size="sm">
              <tbody>
                {playlists.map((playlist) => {
                  return (
                    <tr key={playlist.name}>
                      <td>{playlist.name}</td>
                    </tr>
                  )
               })}
              </tbody>
            </Table>
        </div>
      )
    }
  }
}

export default Playlists;
