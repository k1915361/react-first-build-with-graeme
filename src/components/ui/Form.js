import { useState, useEffect } from "react";
import "./Form.css";
import Tooltip from "./Tooltip.js";
import { Records, LoadingMessage } from "../../model/datafiles/getRecords";
import tableOfUsers from '../../model/datafiles/tableOfUsers.js';
import Accessor from '../../model/Accessor.js';


function Form(props) {
  // Properties
  let image, name, level, code, leaderId, id;
  const recordType = props.recordType; // 'Module' 'User'
  const usersEndPointStr = 'Users';
  const endpointStr = 'Users';
  const userAccessor = new Accessor({endpointStr});
  
  //  MOVE TO MODULES
  const strID = recordType+'ID'; // 'Module' or 'User' + 'ID'
  const strImageURL = recordType+'ImageURL';   
  const strName = recordType+'Name'; 
  const strLevel = recordType+'Level'; 
  const strCode = recordType+'Code'; 
  const strLeaderID = recordType+'LeaderID'; 
  //  MOVE TO MODULES
  
  const [ test, setTest ] = useState()
  let data
  const didMount = async () => {
    await userAccessor.list().then((result) => { setTest(result.response) } )
  }

  useEffect(() => { didMount() }, [  ] )

  const modules = test 
  
  if (props.record) {
    const r = props.record;
    
    image = r[strImageURL];
    name = r[strName];
    level = r[strLevel];
    code = r[strCode];
    leaderId = r[strLeaderID];
    id = r[strID];
  }

  const endPoint = 'Users'
  const method = 'GET'
  const records = Records(endPoint, method)
  
  const ListofUsers = records
  
  // States
  const [record, setRecord] = useState('');
  
  // Methods
  const editProperty = (property, value) => {
    setRecord({ ...record, [property]: value })
  }

  const handleAdd = (e) => {
    setRecord({...record, [strID]: props.onGetNewRecordID()})
    // console.log(record)
    handleAddRecord(record);
  };

  const handleWhichSubmit = (e) => {
    e.preventDefault();
    props.record ? handleEdit(record) : handleAdd(e);
  };

  const handleEdit = (record) => {
    props.onEdit(record);
    closeEditForm();
  };

  const closeEditForm = () => {
    props.onCloseEditForm();
  };

  const handleAddRecord = (record) => {
    if (handleRecordValidations(record)) {
      props.onAddRecord(record);
    }
  };

  const getTitleTooltipMessage = () => {
    return props.tooltipTitle ? props.tooltipTitle : "Add "+ recordType +" Form";
  };
  const getAddEditTooltipMessage = () => {
    return props.tooltipEdit ? props.tooltipEdit : "Add "+ recordType;
  };
  const getTitle = () => {
    return props.title ? props.title : "Add";
  };

  const autoFillEditForm_ = () => {
    if (
      code &&
      code !== record[strCode] &&
      name !== record[strName] &&
      level !== record[strLevel] &&
      image !== record[strImageURL] &&
      id !== record[strID]
    ) {
      setRecord({...record, 
        [strCode]:code,
        [strName]:name,
        [strLevel]:level,
        [strImageURL]:image,
        [strLeaderID]:leaderId,
        [strID]:id,    
    })
    }
  };
  autoFillEditForm_();

  const onValidation = (module) => {
    return props.onValidation(module);
  }

  const handleRecordValidations = (record) => {
    return props.onValidation(record);
  };

  const handleValueChange = (target) => {
    setRecord({ ...record, [target.id]: target.value });
  };

  const TooltipInput = (id, message, value, placeholder) => {
    return (
      <Tooltip message={message}>
        <input
          id={id}
          type="text"
          placeholder={placeholder}
          // value={value}
          defaultValue={value}
          onChange={(e) => handleValueChange(e.target)}
        />
      </Tooltip>
    );
  };

  const tooltip = (message, children) => {
    return (
      <Tooltip message={message}>
        {children}
      </Tooltip>
    )
  }

  // VIEW
  var moduleLevels = [3, 4, 5, 6, 7];

  return (
    <div className="form" key={id}>
      {tooltip(
        getTitleTooltipMessage(),
        <div className="title">{getTitle()}</div>
      )}

      <form onSubmit={handleWhichSubmit}>
        
        {TooltipInput(
          strImageURL,
          recordType+" Image URL",
          record[strImageURL],
          "Image"
        )}

        {TooltipInput(
          'ModuleName',
          onValidation(record) 
          ? "Module Name" : "Module Name e.g. Database",
          record[strName], 
          'Name'
        )}

        {tooltip(
          'Select Module Level',
          <select
            id={'ModuleLevel'}
            value={record[strLevel]}
            placeholder={record ? record[strLevel] : "Level"}
            onChange={(e) => handleValueChange(e.target)}
          >
            {moduleLevels.map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>          
        )}
        
        {TooltipInput(
          strCode,
          onValidation(record) 
            ? recordType+" Code" 
            : recordType+" Code e.g. CI0123",
          record[strCode],
          "Code",
        )}

        {tooltip(
          "Select Module Leader",
          <select
            key={strLeaderID}  
            id={strLeaderID}
            value={record[strLeaderID]}
            onChange={(e) => handleValueChange(e.target)}
          >
            {ListofUsers ? (
              ListofUsers.map((u) => (
                <option value={parseInt(u.UserID)} key={u.UserID}>
                  {u.UserFirstname} {u.UserLastname}
                </option>
              ))
            ) : (
              <option>Loading Module Leaders</option>
            )}
          </select>
        )}

        {tooltip(
          "Cancel",
          <button className="button" onClick={closeEditForm}>
            X
          </button>
        )}

        {tooltip(
          getAddEditTooltipMessage(),
          <button className="button">+</button>
        )}
      </form>
    </div>
  );
}

export default Form;
