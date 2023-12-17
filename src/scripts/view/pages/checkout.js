import CarDbSource from '../../data/data-source';
import UrlParser from '../../routes/url-parser';
import {paymentCheck} from '../template/templateCreator';
import API_ENDPOINT from '../../globals/api-endpoint';
import Swal from 'sweetalert2/dist/sweetalert2.all.min';
import Cookies from 'js-cookie';

const Checkout = {
  async render() {
    return `
    <div id="paymentInfo" class="paymentInfo">

    </div>
    `;
  },

  async afterRender() {
    try {
      const url = UrlParser.parseActiveUrlWithoutCombiner();
      const paymentChecking = document.getElementById('paymentInfo');

      const sessionData = JSON.parse(sessionStorage.getItem('rentalData'));
      const vehicleDatas = await CarDbSource.detailCar(url.id);

      paymentChecking.innerHTML = paymentCheck(sessionData, vehicleDatas);

      const checkOutButton = document.getElementById('paymentConfirm');
      paymentChecking.addEventListener('submit', this.updateTotalPaymentHandler);
      checkOutButton.addEventListener('click', this.updateTotalPaymentHandler);
    } catch (error) {
      console.log(error);
    }
  },

  async updateTotalPaymentHandler(event) {
    event.preventDefault();
    try {
      const rentID = JSON.parse(sessionStorage.getItem('rentID'));
      const rentId = rentID.rentId;

      const totalPayment = document.getElementById('paymentCheck').value.replace(/[,.]|Rp/g, '');

      const putUrl = `${API_ENDPOINT.UPDATE_PAYMENT}/${rentId}`;
      const accessToken = Cookies.get('uid') || {};

      const response = await fetch(putUrl, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          totalPayment: totalPayment.toString(),
        }),
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Sukses',
          text: 'Pembayaran berhasil dikonfirmasi!',
          showConfirmButton: false,
        }).then(() => {
          // Optional function to clear the sessionStorage
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Kesalahan',
          text: 'Terjadi kesalahan saat mengkonfirmasi pembayaran',
        });
      }
    } catch (error) {
      alert('Kesalahan saat mengkonfirmasi pembayaran', error.message);
    }
  }
  ,
};

export default Checkout;
