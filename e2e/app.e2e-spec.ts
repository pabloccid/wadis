import { WadisPage } from './app.po';

describe('wadis App', () => {
  let page: WadisPage;

  beforeEach(() => {
    page = new WadisPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
