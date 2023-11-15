import express from "express"; //export ra 1 file
/**
 * 
 * @param {*} app - express app 
 */
const configViewEngine = (app) => {
    app.use(express.static('public'))//truy cập hình ảnh, thư mục lưu trữ code
    app.set("view engine", "ejs") //dùng ejs viết html
    app.set('views', "./src/views")//định nghĩa nơi lưu trữ file //dòng này là đường dẫn đến file home.ejs
}

export default configViewEngine ///file export đúng 1 hàm

//export ra và import ở sever.js