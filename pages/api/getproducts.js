import Product from "../../models/Product"
import connectDb from "../../middleware/mongoose"

const handler = async (req, res) => {
    let products = await Product.find()
    let tshirts = {}
    for(let item of products){
      if(item.brand in tshirts){
        if(!tshirts[item.brand].color.includes(item.color) && item.availableQty > 0){
          tshirts[item.brand].color.push(item.color)
        }
        if(!tshirts[item.brand].size.includes(item.size) && item.availableQty > 0){
          tshirts[item.brand].size.push(item.size)
        }
      }
      else{
        tshirts[item.brand] = JSON.parse(JSON.stringify(item))
        if(item.availableQty > 0){
          tshirts[item.brand].color = [item.color]
          tshirts[item.brand].size = [item.size]
        }
      }
    }
    res.status(200).json({ tshirts })
  }

  export default connectDb(handler);

