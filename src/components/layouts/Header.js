import './Header.css';
import './Footer.css';
import { Link } from 'react-router-dom';
import tableOfUsers from '../../model/datafiles/tableOfUsers';
import Tooltip from '../ui/Tooltip';

function Header() {
  
  let user = tableOfUsers[0]
  const image = user.UserImageURL
  // const { UserImageURL, UserID, UserLastname, UserEmail, UserPassword, UserRegistered, UserUsertypeID, UserLevel} 
  //   = user
  user = {...user}
  delete user.UserImageURL

  // View
  return (
    <header>
        <Link to="/">
          <img src="https://img.icons8.com/ios-filled/50/000000/conference-call.png" alt="Icon showing group" />
        </Link>
        <Link to="/">
          <h1>React First Build</h1>
        </Link>
        <div className="login">
          <p>Welcome Aang!</p>
          <Tooltip message={JSON.stringify(user) } >
            <img src={image} alt="Icon showing group" />
          </Tooltip>
        </div>
    </header>
  );
}
  
  export default Header;