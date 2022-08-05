import Card from './Card';
import { DeleteIcon, EditIcon, FavouriteIcon } from './Icon';
import './Module.css';
import Tooltip from './Tooltip';

function Module(props) {
 const record = props.record;
 
  const tooltip = (message, children) => {
    return (
      <Tooltip message={message}>
        {children}
      </Tooltip>
    )
  }
  const paragraph = (className, children) => {
    return (
      <p className={className}>
        {children}
      </p>
    )
  }

 return (
 <div className='module'>
  <Card key={record.ModuleID}>
   <img src={record.ModuleImageURL} alt=''></img>
   <p>{record.ModuleName}</p>
   {tooltip('Level',
      paragraph('moduleLevel',record.ModuleLevel)
    )
   }
   {tooltip('Code',
      paragraph('moduleCode',record.ModuleCode)
    )
   }
   <div className='icons'>
    <DeleteIcon 
      onIconClick={props.onIconClick} 
      onSelectModule={() => props.onSelectDeleteRecord()} 
    />
    <EditIcon
      onSelectModule={() => props.onSelectEditRecord()}
    />
    <FavouriteIcon 
      onUnfavourite={() => props.onUnfavourite()}
      onFavourite={() => props.onFavourite()} 
    />    
   </div>

  </Card>    
 </div>
 )
}


export default Module;