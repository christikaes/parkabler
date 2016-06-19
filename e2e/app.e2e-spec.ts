import { ParkablePage } from './app.po';

describe('parkable App', function() {
  let page: ParkablePage;

  beforeEach(() => {
    page = new ParkablePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
