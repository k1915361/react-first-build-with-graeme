import { useState, useEffect } from "react";
import "./Form.css";
import Tooltip from "./Tooltip.js";
import { Records, LoadingMessage } from "../../model/datafiles/getRecords";
import tableOfUsers from '../../model/datafiles/tableOfUsers.js';
import Accessor from '../../model/Accessor.js';
import Input from "./Input";
import InputSelect from "./InputSelect";


function Form(props) {
  // Properties
  let image, name, level, code, leaderId, id, leaderName;
  const recordType = props.recordType; // 'Module' 'User'
  const usersEndPointStr = 'Users';
  const endpointStr = 'Users';
  const userAccessor = new Accessor({endpointStr});
  
  //  MOVE TO MODULES
  const id_ = recordType+'ID'; // 'Module' or 'User' + 'ID'
  const imageurl_ = recordType+'ImageURL';   
  const name_ = recordType+'Name'; 
  const level_ = recordType+'Level'; 
  const code_ = recordType+'Code'; 
  const leaderid_ = recordType+'LeaderID'; 
  const leadername_ = recordType+'LeaderName'; 
  //  MOVE TO MODULES
  
  const [ moduleLeaders, setModuleLeaders ] = useState()
  
  const didMount = async () => {
    await userAccessor.list().then((result) => { setModuleLeaders(result.response) } )
  }

  useEffect(() => { didMount() }, [  ] )

  const users = moduleLeaders
  
  if (props.record) {
    const r = props.record;
    
    image = r[imageurl_];
    name = r[name_];
    level = r[level_];
    code = r[code_];
    leaderId = r[leaderid_];
    id = r[id_];
    leaderName = r[leadername_];
  }

  const endPoint = 'Users'
  const method = 'GET'
  const records = Records(endPoint, method)
  
  const ListofUsers = records
  
  // States
  const [record, setRecord] = useState(props.record ? props.record : '');
  
  // Methods
  const handleAdd = (event) => {
    setRecord({...record, [id_]: props.onGetNewRecordID()})
    handleAddRecord(record);
  };

  const handleWhichSubmit = (event) => {
    event.preventDefault();
    const { ModuleYearID, ModuleYearName, ModuleLeaderName, ...rest } = record
    props.record ? handleEdit(rest) : handleAdd(event);
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

  const getAddEditTooltipMessage = () => {
    return props.tooltipEdit ? props.tooltipEdit : "Add "+ recordType;
  };
  const getTitle = () => {
    return props.title ? props.title : "Add";
  };

//   const autoFillEditForm_ = () => {
//     if (
//       code &&
//       code !== record[strCode] &&
//       name !== record[strName] &&
//       level !== record[strLevel] &&
//       image !== record[strImageURL] &&
//       id !== record[strID]
//     ) {
//       setRecord({...record, 
//         [strCode]:code,
//         [strName]:name,
//         [strLevel]:level,
//         [strImageURL]:image,
//         [strLeaderID]:leaderId,
//         [strID]:id,    
//     })
//     }
//   };
//   autoFillEditForm_();

  const handleRecordValidations = (record) => {
    return props.onValidation(record);
  };

  const handleValueChange = (event) => {
    const target = event.target
    setRecord({ ...record, [target.id]: target.value });
  };

  // VIEW
  var moduleLevels = [3, 4, 5, 6, 7];

  return (
    <div className="form" key={id}>
      
    <Tooltip message={props.recordType +' '+props.formTitle+' Form'}>
       <div className="title" message={props.recordType +' '+props.formTitle}>{getTitle()}</div>
    </Tooltip>

      <form onSubmit={handleWhichSubmit}>

        <Input
         id={imageurl_}
         defaultValue={record[imageurl_]}
         onHandleValueChange={(event) => handleValueChange(event)} 
         placeholder='Image URL'
        />

        <Input
         id={name_}
         defaultValue={record[name_]}
         onHandleValueChange={(event) => handleValueChange(event)} 
         placeholder='Name'
        />

        <InputSelect
         message='Select Module Level'
         levels={moduleLevels}
         value={record[level_]}
         onKey={(l) => {return l}}
         onChange={(event) => handleValueChange(event)}
         visibleValue={l => l}
         id={level_}
         />

        <Input
         id={code_}
         message='Code CI4005'
         defaultValue={record[code_]}
         onHandleValueChange={(event) => handleValueChange(event)} 
         placeholder='Code'
        />

        <InputSelect
         message='Select Module Leader'
         levels={moduleLeaders}
         id={leaderid_}
         value={record[leaderid_]}
         onKey={(u) => {return parseInt(u.UserID)}}
         onChange={(event) => handleValueChange(event)}
         visibleValue={(u) => u.UserFirstname +' '+ u.UserLastname}
        />

        <Tooltip message={"Cancel"}>
            <button className="button" onClick={closeEditForm}>X</button>
        </Tooltip>

        <Tooltip message={getAddEditTooltipMessage()}>
            <button className="button">+</button>    
        </Tooltip>

      </form>
      
    </div>
  );
}

export default Form;
