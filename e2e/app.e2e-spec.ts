import { AppPage } from './app.po';
import { browser, by, element, protractor } from 'protractor';

describe('insta App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });


  // it('should display Browser Title as Picolo', () => {
  //   page.navigateTo();
  //   console.log("Inside testcase 111111111111111111111");
  //   // console.log(page.getWebTitle());
  //   expect(page.getWebTitle()).toEqual('Picolo');
  // });
  // it('should have right title', () => {
  //   page.navigateTo();
  //   page.getPageTitle()
  //     .then((title: string) => {
  //       expect(title).toEqual('Picolo');
  //     });
  // });

  /* Method to test Sign Up functionality */

  it('should sign up', () => {
    
          page.navigateTo();
          var userSignUpBtnId = browser.driver.findElement(by.id('signupbtn'));
          userSignUpBtnId.click();
          // Find page elements
          var userNameField = browser.driver.findElement(by.name('email'));
          var userPassField = browser.driver.findElement(by.name('password'));
          var userSignUpBtn = browser.driver.findElement(by.id('signUpbtn'));
        
            // Fill input fields
            userNameField.sendKeys('piccologator1@gmail.com');
            userPassField.sendKeys('piccologator1');
        
            // Ensure fields contain what we’ve entered
            expect(userNameField.getAttribute('value')).toEqual('piccologator1@gmail.com');
            expect(userPassField.getAttribute('value')).toEqual('piccologator1');
        
            // Click to sign up - waiting for Angular as it is manually bootstrapped.
            userSignUpBtn.click();
          });


  /* Method to test Login Functionality */
  it('should sign in', () => {

    page.navigateTo();
    // Find page elements
    var userNameField = browser.driver.findElement(by.name('email'));
    var userPassField = browser.driver.findElement(by.name('password'));
    var userLoginBtn = browser.driver.findElement(by.id('loginbtn'));

    // Fill input fields
    userNameField.sendKeys('piccologator@gmail.com');
    userPassField.sendKeys('piccolo123');

    // Ensure fields contain what we’ve entered
    expect(userNameField.getAttribute('value')).toEqual('piccologator@gmail.com');
    expect(userPassField.getAttribute('value')).toEqual('piccolo123');

    // Click to sign in - waiting for Angular as it is manually bootstrapped.
    userLoginBtn.click();
  });

});