const express = require('express')
const app = express();
const fs = require('fs');
var data = fs.readFileSync(__dirname+'/new.json');
var change_data = JSON.parse(data);

var data = JSON.stringify(change_data)

// console.log(data)

// for (var i of change_data){
//    if(i.exercises){
//       var j = i.exercises;
//       for (k of j){
//          console.log(k)
//       }
//    }
// }

app.use(express.json());
// console.log(change_data)

app.get('/get',(req,res)=>{
   let data = fs.readFileSync(__dirname+'/new.json');
   let change_data = JSON.parse(data);
   return res.send(change_data)


})

app.post("/post",(req,res)=>{
   fs.readFile(__dirname+"/new.json",(err,data)=>{
      if(err){
         return res.send(err,"check your json file")
      }else{
         var change_data = JSON.parse(data);
         var courses = {
            id: change_data.length+1,
            name: req.body.name,
            description: req.body.description,
            exercises : []
         }
         change_data.push(courses)
         // console.log(courses);
         fs.writeFile(__dirname+"/new.json",JSON.stringify(change_data,null,2))
            return res.send(courses)
      }
   })
})

// app.get('/get/:id',(req,res)=>{
   
// })
app.put("/put/:id",(req,res)=>{

   fs.readFile(__dirname+"/new.json",(err,data)=>{
      if(err){
         return res.send(err,"check you json file")
      }else{
         var change_data = JSON.parse(data);

         // console.log(change_data);
         // for(check of change_data){   
         //    if(check.id == req.params.id){
         //       var index = change_data.indexOf(check);
         //       console.log(index);
         //       var courses_PUT = {
         //          name : req.body.name,
         //          description : req.body.description,
         //          id:check.id,
         //          exercises:check.exercises
         //       }
         //    }
           
         // } // console.log(courses_PUT)
         // var courses_PUT = {
         //    name : req.body.name,
         //    description : req.body.description,
         //    id:req.params.id,
         //    exercises:check.exercises
         // }
         change_data[req.params.id-1].name =req.body.name;
         change_data[req.params.id-1].description = req.body.description;
         // console.log(change_data)  for check only for print
         fs.writeFileSync(__dirname+"/new.json",JSON.stringify(change_data,null,2))
         return res.send(change_data[req.params.id-1])

      }

   })
})

 app.get('/getbyid/:id',(req,res)=>{
   var courses_id = req.params.id;
   
   if(courses_id>change_data.length){
      console.log("wrong")
      res.send(
         'wrong'
      )
   }else{
      var get_data = change_data[courses_id-1]
      var main_data = {
         name : get_data.name,
         description :get_data.description
      }
      return res.send(main_data)
   }
   

 })
 app.get('/get/:id/ex',(req,res)=>{
    var courses_id = req.params.id
    if(courses_id>change_data.length){
       res.send("wrong")
    }else{
       var get_data = change_data[courses_id-1]["exercises"]
       let ex_list = []
         for(let i of get_data){
            var main_data = {   
               id : i.id,
               courseId : i.courseId,
               content : i.content,
               hint : i.hint
              
            }
            ex_list.push(main_data)
         }

      
       return res.send(ex_list)

    }
 })


app.post('/post/:id/ex',(req,res)=>{
   var courses_id = req.params.id
   if(courses_id>change_data.length){
      req.send("wrong")
   }else{
      var get_data = change_data[courses_id-1]['exercises']
      var main_data = {
         name : req.body.name,
         hint: req.body.hint,
         content : req.body.content,
         id : get_data.length+1,
         courseId : req.params.id,
         submissions : []
      }
      // console.log(main_data)
      change_data[courses_id-1]['exercises'].push(main_data)
      
      fs.writeFile(__dirname+"/new.json",JSON.stringify(change_data,null,2))
      return res.send(change_data)
   }
})

app.put('/put/:id/ex/:ID',(req,res)=>{
   var courses_id = req.params.id;
   var ex_id = req.params.ID;
   // var get_data = change_data[courses_id-1]['exercises'][ex_id-1]
   var main_data = {
      name : req.body.name,
      hint: req.body.hint,
      content : req.body.content,
      id : req.params.ID,
      courseId : req.params.id

   }
   // console.log(main_data)
   change_data[courses_id-1]['exercises'][ex_id-1]=(main_data)
   fs.writeFile(__dirname+"/new.json",JSON.stringify(change_data,null,2))
   return res.send(main_data)

})



app.get('/get/:id/ex/:ID/sub',(req,res)=>{
   var courses_id =req.params.id;
   var ex_id = req.params.ID;
   var get_data = change_data[courses_id-1]['exercises'][ex_id-1]["submissions"];
   return res.send(get_data)
})



app.post('/post/:id/ex/:ID/sub',(req,res)=>{
   var change_data = JSON.parse(data)
   var courses_id = req.params.id-1;
   var ex_id = req.params.ID-1;
   var get_data = change_data[courses_id]['exercises'][ex_id]["submissions"];
   var main_data = {
      id: get_data.length+1,
      courseId: 1,
      exerciseId: 1,
      content: req.body.content,
      userName: req.body.userName
   }
   change_data[courses_id]['exercises'][ex_id]["submissions"].push(main_data)
   fs.writeFile(__dirname+"/new.json",JSON.stringify(change_data,null,2))
   return res.send(main_data)
   
})


var server = app.listen(8080, () => {
   const port = server.address().port;
   console.log(`the port is listening at ${port}`);
});
