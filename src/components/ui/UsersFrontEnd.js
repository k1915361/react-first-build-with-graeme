import './Users.sass';
import tableOfUsers from '../../model/datafiles/tableOfUsers.js'
import User from './User.js';
// import { UserList, LoadingMessage } from '../../model/datafiles/users.js'
import { useState, useEffect } from 'react';
import Edit from './Edit.js';
import { Records, LoadingMessage } from '../../model/datafiles/getRecords';
import Accessor from '../../model/Accessor.js'

function Users() {
  // Properties
  const endPoint = 'Users'
  const method = 'GET'
  const getRecords = Records(endPoint, method)
  const loadingMessage = LoadingMessage && LoadingMessage
  const endpointStr = 'Users'
  const accessor = new Accessor({endpointStr})
  const recordType = 'user'
  
  // States
  const [ selectedId , selectId ] = useState();
  const [ editing, setEditing ] = useState(null);

  const [ test, setTest ] = useState()
  
  const didMount = () => {
    accessor.list().then((result) => { 
      setTest(result.response) 
    } )
  }
  
  useEffect(() => { didMount() }, [  ] )

  const [ recordss, setRecords ] = useState(test)
  
  let records = test
  let consolelog = test && test


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

  consolelog && console.log( consolelog )

  
  // View
  return (
    <div className='cardContainer'>
      <div className='title'>Users</div>
      {
        records && records.map((record) => (
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