const vehicleItem = (vehicles) => {
  const availabilityText = vehicles.isAvailable ? 'Tersedia' : 'Tidak Tersedia';
  const costAsNumber = parseFloat(vehicles.vehicleInformation.cost);

  return `
        <a href="#/detail/${vehicles.vehicleId}" class="vehicleItem-clickable">
          <div class="vehicleItem" id="vehicleItem">
            <section class="vehicleItem-left">
              <img class="lazyload" data-src="${vehicles.ImageUrl}" alt="Gambar dari ${vehicles.vehicleInformation.name}" />
            </section>
            <section class="vehicleItem-center">
                <h4 class="vehicle-name">${vehicles.vehicleInformation.brand} ${vehicles.vehicleInformation.name}</h4>
                <h6 class="availability">${availabilityText}</h6>
                <h6 class="city"><i class="fa-solid fa-location-dot"></i>  ${vehicles.locations.join(', ')}</h6>
            </section>
            <section class="vehicleItem-right">
                <h6 class="start-from">Mulai</h6>
                <h4 class="harga">Rp${costAsNumber.toLocaleString('id-ID')}/hari</h4>
            </section>
          </div>
        </a>
    `;
};

const createCarCollection = (vehicles) => {
  const costAsNumber = parseFloat(vehicles.vehicleInformation.cost);

  return `
    <a href="#/detail/${vehicles.vehicleId}" class="car-container">
      <div>
        <section class="car-collection-image">
          <img class="lazyload" data-src="${vehicles.ImageUrl}" alt="Gambar dari ${vehicles.vehicleInformation.name}" />
        </section>
        <section class="car-collection-name">
          <h4 class="car-name">${vehicles.vehicleInformation.brand} ${vehicles.vehicleInformation.name}</h4>
          <h6 class="city"><i class="fa-solid fa-location-dot"></i>  ${vehicles.locations.join(', ')}</h6>
        </section>
        <section class="car-collection-price">
          <h4 class="harga">Rp${costAsNumber.toLocaleString('id-ID')}/hari</h4>
        </section>
      </div>
    </a>
  `;
};


const vehicleDetail = (vehicles) => {
  const imageList = Array.from({length: 3}, (_, index) => `
    <img class="lazyload" data-src="${vehicles.ImageUrl}" alt="Gambar ${index + 1} dari ${vehicles.vehicleInformation.name}" />
  `).join('');
  const costAsNumber = parseFloat(vehicles.vehicleInformation.cost);
  const WhatsAppLink = `https://wa.me/62${vehicles.partner.partnerPhoneNumber}?text=Halo, Bapak/Ibu ${vehicles.partner.partnerName}%0A%0ASaya ingin menyewa ${vehicles.vehicleInformation.brand} ${vehicles.vehicleInformation.name} di web Rent'O`;

  return `
    <article id="vehicleDetail" class="vehicleDetail">
        <div class="vehicleDetailLeft" id="vehicleDetailLeft">
            <div class="detail-top-left">
                <img class="lazyload" data-src="${vehicles.ImageUrl}" alt="Gambar dari ${vehicles.vehicleInformation.name}" />
                <h1>${vehicles.vehicleInformation.brand} ${vehicles.vehicleInformation.name}</h1>
                Tahun: ${vehicles.vehicleInformation.year}
                <br>
                <i class="fa-solid fa-person"></i>  ${vehicles.vehicleInformation.seats} Penumpang
                <br>
                <i class="fa-solid fa-location-dot"></i>  ${vehicles.locations.join(', ')}
                <div class="vehicleInfoPrice">
                    <p>Mulai <br>Rp${costAsNumber.toLocaleString('id-ID')}/hari</p>
                    <div class="vehicleDetailOptionRent">
                        <a href="#/checking/${vehicles.vehicleId}" class="sewaButton" id="sewaButton">Sewa Sekarang</a>
                    </div>
                    <div class="whatsappButton">
                        <a aria-label="Chat on WhatsApp" 
                        href="${WhatsAppLink}" 
                        class="chat" target="_blank"><img alt="Chat on WhatsApp" 
                        src="./images/assets/icons/WhatsApp Button.png" /></a>
                    </div>
                </div>
            </div>
            <div class="detail-bottom-left">
                <section class="vehicleDetailInfo" id="vehicleDetailInfo">
                    <div class="vehicleOwnerLeft">
                        <img class="lazyload" data-src="${vehicles.partner.partnerImage}" alt="${vehicles.partner.partnerName}, Pemilik 
                            ${vehicles.vehicleInformation.brand} ${vehicles.vehicleInformation.name}" />
                        <div class="vehicleOwnerInfo">
                            <p>${vehicles.partner.partnerName}</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
        <div class="vehicleDetailRight" id="vehicleDetailRight">
            <section class="vehicleDetailDesc" id="vehicleDetailDesc">
                <div class="vehicleDetailDescription">
                    <h3>Deskripsi</h3>
                    <p>${vehicles.vehicleInformation.description}</p>
                </div>
                <div>
                    <h3>Gambar Mobil</h3>
                    <div class="vehicleDetailPhotolist">
                        ${imageList}
                    </div>
                </div>
            </section>
        </div>
    </article>
    `;
};

