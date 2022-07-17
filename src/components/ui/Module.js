import Card from './Card';
import { DeleteIcon, EditIcon, FavouriteIcon } from './Icon';
import './Module.css';
import Tooltip from './Tooltip';

function Module(props) {
 const module = props.module;
 return (
 <div className='module'>
  <Card key={module.ModuleID}>
   <img src={module.ModuleImageURL} alt=''></img>
   <p>{module.ModuleName}</p>
   
   <Tooltip message='Level'>
    <p className='moduleLevel'>{module.ModuleLevel}</p>
   </Tooltip>
   
   <Tooltip message='Code'>
    <p className='moduleCode'>{module.ModuleCode}</p>
   </Tooltip>
   
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
  </Card>    
 </div>
 )
}


export default Module;