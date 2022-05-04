import requests from './httpService';

const CategoryServices = {
  getAllCategory() {
    return requests.get('/categories/paged?page=0&size=10');
  },

  getCategoryById(id) {
    return requests.get(`/categories/${id}`);
  },

  addCategory(body) {
    return requests.post('/categories', body);
  },

  updateCategory(id, body) {
    return requests.put(`/categories/${id}`, body);
  },

  updateStatus(id, body) {
    return requests.put(`/categories/status/${id}`, body);
  },

  deleteCategory(id, body) {
    return requests.delete(`/categories/${id}`, {});
  },
};

export default CategoryServices;
