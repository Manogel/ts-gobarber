import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ResetPasswordService from './ResetPasswordService';
import AppError from '@shared/errors/AppError';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokens: FakeUserTokensRepository;
let resetPassoword: ResetPasswordService;
let fakeHashProvider: FakeHashProvider;

describe('ResetPassoword', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokens = new FakeUserTokensRepository();
    resetPassoword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokens,
      fakeHashProvider,
    );
  });

  it('should be able to reset the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const { token } = await fakeUserTokens.generate(user.id);

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    await resetPassoword.execute({
      password: '123123',
      token,
    });

    await fakeUsersRepository.findById(user.id);

    expect(generateHash).toBeCalledWith('123123');
  });

  it('should not be able to reset the password with non-existing token', async () => {
    await expect(
      resetPassoword.execute({
        password: '123123',
        token: 'non-existing-token',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password with non-existing user', async () => {
    const { token } = await fakeUserTokens.generate('non-existing-user');

    await expect(
      resetPassoword.execute({
        password: '123123',
        token: token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password with past more than 2 hours', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const { token } = await fakeUserTokens.generate(user.id);

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await fakeUsersRepository.findById(user.id);

    await expect(
      resetPassoword.execute({
        password: '123123',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
