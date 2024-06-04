/**
 * Shawn Bond
 * 06/02/24
 * create multiplication table from form
 */


/**
 * gets user input from form
 * cleans and validates input
 * generates table if input is valid
 * @return          none
 */
function getVars() {
    // clear error messages each time we run
    document.querySelectorAll('.text-danger').forEach(function(element) {
        element.textContent = ' ';
    });

    // get vars from form
    var inputs = [
        document.getElementById('number_1').value,
        document.getElementById('number_2').value,
        document.getElementById('number_3').value,
        document.getElementById('number_4').value
    ];

    // validate inputs
    var isValid = true;
    console.log('is input valid:');
    console.log(isValid = validate(inputs));

    console.log('Input 1:', inputs[0]);
    console.log('Input 2:', inputs[1]);
    console.log('Input 3:', inputs[2]);
    console.log('Input 4:', inputs[3]);

    // if inputs are good, generate table
    if (isValid) {
        generateTableMatrix(inputs);
    } else {
    // else inputs are bad, do nothing

    }
}


/**
 * clean user input, validate input is integers
 * @param inputs    array       array of string inputs to be validated
 * @return          bool        true if array was successfuly converted to all integers, else false
 */
function validate(inputs) {
    // flag for state
    var isValid = true;
    
    // remove whitespace with regex
    inputs.forEach(function(string, index) {
        // for each string, replace in place
        inputs[index] = string.replace(/ /g, '');
    });

    // check arr is numbers with regex
    // checks for optional minus sign before digits
    var regExp = new RegExp('^-?\\d+$');
    inputs.forEach(function(string, index) {
        // for each string, test regex, on fail upate danger text
        if (!regExp.test(string)) {
            document.getElementById('error_' + (index + 1)).textContent = 'Invalid input: Please enter an integer.';
            isValid = false;
        }
    });

    // convert str to int
    inputs = inputs.map(function(value) {
        return parseInt(value, 10);
    });

    // check if dimension is greater than 200 col or 200 row
    var x_range = Math.abs(inputs[1] - inputs[0]);
    var y_range = Math.abs(inputs[3] - inputs[2]);
    if (x_range >= 200 || y_range >= 200) {
        // 100 cells is too large for the table
        document.getElementById('error_5').textContent = 'Invalid dimensions: Tables above 200 units wide or tall cannot be generated.';
        isValid = false;
    }

    return isValid;
}


/**
 * generate table using user inputs
 * @param inputs    array       array of integers to be used as matrix bounds
 * @return          none
 */
function generateTableMatrix(inputs) {

    // find starting values for matrix
    var x_start = Math.min(inputs[0], inputs[1]);
    var x_end = Math.max(inputs[0], inputs[1]);

    var y_start = Math.min(inputs[2], inputs[3]);
    var y_end = Math.max(inputs[2], inputs[3]);

    // generate table
    let table = document.createElement('table');
    table.classList.add('table')
    table.classList.add('table-bordered')

    // generate first row (headers)
    let header = table.insertRow(-1);
    header.classList.add('display-above')
    // first cell is always empty
    header.insertCell(-1);
    // populate row headers
    for (c = x_start; c <= x_end; c++) {
        let cell = header.insertCell(-1);
        cell.innerText = c;
    }

    // generate all other rows
    for (let r = y_start; r <= y_end; r++) {
        row = table.insertRow(-1);

        // first cell is always a header
        let header = row.insertCell(-1);
        header.innerText = r;
        
        // generate cells in row
        for (let c = x_start; c <= x_end; c++) {
            let cell = row.insertCell(-1);
            cell.innerText = r * c;

            // highlight cells in every other row for readability
            if (r % 2 == 0) {
                cell.classList.add('active');
            }
        }
    }

    // clear table container contents
    // place table on page
    var container = document.getElementById('tableContainer');
    container.innerHTML = '';
    container.appendChild(table);

    return;
}