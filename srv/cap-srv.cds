using my.Inventory as my from '../db/schema';
using CV_INVENTORY from '../db/schema';
using VIEW_QTY_STOCK_YOY from '../db/schema';
using VIEW_QTY_STOCK_MTD from '../db/schema';
using VIEW_QTY_STOCK_WTD from '../db/schema';
using VIEW_TOP3_STOCKS_PRDOCUTCATEGORY from '../db/schema';
using VIEW_TOP_STOCKS_PRDOCUTNAME from '../db/schema';
using VIEW_TOP_3_PRODUCT_NAMES from '../db/schema';

service CatalogService   @(requires: 'authenticated-user')
 {  
 
  entity Users as projection on my.Users;
  entity Products as select from my.Products_Master;
  entity ProductsInventory @(restrict:[
            {
                grant : ['READ'],
                to :  'Viewer',
              Where:'ProductCategory = $user.ProductCategory'
            },
            {
                grant : [ 'WRITE' ],
                to : 'Admin'
            }
      ]) as select from my.Products_Inventory;
  entity Products_Transfer as select from my.Products_Transfer;
  function sleep() returns Boolean;
  entity cv_inventory as projection on CV_INVENTORY;
  entity view_qty_stock_yoy as projection on VIEW_QTY_STOCK_YOY;
  entity view_qty_stock_mtd as projection on VIEW_QTY_STOCK_MTD;
  entity view_qty_stock_wtd as projection on VIEW_QTY_STOCK_WTD;
  entity view_top_stocks_productcategory as projection on VIEW_TOP3_STOCKS_PRDOCUTCATEGORY;
  entity view_top_stocks_productname as projection on VIEW_TOP_STOCKS_PRDOCUTNAME;
  entity view_top_3_product_names as projection on VIEW_TOP_3_PRODUCT_NAMES;

}