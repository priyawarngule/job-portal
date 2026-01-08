var express = require('express');
var router = express.Router();
var exe = require('./../mysql_conn');

router.get('/', function(req, res) {
    res.send("common home page open");
});

router.get('/profile', function(req, res) {
    res.render("common/home.ejs");
});

router.get("/company_login",async function(req,res){
    res.render("common/company_login.ejs");
});


router.get("/company_register",async function(req,res){
    res.render("common/company_register.ejs");
});

router.post("/save_company",async function(req,res){
    
   var d = req.body;
   var sql = "insert into company (company_name,company_location,hr_name,hr_designation,hr_mobile,company_email,company_password) values(?,?,?,?,?,?,?)";
   await exe(sql,[d.company_name,d.company_location,d.hr_name,d.hr_designation,d.hr_mobile,d.company_email,d.company_password]);
   res.redirect("/company_login");
  
});



router.post("/company_login_process",async function(req,res)
{
var d = req.body;
var sql = "select * from company where company_email=? and company_password=?";
var result = await exe(sql,[d.company_email,d.company_password]);
if(result.length>0){
    req.session.company_id = result[0].company_id;
    res.redirect("/company");
}else{
    res.send("invalid email or password");
}
});

router.get('/register', async function(req, res) {
    res.render("common/register.ejs");
});

router.post("/register_process",async function(req,res){
    var d = req.body;
    var sql = "insert into employee(name,email,mobile,address,password)values(?,?,?,?,?)";
    await exe(sql,[d.name,d.email,d.mobile,d.address,d.password]);
    res.redirect("/login");
});
    
router.get('/login', function(req, res) {
    res.render("common/login.ejs");
});

router.post("/login_process",async function(req,res)
{
var d = req.body;   
var sql = "select * from employee where email=? and password=?";
var result = await exe(sql,[d.email,d.password]);   
if(result.length>0){
    req.session.employee_id = result[0].id;
    res.redirect("employee/employee_open");
}
else{
    res.send("invalid email or password");
}
});

router.get("/common/edit_profile",async function(req,res){
    try{
        const id = req.session.employee_id;
        const sql = "SELECT * FROM employee WHERE id=?";
        const result = await exe(sql,[id]);
        res.render("emploee/edit_profile.ejs",{ employee: result[0]});
    }catch (err) { 
        console.log("Error:",err);
        res.send("Error fetching profile");
        
    }
})

router.post("/save_edit",function(req,res){
    var d =req.body;
   
    var saql = `UPDATE employee SET name='${d.new_name}',mobile='${d.new_mobile}', address='${d.new_address}' WHERE id = ${d.id}`;
    exe(sql,function(err,result){ 
        console.log("error",err);
        console.log("result",result);
        res.redirect("/emploee_login_process",{employee:result});
       
    });
});

module.exports = router;

