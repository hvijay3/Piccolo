import { AppPage } from './app.po';

describe('insta App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display browser title as TA Management', () => {
    page.navigateTo();
    expect(page.()).toEqual('TA Management');
});
});
