import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderDayAvailability from '@modules/appointments/services/ListProviderDayAvailabilityService';

class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { month, year, day } = request.query;
    const { provider_id } = request.params;

    const listMonthProviderAvailability = container.resolve(
      ListProviderDayAvailability,
    );

    const providers = await listMonthProviderAvailability.execute({
      provider_id,
      month: Number(month),
      year:  Number(year),
      day: Number(day),
    });

    return response.json(providers);
  }
}

export default new ProviderDayAvailabilityController();
