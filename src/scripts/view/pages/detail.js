import CarDbSource from '../../data/data-source';
import UrlParser from '../../routes/url-parser';
import {vehicleDetail} from '../template/templateCreator';
import Swal from 'sweetalert2/dist/sweetalert2.all.min';
import Cookies from 'js-cookie';

const Detail = {
  async render() {
    return `
    <div class="vehicle-detail-page" id="vehicle-detail-page">
    </div>
    `;
  },

  async afterRender() {
    try {
      const url = UrlParser.parseActiveUrlWithoutCombiner();
      const vehicleData = await CarDbSource.detailCar(url.id);

      const detailContainer = document.getElementById('vehicle-detail-page');
      if (vehicleData === undefined) {
        detailContainer.innerHTML = '<h2>Data mobil tidak dapat ditemukan</h2>';
      }
      detailContainer.innerHTML = vehicleDetail(vehicleData);

      const sewaButton = document.querySelector('.sewaButton');
      sewaButton.addEventListener('click', () => this.loginCheck());
    } catch (error) {
      console.log(error);
    }
  },

  loginCheck() {
    const isLoggedIn = Cookies.get('uid') || {};

    if (!isLoggedIn) {
      Swal.fire({
        icon: 'warning',
        title: 'Anda Belum Login',
        text: 'Anda harus login untuk melakukan pemesanan',
        showCancelButton: true,
        cancelButtonText: 'Batal',
        confirmButtonText: 'Login',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '#/login';
        } else {
          window.location.href = '#/login';
        }
      });
    }
  },
};

export default Detail;
