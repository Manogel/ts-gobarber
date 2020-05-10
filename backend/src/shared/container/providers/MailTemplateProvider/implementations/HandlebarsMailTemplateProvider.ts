import handlebars from 'handlebars';
import IMailTemplateProvider from '../model/IMailTemplateProvider';
import IParseMailTemplate from '../../dtos/IParseMailTemplate';

class HandlebarsMailTemplateProvider implements IMailTemplateProvider {
  public async parse(data: IParseMailTemplate): Promise<string> {
    const { template, variables } = data;

    const parseTemplate = handlebars.compile(template);

    return parseTemplate(variables);
  }
}

export default HandlebarsMailTemplateProvider;
