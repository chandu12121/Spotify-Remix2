import {Component} from 'react'

import Cookies from 'js-cookie'

import OnclickNewreleasesItems from '../OnclickNewreleasesItems'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class OnClickNewreleasesPlaylist extends Component {
  state = {
    onClickNewReleasePicksList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getNewReleasesPlaylist()
  }

  getNewReleasesPlaylist = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params

    const api = `https://apis2.ccbp.in/spotify-clone/playlists-details/${id}`
    console.log(api)

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(api, options)
    if (response.ok) {
      const fetchedData = await response.json()

      const getOwnerData = data => ({
        displayName: data.display_name,
        externalUrls: data.external_urls,
      })

      const itemsData = fetchedData.playlists.items.map(item => ({
        href: item.href,
        id: item.id,
        name: item.name,
        collaborative: item.collaborative,
        description: item.description,
        externalUrls: item.external_urls,
        images: item.images,
        owner: getOwnerData(item.owner),
        primaryColor: item.primaryColor,
        public: item.public,
        snapshotId: item.snapshotId,
        tracks: item.tracks,
        type: item.type,
        uri: item.uri,
      }))

      const updatedData = {
        href: fetchedData.playlists.href,
        items: itemsData,
        limit: fetchedData.playlists.limit,
        next: fetchedData.playlists.next,
        offset: fetchedData.playlists.offset,
        previous: fetchedData.playlists.previous,
        total: fetchedData.playlists.total,
      }
      this.setState({
        onClickNewReleasePicksList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  renderProductsList = () => {
    const {onClickNewReleasePicksList} = this.state
    return (
      <div>
        <h1 className="editors-heading">Editors Pick</h1>
        <ul className="images-container">
          {onClickNewReleasePicksList.items.map(eachPick => (
            <OnclickNewreleasesItems
              newReleasesDetailedPicks={eachPick}
              key={eachPick.id}
            />
          ))}
        </ul>
      </div>
    )
  }

  failureView = () => (
    <div className="failure-container">
      <h1>Editors Pick</h1>
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

export default OnClickNewreleasesPlaylist
