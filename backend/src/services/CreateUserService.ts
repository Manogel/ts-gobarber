import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';

interface Request {
  email: string;
  name: string;
  password: string;
}

class CreateUserService {
  public async execute(data: Request): Promise<User> {
    const { name, email, password } = data;
    const usersRepository = getRepository(User);

    const userIsExists = await usersRepository.findOne({
      where: { email },
    });

    if (userIsExists) {
      throw new Error('Email address already used!');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      email,
      name,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
