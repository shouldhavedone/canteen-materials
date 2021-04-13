const vt = require("../utils/vt.js")
let url = vt.getStorage('offLineUrl') + '/api'
let apiAddress = {
  getUserInfo: '/back-sys/back-auth/oauth/login',

  getDepartmentList: '/back-sys/food-service/getDepartmentList',
  getAllDepartment: '/back-sys/food-service/getAllDepartment',
  addOrUpdateDepartment: '/back-sys/food-service/addOrUpdateDepartment',
  delDepartment: '/back-sys/food-service/delDepartment',

  getPositionList: '/back-sys/food-service/getPositionList',
  getAllPosition: '/back-sys/food-service/getAllPosition',
  addOrUpdatePosition: '/back-sys/food-service/addOrUpdatePosition',
  delPosition: '/back-sys/food-service/delPosition',

  getSupplierList: '/back-sys/food-service/getSupplierList',
  getAllSupplier: '/back-sys/food-service/getAllSupplier',
  addOrUpdateSupplier: '/back-sys/food-service/addOrUpdateSupplier',
  delSupplier: '/back-sys/food-service/delSupplier',

  getMaterialList: '/back-sys/food-service/getMaterialList',
  getAllMaterial: '/back-sys/food-service/getAllMaterial',
  addOrUpdateMaterial: '/back-sys/food-service/addOrUpdateMaterial',
  delMaterial: '/back-sys/food-service/delMaterial',
}
export default apiAddress