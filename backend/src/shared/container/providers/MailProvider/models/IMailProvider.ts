import ISendMail from '../dtos/ISendMail';

export default interface IMailProvider {
  sendMail(data: ISendMail): Promise<void>;
}
