import {addRentalVehicle} from '../template/templateCreator';
import axios from 'axios';
import API_ENDPOINT from '../../globals/api-endpoint';
import Swal from 'sweetalert2/dist/sweetalert2.all.min';
import Cookies from 'js-cookie';

const addVehicle = {
  async render() {
    return `
      <div id="addYourVehicle" class="addYourVehicle">
      </div>
    `;
  },

  async afterRender() {
    const addFormVehicleContainer = document.getElementById('addYourVehicle');
    try {
      addFormVehicleContainer.innerHTML += addRentalVehicle();

      // Add event listener to the form for handling submission
      const addVehicleForm = document.getElementById('addVehicleForm');
      addVehicleForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Validate form fields
        if (!validateForm()) {
          return;
        }

        const formData = new FormData();

        // Add image file to FormData
        const fileInput = document.getElementById('vehicleImage');
        const file = fileInput.files[0];
        if (file) {
          formData.append('vehicleImage', file);
        }

        // Add other form data to FormData (replace 'name' with actual field names)
        formData.append('name', document.getElementById('name').value);
        formData.append('description', document.getElementById('description').value);
        formData.append('plateNumber', document.getElementById('plateNumber').value);
        formData.append('stnk', document.getElementById('stnk').value);
        formData.append('type', document.getElementById('type').value);
        formData.append('brand', document.getElementById('brand').value);
        formData.append('year', document.getElementById('year').value);
        formData.append('bpkb', document.getElementById('bpkb').value);
        formData.append('seats', document.getElementById('seats').value);
        formData.append('cost', document.getElementById('cost').value);

        const costInput = document.getElementById('cost').value;
        const formattedCost = formatCostInput(costInput);
        formData.delete('cost');
        formData.append('cost', formattedCost);

        formData.append('location', document.getElementById('location').value);
        formData.append('address', document.getElementById('address').value);

        // Retrieve Bearer token from local storage
        const uid = Cookies.get('uid') || '';

        const costInputField = document.getElementById('cost');
        costInputField.addEventListener('input', function() {
          // eslint-disable-next-line no-invalid-this
          this.value = formatCostInput(this.value);
        });

        // Function to format the cost input
        function formatCostInput(input) {
          return input.replace(/[,.]/g, '');
        }

        try {
          const response = await axios.post(API_ENDPOINT.CREATE_CAR, formData, {
            headers: {
              'Authorization': `Bearer ${uid}`,
              'Content-Type': 'multipart/form-data', // Set content type for FormData
            },
          });

          // Check if the request was successful
          if (response.status === 200) {
            Swal.fire({
              title: 'Sukses',
              text: 'Kendaraan berhasil ditambahkan!',
              icon: 'success',
            }).then(() => {
              location.reload();
            });
          } else {
            Swal.fire({
              title: 'Kesalahan',
              text: `Gagal menambahkan kendaraan: ${response.data.message}`,
              icon: 'error',
            });
          }
        } catch (error) {
          Swal.fire({
            title: 'Kesalahan',
            text: `Gagal menambahkan kendaraan: ${error.message}`,
            icon: 'error',
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  },
};

// Function to validate the form fields
function validateForm() {
  const requiredFields = ['vehicleImage', 'brand', 'name', 'plateNumber', 'year', 'stnk', 'bpkb', 'type', 'seats', 'description', 'cost', 'location', 'address'];
  for (const field of requiredFields) {
    const inputField = document.getElementById(field);
    const value = inputField.value.trim();
    let displayValue = value;

    if (!value) {
      if (field === 'vehicleImage') {
        displayValue = 'Gambar Kendaraan';
      } else if (field === 'brand') {
        displayValue = 'Merek';
      } else if (field === 'name') {
        displayValue = 'Seri';
      } else if (field === 'plateNumber') {
        displayValue = 'Nomor Plat';
      } else if (field === 'year') {
        displayValue = 'Tahun';
      } else if (field === 'stnk') {
        displayValue = 'STNK';
      } else if (field === 'bpkb') {
        displayValue = 'BPKB';
      } else if (field === 'type') {
        displayValue = 'Tipe Kendaraan';
      } else if (field === 'seats') {
        displayValue = 'Maksimum Penumpang';
      } else if (field === 'description') {
        displayValue = 'Deskripsi';
      } else if (field === 'cost') {
        displayValue = 'Biaya Sewa';
      } else if (field === 'location') {
        displayValue = 'Lokasi';
      } else if (field === 'address') {
        displayValue = 'Alamat';
      }

      Swal.fire({
        title: 'Peringatan',
        text: `${displayValue} harus diisi`,
        icon: 'warning',
      });

      return false;
    }
  }
  return true;
}

export default addVehicle;
