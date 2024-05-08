import {Component} from 'react'

import Cookies from 'js-cookie'

import OnclickEditorsPicksPlayList from '../OnclickEditorsPicksPlayList'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class OnClickEditorsPlaylist extends Component {
  state = {
    onClickeditorsPicksList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getEditordPicksPlaylist()
  }

  getEditordPicksPlaylist = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params

    const api = `https://apis2.ccbp.in/spotify-clone/playlists-details/${id}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(api, options)
    if (response.ok) {
      const fetchedData = await response.json()
      console.log(fetchedData.tracks.items)

      const getTrack = data => ({
        album: data.album,
        artists: data.artists,
        availableMarkets: data.available_markets,
        externalUrls: data.external_urls,
        href: data.href,
        id: data.id,
        images: data.images,
        name: data.name,
        releaseDate: data.release_date,
        releaseDatePrecision: data.release_date_precision,
        totalTracks: data.total_tracks,
        type: data.type,
        uri: data.uri,
      })

      const updatedData = fetchedData.tracks.items.map(item => ({
        addedAt: item.added_at,
        addedBy: item.added_by,
        isLocal: item.is_local,
        primaryColor: item.primary_color,
        track: getTrack(item.track),
        videoThumbnail: item.video_thumbnail,
      }))

      this.setState({
        onClickeditorsPicksList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  renderProductsList = () => {
    const {onClickeditorsPicksList} = this.state
    return (
      <div>
        <h1 className="editors-heading">Editor's Pick</h1>
        <ul className="images-container">
          {onClickeditorsPicksList.items.map(eachPick => (
            <OnclickEditorsPicksPlayList
              editorsDetailedPicks={eachPick}
              key={eachPick.id}
            />
          ))}
        </ul>
      </div>
    )
  }

  failureView = () => (
    <div className="failure-container">
      <h1>Editor's Pick</h1>
      <img
        src="https://res.cloudinary.com/debrk14uy/image/upload/v1714556953/NotFound_Icon_pjysc5.png"
        alt="failure view"
        className="failure-img"
      />
      <p className="retry-heading">Something went wrong. Please try again </p>
      <button className="retry-btn" type="button">
        Try again
      </button>
    </div>
  )

  renderLoader = () => (
    <div className="products-loader-container" data-testid="loader">
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

export default OnClickEditorsPlaylist
