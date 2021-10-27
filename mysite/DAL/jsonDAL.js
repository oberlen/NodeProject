const jsonfile = require('jsonfile')

exports.saveUser = function(obj)
{
    return new Promise((resolve,reject) =>
    {
        jsonfile.writeFile(__dirname + "/users.json",obj,function(err)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve("Created");
            }
        })
    })
    
}





exports.getUsers = function()
{
    return new Promise((resolve,reject) =>
    {
        jsonfile.readFile(__dirname + "/users.json",function(err,data)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve(data);
            }
        })
    })
    
}

exports.saveMovie = function(obj)
{
    return new Promise((resolve,reject) =>
    {
        jsonfile.writeFile(__dirname + "/movies.json",obj,function(err)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve("Created");
            }
        })
    })
    
}

exports.getShows=function()
{
    return new Promise((resolve,reject) =>
    {
        jsonfile.readFile(__dirname + "/movies.json",function(err,data)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve(data);
            }
        })
    })
}
