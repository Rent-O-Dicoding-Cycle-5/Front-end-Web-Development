import Swal from 'sweetalert2/dist/sweetalert2.all.min';
import API_ENDPOINT from '../../globals/api-endpoint';

const Register = {
  async render() {
    return `
      <div id="register-container">
          <form id="register-form">
              <h2>Daftar</h2>
              <input type="text" name="name" id="name" placeholder="Masukkan Nama Anda" autocomplete="name">
              <input type="email" name="email" id="email" placeholder="Masukkan Email" autocomplete="email">
              <input type="password" name="password" id="password" placeholder="Masukkan kata sandi" autocomplete="new-password">
              <input type="password" name="confirm_password" id="confirm_password" placeholder="Masukkan ulang kata sandi" autocomplete="new-password">
              <button type="submit" id="register-btn">Daftar</button>
              <br>
              <p id="login" class="login-link">Sudah punya akun? <a href="#/login">Login</a></p>
          </form>
      </div>
    `;
  },

  async afterRender() {
    // Add event listener for form submission
    const registerForm = document.getElementById('register-form');
    registerForm.addEventListener('submit', this.handleRegistration);
  },

  async handleRegistration(event) {
    event.preventDefault();

    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value.toLowerCase();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm_password').value;

    // Validate password matching
    if (password !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Kata sandi dan konfirmasi kata sandi tidak cocok!',
      });
      return;
    }

    if (!name || !email || !password || !confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Silakan isi seluruh kolom!',
      });
      return;
    }

    // Make API call to register
    try {
      const response = await fetch(API_ENDPOINT.REGISTER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: name, // Assuming the server expects 'username'
          email,
          password,
        }),
      });

      const data = await response.json();

      // Handle response, you might want to redirect to a different page on success
      if (response.ok) {
        let successMessage;

        // Check the success message from the server response
        if (data.status === 'success' && data.message === 'Register user success!') {
          successMessage = 'Registrasi Berhasil';
        } else {
          successMessage = 'Registrasi Gagal'; // Provide a default message if the format is unexpected
        }

        Swal.fire({
          icon: 'success',
          title: successMessage,
          text: 'Silakan login untuk melanjutkan',
          focusConfirm: true,
          confirmButtonText: 'Login',
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = '#/login';
          }
        });
      } else {
        console.error('Registration failed:', data);

        // Update the error message based on the response
        let errorMessage = 'Registrasi gagal. Coba lagi nanti atau hubungi dukungan pelanggan.';
        if (data.status === 'failed' && data.message === 'Email already exists') {
          errorMessage = 'Email sudah terdaftar. Gunakan email lain atau login menggunakan email tersebut.';
        } else if (data.status === 'failed' && data.message === 'The email address is already in use by another account.') {
          errorMessage = 'Email sudah terdaftar. Gunakan email lain atau login menggunakan email tersebut.';
        }

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: errorMessage,
        });
        // Handle the error, show a message, etc.
      }
    } catch (error) {
      console.error('Error during registration:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Terjadi kesalahan saat melakukan registrasi. Coba lagi nanti atau hubungi dukungan pelanggan.',
      });
      // Handle network errors or other exceptions
    }
  },
};

export default Register;
