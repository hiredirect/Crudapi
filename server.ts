//using Express JS
const express = require('express');
//using MongoDB operations
const {dbGet,dbCreate,dbPut,dbDelete} = require('./mongodb_facade');
const {deleteAlarm} = require('./DeleteAlarm')

export const app = express();

//listening to the port
app.listen(3000, () => {
    console.log("listening...");
});

//for getting the body of HTTP request
app.use(express.json());

//handling the get request at root path
app.get('/',(req:any,res:any) => {
    //getting the table entries and displaying them
    dbGet().then((results:any) => {
        //console.log(results)
        res.json({
            "status" : res.statusCode,
            "body" : results
        });
    })
});

//handling post request at root path
app.post('/',(req:any,res:any) => {
    //adding the URL to the table
    let newUrl = req.body.url;
    dbCreate(newUrl).then((results:any) => {
        if(results=='exist'){
            res.send("URL already exists.");
        }
        else{
            res.send(newUrl + " successfully added.");
        }
    });
});

//handling put request at root path
app.put('/',(req:any,res:any) => {
    //updating the URL in the table
    let oldUrl = req.body[0].url;
    let newUrl = req.body[1].url;
    dbPut(oldUrl,newUrl).then((results:any) => {
        if(results=='does not exist'){
            res.send("URL does not exist.");
        }
        else{
            res.send(oldUrl + " successfully updated to " + newUrl);
        }
    });
});

//handling delete request at root path
app.delete('/',(req:any,res:any) => {
    //deleting the URL from the table
    let urlToDelete = req.body.url;
    // deleting the alarms of the URL
    deleteAlarm(urlToDelete);
    dbDelete(urlToDelete).then((results:string) => {
        if(results=='does not exist'){
            res.send("URL does not exist.");
        }
        else{
            res.send(urlToDelete + " successfully deleted.");
        }
    });
});
// module.exports = app;