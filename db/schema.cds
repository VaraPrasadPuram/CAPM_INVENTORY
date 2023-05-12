//namespace my.Inventory;

using { Currency, managed, sap, cuid } from '@sap/cds/common';

context my.Inventory {
  

entity Users {
  Username : String(60);
  Password:String(200); 
};

entity Products_Master  {
 ProductId       : String(200) @title:'Product Id'; 
  ProductCategory : String(100) @title:'Prodcut Category';
  ProductName     : String(500) @title:'Prodcut Name';
  ProductType     : String(500) @title:'Prodcut Type';
  CreatedOn       : String  @title:'Product created On Date';
  CreatedBy       : String(500);
  UOM             : String(20) @title:'Unit of the Measuer';
  Active          : Boolean @title : 'Active status';
  Inventory       :  Association to Products_Inventory on Inventory.ProductId =ProductId;
};
entity Products_Inventory:managed {
   ProductId        : String(200) @title:'Product Id'; 
   ProductCategory  : String(100) @title:'Prodcut Category';
   ProductType      : String(100) @title:'Prodcut Type';
   AddedOn          : String(20)  @title : 'Added on';
   AddedBy          : String(500)  @title : 'Added By';
   Qty              : String(500)  @title : 'Qunatity';
   Stock            : String(500)  @title : 'In StocK';
   UOM              : String(20) @title:'Unit of the Measuer';
   ExpireDate       : String(20)  @title : 'Expire date of the Product';
   BatchNo          : String(20)  @title : 'Batch No';
   Unit             : String(20)  @title : 'Unit';
  //  Master           : Association to many Products_Master on Master.Inventory = $self;

}

 }
// @cds.persistence.exists 
// @cds.persistence.calcview 
// Entity ![CV_USERS] {
// key     Username: String(60)  @title: 'USERID: USERID' ; 
//         Password: String(200)  @title: 'PASSWORD: PASSWORD' ; 
// }
