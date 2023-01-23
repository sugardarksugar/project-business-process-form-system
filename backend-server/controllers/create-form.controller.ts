import { Request, Response } from "express";
import { CreateFormService } from "../services/create-form.services"

export class CreateFormController {
    constructor(private createFormService: CreateFormService) { }

    createForm = async (req: Request, res: Response) => {
        let values = req.body;
        console.log(values);

    }
}