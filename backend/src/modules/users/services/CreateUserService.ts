import { inject, injectable } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  email: string;
  name: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute(data: IRequest): Promise<User> {
    const { name, email, password } = data;

    const userIsExists = await this.usersRepository.findByEmail(email);

    if (userIsExists) {
      throw new AppError('Email address already used!');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = this.usersRepository.create({
      email,
      name,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
