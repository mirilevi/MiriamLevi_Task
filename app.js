const dom = {
    table: document.querySelector("#tblGame"),
}

// matrix pass on and copy matrix to update during the loop
const matToPass = [];
const newMat = [];

//function to create table get length of hight and with
function generate_table(length) {
    // get the reference for the body
    var body = document.getElementsByTagName("body")[0];
    var tblBody = document.createElement("tbody");

    // creating all cells
    for (var i = 0; i < length; i++) {
        // creates a table row
        var row = document.createElement("tr");
        //array to create the matrix to pass on
        let arr = [];
        for (var j = 0; j < length; j++) {
            // Create a <td> 
            // node the contents of the <td>, and put the <td> at
            // the end of the table row
            var cell = document.createElement("td");
            //random 0 or 1 to black or white cell
            let CellFeature = Math.floor((Math.random() * 2));
            CellFeature === 0 ? cell.className = "deadCell" : cell.className = "liveCell";
            row.appendChild(cell);
            arr.push(CellFeature);
        }
        //push the update array to the matrix
        matToPass.push(arr);
        // add the row to the end of the table body
        tblBody.appendChild(row);
    }
    // put the <tbody> in the <table>
    dom.table.appendChild(tblBody);
    // appends <table> into <body>
    body.appendChild(dom.table);
    // sets the border attribute of tbl to 2;
    dom.table.setAttribute("border", "2");
    //copy the matrix to another matrix for the update
    matToPass.forEach((arr, i) => { newMat.push([]); arr.forEach((val, j) => newMat[i][j] = val) });
}


//function to update the table by the rules
function passTbl() {
    for (var i = 0, row; row = dom.table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        for (var j = 0, col; col = row.cells[j]; j++) {
            //iterate through columns
            //columns would be accessed using the "col" variable assigned in the for loop

            //sum all the live neighbors of this cell
            sum = sumLiveNeighbors(i, j);
            if (dom.table.rows[i].cells[j].className === "deadCell") {
                //dead cell with exactly three live neighbors becomes a live cell (reproduction)
                if (sum === 3) {
                    dom.table.rows[i].cells[j].className = "liveCell";
                    //update the  copy matrix
                    newMat[i][j] = 1;
                }
            }
            else {
                //live cell with fewer than two live neighbors dies or
                //live cell with more than three live neighbours dies 
                if (sum < 2 || sum > 3) {
                    dom.table.rows[i].cells[j].className = "deadCell";
                    //update the  copy matrix
                    newMat[i][j] = 0;
                }
            }
        }
    }
    //copies the matrix copy to the original matrix
    newMat.forEach((arr, i) => { arr.forEach((val, j) => matToPass[i][j] = val) });
}

//function to sum all live neighbors for each cell in the matrix
//get place in the matrix with i and j
function sumLiveNeighbors(i, j) {
    const di = [-1, -1, -1, 0, 1, 1, 1, 0];
    const dj = [-1, 0, 1, 1, 1, 0, -1, -1];
    let sum = 0;
    //pass over the 8 neighbors
    for (let m = 0; m < 8; m++) {
        if (i + di[m] >= 0 && i + di[m] < dom.table.rows.length && j + dj[m] >= 0 && j + dj[m] < dom.table.rows.length) {
            if (matToPass[i + di[m]][j + dj[m]] === 1) {
                sum++;
            }
        }
    }
    return sum;
}

//create the table
generate_table(50);
//all 1 second call to passTbl to update the table by the rules
myInterval = setInterval(passTbl, 1000);

