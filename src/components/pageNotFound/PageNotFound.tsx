import {useNavigate} from 'react-router-dom'
import './pageNotFound.css'

const PageNotFound = () => {
    const navigate = useNavigate();
  return (
    <div className='four0four'>
      <p>Page not found</p>
      <button onClick={() => navigate('/')} className="go_back">
        Go Back
      </button>
    </div>
  );
}

export default PageNotFound