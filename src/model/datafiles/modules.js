import { Records, LoadingMessage } from './getRecords.js'

let ModuleList;

function Modules() {
  // Properties
  
  const endPoint = 'Modules'
  const method = 'GET'

  // Methods
  
  return( Records(endPoint, method) )
  // Hooks
}

export { Modules as RecordList, LoadingMessage };

export function Listof_Users() {
  if(ModuleList) 
    return ModuleList
}