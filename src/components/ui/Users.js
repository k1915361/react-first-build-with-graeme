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
  
  const recordName = 'Users'
  const id_ = `${recordName}ID`; 
  const fname_ = `${recordName}Firstname`; 
  const lname_ = `${recordName}Lastname`; 
  const email_ = `${recordName}Email`; 
  const password_ = `${recordName}Password`; 
  const registered_ = `${recordName}Registered`; 
  const typeid_ = `${recordName}UsertypeID`; 
  const level_ = `${recordName}Level`; 
  const image_ = `${recordName}ImageURL`;

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
  const handleAdd = async (record) => {
    consolelog = await accessor.create(record);
    didMount()
  }

  const handleModify = async (record) => {
    consolelog = await accessor.update(record[id_], record);
    
    consolelog.success
      ? didMount()
      : console.log(consolelog.response);
    console.log(record, 'asdfg')
  }

  const handleDelete = async (id) => {
    consolelog = await accessor.delete(id);
    didMount()
  }

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
      record={record}
      onCloseEditForm={() => closeEditForm()} 
      onEdit={(record) => handleModify(record)}
      key={record[id_]}
      recordType='User'
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
            record={record}
            onCloseEditForm={() => closeEditForm()} 
            onEdit={(record) => handleModify(record)}
            key={record[id_]}
            recordType='User'      
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