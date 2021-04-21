'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/back-sys/back-auth/oauth/login', controller.user.getUserInfo);
  router.get('/back-sys/back-auth/oauth/getUserList', controller.user.getUserList);
  router.post('/back-sys/back-auth/oauth/delUser', controller.user.delUser);
  router.post('/back-sys/back-auth/oauth/register', controller.user.addOrUpdateUser);
  router.post('/back-sys/back-auth/oauth/modifyUser', controller.user.addOrUpdateUser);
  router.post('/back-sys/back-auth/oauth/modifyPwd', controller.user.modifyPwd);

  router.get('/back-sys/back-auth/qiniu/uptoken', controller.qiniu.getToken);

  router.get('/back-sys/food-service/getDepartmentList', controller.department.getDepartmentList);
  router.post('/back-sys/food-service/addOrUpdateDepartment', controller.department.addOrUpdateDepartment);
  router.post('/back-sys/food-service/delDepartment', controller.department.delDepartment);
  router.get('/back-sys/food-service/getAllDepartment', controller.department.getAllDepartment);
  
  router.get('/back-sys/food-service/getPositionList', controller.position.getPositionList);
  router.post('/back-sys/food-service/addOrUpdatePosition', controller.position.addOrUpdatePosition);
  router.post('/back-sys/food-service/delPosition', controller.position.delPosition);
  router.get('/back-sys/food-service/getAllPosition', controller.position.getAllPosition);
  
  router.get('/back-sys/food-service/getMealTimeList', controller.mealtime.getMealtimeList);
  router.post('/back-sys/food-service/addOrUpdateMealTime', controller.mealtime.addOrUpdateMealtime);
  router.post('/back-sys/food-service/delMealTime', controller.mealtime.delMealtime);
  router.get('/back-sys/food-service/getAllMealTime', controller.mealtime.getAllMealtime);

  router.get('/back-sys/food-service/getSupplierList', controller.supplier.getSupplierList);
  router.post('/back-sys/food-service/addOrUpdateSupplier', controller.supplier.addOrUpdateSupplier);
  router.post('/back-sys/food-service/delSupplier', controller.supplier.delSupplier);
  router.get('/back-sys/food-service/getAllSupplier', controller.supplier.getAllSupplier);
  
  router.get('/back-sys/food-service/getMaterialList', controller.material.getMaterialList);
  router.post('/back-sys/food-service/addOrUpdateMaterial', controller.material.addOrUpdateMaterial);
  router.post('/back-sys/food-service/delMaterial', controller.material.delMaterial);
  router.get('/back-sys/food-service/getAllMaterial', controller.material.getAllMaterial);

  router.get('/back-sys/food-service/getFoodtypeList', controller.foodtype.getFoodtypeList);
  router.post('/back-sys/food-service/addOrUpdateFoodtype', controller.foodtype.addOrUpdateFoodtype);
  router.post('/back-sys/food-service/delFoodtype', controller.foodtype.delFoodtype);
  router.get('/back-sys/food-service/getAllFoodtype', controller.foodtype.getAllFoodtype);
  
  router.get('/back-sys/food-service/getFoodList', controller.food.getFoodList);
  router.post('/back-sys/food-service/addOrUpdateFood', controller.food.addOrUpdateFood);
  router.post('/back-sys/food-service/delFood', controller.food.delFood);
  router.get('/back-sys/food-service/getAllFood', controller.food.getAllFood);
  router.get('/back-sys/food-service/getFoodByType', controller.food.getFoodByType);

  router.get('/back-sys/food-service/getStockList', controller.stock.getStockList);
  router.post('/back-sys/food-service/addStock', controller.stock.addStock);
  router.get('/back-sys/food-service/getAllStock', controller.stock.getAllStock);
  
  router.get('/back-sys/food-service/getOrderList', controller.order.getOrderList);

  router.get('/back-sys/food-service/getDailyMenuList', controller.dailymenu.getDailyMenuList);
  router.post('/back-sys/food-service/addDailyMenu', controller.dailymenu.addDailyMenu);
  router.post('/back-sys/food-service/delFoodOnMenu', controller.dailymenu.delFoodOnMenu);
};
