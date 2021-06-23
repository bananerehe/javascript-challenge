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
    return [month, day,year].join('/');
}

// Get reference to table body
var tbody = d3.select("tbody");

// Create function to run for both events
function runEnter () {

    // Prevent page refresh
    d3.event.preventDefault();

    // Select input element and get value property
    let enterDate=d3.select("#datetime").property("value");

    // Print value
    enterDate=formatDate(enterDate);
    console.log(enterDate);

    // Filter by selected date
    let filteredDate=tableData.filter(ufoDate => ufoDate.datetime==enterDate);
    console.log(filteredDate);
    
    // Clear table row element
    d3.selectAll('#ufo-table>tbody>tr').remove();

    // Append table content
    filteredDate.forEach((ufoDate)=> {
        let row =tbody.append("tr");
        Object.entries(ufoDate).forEach(([key, value]) => {
            var cell = row.append("td");
            cell.text(value);
        });
    });
};
