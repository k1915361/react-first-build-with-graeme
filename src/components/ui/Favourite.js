import Card from './Card';

function Favourite(props) {
    // Properties ----------------------------------
    const module = props.module;

    // View ----------------------------------------
    return (
        <div>
            <Card module={module} key={module.ModuleID}/> 
        </div>
    )
}

export default Favourite;