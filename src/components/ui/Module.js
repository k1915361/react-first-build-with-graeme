import Card from './Card';
import { DeleteIcon, EditIcon, FavouriteIcon } from './Icon';
import './Module.css';
import Tooltip from './Tooltip';

function Module(props) {
 const module = props.module;
 
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
  <Card key={module.ModuleID}>
   <img src={module.ModuleImageURL} alt=''></img>
   <p>{module.ModuleName}</p>
   {tooltip('Level',
      paragraph('moduleLevel',module.ModuleLevel)
    )
   }
   {tooltip('Code',
      paragraph('moduleCode',module.ModuleCode)
    )
   }
   <div className='icons'>
    <DeleteIcon 
      onIconClick={props.onIconClick} 
      onSelectModule={() => props.onSelectDeleteModule()} 
    />
    <EditIcon
      onSelectModule={() => props.onSelectEditModule()}
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