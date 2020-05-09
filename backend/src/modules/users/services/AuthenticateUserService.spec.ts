import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserservice from './AuthenticateUserService';
import CreateUserservice from './CreateUserService';
import AppError from '@shared/errors/AppError';

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUserservice = new CreateUserservice(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const authenticateUserservice = new AuthenticateUserservice(
      fakeUsersRepository,
      fakeHashProvider,
    );
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
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUserservice = new AuthenticateUserservice(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await expect(
      authenticateUserservice.execute({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUserservice = new CreateUserservice(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const authenticateUserservice = new AuthenticateUserservice(
      fakeUsersRepository,
      fakeHashProvider,
    );
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
