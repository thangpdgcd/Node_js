import express from "express";
import homeController from "../controller/homecontroller";
import apicontroller from "../controller/apicontroller"
const router = express.Router();

const initWebRoutes = (app) => {
  //path handle
  router.get("/", homeController.handleHelloWord);
  router.get("/user", homeController.handleUserPage);
  router.post("/user/create", homeController.handleCreateNewUser); //đẩy dữu liệu lên
  router.post("/delete-user/:id", homeController.handleDeleteUser)//tham số động:id
  router.get("/update-user/:id", homeController.getUpdateUserPage)
  router.post("/user/update-user", homeController.handleUpdateUser)
  router.get("/home-page/user")//home

  //rest api
  //crud post get put delete
  router.get("/api/test-api", apicontroller.testApi) //gọi đường link


  return app.use("/", router); //bắt đầu từ đây

};

export default initWebRoutes;
//export ra và import ở sever.js