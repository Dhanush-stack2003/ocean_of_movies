import { Link } from 'react-router-dom';
import './header.css'
import { MdWatchLater } from "react-icons/md";
import { FaHeart } from "react-icons/fa";

const Header = () => {

  return (
    <div className="header">
      <Link to="/watchlist">
        <div className="watchList_container">
          <MdWatchLater />
          <p>Watch List</p>
        </div>
      </Link>

      <Link to="/fav-list">
        <div className='likedMovie_container'>
          <FaHeart/>
          <p>Liked Movies</p>
        </div>
      </Link>
    </div>
  );
}

export default Header