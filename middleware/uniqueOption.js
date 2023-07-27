module.exports=function(req ,res , next){
   const options= req.body.options;
   const uniqueElements = new Set(options);

   if (options.length !== uniqueElements.size) {
     return res.status(400).json({ error: 'Options must be unique' });
   }
 
   next();
}