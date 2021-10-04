export default class LoginScreenPageObject {
  constructor(cy) {
    this.cy = cy;

    this.cy.visit('/');
  }

  goToLogin() {
    this.cy.get('a[href*="/app/login"]').click();
    this.cy.visit('/app/login');

    return this;
  }

  fillLoginForm({ user, password }) {
    this.cy.get('#formCadastro input[name="usuario"]').type(user);
    this.cy.get('#formCadastro input[name="senha"]').type(password);

    return this;
  }

  submitLoginForm() {
    this.cy
      .get('#formCadastro button[type="submit"]')
      .click({ waitForAnimations: true });

    return this;
  }
}
