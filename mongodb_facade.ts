//using MongoDB
const { MongoClient, ServerApiVersion } = require('mongodb');
//uri for connecting to the database
const uri = "mongodb+srv://mkhan:skipq@cluster0.iruqgtr.mongodb.net/?retryWrites=true&w=majority";

//defining a function to read data from database table
export async function dbGet(){
    //creating a MongoDB client
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    try{
        //connecting...
        await client.connect();
        //getting the results and returning them
        const results = await client.db('Webhealth').collection('urls').find({}).toArray();
        console.log(results)
        return results;
    }
    finally{
        await client.close();
    }
}

//defining a function to add data in table
export async function dbCreate(newUrl:any){
    //creating a MongoDB client
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    try{
        //connecting
        await client.connect();
        //checking if the URL already exists
        const check = await client.db('Webhealth').collection('urls').find({"url":newUrl}).toArray();
        if(check.length!=0){
            return "exist";
        }
        //ading a URL
        const results = await client.db('Webhealth').collection('urls').insertOne({"url":newUrl});
        return results;
    }
    finally{
        await client.close();
    }
}

//defining a function to update data in table
export async function dbPut(oldUrl:any, newUrl:any){
    //creating a MongoDB client
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    try{
        //connecting
        await client.connect();
        //checking if the URL already exists
        const check = await client.db('Webhealth').collection('urls').find({"url":oldUrl}).toArray();
        if(check.length==0){
            return "does not exist";
        }
        //updating a URL
        const results = await client.db('Webhealth').collection('urls').updateOne({"url":oldUrl},{$set:{"url":newUrl}});
        return results;
    }
    finally{
        await client.close();
    }
}

//defining a function to delete data in table
export async function dbDelete(urlToDelete:any){
    //creating a MongoDB client
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    try{
        //connecting
        await client.connect();
        //checking if the URL already exists
        const check = await client.db('Webhealth').collection('urls').find({"url":urlToDelete}).toArray();
        if(check.length==0){
            return "does not exist";
        }
        //deleting the URL
        const results = await client.db('Webhealth').collection('urls').deleteOne({"url":urlToDelete});
        return results;
    }
    finally{
        await client.close();
    }
}

// module.exports.dbGet = dbGet;
// module.exports.dbCreate = dbCreate;
// module.exports.dbPut = dbPut;
// module.exports.dbDelete = dbDelete;