const createLoginPages = () => {
  return `
  <div class="form-login">
    <h1><span>Masuk</span></h1>
    <form>
      <div class="form-content">
        <input name="inputEmail" type="email" class="form-control" id="inputEmail" placeholder="Masukkan Email">
      </div>
      <div class="form-content">
        <input name="inputPassword" type="password" class="form-control" id="inputPassword" placeholder="Masukkan Kata Sandi">
      </div>
      <button id="submit-login" type="submit" class="btn">Login</button>
    </form>
  </div>
  `;
};

const createRegisterPages = () => {
  return `
  <div class="form-register">
    <h1><span>Daftar</span></h1>
    <form id="registrationForm" onsubmit="return validateForm()">
      <div class="form-content">
        <input name="inputName" type="text" class="form-control" id="inputName" placeholder="Masukkan Nama Lengkap">
      </div>
      <div class="form-content">
        <input name="inputEmail" type="email" class="form-control" id="inputEmail" placeholder="Masukkan Email">
      </div>
      <div class="form-content">
        <input name="inputPassword" type="password" class="form-control" id="inputPassword" placeholder="Masukkan Kata Sandi">
      </div>
      <div class="form-content">
        <input name="confirmPassword" type="password" class="form-control" id="confirmPassword" placeholder="Konfirmasi Kata Sandi">
      </div>
      <span id="passwordError" class="error"></span>
      <button id="submit-register" type="submit" class="btn">Register</button>
    </form>
  </div>
  `;
};

