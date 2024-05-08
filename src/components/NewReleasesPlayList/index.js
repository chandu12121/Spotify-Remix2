import {Link} from 'react-router-dom'

import './index.css'

const NewReleasesPlayList = props => {
  const {newPlayList} = props

  const {name, images, id} = newPlayList
  const {url} = images[0]

  return (
    <Link to={`/newReleases/${id}`}>
      <li className="newreleases-images-container">
        <div>
          <img
            src={url}
            alt="new release album"
            className="newreleases-images"
          />
          <p className="newreleases-names">{name}</p>
        </div>
      </li>
    </Link>
  )
}
export default NewReleasesPlayList
