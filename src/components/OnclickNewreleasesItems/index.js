import {Link} from 'react-router-dom'

const OnclickNewreleasesItems = props => {
  const {newReleasesDetailedPicks} = props
  const {name, images, id} = newReleasesDetailedPicks
  const {url} = images[0]

  return (
    <Link to={`/newReleases/:${id}`}>
      <li className="editor-images-container">
        <div>
          <img src={url} alt="featured playlist" className="editors-images" />
          <p className="editors-names">{name}</p>
        </div>
      </li>
    </Link>
  )
}
export default OnclickNewreleasesItems
