import { JmWebPage } from './app.po';

describe('jm-web App', () => {
  let page: JmWebPage;

  beforeEach(() => {
    page = new JmWebPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
