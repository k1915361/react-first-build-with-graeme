import './Header.css';
import './Footer.css';

function Header() {
    return (
      <header>
          <a>
            <img src="https://img.icons8.com/ios-filled/50/000000/conference-call.png" alt="Icon showing group" />
          </a>
          <h1>React First Build</h1>
          <div className="login">
            <p>Welcome Eugene!</p>
          </div>
      </header>
    );
  }
  
  export default Header;