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

/*

package.json
"startNodeMon": "nodemon react-scripts start",
"startAppTestNodeMon": "nodemon appTest.js",

*/ 