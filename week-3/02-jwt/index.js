const jwt = require('jsonwebtoken');
const jwtPassword = 'secret';
const zod=require('zod')
const emailSchema=zod.string().email();
const passwordSchema=zod.string().min(6);


function signJwt(username, password) {
    const usresponse=emailSchema.safeParse(username);
    const passresponse=passwordSchema.safeParse(password);
    if(!usresponse.success || !passresponse.success)
    return null;
    const signature=jwt.sign({
        username
    }, jwtPassword)
    return signature
}


function verifyJwt(token) {
    let ans=true
    try{
    jwt.verify(token,jwtPassword) //returns either string, will throw exception if wrong
    }
    catch(e)
    {
        ans=false;
    }
    return ans
}


function decodeJwt(token) {
   const decoded=jwt.decode(token)// returns either true or false if decoded, any random jwt works, no need of the secret
   if(decoded)
   return true
else
return false
}


module.exports = {
  signJwt,
  verifyJwt,
  decodeJwt,
  jwtPassword,
};