const createPartnerRegisterPages = () => {
  return `
    <form id="partnerForm" enctype="application/json">
        <h1>Daftar Partner</h1>
        <div class="form-body">
            <div class="form-column">
            <label for="nama">Nama sesuai KTP:</label>
            <input type="text" id="fullName_KTP" name="fullName_KTP" required>

            <label for="nik">NIK:</label>
            <input type="text" id="nik_KTP" name="nik_KTP" required>
            <span id="nikError" class="error"></span>

            <div class="tempatTanggalLahir">
                <label for="tempatLahir">Tempat</label>
                <label for="tanggalLahir">Tanggal Lahir:</label>
                <input type="text" id="placeBirth_KTP" name="placeBirth_KTP" required>
                <input type="date" id="dateBirth_KTP" name="dateBirth_KTP" min="1960-01-01" max="2010-01-01" required>
            </div>

            <label for="nomorSIM">Nomor SIM:</label>
            <input type="text" id="number_SIM" name="number_SIM" required>

            <label for="masaBerlaku">Masa Berlaku:</label>
            <input type="date" id="expired_SIM" name="expired_SIM" min="2023-01-01" required>

            <label for="jenis-sim">Jenis SIM:</label>
            <select id="jenis-sim">
                <option disabled selected value="">Pilih Jenis SIM</option>
                <option value="A">SIM A</option>
                <option value="B">SIM B</option>
                <option value="C">SIM C</option>
            </select>
            </div>

            <div class="form-column">
            <label for="telepon">Nomor HP:</label>
            <input type="tel" id="phoneNumber" name="phoneNumber" required>

            <label for="alamat">Alamat:</label>
            <input type="text" id="address_KTP" name="address_KTP" required>

            <label for="kota">Kota:</label>
            <input type="text" id="city_KTP" name="city_KTP" required>

            <label for="provinsi">Provinsi:</label>
            <select id="province_KTP">
                <option disabled selected value="">Pilih Provinsi</option>
                <option value="Aceh">Aceh</option>
                <option value="Bali">Bali</option>
                <option value="Banten">Banten</option>
                <option value="Bengkulu">Bengkulu</option>
                <option value="Gorontalo">Gorontalo</option>
                <option value="Jakarta">Jakarta</option>
                <option value="Jambi">Jambi</option>
                <option value="Jawa Barat">Jawa Barat</option>
                <option value="Jawa Tengah">Jawa Tengah</option>
                <option value="Jawa Timur">Jawa Timur</option>
                <option value="Kalimantan Barat">Kalimantan Barat</option>
                <option value="Kalimantan Selatan">Kalimantan Selatan</option>
                <option value="Kalimantan Tengah">Kalimantan Tengah</option>
                <option value="Kalimantan Timur">Kalimantan Timur</option>
                <option value="Kalimantan Utara">Kalimantan Utara</option>
                <option value="Kepulauan Bangka Belitung">Kepulauan Bangka Belitung</option>
                <option value="Kepulauan Riau">Kepulauan Riau</option>
                <option value="Lampung">Lampung</option>
                <option value="Maluku">Maluku</option>
                <option value="Maluku Utara">Maluku Utara</option>
                <option value="Nusa Tenggara Barat">Nusa Tenggara Barat</option>
                <option value="Nusa Tenggara Timur">Nusa Tenggara Timur</option>
                <option value="Papua">Papua</option>
                <option value="Papua Barat">Papua Barat</option>
                <option value="Papua Pengunungan">Papua Pengunungan</option>
                <option value="Papua Tengah">Papua Tengah</option>
                <option value="Papua Selatan">Papua Selatan</option>
                <option value="Papua Barat Daya">Papua Barat Daya</option>
                <option value="Riau">Riau</option>
                <option value="Sulawesi Barat">Sulawesi Barat</option>
                <option value="Sulawesi Selatan">Sulawesi Selatan</option>
                <option value="Sulawesi Tengah">Sulawesi Tengah</option>
                <option value="Sulawesi Tenggara">Sulawesi Tenggara</option>
                <option value="Sulawesi Utara">Sulawesi Utara</option>
                <option value="Sumatera Barat">Sumatera Barat</option>
                <option value="Sumatera Selatan">Sumatera Selatan</option>
                <option value="Sumatera Utara">Sumatera Utara</option>
                <option value="Yogyakarta">Yogyakarta</option>
            </select>

            <label for="kodepos">Kode Pos:</label>
            <input type="text" id="postalCode_KTP" name="postalCode_KTP" required>
            </div>
        </div>

        <button class="partnerButton" type="submit">Daftar Sekarang</button>
    </form>
    `;
};


const vehicleCheckin = (vehicles) =>{
  // Get the current date
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
  const yyyy = today.getFullYear();
  const currentDate = yyyy + '-' + mm + '-' + dd;

  return `
  <section class="vehicleDetailRenting" id="vehicleDetailRenting">
    <h1 class="title">Detail Rental ${vehicles.vehicleInformation.brand + ' ' + vehicles.vehicleInformation.name}</h1>
    <form>
        <div class="vehicleCheckinDate">
            <div>
                <label for="TanggalMulai">Tanggal Mulai</label>
                <input type="date" name="tanggalMulai" id="tanggalMulai" placeholder="Pilih Waktu" min="${currentDate}">
            </div>
            <div>
                <label for="tanggalSelesai">Tanggal Selesai</label>
                <input type="date" name="tanggalSelesai" id="tanggalSelesai" min="${currentDate}">
            </div>
        </div>
        <div class="vehicleDetailForm">
            <div>
                <label for="Lokasi?">Alamat Penjemputan</label>
                <textarea class="alamatpenjemputan" rows="4" type="text" name="lokasi" id="lokasi" placeholder="Masukkan alamat penjemputan"></textarea>
            </div>
            <div>
                <label for="waktuPenjemputan">Waktu Penjemputan</label>
                <input type="time" name="waktuPenjemputan" id="waktuPenjemputan" placeholder="Pilih Waktu">
            </div>
            <div>
                <label for="LokasiPengantar">Alamat Pengantaran</label>
                <textarea class="alamatpengantaran" rows="4" type="text" name="lokasiPengantar" id="lokasiPengantar" placeholder="Masukkan alamat pengantaran"></textarea>
            </div>
            <div>
                <label for="waktuPengantaran">Waktu Pengantaran</label>
                <input type="time" name="waktuPengantaran" id="waktuPengantaran">
            </div>
        </div>
        <div class="payingMethod">
            <div class="drawer-content">
                <label for="payment-method">Pilih Metode Pembayaran</label>
                <select id="payment-method">
                    <option disabled selected value="">Pilih Metode Pembayaran</option>
                    <optgroup label="Transfer Virtual Account">
                        <option value="BCA Virtual Account">BCA Virtual Account</option>
                        <option value="BNI Virtual Account">BNI Virtual Account</option>
                        <option value="BRI Virtual Account">BRI Virtual Account</option>
                        <option value="Permata Virtual Account">Permata Virtual Account</option>
                        <option value="Mandiri  VirtualAccount">Mandiri Virtual Account</option>
                    </optgroup>
                    <optgroup label="Tunai di Gerai Retail">
                        <option value="Indomaret">Indomaret</option>
                        <option value="AlfaMart">Alfamart</option>
                    </optgroup>
                    <optgroup label="E-Wallet">
                        <option value="QRIS">QRIS</option>
                        <option value="GoPay">GoPay</option>
                    </optgroup>
                </select>
            </div>
        </div>
        <button id="insertData-btn">Lanjutkan Pembayaran</button>
    </form>
  </section>
  `;
};

