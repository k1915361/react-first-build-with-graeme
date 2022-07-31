import './Users.sass';
import tableOfUsers from '../../data/tableOfUsers'
import User from './User';
import { ListofUsers as users } from '../../data/users'

function Users() {
  // Properties
  const records = tableOfUsers

  // States

  // Context

  // Methods
 
  // View
  return (
    <div className='cardContainer'>
      <div className='title'>Users</div>

      {records.map((record) => (
        <User record={record} key={record.UserID}>
          
        </User>    
      ))}
    </div>
  )
}

export default Users;