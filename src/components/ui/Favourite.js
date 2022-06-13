import Card from './Card';

function Favourite(props) {
    const modules = props.modules;
    const favourite = props.favourite-1;

    const module = modules[favourite];

    return (
        <div>
            <Card module={module} key={module.id}/> 
        </div>
    )
}

export default Favourite;