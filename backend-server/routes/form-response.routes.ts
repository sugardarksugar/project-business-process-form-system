import express from "express";
import { knex } from "../client";
import { FormResponseService } from "../services/form-response.service";
import { FormResponseController } from "../controllers/form-response.controller";

export let formResponseRoutes = express.Router();

let formResponseService = new FormResponseService(knex);
let formResponseController = new FormResponseController(formResponseService)

formResponseRoutes.get("/forms/:id/fields", formResponseController.getFormDetails)
// formResponseRoutes.post("/form/fields/contents", formResponseController.)