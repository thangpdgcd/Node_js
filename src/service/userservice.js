import bcrypt from 'bcryptjs'//sử lý bất đồng bộ sync

import mysql from "mysql2/promise";

import express from "express"

import bluebird from "bluebird";//hang cho
import db from "../models/index"

// get the promise implementation, we will use bluebird
const salt = bcrypt.genSaltSync(10) //sử lý bất đồng bộ sync
let app = express();
app.listen(3000, () => {
  console.log("Database running: Turn on Database", `http://localhost/phpmyadmin/index.php?route=/database/structure&db=project_nodejs`);
})
//connect database local
// const connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     port: 3306,
//     database: "project_1_nodejs",
//   });

//CHECK HASH PASSWORD băm pashword không hiển thị ra 
const hashUserPassword = (userpassword) => {
  //check1
  let hashPassword = bcrypt.hashSync(userpassword, salt)//sử lý đồng bộ sync
  console.log("Check password", hashPassword); //hash mổ sẻ password đưa ra log

  // //check2
  //  let check=bcrypt.compareSync(password,hashPassword)//trả ra giá trị boolean
  //  console.log("check",check); //  let check=bcrypt.compareSync(password,hashPassword)//trả ra giá trị boolean
  //  console.log("check",check);
  return hashPassword;
}
//CREAD DATABASE
const createNewUser = async (email, password, username) => {
  let hashPass = hashUserPassword(password)
  // const connection = await mysql.createConnection({host:'localhost',   port: 3306, user: 'root', database: 'project_1_nodejs', Promise: bluebird});
  try {
    //mô hình orm
    await db.User.create(
      {
        password: hashPass,
        email: email,
        username: username,
      }
    )
    // const  [rows, fields] = await connection.execute( "INSERT INTO users (email, password, username) VALUES (?, ?, ?)", [email, hashPass, username]); //hàm rút gọn
  } catch (error) {
    console.log("check", error);
  }
  // connection.query(
  //     "INSERT INTO users (email, password, username) VALUES (?, ?, ?)",
  //     [email, hashPass, username],
  //     function (err, results, fields) {
  //       if (err) {
  //         console.error(err); // Log the error
  //         //return res.status(500).send("Internal Server Error"); // Send a 500 response
  //       }
  //      console.log(results); // Log the results
  //    // Send a success response
  //     }
  //   );

  //console.log("check", req.body);

}

// log ra 1 danh sách trong database
const getUserList = async () => ///chức năng này trả về array list database check result
{
  // create the connection, specify bluebird as Promise
  // const connection = await mysql.createConnection({host:'localhost',   port: 3306, user: 'root', database: 'project_1_nodejs', Promise: bluebird});

  let users = [];
  users = await db.User.findAll()
  return db.User.findAll();
  //   return connection.query(
  //       "SELECT * FROM users",
  //      (err, results, fields)=> {
  //         if (err) {
  //           console.error(err); // Log the error
  //           //return res.status(500).send("Internal Server Error"); // Send a 500 response
  //           return users; //users bằng rỗng
  //         }
  //         users=results
  //         console.log("run get users list",users); //log ra userList
  //         return users
  //        //
  //         //console.log("check",results); // Log the results
  //        // Send a success response
  //       // console.log("checksss",fields);
  //       }
  //   )
  //  //  console.log("check", req.body);

  // try {
  //   const [rows, fields] = await connection.execute("SELECT * FROM users");
  //   return ("check rows",rows);
  // } catch (error) {
  //   return ("error:",error);
  // }

}

const deleteUser = async (id) => //delete user=id
{


  //   const connection = await mysql.createConnection({host:'localhost',   port: 3306, user: 'root', database: 'project_1_nodejs', Promise: bluebird});
  //   try {
  //     const [rows, fields] = await connection.execute('DELETE FROM users WHERE id=?',[id]);//hàm rút gọn
  //     return rows
  //   } catch (error) {
  //    console.log("check",error); 
  //   }
}

const getUserbyId = async (id) => {
  let user = {}

  user = await db.User.findOne(
    {
      where: { id: id }
    });

  return user.get({ plain: true })

  //   const connection = await mysql.createConnection({host:'localhost',   port: 3306, user: 'root', database: 'project_1_nodejs', Promise: bluebird});
  //   try {
  //     const [rows, fields] = await connection.execute('select * FROM users WHERE id=?',[id]);//hàm rút gọn
  //     console.log("check-row",rows);
  //     return rows
  //   } catch (error) {
  //    console.log("check" ,error); 
  //   }
}
const updateUserInfor = async (email, username, id) => {
  let user = []
  await db.User.update(
    {
      email: email,
      username: username
    },
    {
      where:
        { id: id } ///điều kiện tìm kiếm 
    }
  )
  return username.update
  // const connection = await mysql.createConnection({host:'localhost',   port: 3306, user: 'root', database: 'project_1_nodejs', Promise: bluebird});
  // try {
  //   const [rows, fields] = await connection.execute(
  //     'UPDATE users SET email = ?,username = ? WHERE id=?',
  //     [email,username,id]);//hàm rút gọn
  //   // console.log("check-row",rows);
  //   return rows
  // } catch (error) {
  //  console.log("check" ,error); 
  // }



}

module.exports = {
  createNewUser
  , getUserList,
  deleteUser,
  getUserbyId,
  updateUserInfor
}

