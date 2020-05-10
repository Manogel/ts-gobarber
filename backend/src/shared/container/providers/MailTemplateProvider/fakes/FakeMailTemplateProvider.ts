import IMailTemplateProvider from '../model/IMailTemplateProvider';
import IParseMailTemplate from '../../dtos/IParseMailTemplate';

class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parse(data: IParseMailTemplate): Promise<string> {
    const { template } = data;

    return template;
  }
}

export default FakeMailTemplateProvider;
