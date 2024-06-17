// import Product from "../../models/Product"
// import connectDb from "../../middleware/mongoose"

// const handler = async (req, res) => {
//     if(req.method == 'POST'){
//         for(let i=0; i<req.body.length; i++){
//         let p = new Product({
//             title: req.body[i].title,
//             slug: req.body[i].slug,
//             brand: req.body[i].brand,
//             comp: req.body[i].comp,
//             desc: req.body[i].desc,
//             img: req.body[i].img,
//             category: req.body[i].category,
//             size:req.body[i].size,
//             color: req.body[i].color,
//             price: req.body[i].price,
//             availableQty: req.body[i].availableQty,
            
//         })
//         await p.save()
//     }
//     res.status(200).json({ success: "success" })
//     }
//     else{
//         res.status(400).json({ error: "This method is not allowed" })
//     }
    
//   }

//   export default connectDb(handler);

import Product from "../../models/Product";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const products = req.body;

    try {
      // Consider validation before saving
      await Product.insertMany(products);
      res.status(200).json({ success: "Products created successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(400).json({ error: "This method is not allowed" });
  }
};

export default connectDb(handler);
