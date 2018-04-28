import { QueroAulasPage } from './app.po';

describe('quero-aulas App', () => {
  let page: QueroAulasPage;

  beforeEach(() => {
    page = new QueroAulasPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
