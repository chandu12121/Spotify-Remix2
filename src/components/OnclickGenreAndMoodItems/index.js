import {Link} from 'react-router-dom'

const OnclickGenreAndMoodItems = props => {
  const {genreAndMoodsDetailedPicks} = props
  const {name, images, id} = genreAndMoodsDetailedPicks
  const {url} = images[0]

  return (
    <Link to={`/genre/:${id}`}>
      <li className="editor-images-container">
        <div>
          <img src={url} alt="featured playlist" className="editors-images" />
          <p className="editors-names">{name}</p>
        </div>
      </li>
    </Link>
  )
}
export default OnclickGenreAndMoodItems
