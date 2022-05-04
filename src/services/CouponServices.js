import requests from './httpService';

const CouponServices = {
  addCoupon(body) {
    return requests.post('/sub-categories', body);
  },
  getAllCoupons() {
    return requests.get('/sub-categories/paged?page=0&size=10&categoryId=626c84a474c8456606e1889c');
  },
  getCouponById(id) {
    return requests.get(`/sub-categories/${id}`);
  },
  updateCoupon(id, body) {
    return requests.put(`/sub-categories/${id}`, body);
  },
  deleteCoupon(id) {
    return requests.delete(`/sub-categories/${id}`);
  },
};

export default CouponServices;
