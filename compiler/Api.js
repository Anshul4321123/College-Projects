const express=require('express');
const app=express();
const compiler=require('compilex');
const options={stats:true};
compiler.init(options);
const bodyP=require('body-parser');
app.use(bodyP.json());
app.use("/codemirror-5.65.18",express.static("C:/Users/hp/OneDrive/Desktop/g/compiler/codemirror-5.65.18"));
app.get("/",function(req,res){
    compiler.flush(function(){
        console.log("Secret");
    });
    res.sendFile("C:/Users/hp/OneDrive/Desktop/g/compiler/index.html");
})
app.post("/compile",function(req,res){
    var code=req.body.code;
    var input=req.body.input;
    var lang=req.body.lang;
    try{
       
        if(lang=="Cpp"){
           if(!input){
            var envData = { OS : "windows" , cmd : "g++",options:{timeout:10000}}; // (uses g++ command to compile )
            compiler.compileCPP(envData , code , function (data) {
                 if(data && data.output){
            res.send(data);
        }
        else{
            res.send({output:"error"});
        }
                     });
            
           }
           else{
            var envData = { OS : "windows" , cmd : "g++",options:{timeout:10000}}; // (uses g++ command to compile )
            compiler.compileCPPWithInput(envData , code ,input, function (data) {
                 if(data && data.output){
            res.send(data);
        }
        else{
            res.send({output:"error"});
        }
                     });
           }
        }
        else if(lang=="Java"){
            if(!input){
                var envData = { OS : "windows"}; // (uses g++ command to compile )
                compiler.compileJava(envData , code , function (data) {
                     if(data && data.output){
            res.send(data);
        }
        else{
            res.send({output:"error"});
        }
                         });
                
               }
               else{
                var envData = { OS : "windows"}; // (uses g++ command to compile )
                compiler.compileJavaWithInput(envData , code ,input, function (data) {
                     if(data && data.output){
            res.send(data);
        }
        else{
            res.send({output:"error"});
        }
                         });
               }
        }
        else if(lang=="Python"){
            if(!input){
                var envData = { OS : "windows"}; // (uses g++ command to compile )
                compiler.compilePython(envData , code , function (data) {
                    if(data && data.output){
             if(data && data.output){
            res.send(data);
        }
        else{
            res.send({output:"error"});
        }
        }
        else{
            res.send({output:"error"});
        }
                         });
                
               }
               else{
                var envData = { OS : "windows"}; // (uses g++ command to compile )
                compiler.compilePythonWithInput(envData , code ,input, function (data) {
                     if(data && data.output){
            res.send(data);
        }
        else{
            res.send({output:"error"});
        }
                         });
               }
        }
    }     
    catch(e){
        console.log("error");
    }
});
app.listen(8000,()=>{
    console.log("Server is running on port 8000");
});