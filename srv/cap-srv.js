const cds = require('@sap/cds')
const req = require('express/lib/request')
const colors =require("colors")
module.exports = cds.service.impl(async (srv) => {

 const { Users , Products,ProductsInventory,Products_Transfer} = srv.entities

    srv.on('sleep', async () => {
    try {
        let dbQuery = ' Call "sleep"( )'
        let result = await cds.run(dbQuery, { })
        console.log(result)
        return true
    } catch (error) {
        console.error(error)
        return false
    }
    })

    srv.before(['CREATE'] , Users, async(req,res) => {
        console.log("Control inside before event phase")
        var message = '';
        console.log('Username Check:' +JSON.stringify(req.data.Username));
            if(req.data.Username === null){
                message = message + 'Username cant be null';               
            }
            if(req.data.Password.length < 8){
                message = message + ' and password cannot be less than 6';
            }    
    return req.error(400, message)
    })

    srv.after(['READ'] , Users, async(req) => {
        console.log("Control inside after event phase")
        //console.log("<<<insert bp", Users);
     })

    //    srv.before("error", (err, req) => {
    //            switch (err.message) {
    //              case "UNIQUE_CONSTRAINT_VIOLATION":
    //                err.message = "The entry already exists.";
    //                break;
           
    //              default:
    //                err.message =
    //                  "An error occured. Please retry. Technical error message: " +
    //                  err.message;
    //                break;
    //            }
    //         })

    // srv.on(['READ'] , Users, async(req) => {
    //     console.log("Control inside on event phase")
    //     //console.log("<<<insert bp", Users);
    //   })

//     srv.on('CREATE' , 'Products', async(req) => {
//         console.log("<<Hello I am inside on Event phase")
//         const createProduct = req.data;
//         const bp = await cds.run(INSERT.into(Products).entries(createProduct));
//         console.log("<<<insert bp", Products);
//      return bp;
//  })
//  srv.on('CREATE' , 'Products_Transfer', async(req) => {
//     console.log("<<Hello I am in ON Handler")
//     const createProductTransfer = req.data;
//     const bp = await cds.run(INSERT.into(Products_Transfer).entries(createProductTransfer));
//     console.log("<<<insert bp", Products_Transfer);
//      return bp;
//  })
 

//  this.on('CREATE' , 'Users', async(req) => {
//     console.log("<<Hello I am in ON Handler")
//     const users = req.data;
//     const bp = await cds.run(INSERT.into(Users).entries(users));
//     console.log("<<<insert bp", users);
//      return bp;
//     })
 

srv.before('UPDATE', async(req)=>{
    console.log("This is update call for Users")
    //const updateUser =req.data;
    // const Username =updateUser.Username;
    // const EmailId =updateUser.EmailId;
    //const password =updateUser.Password;

    const user_data = await SELECT `EmailId` .from(Users).where({EmailId:req.data.EmailId});;

    if(user_data[0].EmailId!= req.data.EmailId)
{
    return req.reject (400, 'EmailID doesnt exists!..You cant able to chamge the password');
}
else
{
 UPDATE(Users).with({Password:req.data.Password}).where({EmailId: req.data.EmailId}) // Updated the net stock on our Product entity
     
}
})


 srv.on('CREATE' , 'ProductsInventory', async(req) => {
    console.log("<<Hello I am in ON Handler")
    const createProduct = req.data;
    console.log(req.data);
    const bp = await cds.run(INSERT.into(ProductsInventory).entries(createProduct));
    console.log("<<<insert bp", ProductsInventory);
     return bp;
 })



 srv.after('CREATE', 'Products_Transfer', async (Products_Transfer, req) => {
    const { ProductsInventory } = srv.entities;
    const { ProductId,ProductName,Stock } = Products_Transfer;

    const invStock = await SELECT.one('Stock')
        .from(ProductsInventory)
        .where({ ProductId, ProductName});

    const currentStock = invStock.Stock || 0;
    const updatedStock = currentStock - Stock;

    await UPDATE(ProductsInventory)
        .set({ Stock: updatedStock.toString() })
        .where({ ProductId, ProductName });

    console.log('Stock updated:', updatedStock);
});

}) 

    //  fetch the data and show the resp



    




//     userId : String(60);
//     PassWord:String(200); 
//     name   : String(111);

//     this.before ('CREATE', 'Users', async (req) => {
//         const users = req.data
//         if (!users.userId || users.userId<= 0)  return req.error (400, 'Please enter the Name')
//         if (!users.PassWord || users.PassWord<= 0) return req.error (400, 'Please enter the Password')
       
       
       
       
       
       
       
//         const tx = cds.transaction(req)
//         const affectedRows = await tx.run (
//           UPDATE (Books)
//             .set   ({ stock: {'-=': order.amount}})
//             .where ({ stock: {'>=': order.amount},/*and*/ ID: order.book_ID})
//         )
//         if (affectedRows === 0)  req.error (409, "Sold out, sorry")
//       })
    
//       // Add some discount for overstocked books
//       srv.after ('READ', 'Books', each => {
//         if (each.stock > 111)  each.title += ' -- 11% discount!'
//       })
    
//     }








// //     this.before('*', req=>{

// //         console.log(`Method: ${req.method}`.yellow.inverse);
// //         console.log(`Target: ${req.target.name}`.yellow.inverse);
// //     });
    

// // })





// // // const cds = require('@sap/cds');

// // // // conection to external service npm install @sap-cloud-sdk/http-client
// // // module.exports = cds.service.impl(async function(srv) {
// // //    const { Product , Supplier, Orders } = srv.entities

// // //    srv.before ('CREATE','Product', (req)=>{
// // //     const createProduct = req.data
// // //   //  if (createProduct.emission > '50000')  throw new Error("400,`Product not Sustainable`")
// // //     if (createProduct.emission > '50000')  return req.error ({
// // //         code: '400',
// // //         message: 'Product not Sustainable stock ${stock}',
// // //         target: '${createProduct.emission}',
// // //         status: 500
// // //       })

// // //     //  409,`${quantity} exceeds stock for book #${book}`)
// // //   })




// // //  //* Success After Creating *//
// // //  srv.after("CREATE", "Project", async (req, res) => {
// // //     const project = res.data;
// // //     res.info({
// // //       "code": 201,
// // //       "message": `Project ${project.projectName} is  Created Successfully`,
// // //       "numericSeverity": 1
// // //     })
// // //   })
// // //   //* Success After Updating *//
// // //   srv.after("UPDATE", "Project", async (req, res) => {
// // //     const project = res.data
// // //     res.info({
// // //       "code": 201,
// // //       "message": `Project ${project.projectName} is  Updated Successfully`,
// // //       "numericSeverity": 1
// // //     })

// // //   })
