import API from '../components/api/API.js';

class Accessor {
  constructor(props){  
    // this.accessor = props.accessorType  // modules, users, etc...
    this.endpointStr = props.endpointStr
    this.record = props.record
    this.id = props.id
    this.endpointId = props.endpointStr +'/'+ props.id
    this.endpointSlash = props.endpointStr +'/'
    this.getEndpoint = (id) => { return `${props.endpointStr}/${id}` }
    // console.log(this.endpointStr)
    // console.log(this.getEndpoint(1))
  }

  // getEndpoint = (id) => {
  //   return this.endpointStr +'/'+ id
  // }


  create = (record) => API.post( this.accessorStr, record );
  read = (id) => API.get( this.getEndpoint(id) );
  update = (id, record) => API.put( this.getEndpoint(id), record );
  delete = (id) => API.delete( this.getEndpoint(id) );
  list = () => API.get( this.accessorStr );
}

export default Accessor;