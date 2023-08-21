const jwt=require("jsonwebtoken")

const docMW = (req, res, next) => {
    const token=req.headers.authorization?.split(" ")[1]

    var decoded = jwt.verify(token, 'masai');
    if(decoded){
        // console.log(decoded);
        req.body.date=Date.now();
        req.body.doctorID=decoded.userID
        next()

    }else{
        res.status(400).json({msg:"Login again"})
    }
    
}

module.exports={
    docMW
}