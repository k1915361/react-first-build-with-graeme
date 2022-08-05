import './Users.sass';
import tableOfUsers from '../../model/datafiles/tableOfUsers'
import User from './User';
import { UsersPage , ListofUsers as users } from '../../model/datafiles/users'
import { useState } from 'react';
import Edit from './Edit';

function Users() {
  // Properties
  // const records = tableOfUsers

  // States
  const [ selectedId , selectId ] = useState();
  const [ editing, setEditing ] = useState(null);
  const [ records, setRecords ] = useState(tableOfUsers)
  
  // Context

  // Methods
  const isEditing = (id) => {
    return id === selectedId;
  }
  
  const editRecord = (record) => {
    const id = record.UserID
    const newRecords = records.map(r => {
        if(r.UserID === id) {
            return record
        }
        return r;
    });

    setRecords(newRecords);
  }

  const closeEditForm = () => {
    setEditing(null);
  }

  // View
  return (
    <div className='cardContainer'>
      <div className='title'>Users</div>
      {
        records.map((record) => (
          isEditing(record.UserID) 
          ? 
          <Edit
            key={record.UserID}
            onCloseEditForm={() => closeEditForm()} 
            record={record}
            onEdit={(record) => editRecord(record)}
          />
          : 
          <User onIsEditing={() => selectId(record.UserID)} isEditing={isEditing} record={record} key={record.UserID}>
            
          </User>    
        ))  
      }
    </div>
  )
}

export default Users;