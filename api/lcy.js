let apiAddress = {
  getUserInfo: '/back-sys/back-auth/oauth/login',

  getUserList: '/back-sys/back-auth/oauth/getUserList',
  delUser: '/back-sys/back-auth/oauth/delUser',
  
  register: '/back-sys/back-auth/oauth/register',
  modifyUser: '/back-sys/back-auth/oauth/modifyUser',
  modifyPwd: '/back-sys/back-auth/oauth/modifyPwd',

  uploadToken: '/back-sys/back-auth/qiniu/uptoken',

  getDepartmentList: '/back-sys/food-service/getDepartmentList',
  getAllDepartment: '/back-sys/food-service/getAllDepartment',
  addOrUpdateDepartment: '/back-sys/food-service/addOrUpdateDepartment',
  delDepartment: '/back-sys/food-service/delDepartment',

  getPositionList: '/back-sys/food-service/getPositionList',
  getAllPosition: '/back-sys/food-service/getAllPosition',
  addOrUpdatePosition: '/back-sys/food-service/addOrUpdatePosition',
  delPosition: '/back-sys/food-service/delPosition',
  getPositionDetail: '/back-sys/food-service/getPositionDetail',

  getSupplierList: '/back-sys/food-service/getSupplierList',
  getAllSupplier: '/back-sys/food-service/getAllSupplier',
  addOrUpdateSupplier: '/back-sys/food-service/addOrUpdateSupplier',
  delSupplier: '/back-sys/food-service/delSupplier',

  getMaterialList: '/back-sys/food-service/getMaterialList',
  getAllMaterial: '/back-sys/food-service/getAllMaterial',
  addOrUpdateMaterial: '/back-sys/food-service/addOrUpdateMaterial',
  delMaterial: '/back-sys/food-service/delMaterial',
  getMaterialDetail: '/back-sys/food-service/getMaterialDetail',

  getMealTimeList: '/back-sys/food-service/getMealTimeList',
  getAllMealTime: '/back-sys/food-service/getAllMealTime',
  addOrUpdateMealTime: '/back-sys/food-service/addOrUpdateMealTime',
  delMealTime: '/back-sys/food-service/delMealTime',
  getMealtimeDetail: '/back-sys/food-service/getMealtimeDetail',

  getFoodTypeList: '/back-sys/food-service/getFoodtypeList',
  getAllFoodType: '/back-sys/food-service/getAllFoodtype',
  addOrUpdateFoodType: '/back-sys/food-service/addOrUpdateFoodtype',
  delFoodType: '/back-sys/food-service/delFoodtype',

  getFoodList: '/back-sys/food-service/getFoodList',
  getAllFood: '/back-sys/food-service/getAllFood',
  addOrUpdateFood: '/back-sys/food-service/addOrUpdateFood',
  delFood: '/back-sys/food-service/delFood',
  getFoodByType: '/back-sys/food-service/getFoodByType',
  getFoodDetail: '/back-sys/food-service/getFoodDetail',

  getStockList: '/back-sys/food-service/getStockList',
  addStock: '/back-sys/food-service/addStock',
  getAllStock: '/back-sys/food-service/getAllStock',

  getOrderList: '/back-sys/food-service/getOrderList',

  addDailyMenu: '/back-sys/food-service/addDailyMenu',
  getDailyMenuList: '/back-sys/food-service/getDailyMenuList',
  delFoodOnMenu: '/back-sys/food-service/delFoodOnMenu',

  getAllNotice: '/back-sys/food-service/getAllNotice',
  getNoticeOne: '/back-sys/food-service/getNoticeOne',
  updateNotice: '/back-sys/food-service/updateNotice',

}
export default apiAddress