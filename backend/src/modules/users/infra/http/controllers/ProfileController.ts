import { Request, Response } from 'express';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import ShowProfileService from '@modules/users/services/ShowProfileService';

class ProfileController {
  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name, email, password, oldPassword } = request.body;

    const updateProfile = container.resolve(UpdateProfileService);

    const user = await updateProfile.execute({
      user_id,
      name,
      email,
      password,
      oldPassword,
    });

    delete user.password;

    return response.json(classToClass(user));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showProfile = container.resolve(ShowProfileService);

    const user = await showProfile.execute({
      user_id,
    });

    delete user.password;

    return response.json(classToClass(user));
  }
}

export default new ProfileController();
