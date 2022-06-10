import './Module.css';
import DUMMY_DATA from '../../data/data.js';

function Module() {
    return (
        <Card>
        <div className='module'>
            {DUMMY_DATA.map(module => {
                {key=module.moduleId}
                {module.moduleName}
                {module.moduleCode}
                {module.moduleDetail}
            })}
        </div>
        </Card>
    )
}

export default Module;