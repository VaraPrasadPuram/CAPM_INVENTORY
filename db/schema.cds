//namespace my.Inventory;

using { Currency, managed, sap, cuid } from '@sap/cds/common';

context my.Inventory {
  
entity Users {
  Username : String(60);
  Password:String(200); 
 key EmailId : String(200) @title:'EmailId';
  ImageURL :String(5000);
};

entity Products_Master:managed{
  ProductId       : String(200) @title:'Product Id'; 
  ProductCategory : String(100) @title:'Prodcut Category';
  ProductName     : String(500) @title:'Prodcut Name';
  ProductType     : String(500) @title:'Prodcut Type';
  UOM             : String(20) @title:'Unit of the Measuer';
  Active          : String(20) @title : 'Active status';
  Inventory       :  Association to Products_Inventory on Inventory.ProductId =ProductId;
};
entity Products_Inventory:managed {
   ProductId        : String(200) @title:'Product Id'; 
   ProductName     : String(500) @title:'Prodcut Name';
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

entity Products_Transfer:managed{
  StoredId         : String(200) @title:'StoreId';
  ProductId        : String(200) @title:'Product Id'; 
  ProductName       : String(200) @title:'Product Name'; 
  ProductCategory  : String(100) @title:'Prodcut Category';
  ProductType      : String(500) @title:'Prodcut Type';
  Qty              : String(500)  @title : 'Qunatity';
  Stock            : String(500)  @title : 'In StocK';
  TrnsferOn        : String(500)  @title : 'TransferOn';
  TransferBy       : String(500)  @title : 'TransferBy';
  UOM              : String(500)  @title : 'UOM';
}

// view VIEW_TOP3_STOCKS_PRDOCUTCATEGORY as
// SELECT ProductCategory,STOCK FROM 
// (SELECT 
// 	ProductCategory,
// 	SUM(TO_INT(Stock)) as STOCK
// FROM Products_Inventory 
// GROUP BY 
// ProductCategory) as a
// order by STOCK DESC limit 1; 

// VIEW VIEW_TOP_STOCKS_PRDOCUTNAME as
// SELECT ProductName,STOCK FROM 
// (SELECT 
// 	ProductName,
// 	SUM(TO_INT(Stock)) as STOCK
// FROM Products_Inventory
// GROUP BY 
// ProductName
// ) as a 
// ORDER BY STOCK DESC limit 1;
 

// view VIEW_TOP_3_PRODUCT_NAMES as
// SELECT ProductName,STOCK FROM 
// (SELECT 
// 	ProductName,
// 	SUM(TO_INT(Stock)) as STOCK
// FROM Products_Inventory
// GROUP BY 
// ProductName) as a
// ORDER BY STOCK DESC limit 3;

// VIEW VIEW_QTY_STOCK_YOY AS SELECT ProductCategory,
// 	ProductType,
// 	YEARS,
// 	SUM(QTY_CURRENT_YEAR) as QTY_CURRENT_YEAR,
// 	SUM(QTY_PREVIOUS_YEAR) as QTY_PREVIOUS_YEAR,
// 	SUM(STOCK_CURRENT_YEAR) as STOCK_CURRENT_YEAR,
// 	SUM(STOCK_PREVIOUS_YEAR) as STOCK_PREVIOUS_YEAR
// 	FROM
// 	(
// SELECT ProductId,
// 	TO_INT(Qty) as QTY_CURRENT_YEAR,
// 	TO_INT(Stock) as STOCK_CURRENT_YEAR,
// 	0 as QTY_PREVIOUS_YEAR,
// 	0 as STOCK_PREVIOUS_YEAR,
// 	ProductCategory,
// 	ProductType,
// 	Year(createdAt) as YEARS
// FROM Products_Inventory
// WHERE Year(createdAt) = (SELECT YEAR(CURRENT_DATE) as b FROM DUMMY) 
// AND lpad(MONTH(createdAt),2,0)<=(SELECT lpad(MONTH(createdAt),2,0) as c FROM DUMMY)
// UNION ALL 
// SELECT ProductId,
// 	0 as QTY_CURRENT_YEAR,
// 	0 as STOCK_CURRENT_YEAR,
// 	TO_INT(Qty) as QTY_PREVIOUS_YEAR,
// 	TO_INT(Stock) as STOCK_PREVIOUS_YEAR,
// 	ProductCategory,
// 	ProductType,
// 	Year(createdAt) as YEARS
// FROM Products_Inventory
// WHERE Year(createdAt) = (SELECT YEAR(CURRENT_DATE)-1 as d FROM DUMMY)
// AND lpad(MONTH(createdAt),2,0) BETWEEN 01 AND (SELECT lpad(MONTH(createdAt),2,0) as e FROM DUMMY)
// ) as a 
// GROUP BY 
// ProductCategory,
// 	ProductType,
// 	YEARS

}


 @cds.persistence.exists 
@cds.persistence.calcview 
Entity CV_INVENTORY {
key     PRODUCTID: String(200)  @title: 'PRODUCTID: PRODUCTID' ; 
key     PRODUCTCATEGORY: String(100)  @title: 'PRODUCTCATEGORY: PRODUCTCATEGORY' ; 
key     PRODUCTNAME: String(500)  @title: 'PRODUCTNAME: PRODUCTNAME' ; 
key     PRODUCTTYPE: String(500)  @title: 'PRODUCTTYPE: PRODUCTTYPE' ; 
key     UOM: String(20)  @title: 'UOM: UOM' ; 
key     ACTIVE: Boolean  @title: 'ACTIVE: ACTIVE' ; 
key     CREATEDAT: Timestamp  @title: 'CREATEDAT: CREATEDAT' ; 
key     CREATEDBY: String(255)  @title: 'CREATEDBY: CREATEDBY' ; 
key     MODIFIEDAT: Timestamp  @title: 'MODIFIEDAT: MODIFIEDAT' ; 
key     MODIFIEDBY: String(255)  @title: 'MODIFIEDBY: MODIFIEDBY' ; 
key     ADDEDON: String(20)  @title: 'ADDEDON: ADDEDON' ; 
key     ADDEDBY: String(500)  @title: 'ADDEDBY: ADDEDBY' ; 
key     UOM_1: String(20)  @title: 'UOM_1: UOM' ; 
key     EXPIREDATE: String(20)  @title: 'EXPIREDATE: EXPIREDATE' ; 
key     BATCHNO: String(20)  @title: 'BATCHNO: BATCHNO' ; 
        CC_QTY: Integer  @title: 'CC_QTY: QTY' ; 
        CC_STOCK: Integer  @title: 'CC_STOCK: STOCK' ; 
}
@cds.persistence.exists 
Entity VIEW_QTY_STOCK_YOY {
        PRODUCTCATEGORY: String(100)  @title: 'PRODUCTCATEGORY' ; 
        PRODUCTTYPE: String(100)  @title: 'PRODUCTTYPE' ; 
        YEARS: Integer not null  @title: 'YEARS' ; 
        QTY_CURRENT_YEAR: Integer  @title: 'QTY_CURRENT_YEAR' ; 
        QTY_PREVIOUS_YEAR: Integer  @title: 'QTY_PREVIOUS_YEAR' ; 
        STOCK_CURRENT_YEAR: Integer  @title: 'STOCK_CURRENT_YEAR' ; 
        STOCK_PREVIOUS_YEAR: Integer  @title: 'STOCK_PREVIOUS_YEAR' ; 
}

@cds.persistence.exists 
Entity VIEW_QTY_STOCK_MTD {
        PRODUCTCATEGORY: String(100)  @title: 'PRODUCTCATEGORY' ; 
        PRODUCTTYPE: String(100)  @title: 'PRODUCTTYPE' ; 
        YEARS: Integer not null  @title: 'YEARS' ; 
        QTY_CURRENT_YEAR_MTD: Integer  @title: 'QTY_CURRENT_YEAR_MTD' ; 
        QTY_PREVIOUS_YEAR__MTD: Integer  @title: 'QTY_PREVIOUS_YEAR__MTD' ; 
        STOCK_CURRENT_YEAR__MTD: Integer  @title: 'STOCK_CURRENT_YEAR__MTD' ; 
        STOCK_PREVIOUS_YEAR__MTD: Integer  @title: 'STOCK_PREVIOUS_YEAR__MTD' ; 
}

@cds.persistence.exists 
Entity VIEW_QTY_STOCK_WTD {
        PRODUCTCATEGORY: String(100)  @title: 'PRODUCTCATEGORY' ; 
        PRODUCTTYPE: String(100)  @title: 'PRODUCTTYPE' ; 
        YEARS: Integer  @title: 'YEARS' ; 
        QTY_CURRENT_YEAR_WEEK: Integer  @title: 'QTY_CURRENT_YEAR_WEEK' ; 
        QTY_PREVIOUS_YEAR_WEEK: Integer  @title: 'QTY_PREVIOUS_YEAR_WEEK' ; 
        STOCK_CURRENT_YEAR_WEEK: Integer  @title: 'STOCK_CURRENT_YEAR_WEEK' ; 
        STOCK_PREVIOUS_YEAR_WEEK: Integer  @title: 'STOCK_PREVIOUS_YEAR_WEEK' ; 
}


  @cds.persistence.exists 
  Entity VIEW_TOP3_STOCKS_PRDOCUTCATEGORY {
          PRODUCTCATEGORY: String(100)  @title: 'PRODUCTCATEGORY' ; 
          STOCK: Integer  @title: 'STOCK' ; 
           }

@cds.persistence.exists 
Entity VIEW_TOP_STOCKS_PRDOCUTNAME {
        PRODUCTNAME: String(500)  @title: 'PRODUCTNAME' ; 
        STOCK: Integer  @title: 'STOCK' ; 
}

@cds.persistence.exists 
Entity VIEW_TOP_3_PRODUCT_NAMES {
        PRODUCTNAME: String(500)  @title: 'PRODUCTNAME' ; 
        STOCK: Integer  @title: 'STOCK' ; 
}
