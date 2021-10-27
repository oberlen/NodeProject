const jsonDAL = require('../DAL/jsonDAL');

const checkUserLogin = async function(username, password)
{

    let resp=await jsonDAL.getUsers();
    let users=resp.users;

    return users.find(x=>x.username==username && x.password==password)
    
}

const deleteUser = async function(id)
{
    let resp=await jsonDAL.getUsers();
    let users=resp.users;

    // console.log(users);

    let index = users.findIndex(x => x.id == id);
    // console.log(index);
    if(index >= 0)
    {
        users.splice(index,1)
    }
    let status=await jsonDAL.saveUser({ users: users });
  return status;
    
}

const updateUser = async function(id,obj)
{
   
  let userObj = {
    id: id,
    username: obj.username,
    password: obj.password,
    createDate: obj.createDate,
    numOfTransactions:obj.numOfTransactions,

  };

  let resp=await jsonDAL.getUsers();
  let users=resp.users;

    let index = users.findIndex(x => x.id == id);
    if(index >= 0)
    {
      users[index]=userObj
    }
    let status=await jsonDAL.saveUser({ users: users });
    return status;
   
}
const addUserToJson = async function (obj) {

    let resp = await jsonDAL.getUsers();
    let users = resp.users;
    let newId = Number(users[users.length - 1].id) + 1;
  
  
    let userObj = {
      id: newId,
      username: obj.username,
      password: obj.password,
      createDate: obj.createDate,
      numOfTransactions:obj.numOfTransactions,
    };

    users.push(userObj);
    let status = await jsonDAL.saveUser({ users: users });
    return status;
  };


module.exports = {checkUserLogin,deleteUser,updateUser,addUserToJson}