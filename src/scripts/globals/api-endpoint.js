import CONFIG from './config';

// Disesuaikan sama API yang digunakan
const API_ENDPOINT = {
  LIST: `${CONFIG.BASE_URL}/vehicle/list`,
  BRAND: `${CONFIG.BASE_URL}/vehicle/vehicle-brand`,
  DETAIL: (id) => `${CONFIG.BASE_URL}/vehicle/detail/${id}`,
  CREATE_CAR: `${CONFIG.BASE_URL}/partner-vehicle`,
  LOGIN: `${CONFIG.BASE_URL}/auth/login`,
  REGISTER: `${CONFIG.BASE_URL}/auth/register`,
  PROFILE: `${CONFIG.BASE_URL}/user/profile`,
  REGISTER_PARTNER: `${CONFIG.BASE_URL}/partner/create`,
  UPLOAD_PROFILE_IMAGE: `${CONFIG.BASE_URL}/user/profile/img`,
  PARTNER_CAR: `${CONFIG.BASE_URL}/partner-vehicle/list`,
  ORDER_RENTAL: `${CONFIG.BASE_URL}/rent-vehicle`,
  UPDATE_PAYMENT: `${CONFIG.BASE_URL}/rent-vehicle/payment`,
  PARTNER_CAR: `${CONFIG.BASE_URL}/partner-vehicle/list`,
  DELETE_PARTNER_CAR: (id) => `${CONFIG.BASE_URL}/partner-vehicle/delete/${id}`,
  RENT_VEHICLE: (id) => `${CONFIG.BASE_URL}/rent-vehicle/detail/${id}`,
  ORDER_HISTORY: `${CONFIG.BASE_URL}/user-rent`,
};

export default API_ENDPOINT;
