import IMailProvider from '../models/IMailProvider';
import ISendMail from '../dtos/ISendMail';

export default class FakeMailProvider implements IMailProvider {
  private messages: ISendMail[] = [];

  public async sendMail(data: ISendMail): Promise<void> {
    this.messages.push(data);
  }
}
