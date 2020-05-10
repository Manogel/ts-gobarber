import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserservice from './AuthenticateUserService';
import CreateUserservice from './CreateUserService';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUserservice: CreateUserservice;
let authenticateUserservice: AuthenticateUserservice;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUserservice = new CreateUserservice(
      fakeUsersRepository,
      fakeHashProvider,
    );
    authenticateUserservice = new AuthenticateUserservice(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate', async () => {
    await createUserservice.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const user = await authenticateUserservice.execute({
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(user).toHaveProperty('token');
  });

  it('should not be able to authenticate with non existing user', async () => {
    await expect(
      authenticateUserservice.execute({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await createUserservice.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(
      authenticateUserservice.execute({
        email: 'johndoe@example.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
