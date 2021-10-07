/// <reference types="cypress" />

import LoginScreenPageObject from '../../../../src/components/screens/app/LoginScreen/LoginScreen.pageObject';

describe('/pages/app/feed/', () => {
  describe('when fill and submit a form login request', () => {
    it('go to the feed page', () => {
      cy.intercept(
        'https://instalura-api-git-master-omariosouto.vercel.app/api/login',
      ).as('userLogin');

      const loginScreen = new LoginScreenPageObject(cy);
      loginScreen
        .goToLogin()
        .fillLoginForm({ user: 'mayrazan', password: 'senhasegura' })
        .submitLoginForm();

      cy.wait('@userLogin').then((intercept) => {
        const { token } = intercept.response.body.data;
        cy.getCookie('LOGIN_COOKIE_APP_TOKEN')
          .should('exist')
          .should('have.property', 'value', token);
      });

      cy.visit('/app/feed');
    });
  });

  describe('then open modal to add a new post', () => {
    it('insert the url image and go to the next step', () => {
      cy.get('li button').first().click();

      const url = 'https://images.unsplash.com/photo-1632936214770-6b640bfaab50?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=400&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYzMzU2NjA2Ng&ixlib=rb-1.2.1&q=80&w=400.png';

      cy.get('div input[name="url"]').type(url);
      cy.get('[id="arrow"]').click();
      cy.get('button').contains('Avançar').click();
    });

    it('select a filter and submit post', () => {
      cy.get('figure.filter-clarendon').click();
      cy.get('button').contains('Postar').click();
    });
  });
});
