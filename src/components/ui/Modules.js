function Modules() {
    const modules = DUMMY_DATA;
    
    return (
        <div className='modules'>
            MODULES
            <br/>
            {modules.map((module) => (
                <Card module={module} key={module.moduleId} />
            ))}
        </div>
    )
}

export default Modules;