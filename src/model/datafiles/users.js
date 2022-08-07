import { Records, RecordList, LoadingMessage } from './getRecords.js'

let UserList;

function Users() {
  // Properties
  
  const endPoint = 'Users'
  const method = 'GET'

  // Methods
  Records(endPoint, method)
  
  // Hooks

  return ( RecordList && RecordList )
}

const endPoint = 'Users'
const method = 'GET'

// Methods
Records(endPoint, method)

// export { Users as UserList, LoadingMessage };
export { RecordList as UserList, LoadingMessage };

export function Listof_Users() {
  if(UserList) 
    return UserList
}