// List of partner's rented vehicles
const partnerAfterRegistation = (vehicles) => {
  return `
      <div id="rentaledVehicleContainer" class="rentaledVehicleContainer">
        <section id="rentaledVehicleHeader" class="rentaledVehicleHeader">
            <h2>Partner List Mobil</h2>
            <p>Atur dan sewakan mobilmu dengan<br>Mudah dan Cepat</p>
        </section>
        <section id="listRentaledVehicleContainer" class="listRentaledVehicleContainer">
            <ul>
                <li id="listRentaledToggle" class="listRentaledToggle focused" onclick="showListRentaled()">List Mobil</li>
                <li id="listHistoryToggle" class="listHistoryToggle" onclick="showRentedHistory()">Riwayat Sewa</li>
            </ul>
            <div id="listYourRentaled" class="listYourRentaled active">
                <div class="listRentaledVehicle" id="listRentaledVehicle">
                    
                </div>
                <div id="addRentaledVehicle" class="addRentaledVehicle">
                    <a href="#/addVehicle">
                        <i class="fa-solid fa-plus"></i>
                    </a>
                </div>
            </div>
            <div id="listRentaledHistory" class="listRentaledHistory">
                <section class="rentaledHistory">
                    <img src="https://i.pinimg.com/736x/2c/61/d5/2c61d5d2790e1f902ecc15e63534a950.jpg" alt="">
                    <div class="rentaledVehicleInfo">
                        <h4>Ryo Yamada</h4>
                        <p>Waifuku</p>
                    </div>
                    <div>
                        <p>Mulai dari</p>
                        <h5>Rp. 150.000/Hari</h5>
                    </div>
                </section>
            </div>
        </section
      </div>
  `;
};

// History of rented vehicles
const cardForListRentaled = (vehicle) => {
  const availabilityClass = vehicle.isAvailable ? 'available' : 'unavailable';
  const availabilitySwitch = vehicle.isAvailable ? 'avia-on' : 'avia-off';
  return `
      <section class="rentaledVehicle">
          <img src="${vehicle.ImageUrl}" alt="foto ${vehicle.vehicleInformation.brand} ${vehicle.vehicleInformation.name}">
          <div class="rentaledVehicleInfo">
              <h4>${vehicle.vehicleInformation.brand} ${vehicle.vehicleInformation.name}</h4>
              <p>${vehicle.vehicleInformation.type}</p>
          </div>
          <div class="availableInfo">
              <p class="${availabilityClass} ${availabilitySwitch}" id="availability">${vehicle.isAvailable ? 'Available' : 'Unavailable'}</p>
          </div>
          <i class="fa-solid fa-trash fa-2xl delete-icon" data-vehicle-id="${vehicle.vehicleId}" style="color: #f45d48;"></i>
      </section>
    `;
};


