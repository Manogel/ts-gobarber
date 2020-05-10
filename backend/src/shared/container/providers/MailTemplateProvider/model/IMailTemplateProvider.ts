import IParseMailTemplate from '../../dtos/IParseMailTemplate';

export default interface IMailTemplateProvider {
  parse(data: IParseMailTemplate): Promise<string>;
}
