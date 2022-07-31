import './Users.sass';
import tableOfUsers from '../../data/tableOfUsers'
import User from './User';

function Users() {
  // Properties
  const records = tableOfUsers

  // States

  // Context

  // Methods
 
  // View
  return (
    <div className='cardContainer'>
      <div>Users</div>

      {records.map((record) => (
        <User record={record}>
            
        </User>    
      ))}
    </div>
  )
}

export default Users;