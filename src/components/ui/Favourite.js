import Card from './Card';

function Favourite(props) {
    // Properties ----------------------------------
    const module = props.module;

    // Hooks ---------------------------------------
    // Context -------------------------------------
    // Methods -------------------------------------

    // View ----------------------------------------
    return (
        <div>
            <Card module={module} key={module.ModuleID}/> 
        </div>
    )
}

export default Favourite;