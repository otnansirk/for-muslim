import { faviconURL } from "../../../utils/Helpers"

const FavoriteSite = () => {
    return (
        <div className='favorite-site'>
            <ul>
                <li className="" draggable>
                    <img src={faviconURL("www.google.com")} className="favicon" />
                    <span>Google</span>
                </li>
            </ul>
        </div>
    )
}

export default FavoriteSite