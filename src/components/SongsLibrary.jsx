import { Component } from 'react';

import { Table } from 'react-bootstrap';


class Library extends Component {
  constructor() {
    super()
    this.state = {
      isLoaded: false,
      songs: []
    }
  }

  componentDidMount() {
    fetch("http://localhost:5000/library", { credentials: 'include' })
      .then((response) => {
        if (response.status === 200) {
          // TODO: Find a better way to manage errors
          response.json().then((result) => {
            this.setState({
              isLoaded: true,
              songs: result.songs
            });
          })
        } else {
          // TODO: Raise error and break things
        }
      })
  }

  render() {
    const { isLoaded, songs } = this.state;
    if (!isLoaded) {
      return <p>Loading...</p>
    } else {
      return (
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Name</th>
              <th>Artist</th>
              <th>Album</th>
            </tr>
          </thead>
          <tbody>
            {songs.map((song) => {
              return (
                <tr key={song.spotify_uri}>
                  <td>{song.name}</td>
                  <td>{song.artists.join(", ")}</td>
                  <td>{song.album}</td>
                </tr>
              )
           })}
          </tbody>
        </Table>
      )
    }
  }
}

export default SongsLibrary;