const userProfilePages = (userData) => {
  return `
    <div class="userContainer" id="userContainer">
        <h1>Detail Akun</h1>
        <section class="topUserProfile" id="topUserProfile">
            <div class="userProfilePicture" id="editProfilePictureButton">
                <img src="${userData.urlImage}" width="200px" alt="oke" class="hover-image">
                <div class="overlay">
                    <span class="overlay-text"><i class="fa-regular fa-pencil"></i> Ubah Gambar</span>
                </div>
            </div>
            <h2 class="name">${userData.username.toUpperCase()}</h2>
            <h3 class="email">${userData.email}</h3>
            <p>Anda adalah <b>${userData.roles.join(', dan ')}</b></p>
        </section>
        <section class="bodyUserProfile" id="bodyUserProfile">
            <a href="">
                <div class="userEditProfile profileOption">
                    <img src="./images/icons/userProfile-page/VectorEdit.png" alt="">
                    <h5>Edit Profile</h5>
                </div>
            </a>
            <a href="#/userHistory">
                <div class="RentHistoBttn profileOption">
                    <img src="./images/icons/userProfile-page/Car-V8.png" alt="">
                    <h5>Riwayat Sewa Mobil</h5>
                </div>
            </a>
            <a href="" style="display: none;">
                <div class="RentaledHistoBttn profileOption">
                    <img src="./images/icons/userProfile-page/Car-Maintenance.png" alt="">
                    <h5>Riwayat Penyewaan Mobil</h5>
                </div>
            </a>
            <a href="">
                <div class="logOutBttn profileOption">
                    <img src="./images/icons/userProfile-page/Logout.png" alt="">
                    <h5>Log Out</h5>
                </div>
            </a>
        </section>
    </div>
    `;
};

const createSearchBar = () => {
  return `
        <div class="search-bar" id="search-bar">
            <h1>Penyewaan</h1>
            <p>Pilih waktu, lokasi, 
                dan jenis kendaraan yang ingin digunakan. 
                Nikmati perjalanan menyenangkan dengan layanan Rent'O.
            </p>
            <form action="" method="post" class="rental-option">
                <div class="rental-leftSide" id="rental-leftSide">
                    <div>
                        <label for="vehicle-location">Lokasi Kendaraan</label>
                        <select id="vehicle-location">
                            <option disabled selected value="">Pilih Lokasi</option>
                            <option value="Jakarta">Jakarta</option>
                            <option value="Bogor">Bogor</option>
                            <option value="Depok">Depok</option>
                            <option value="Tangerang">Tangerang</option>
                            <option value="Bekasi">Bekasi</option>
                        </select>
                    </div>
                    <div>
                        <label for="vehicle-type">Tipe Kendaraan</label>
                        <select id="vehicle-type">
                            <option disabled selected value="">Pilih Tipe Kendaraan</option>
                            <option value="Mobil">Mobil</option>
                            <option value="Motor">Motor</option>
                        </select>
                    </div>
                    <div>
                        <label for="vehicle-brand">Merek</label>
                        <select id="vehicle-brand">
                            <option disabled selected value="">Pilih Merek</option>
                            <option value="Daihatsu">Daihatsu</option>
                            <option value="Honda">Honda</option>
                            <option value="Toyota">Toyota</option>
                            <option value="Suzuki">Suzuki</option>
                            <option value="Mitsubishi">Mitsubishi</option>
                            <option value="Nissan">Nissan</option>
                            <option value="Hyundai">Hyundai</option>
                        </select>
                    </div>
                </div>
            </form>
            <button type="submit" id="submitRentalOption">Cari</button>
        </div>
    `;
};

