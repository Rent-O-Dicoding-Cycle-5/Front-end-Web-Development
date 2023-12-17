import CarDbSource from '../../data/data-source';
import {userProfilePages} from '../template/templateCreator';
import API_ENDPOINT from '../../globals/api-endpoint';
import Swal from 'sweetalert2/dist/sweetalert2.all.min';
import Cookies from 'js-cookie'; // Import the Cookies library

const userProfile = {
  async render() {
    return `
      <div id="userProfile" class="userProfile"></div>
    `;
  },

  async afterRender() {
    try {
      const accessToken = Cookies.get('uid');

      if (!accessToken) {
        Swal.fire({
          icon: 'info',
          title: 'Anda belum login',
          text: 'Mohon login untuk mengakses halaman ini.',
          showCancelButton: true,
          confirmButtonText: 'Log In',
          cancelButtonText: 'Batal',
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.hash = '#/login';
          } else {
            window.location.hash = '#/';
          }
        });

        return;
      }

      const userData = await CarDbSource.getUserProfile();

      const userProfileContent = userProfilePages(userData);

      const userProfileElement = document.getElementById('userProfile');
      userProfileElement.innerHTML = userProfileContent;

      const editProfilePictureButton = document.getElementById('editProfilePictureButton');
      editProfilePictureButton.addEventListener('click', async () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';

        fileInput.addEventListener('change', async (event) => {
          const file = event.target.files[0];

          if (!imageSizeLimit(file)) {
            Swal.fire({
              icon: 'error',
              title: 'Kesalahan',
              text: 'Ukuran gambar maksimal 2 MB!',
              showCancelButton: true,
              confirmButtonText: 'Pilih gambar lain',
              cancelButtonText: 'Batal',
            }).then((result) => {
              if (result.isConfirmed) {
                editProfilePictureButton.click();
              } else {
                // Don't do anything
              }
            });
            return;
          }

          // Display image preview
          const reader = new FileReader();
          reader.onload = function(e) {
            Swal.fire({
              imageUrl: e.target.result,
              showCancelButton: true,
              confirmButtonText: 'Upload',
              showLoaderOnConfirm: true,
              preConfirm: async () => {
                const formData = new FormData();
                formData.append('image', file);

                try {
                  const response = await fetch(API_ENDPOINT.UPLOAD_PROFILE_IMAGE, {
                    method: 'POST',
                    headers: {
                      Authorization: `Bearer ${CarDbSource.getAccessToken()}`,
                    },
                    body: formData,
                  });

                  if (!response.ok) {
                    const errorResponse = await response.json();
                    const errorMessage = errorResponse.message || 'Error: gagal mengubah foto profil!';
                    throw new Error(errorMessage);
                  }

                  const apiResponse = await response.json();
                  const imageUrl = apiResponse.data.imageUrl;

                  userData.urlImage = imageUrl;

                  const updatedUserProfileContent = userProfilePages(userData);
                  userProfileElement.innerHTML = updatedUserProfileContent;

                  Swal.fire({
                    icon: 'success',
                    title: 'Berhasil',
                    text: 'Foto profil berhasil diubah!',
                  });
                } catch (error) {
                  console.error(error);
                  Swal.fire({
                    icon: 'error',
                    title: 'Kesalahan',
                    text: error.message || 'Terjadi kesalahan saat mengunggah foto!',
                  });
                }
              },
            });
          };
          reader.readAsDataURL(file);
        });

        fileInput.click();
      });
    } catch (error) {
      console.error('Error:', error);
    }
  },
};

function imageSizeLimit(file) {
  const fileSize = file.size / 1024 / 1024;
  if (fileSize > 2) {
    return false;
  }

  return true;
}

export default userProfile;
