import handlebars from 'handlebars';
import fs from 'fs';
import IMailTemplateProvider from '../model/IMailTemplateProvider';
import IParseMailTemplate from '../dtos/IParseMailTemplate';

class HandlebarsMailTemplateProvider implements IMailTemplateProvider {
  public async parse(data: IParseMailTemplate): Promise<string> {
    const { file, variables } = data;
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });

    const parseTemplate = handlebars.compile(templateFileContent);

    return parseTemplate(variables);
  }
}

export default HandlebarsMailTemplateProvider;