const addRentalVehicle = () => {
  return `
        <form id="addVehicleForm">
            <h1>Data Mobil</h1>
            <div class="inputFotoMobil">
                <div id="imagePreviewContainer" class="imagePreviewContainer">
                    <img src="https://i.pinimg.com/564x/00/00/5f/00005f2792a21e1b29d08638dc3d1027.jpg" id="imagePreview" alt="Pratinjau Gambar" width="150px">
                </div>
                <div class="inputFotoMobilContainer">
                    <!-- <img src="./src/public/images/icons/partner-page-icon/Vector.png" width="100px" alt="" srcset=""> -->
                    <input type="file" name="file" id="vehicleImage" accept="image/png, image/jpeg" onchange="previewImage()" >
                </div>
            </div>
            <div class="bodyInputMobil">
                <div class="bodyInputMobilLeft">
                    <div class="add-pages-form-group">
                        <label for="brand">Merek Kendaraan</label>
                        <select id="brand">
                            <option disabled selected value="">Pilih Merek</option>
                            <option value="Daihatsu">Daihatsu</option>
                            <option value="Honda">Honda</option>
                            <option value="Toyota">Toyota</option>
                            <option value="Suzuki">Suzuki</option>
                            <option value="Mitsubishi">Mitsubishi</option>
                            <option value="Nissan">Nissan</option>
                            <option value="Hyundai">Hyundai</option>
                        </select>
                    </div>
                    <div class="add-pages-form-group">
                        <label for="platMobil">Nomor Pelat Kendaraan</label>
                        <input type="text" id="plateNumber" name="plateNumber" placeholder="Contoh: B1234PP">
                    </div>
                    <div class="add-pages-form-group">
                        <label for="stnk">STNK</label>
                        <input type="text" id="stnk" name="stnk" placeholder="Masukkan nomor STNK">
                    </div>
                    <div class="add-pages-form-group">
                        <label for="tipe-kendaraan">Tipe Kendaraan</label>
                        <select id="type">
                            <option disabled selected value="">Pilih Tipe Kendaraan</option>
                            <option value="Mobil">Mobil</option>
                            <option value="Motor">Motor</option>
                        </select>
                    </div>
                </div>
                <div class="bodyInputMobilRight">
                    <div class="add-pages-form-group">
                        <label for="namaMobil">Seri</label>
                        <input type="text" id="name" name="name" placeholder="Contoh: Agya, Ayla">
                    </div>
                    <div class="add-pages-form-group">
                        <label for="tahunKeluaran">Tahun</label>
                        <select id="year" name="year">
                            <option disabled selected value="">Pilih Tahun</option>
                            <option value="2023">2023</option>
                            <option value="2022">2022</option>
                            <option value="2021">2021</option>
                            <option value="2020">2020</option>
                            <option value="2019">2019</option>
                            <option value="2018">2018</option>
                            <option value="2017">2017</option>
                            <option value="2016">2016</option>
                        </select>
                    </div>
                    <div class="add-pages-form-group">
                        <label for="bpkb">BPKB</label>
                        <input type="text" id="bpkb" name="bpkb" placeholder="Masukkan nomor BPKB">
                    </div>
                    <div class="add-pages-form-group">
                        <label for="maxPenumpang">Maksimum Penumpang</label>
                        <select id="seats" name="seats">
                            <option disabled selected value="">Pilih Maksimum Penumpang</option>
                            <option value="2">2</option>
                            <option value="4">4</option>
                            <option value="7">7</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="addVehicleDesc">
                <label for="deskripsi">Deskripsi</label>
                <textarea id="description" name="description" rows="4" placeholder="Deskripsikan secara singkat"></textarea>
            </div>
            <div class="footerAddForm" id="footerAddForm">
                <div class="hargaSewaForm">
                    <div class="add-pages-form-group">
                        <label for="hargaSewa">Biaya Sewa</label>
                        <div class="input-group">
                            <span class="rupiah-symbol">Rp</span>
                            <input type="float" id="cost" name="cost" placeholder="Contoh: 150.000">
                        </div>
                    </div>
                </div>
                <div class="addAlamatForm">
                    <section class="addAlamatFormLeft">
                        <div class="add-pages-form-group">
                            <label for="lokasi">Lokasi</label>
                            <select id="location">
                                <option disabled selected value="">Pilih Lokasi</option>
                                <option value="Jakarta">Jakarta</option>
                                <option value="Bogor">Bogor</option>
                                <option value="Depok">Depok</option>
                                <option value="Tangerang">Tangerang</option>
                                <option value="Bekasi">Bekasi</option>
                            </select>
                        </div>
                    </section>
                </div>
                <div class="addAlamatForm">
                    <section class="addAlamatFormLeft">
                        <div class="add-pages-form-group">
                            <label for="alamat">Alamat</label>
                            <textarea name="address" id="address" rows="4" placeholder="Masukkan alamat Anda secara lengkap"></textarea>
                        </div>
                    </section>
                </div>
            </div>
            <button type="submit" class="buttonTambahMobil">Tambahkan Mobil</button>
        </form>
    `;
};

