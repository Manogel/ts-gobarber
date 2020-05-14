import { Request, Response } from 'express';
import CreateUserService from '@modules/users/services/CreateUserService';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';

class UserController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { name, email, password, provider = false } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      password,
      provider,
    });

    return response.json(classToClass(user));
  }
}

export default new UserController();
