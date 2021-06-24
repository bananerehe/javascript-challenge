// from data.js
var tableData = data;

// Select button
let btn = d3.select("#filter-btn");

// Select form
let frm = d3.select("form");

// Create event handlers
btn.on("click", runEnter);
frm.on("submit", runEnter);

// Create function to convert date format
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    return [month, day, year].join('/');
}

// City data
let cityArr = tableData.map(ufodata => ufodata.city);
let uniqueCity = cityArr.filter((item, i, ar) => ar.indexOf(item) === i);
console.log(uniqueCity);
uniqueCity.forEach(city => d3.select("#citySelect").append("option").text(city));

// State data
let stateArr = tableData.map(ufodata => ufodata.state);
let uniqueState = stateArr.filter((item, i, ar) => ar.indexOf(item) === i);
console.log(uniqueState);
uniqueState.forEach(state => d3.select("#stateSelect").append("option").text(state));

// Country data
let countryArr = tableData.map(ufodata => ufodata.country);
let uniqueCountry = countryArr.filter((item, i, ar) => ar.indexOf(item) === i);
console.log(uniqueCountry);
uniqueCountry.forEach(country => d3.select("#countrySelect").append("option").text(country));

// Shape data
let shapeArr = tableData.map(ufodata => ufodata.shape);
let uniqueShape = shapeArr.filter((item, i, ar) => ar.indexOf(item) === i);
console.log(uniqueShape);
uniqueShape.forEach(shape => d3.select("#shapeSelect").append("option").text(shape));

// Get reference to table body
var tbody = d3.select("tbody");

// Create function to run for both events
function runEnter () {

    // Prevent page refresh
    d3.event.preventDefault();

    // Select input element and get value property
    let enterDate = d3.select("#datetime").property("value");

    // Print value
    enterDate=formatDate(enterDate);
    console.log(enterDate);

    // Dropdown selections
    let chooseCity = d3.select("#citySelect").node().value;
    let chooseState = d3.select("#stateSelect").node().value;
    let chooseCountry = d3.select("#countrySelect").node().value;
    let chooseShape = d3.select("#shapeSelect").node().value;

    console.log(chooseCity, chooseState, chooseCountry, chooseShape);

    // Filter by selected conditions
    let filteredDate=tableData
        .filter(ufoInfo => ufoInfo.datetime==enterDate)
        .filter(ufoInfo => ufoInfo.city==chooseCity || chooseCity=='all')
        .filter(ufoInfo => ufoInfo.state==chooseState || chooseState=='all')
        .filter(ufoInfo => ufoInfo.country==chooseCountry || chooseCountry=='all')
        .filter(ufoInfo => ufoInfo.shape==chooseShape || chooseShape=='all');
    console.log(filteredDate);
    
    // Clear table row element
    d3.selectAll('#ufo-table>tbody>tr').remove();

    // Append table content
    filteredDate.forEach((ufoDate)=> {
        let row = tbody.append("tr");
        Object.entries(ufoDate).forEach(([key, value]) => {
            var cell = row.append("td");
            cell.text(value);
        });
    });
};