const paymentCheck = (sessionDatas, vehicles) => {
  const timeCost = sessionDatas.selisihHari * parseFloat(vehicles.vehicleInformation.cost);
  const costAsNumber = parseFloat(vehicles.vehicleInformation.cost);

  return `
        <form>
            <h2>Detail Pembayaran</h2>
            <section id="paymentBody" class="paymentBody">
                <div class="paymentBodyDesc">
                    <img src="${vehicles.ImageUrl}" alt="" width="150px" style="border-radius: 10px;">
                    <section class="paymentBodyDescName">
                        <p><b>${vehicles.vehicleInformation.brand + ' ' + vehicles.vehicleInformation.name}</b></p>
                        <p>${vehicles.partner.partnerName}</p>
                    </section>
                </div>
                <div id="paymentBodyDateIndex" class="paymentBodyDateIndex">
                    <div class="payment-form-group">
                        <label for="lokPenyewaan">Lokasi Penyewaan:</label>
                        <input type="text" value="${vehicles.locations}" id="lokPenyewaan" name="lokPenyewaan" readonly>
                    </div>
                    <div class="payment-form-group">
                        <label for="tglMulai">Tanggal Mulai :</label>
                        <input type="date" id="tanggalMulai" name="tanggalMulai" value="${sessionDatas.startDate}" readonly>
                    </div>
                    <div class="payment-form-group">
                        <label for="tglAkhir">Tanggal Selesai : </label>
                        <input type="date" id="tanggalSelesai" name="tanggalSelesai" value="${sessionDatas.endDate}" readonly>
                    </div>
                </div>
                <hr>
                <div id="paymentBodyCheckIndex" class="paymentBodyCheckIndex">
                    <div class="payment-form-group">
                        <label for="lokPenjemputan">Lokasi Penjemputan :</label>
                        <input type="text" id="lokPenjemputan" name="lokPenjemputan" value="${sessionDatas.pickupLocation}" readonly>
                    </div>
                    <div class="payment-form-group">
                        <label for="waktuPenjemputan">Waktu Penjemputan :</label>
                        <input type="time" id="waktuPenjemputan" name="waktuPenjemputan" value="${sessionDatas.pickupTime}" readonly>
                    </div>
                    <div class="payment-form-group">
                        <label for="lokPengantaran">Lokasi Pengantaran :</label>
                        <input type="text"  id="lokPengantaran" name="lokPengantaran" value="${sessionDatas.deliveryLocation}" readonly>
                    </div>
                    <div class="payment-form-group">
                        <label for="waktuPengantaran">Waktu Pengantaran :</label>
                        <input type="time" id="waktuPengantaran" name="waktuPengantaran" value="${sessionDatas.deliveryTime}" readonly>
                    </div>
                </div>
                <hr>
                <div id="paymentMethodName" class="paymentMethodName">
                    <label for="payment-method">Metode Pembayaran</label>
                    <input type="text" id="paymentMethodName" name="paymentMethodName" value="${sessionDatas.paymentMethod}" readonly>
                </div>
                <div id="paymentTotalCheck" class="paymentTotalCheck">
                    <label for="paymentIndexes">${sessionDatas.selisihHari} hari x Rp${costAsNumber.toLocaleString('id-ID')}</label>
                    <input type="text" id="paymentCheck" name="paymentCheck" value="Rp${timeCost.toLocaleString('id-ID')}" readonly>
                </div>
            </section>
            <button class="paymentConfirm" type="submit">Bayar Sekarang</button>
        </form>
    `;
};

const userHistoryPageHead = () => {
  return `
    <section id="userHistoryHeader" class="userHistoryHeader">
        <h2>Riwayat Sewa Pengguna</h2>
        <p>Lihat Riwayat Sewa<br>Pesananmu disini</p>    
    </section>
    <section class="userHistoryContainer">
        <div class="userHistoryIndex">
            <p>Riwayat Pengguna</p>
        </div>
        <div id="userHistoryList" class="userHistoryList">

        </div>
    </section>
    `;
};

const userHistoryCard =() => {
  return `
    <section class="userRentaledHistory">
        <img src="https://i.pinimg.com/564x/80/16/fd/8016fd6864a1ffc27887cc7a5d814737.jpg" alt="">
        <div class="UserRentalInfo">
            <h4>Lexus LFA</h4>
            <p>2012</p>
        </div>
        <div>
            <p>Sudah disewa</p>
            <p>12-12-2023</p>
        </div>
    </section> 
    `;
};

module.exports = {
  vehicleItem,
  vehicleDetail,
  createLoginPages,
  createRegisterPages,
  createPartnerRegisterPages,
  createCarCollection,
  vehicleCheckin,
  partnerAfterRegistation,
  cardForListRentaled,
  userProfilePages,
  createSearchBar,
  addRentalVehicle,
  paymentCheck,
  userHistoryPageHead,
  userHistoryCard,
};
