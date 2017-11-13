import { browser, by, element, protractor } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/login');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  getPageTitle() {
    // var some_name = 'Some Name';
    console.log('Inside app.po');
    return browser.getTitle();
    // return browser.getTitle();
    // return 'Picolo';
  }
}
