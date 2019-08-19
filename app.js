let express = require('express');

// create instance
let app = express();

// localhost:8080/addNo/88  : to add new number to database
// localhost:8080/deleteNo/88   : to delete a number (first occurence)
// localhost:8080/deleteById/123    : delete a number by its id
// localhost:8080/listAll   : to get all the numbers and its id

let db = [];

app.get('/addNo/:number', function(req,res) {

    let theId = getNewRandomId();
    let obj = {
        id : theId,
        no : parseInt(req.params.number)        // convert it to integer
    };
    console.log(obj);
    db.push(obj);
    res.send("TQ");
});


app.get('/listAll', function(req,res) {
    let st = '';
    for (let i = 0; i < db.length; i++) {
        st += (i) + ' - ' + db[i].id + ' | ' + db[i].no + '<br/>';
    }
    res.send(st);
});

app.get('/deleteNo/:no', function(req,res) {
    let no = parseInt(req.params.no);
    let found = false;
    let index = 0;
    while (index<db.length && !found) {
        if (db[index].no === no) {
            db = db.splice(index,1);
            found = true;
        } 
        else {
            index++;
        }
    }

    let msg = '';
    if (found) {
        msg= 'Found';
    }
    else {
        msg = 'Not found';
    }
    res.send(msg);
})

function getNewRandomId() {
    let id = Math.round(Math.random()*1000);
    return id;
}

app.listen(8080);