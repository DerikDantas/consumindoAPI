import React, { Component } from 'react'

import './app.css'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      photos: [],
      isLoading: false,
      isError: false
    }
  }

  async componentDidMount() {
    this.setState({ isLoading: true })

    const response = await fetch("https://jsonplaceholder.typicode.com/photos")

    if (response.ok) {
      const photos = await response.json()
      this.setState({ photos, isLoading: false })
    } else {
      this.setState({ isError: true, isLoading: false })
    }
  }


  renderPhotos = () => {
    return this.state.photos.map(photos => {
      return (
        <div key={photos.id} className="card">
          <img src={photos.url} alt="..." />
          <div className="title">
            <h1>{photos.title}</h1>
          </div>
        </div>
      )
    })
  }

  render() {
    const { photos, isLoading, isError } = this.state

    if (isLoading) {
      return <div>Carregando...</div>
    }

    if (isError) {
      return <div>Error...</div>
    }

    return photos.length > 0
      ? (
        <div class="container-card">{this.renderPhotos()}</div>
      ) :
      (
        <div>No users</div>
      )

  }
}

export default App;