import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderMonthAvailability from '@modules/appointments/services/ListProviderMonthAvailabilityService';

class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { month, year } = request.query;
    const { provider_id } = request.params;

    const listMonthProviderAvailability = container.resolve(
      ListProviderMonthAvailability,
    );

    const providers = await listMonthProviderAvailability.execute({
      provider_id,
      month: Number(month),
      year:  Number(year),
    });

    return response.json(providers);
  }
}

export default new ProviderMonthAvailabilityController();
