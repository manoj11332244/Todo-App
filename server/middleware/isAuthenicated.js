import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'


dotenv.config()


const isAuthenciated=async (req,res,next)=>{
    try {
        const token=req.cookies.token
        if(!token){
            return res.status(401).json({
                success:false,
                message:"User not authenicated"
            })
        }
        const decode=await jwt.verify(token,process.env.SERECT_KEY)
        if(!decode){
            return res.status(401).json({
                success:false,
                message:"Invalid Token"
            })
        }
        req.id=decode.userId
        next()
    } catch (error) {
        console.log(error)
    }
}

export default isAuthenciated;