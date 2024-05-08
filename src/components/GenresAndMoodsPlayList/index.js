import {Link} from 'react-router-dom'
import './index.css'

const GenresAndMoodsPlayList = props => {
  const {genreList} = props

  const {icons, id} = genreList

  const {url} = icons[0]

  return (
    <Link to={`/genre/${id}`}>
      <li className="genre-mood-images-container">
        <div>
          <img src={url} alt="category" className="genre-moods-images" />
        </div>
      </li>
    </Link>
  )
}
export default GenresAndMoodsPlayList
