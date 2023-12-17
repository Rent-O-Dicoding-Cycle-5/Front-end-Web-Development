import axios from 'axios';
import Swal from 'sweetalert2/dist/sweetalert2.all.min';
import {
  cardForListRentaled,
  createPartnerRegisterPages,
  partnerAfterRegistation,
} from '../template/templateCreator';
import API_ENDPOINT from '../../globals/api-endpoint';
import CarDbSource from '../../data/data-source';

const Partner = {
  async render() {
    // Check if the user is logged in
    const isLoggedIn = checkUserLoggedIn();

    // If the user is not logged in, show a SweetAlert2 popup
    if (!isLoggedIn) {
      Swal.fire({
        title: 'Anda Belum Login',
        text: 'Mohon login untuk mengakses halaman ini',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Log In',
        cancelButtonText: 'Batal',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '#/login';
        } else {
          window.location.href = '#/';
        }
      });

      return '';
    }

    // Read the login information from localStorage
    const loginInfo = JSON.parse(localStorage.getItem('loginInfo')) || {};
    const userRoles = Array.isArray(loginInfo.roles) ? loginInfo.roles : [];

    // Check if the user has the "Partner" role
    const isPartner = userRoles.includes('Partner');

    // If the user has the "Partner" role, render the page
    if (isPartner) {
      return `
        <div class="partnerPages" id="partnerPages">
          <section class="partnerHeader" id="partnerHeader">
            <p id="upperTagline">Jadilah Partner Rent'O</p>
            <p id="lowerTagline">Mobilmu Gayamu</p>
          </section>
          <div class="banner">
            <h2>Produktifkan Kendaraan Anda</h2>
            <p class="second-tagline">Bergabunglah menjadi partner Rent'</p>
            <div class="cards-container"></div>
          </div>
          <section class="partnerForm" id="partnerForm"></section>
        </div>
      `;
    }

    // If the user does not have the "Partner" role, show the registration form
    return `
      <div class="partnerForm" id="partnerForm">
        ${createPartnerRegisterPages()}
      </div>
    `;
  },

  async afterRender() {
    try {
      // Check if the user is logged in
      const isLoggedIn = checkUserLoggedIn();

      // If the user is not logged in, handle accordingly (e.g., redirect to login page)
      if (!isLoggedIn) {
        return;
      }

      // Read the login information from localStorage
      const loginInfo = JSON.parse(localStorage.getItem('loginInfo')) || {};
      const userRoles = loginInfo.roles || [];
      const accessToken = loginInfo.uid || ''; // Assuming 'uid' contains the access token

      // Check if the user is a partner
      const isPartner = userRoles.includes('Partner');
      const vehicles = await CarDbSource.partnerCars();

      // Do not proceed with rendering if the user is a partner
      if (isPartner) {
        const formContainer = document.getElementById('partnerForm');
        formContainer.innerHTML = partnerAfterRegistation();

        const listRentaledContainer = document.getElementById('listRentaledVehicle');
        if (vehicles.length === 0) {
          listRentaledContainer.innerHTML = '<h3>No Item founded</h3>';
        }
        vehicles.forEach((vehicle) => {
          listRentaledContainer.innerHTML += cardForListRentaled(vehicle);
        });

        listRentaledContainer.addEventListener('click', async (event) => {
          if (event.target.classList.contains('delete-icon')) {
            const vehicleId = event.target.getAttribute('data-vehicle-id');
            console.log(vehicleId);
            await CarDbSource.deletePartnerCar(vehicleId);
            window.location.reload();
          }
        });
      } else {
        // If the user does not have the "Partner" role, show the registration form
        const registrationFormContainer = document.getElementById('partnerForm');
        registrationFormContainer.innerHTML = createPartnerRegisterPages();

        // Add event listener to the registration form
        const partnerForm = document.getElementById('partnerForm');
        partnerForm.addEventListener('submit', async (e) => {
          e.preventDefault();
          console.log('test');

          try {
            // Gather form data
            const nama = document.getElementById('fullName_KTP').value;
            const nik = document.getElementById('nik_KTP').value;
            const tempatLahir = document.getElementById('placeBirth_KTP').value;
            const tanggalLahir = document.getElementById('dateBirth_KTP').value;
            const nomorSIM = document.getElementById('number_SIM').value;
            const berlakuSIM = document.getElementById('expired_SIM').value;
            const jenisSIM = document.getElementById('jenis-sim').value;
            const nomorHP = document.getElementById('phoneNumber').value;
            const alamatKTP = document.getElementById('address_KTP').value;
            const kota = document.getElementById('city_KTP').value;
            const provinsi = document.getElementById('province_KTP').value;
            const kodePos = document.getElementById('postalCode_KTP').value;

            // Make a POST request to the /partner/create endpoint
            const response = await axios.post(API_ENDPOINT.REGISTER_PARTNER, {
              phoneNumber: nomorHP,
              fullName_KTP: nama,
              nik_KTP: nik,
              address_KTP: alamatKTP,
              city_KTP: kota,
              province_KTP: provinsi,
              postalCode_KTP: kodePos,
              placeBirth_KTP: tempatLahir,
              dateBirth_KTP: tanggalLahir,
              type_SIM: jenisSIM,
              number_SIM: nomorSIM,
              expired_SIM: berlakuSIM,
            }, {
              headers: {
                'Authorization': `Bearer ${accessToken}`, // Use the access token from 'uid'
                'Content-Type': 'application/json',
              },
            });

            // Check if the request was successful
            if (response.status >= 200 && response.status < 300) {
              // Handle success (e.g., show a success message)
              Swal.fire({
                title: 'Berhasil Daftar',
                text: 'Anda telah terdaftar sebagai partner Rent\'O',
                icon: 'success',
              });

              const existingLoginInfo = JSON.parse(localStorage.getItem('loginInfo')) || {};
              const updatedRoles = {...existingLoginInfo.roles, 1: 'Partner'};
              const updatedLoginInfo = {...existingLoginInfo, roles: updatedRoles};
              localStorage.setItem('loginInfo', JSON.stringify(updatedLoginInfo));
            } else {
              // Handle error (e.g., show an error message)
              Swal.fire({
                title: 'Daftar Gagal',
                text: 'Terjadi kesalahan saat mendaftar',
                icon: 'error',
              });
            }
          } catch (error) {
            console.error('Kesalahan saat daftar:', error);
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
};

// Function to check if the user is logged in (example implementation)
function checkUserLoggedIn() {
  return localStorage.getItem('loginInfo') !== null;
}

export default Partner;
