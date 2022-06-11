import './Module.css';
import { DUMMY_DATA } from '../../data/data.js';
import Card from './Card';

function Module() {
    return (
        <div className='module'>
            MODULES
            {DUMMY_DATA.map((module) => (
            <Card>
                <img src={module.image}></img>
                <p>{module.moduleName}</p>
                <p className='moduleCode'>{module.moduleCode}</p>
                <p className='moduleDetail'>{module.moduleDetail}</p>
            </Card>
            ))}
        </div>
    )
}

export default Module;