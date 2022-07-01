import './Header.css';
import './Footer.css';
import { Link } from 'react-router-dom';

function Header() {
    
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
            </div>
    </header>
  );
}
  
  export default Header;