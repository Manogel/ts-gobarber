import User from '../infra/typeorm/entities/User';
import IcreateUserDTO from '../dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '../dtos/IFindAllProvidersDTO';

export default interface IUsersRepository {
  findById(id: string): Promise<User | undefined>;
  findAllProviders(data: IFindAllProvidersDTO): Promise<User[]>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: IcreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
