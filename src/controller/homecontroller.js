import userservice from '../service/userservice'


const handleHelloWord = (req, res) => {
  return res.render("home.ejs"); //render ra view
};

const handleUserPage = async (req, res) => {
  //model =>get data from database

  let userList = await userservice.getUserList();
  // await userservice.deleteUser(5); //delete user
  // console.log("Check List:",userList);
  return res.render("user.ejs", {
    userList,//check biến
  });
};


const handleCreateNewUser = (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let username = req.body.username;


  userservice.createNewUser(email, password, username)
  return res.redirect('/user');
};

const handleDeleteUser = async (req, res) => {
  console.log("check id", req.params.id);//log ra khi nhấn nút delete thấy được các thông tin database
  // console.log("check id",req.params.username);
  // console.log("check id",req.params.password);
  //awwai
  await userservice.deleteUser(req.params.id)

  return res.redirect('/user'); s
}

const getUpdateUserPage = async (req, res) => {
  let id = req.params.id
  let user = await userservice.getUserbyId(id)
  let userdata = {}
  userdata = user
  // if(user && user.length >0)
  // {
  //   userdata=user[0];
  // }
  console.log("check update", user);
  return res.render("user-update.ejs", { userdata })
}
const handleUpdateUser = async (req, res) => {
  let email = req.body.email
  let username = req.body.username
  let id = req.body.id
  console.log('check id', req.body); //log ra dữ liệu khi edit 
  await userservice.updateUserInfor(email, username, id)

  return res.redirect("/user")

}

//export những func này ra
module.exports = {
  handleHelloWord,
  handleCreateNewUser,
  handleUserPage,
  handleDeleteUser,
  getUpdateUserPage,
  handleUpdateUser
};