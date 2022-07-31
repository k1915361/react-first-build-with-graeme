import Modules from '../ui/Modules';
import User from '../ui/UserCurrent';
import Users from '../ui/Users';

function Home() {
    
    return (
        <div>
            <h1>Home</h1>
            <Users />
            <User />
            <Modules />
        </div>
    )
}

export default Home;