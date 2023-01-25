import express from "express";
import { UserService } from "../services/user.service";
import { UserController } from "../controllers/user.controller";
import { knex } from "../client";

export let userRoutes = express.Router();
export let userService = new UserService(knex);

let userController = new UserController(userService);

userController.post("/login", userController.login);