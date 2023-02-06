import { FormResponseService } from "../services/form-response.service";
import { Request, Response } from 'express'


export class FormResponseController {
    constructor(public formResponseService: FormResponseService) { }

    getFormDetails = async (req: Request, res: Response) => {

        let form_id = +req.params.id;
        let json = await this.formResponseService.getFormDetails(form_id)

        return res.status(200).json(json)
    }

    submitFilledForm = async (req: Request, res: Response) => {
        try {

            let filledForm = req.body;
            let json = await this.formResponseService.submitFilledForm(filledForm)

        } catch (error) {
        }

    }
}