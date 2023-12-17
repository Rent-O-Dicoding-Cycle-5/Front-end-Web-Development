import Cookies from 'js-cookie';

class headerBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    const isAuthenticated = Cookies.get('uid') !== undefined;
    const userName = this.getUserName();
    this.innerHTML = `
      <nav id="nav" class="menu">
        <h1>
          <a href="/" title="Navbar Brand">Rent'O</a>
        </h1>
        <button class="menu-button" title="Toggle Menu" aria-label="Toggle Menu">
          <i class="fa fa-times"></i>
          <i class="fa fa-bars"></i>
        </button>
        <ul class="menu-list">
          <li><a href="#">Home</a></li>
          <li><a href="#/partner">Partner</a></li>
          <li><a href="#/sewa">Sewa</a></li>
          ${
            isAuthenticated ?
              `<li><a href="#/user" class="userName">${userName}</a></li>
               <li><a href="#" class="logoutButton">Logout</a></li>` :
              `<li><a href="#/login" class="loginButton">Login</a></li>
               <li><a href="#/register" class="registerButton">Register</a></li>`
}
        </ul>
      </nav>
    `;
    if (isAuthenticated) {
      // If the user is logged in, add an event listener for the logout button
      const logoutButton = this.querySelector('.logoutButton');
      if (logoutButton) {
        logoutButton.addEventListener('click', this.handleLogout.bind(this));
      }
    }
  }

  getUserName() {
    // Get the username from the 'username' cookie or from the server (as needed)
    const username = Cookies.get('username');
    return username || 'User';
  }

  handleLogout() {
    console.log('Logout button clicked');
    // Remove the cookies for email, uid, username, and roles
    Cookies.remove('uid');
    Cookies.remove('email');
    Cookies.remove('username');
    Cookies.remove('roles');

    this.render();

    // Redirect to the home page after logout
    window.location.reload();
    window.location.href = '#/home';
  }
}

customElements.define('app-header', headerBar);
