import './Users.sass';
import tableOfUsers from '../../model/datafiles/tableOfUsers.js'
import User from './User.js';
// import { UserList, LoadingMessage } from '../../model/datafiles/users.js'
import { useState } from 'react';
import Edit from './Edit.js';
import { Records, LoadingMessage } from '../../model/datafiles/getRecords';

function Users() {
  // Properties
  // const records = tableOfUsers
  const endPoint = 'Users'
  const method = 'GET'
  const getRecords = Records(endPoint, method)
  const loadingMessage = LoadingMessage && LoadingMessage

  // States
  const [ selectedId , selectId ] = useState();
  const [ editing, setEditing ] = useState(null);
  const [ records, setRecords ] = useState(tableOfUsers)
  const recordType = 'user'

  // Methods
  
  console.log(getRecords)

  // console.log(UserList())
  // console.log(UserList)

  // console.log(UserList && UserList)

  // console.log(editing)

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
  
  const openEditForm = (record) => {
    return (
    <Edit 
      key={record[recordType+'ID']}
      onCloseEditForm={() => closeEditForm()} 
      record={record}
      onEdit={(record) => editRecord(record)}
      recordType='Module'
    />
    )
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
          <User 
            onIsEditing={() => selectId(record.UserID)} 
            isEditing={isEditing} 
            record={record} 
            key={record.UserID}
            openEditForm={(record) => openEditForm(record)}
          >  
          </User>    
        ))  
      }
    </div>
  )
}

export default Users;