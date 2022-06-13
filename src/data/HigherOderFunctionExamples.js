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