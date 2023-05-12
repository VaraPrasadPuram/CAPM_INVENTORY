const cds = require('@sap/cds')
const req = require('express/lib/request')
const colors =require("colors")
module.exports = cds.service.impl(function () {

 const { Users , Products,ProductsInventory} = this.entities

    this.on('sleep', async () => {
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

    this.before(['READ'] , Users, async(po, req) => {
      console.log("<<Hello I am in ON Handler")
      console.log("<<<insert bp", Users);
   })
this.on('CREATE' , 'Products', async(req) => {
    console.log("<<Hello I am in ON Handler")
    const createProduct = req.data;
    const bp = await cds.run(INSERT.into(Products).entries(createProduct));
    console.log("<<<insert bp", Products);
     return bp;
 })

 this.on('CREATE' , 'ProductsInventory', async(req) => {
    console.log("<<Hello I am in ON Handler")
    const createProduct = req.data;
    console.log(req.data);
    const bp = await cds.run(INSERT.into(ProductsInventory).entries(createProduct));
    console.log("<<<insert bp", ProductsInventory);
     return bp;
 })



    //  fetch the data and show the resp
}) 


    




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