const OnclickEditorsPicksPlayList = props => {
  const {editorsDetailedPicks} = props
  const {name, images} = editorsDetailedPicks
  const {url} = images[0]

  return (
    <li className="editor-images-container">
      <div>
        <img src={url} alt="featured playlist" className="editors-images" />
        <p className="editors-names">{name}</p>
      </div>
    </li>
  )
}
export default OnclickEditorsPicksPlayList
