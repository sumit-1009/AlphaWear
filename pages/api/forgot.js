import Forgot from "../../models/Forgot"
import User from '../../models/User'
import connectDb from "../../middleware/mongoose"
import jsonwebtoken from 'jsonwebtoken'
import cryptoJs from 'crypto-js'

const handler = async (req, res) => {
    //Check if the user in the database
    //Send an email to the user
    if(req.body.sendMail){
    let token = `jskjfhekjhfkjhflfkgiut`
    let forgot = new Forgot({
        email: req.body.email,
        token: token
    })

    let email = `We have sent you this email in response to your request to reset your password on AlphaWear.com

    <br/><br/>

    To reset your password, please follow the link below:

    <a href="https://alphawear.com/forgot?token=${token}">Click here to reset your password</a>

    <br/><br/>

    We recommend that you keep your password secure and not share it with anyone.If you feel your password has been compromised, you can change it by going to your My Account Page and change your password
    <br/><br/>`
    }
    else{
        //Reset User Password
        if (req.method == 'POST') {
            let token = req.body.token
            let user = jsonwebtoken.verify(token, process.env.JWT_SECRET)
            let dbuser = await User.findOne({email: user.email})
            const bytes  = cryptoJs.AES.decrypt(dbuser.password, process.env.AES_SECRET);
            let decryptedPass = bytes.toString(cryptoJs.enc.Utf8);
            if(req.body.password == req.body.cpassword){
            let dbuser = await User.findOneAndUpdate({ email: user.email }, {password: cryptoJs.AES.encrypt(req.body.cpassword, process.env.AES_SECRET).toString()})
            res.status(200).json({ success: true })
            return
            }
            res.status(200).json({ success: false })
        }
        else {
            res.status(400).json({ error: 'error' })
        }

    }
    res.status(200).json({ success: true })
  }

  export default connectDb(handler);