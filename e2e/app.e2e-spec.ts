import { ParkablerPage } from './app.po';

describe('parkabler App', () => {
  let page: ParkablerPage;

  beforeEach(() => {
    page = new ParkablerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
