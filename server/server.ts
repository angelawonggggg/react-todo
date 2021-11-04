import express from "express";
import dotenv from "dotenv";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { knex } from './db';
dotenv.config();

let app = express();
app.use(express.json())
app.use(express.urlencoded({ extended:false }))
// let knex = Knex(knex);    // create db.ts 
let userService = new UserService(knex);
let userController = new UserController(userService); // UserController needs UserService, UserService needs Knex
app.use(userController.toRouter());

let PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}/`);
});
