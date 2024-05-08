import {Component} from 'react'

import Cookies from 'js-cookie'

import NewReleasesPlayList from '../NewReleasesPlayList'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class NewReleasesRoute extends Component {
  state = {
    newplayLists: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getNewReleases()
  }

  getNewReleases = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis2.ccbp.in/spotify-clone/new-releases'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()

      const getArtists = data => ({
        externalUrls: data.external_urls,
        href: data.href,
        id: data.id,
        name: data.name,
        type: data.type,
        uri: data.uri,
      })

      const updatedData = fetchedData.albums.items.map(item => ({
        albumType: item.album_type,
        artists: getArtists(item.artists),
        availableMarkets: item.available_markets,
        spotify: item.external_urls.spotify,
        href: item.href,
        id: item.id,
        images: item.images,
        name: item.name,
        releaseDate: item.release_date,
        releaseDatePrecision: item.release_date_precision,
        totalTracks: item.total_tracks,
        uri: item.uri,
      }))

      // const updatedData = fetchedData.albums.map(each => ({
      //   href: each.href,
      //   items: itemsData2,
      //   limit: each.limit,
      //   next: each.next,
      //   offset: each.offset,
      //   previous: each.previous,
      //   total: each.total,
      // }))
      this.setState({
        newplayLists: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  renderProductsList = () => {
    const {newplayLists} = this.state
    return (
      <>
        <h1 className="newreleases-heading">New releases</h1>
        <ul className="images-container">
          {newplayLists.map(eachRelease => (
            <NewReleasesPlayList
              newPlayList={eachRelease}
              key={eachRelease.id}
            />
          ))}
        </ul>
      </>
    )
  }

  failureView = () => (
    <div>
      <img
        src="https://res.cloudinary.com/debrk14uy/image/upload/v1714556953/NotFound_Icon_pjysc5.png"
        alt="failure view"
      />
      <p className="retry-heading">Something went wrong. Please try again </p>
      <button className="retry-btn" type="button">
        Try again
      </button>
    </div>
  )

  renderLoader = () => (
    <div data-testid="loader">
      <h1>New releases</h1>
      <img
        src="https://res.cloudinary.com/debrk14uy/image/upload/v1713351895/music_1x_wtcjng.png"
        alt="headerImg"
      />
      <h1>Loading...</h1>
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductsList()
      case apiStatusConstants.failure:
        return this.failureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }
}

export default NewReleasesRoute
