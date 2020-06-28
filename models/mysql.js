var mysql=require('promise-mysql');

/*
module.exports={
async Pool()
{
    var myPool = await mysql.createPool({
        host:"localhost",
        user:"root",
        password:"root",
        database:"enrollment",
        connectionLimit: 10
    })
    return myPool
}
}
*/

var myPool = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"root",
    database:"enrollment",
    connectionLimit: 10
});

module.exports=myPool;
  