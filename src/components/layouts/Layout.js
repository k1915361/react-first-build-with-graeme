import Header from './Header';
import Navbar from './Navbar';
import Footer from './Footer';

import './Layout.css';

function Layout(props) {
    return (
      <div className="centrepane">
        <Header />
        <Navbar />
        <main>
            {props.children}
        </main> 
        <Footer />
      </div>
    );
  }
  
  export default Layout;