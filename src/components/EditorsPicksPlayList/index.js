import {Link} from 'react-router-dom'

import './index.css'

const EditorsPicksPlayList = props => {
  const {editorsPicks} = props
  const {name, images, id} = editorsPicks
  const {url} = images[0]

  return (
    <Link to={`/editors/${id}`}>
      <li className="editor-images-container">
        <div>
          <img src={url} alt="featured playlist" className="editors-images" />
          <p className="editors-names">{name}</p>
        </div>
      </li>
    </Link>
  )
}
export default EditorsPicksPlayList
