/*

HigherOderFunctionExamples

*/ 

const list = [];
function filterExample() {
    const canDrink_2 = list.filter(age => age >= 21);
}

function mapExample() {
    const ageMap = list
        .map(age => Math.sqrt(age))
        .map(age => age * 2);
}

function sortExample() {
    const sortedCompanies = list.sort((a, b) => 
        a.start > b.start ? 1 : -1
    );
}

function reduceExample() {
    const yearSum_ = list.reduce((total, c) => total + (c.end - c.start), 0);
}


// https://flaviocopes.com/how-to-iterate-object-properties-javascript/
// Iterate object properties 
Object.entries(items).map(item => {
  console.log(item)
})

Object.entries(items).forEach(item => {
  console.log(item)
})

for (const item of Object.entries(items)) {
  console.log(item)
}



// https://stackoverflow.com/questions/45100477/how-to-render-a-object-in-react
export default function App() {
  let record = {
    "ModuleID":1,
    "ModuleName":"Games Programming",
    "ModuleCode":"CI2277",
    "ModuleLevel":4,
    "ModuleLeaderID":1,
    "ModuleImage":"https://images.freeimages.com/images/small-previews/9b8/electronic-components-2-1242738.jpg"
  }
  
  delete record.Image

  const renderObject = () => {
    return ( 
      Object.entries(record).map(([key, value]) => {
        return (
          <div key={key}>
            {key.replace('Module', "")}: {value}
          </div>
        )
      })
    )
  }
  const renderObject2 = () => {
    return ( 
      JSON.stringify(record)
    )
  }

  return(
    <div>
      MODULE
      {renderObject()}
    </div>
  )
    
}