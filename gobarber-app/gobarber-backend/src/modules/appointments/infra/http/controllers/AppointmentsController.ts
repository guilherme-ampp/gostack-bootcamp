/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentServices';

export default class AppointmentsController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { provider_id, datetime } = request.body;

        // parseISO will convert a string into Date type in JavaScript
        // transforms the data into a Date - simple data transformation
        const parsedDate = parseISO(datetime);

        const service = container.resolve(CreateAppointmentService);

        const appointment = await service.execute({
            provider_id,
            date: parsedDate,
        });
        return response.json(appointment);
    }
}
