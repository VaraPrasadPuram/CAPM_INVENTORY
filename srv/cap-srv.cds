using my.Inventory as my from '../db/schema';
//using CV_USERS from '../db/schema';

service CatalogService  {
  entity Users as projection on my.Users;
  entity Products as select from my.Products_Master;
  entity ProductsInventory as select from my.Products_Inventory;
function sleep() returns Boolean;
// entity cv_users as projection on CV_USERS;
}