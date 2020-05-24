import { inject, injectable } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  email: string;
  name: string;
  password: string;
  provider?: boolean;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(data: IRequest): Promise<User> {
    const { name, email, password, provider } = data;

    const userIsExists = await this.usersRepository.findByEmail(email);

    if (userIsExists) {
      throw new AppError('Email address already used!');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = this.usersRepository.create({
      email,
      name,
      password: hashedPassword,
      provider,
    });

    await this.cacheProvider.invalidadePrefix('providers-list')

    return user;
  }
}

export default CreateUserService;
