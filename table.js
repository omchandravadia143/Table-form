document.getElementById('searchInput').addEventListener('keyup', function () {
  // Get the value of the search input
  var input = document.getElementById('searchInput');
  var filter = input.value.toLowerCase();

  // Get the table and all its rows
  var table = document.getElementById('table');
  var rows = table.getElementsByTagName('tr');

  // Loop through all table rows
  for (var i = 1; i < rows.length; i++) { // Start at 1 to skip the header row
    var cells = rows[i].getElementsByTagName('td');
    var found = false;

    // Check if the cell text content matches the search input
    for (var j = 0; j < cells.length; j++) {
      if (cells[j].textContent.toLowerCase().indexOf(filter) > -1) {
        found = true;
        break;
      }
    }

    // Show or hide the row based on the search result
    if (found) {
      rows[i].style.display = '';
    } else {
      rows[i].style.display = 'none';
    }
  }
});


// Delete row as per selected
function deleteRow() {
  const table = document.getElementById("table");
  for (const [index, row] of [...table.rows].entries()) {
    if (row.querySelector('input:checked')) {
      table.deleteRow(index);
    }
  }
}


// remove all selected rows 
function clearAllRows() {
  for (var i = document.getElementById("table").rows.length; i > 0; i--) {
    document.getElementById("table").deleteRow(i - 1);
  }


  for (var i = 0; i < document.getElementById("table").rows.length; i++) {
    document.getElementById("table").deleteRow(i - 1);
  }
}



// ADD DATA DYNAMICALLY IN A TABLE

// add and delete row in a table 
function addRow() {
  // Get input field values
  var fname = document.getElementById("fname").value;
  var age = document.getElementById("age").value;
  var country = document.getElementById("country").value;

  // Validate if all input fields are filled
  if (!fname || !age || !country) {
    alert("Please fill in all data fields.");
    return;
  }

  // Get table body element
  var tableBody = document.getElementById("tableBody");

  // Create a new row element
  var newRow = document.createElement('tr');

  // Create three cells with input values and append to the row
  appendCell(newRow, fname);
  appendCell(newRow, age);
  appendCell(newRow, country);

  // Create delete button cell
  var deleteCell = document.createElement('td');
  var deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.onclick = function () {
    deleteRow(this); // Pass the button element to deleteRow function
  };
  deleteCell.appendChild(deleteButton);
  newRow.appendChild(deleteCell);

  // Append the row to the table body
  tableBody.appendChild(newRow);

  // Clear input fields
  document.getElementById('fname').value = '';
  document.getElementById('age').value = '';
  document.getElementById('country').value = '';
}

function appendCell(row, text) {
  var newCell = document.createElement('td');
  newCell.textContent = text;
  row.appendChild(newCell);
}

function deleteRow(button) {
  // Traverse the DOM to find the parent row
  var row = button.parentNode.parentNode;

  // Remove the row
  row.parentNode.removeChild(row);
}


// delete all selected input field 
function deleteSelectedRows() {
  var table = document.getElementById('table');
  var checkboxes = table.querySelectorAll('input[type="checkbox"]:checked');

  checkboxes.forEach(function (checkbox) {
    var row = checkbox.parentNode.parentNode;
    row.parentNode.removeChild(row);
  });
}

// sort method
function sortTable() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("table");
  switching = true;
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[0];
      y = rows[i + 1].getElementsByTagName("TD")[0];
      //check if the two rows should switch place:
      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        //if so, mark as a switch and break the loop:
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

//  edit and save button in a table 

function edit_row(no) {
  document.getElementById("edit_button" + no).style.display = "none";
  document.getElementById("save_button" + no).style.display = "block";

  var name = document.getElementById("name_row" + no);
  var age = document.getElementById("age_row" + no);
  var country = document.getElementById("country_row" + no);

  var name_data = name.innerHTML;
  var age_data = age.innerHTML;
  var country_data = country.innerHTML;

  name.innerHTML =
    "<input type='text' id='name_text" + no + "' value='" + name_data + "'>";
  age.innerHTML =
    "<input type='text' id='age_text" + no + "' value='" + age_data + "'>";
  country.innerHTML =
    "<input type='text' id='country_text" +
    no +
    "' value='" +
    country_data +
    "'>";
}

// save row
function save_row(no) {
  var name_val = document.getElementById("name_text" + no).value;
  var age_val = document.getElementById("age_text" + no).value;
  var country_val = document.getElementById("country_text" + no).value;

  document.getElementById("name_row" + no).innerHTML = name_val;
  document.getElementById("age_row" + no).innerHTML = age_val;
  document.getElementById("country_row" + no).innerHTML = country_val;

  document.getElementById("edit_button" + no).style.display = "block";
  document.getElementById("save_button" + no).style.display = "none";
}


// delete row 
function delete_row(no) {
  document.getElementById("row" + no + "").outerHTML = "";
 }
 