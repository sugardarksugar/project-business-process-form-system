import express from "express";
import { FormController } from "../controllers/form.controller";
import { FormService } from "../services/form.services";
import { knex } from "../client";

export let formRoutes = express.Router();

let formService = new FormService(knex);
let formController = new FormController(formService);

formRoutes.post("/form", formController.createForm)
formRoutes.get('/form/search', formController.searchForm)
formRoutes.post('/form/submit', formController.submitForm)
formRoutes.get('/form/as/viewer', formController.getViewerForm)
formRoutes.get('/form/as/filler', formController.getFillerForm)
