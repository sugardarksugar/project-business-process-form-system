import express from "express";
// import { CreateFormController } from "../controllers/create-form.controller";
import { CreateFormService } from "../services/create-form.services";
import { knex } from "../client";


export let createFormRoutes = express.Router();
export let createFormService = new CreateFormService(knex);

// let createFormController = new CreateFormController(createFormService);

// createFormRoutes.post("/createForm",createFormController)