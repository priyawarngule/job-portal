var express = require('express');
var router = express.Router();
var exe = require('./../mysql_conn');

router.get('/', function(req, res) {
    res.send("employee home page open");
});


router.get('/profile', function(req, res) {
    res.render("employee/home.ejs");
});

function verifyLogin(req, res, next) {
    if (req.session.employee_id) {
        next();
    } else {
        res.redirect("/login");
    }
}
router.use(verifyLogin);



router.get("/employee_open", async function(req, res) {
    var sql = "select * from employee where id = '"+req.session.employee_id+"'";
    var result = await exe(sql);
    if (result.length > 0) {
        res.render("employee/home.ejs", { employee: result[0] });
    } else {
        res.send("Employee not found");
    }
});

router.get("/employee/edit_education",async function(req,res){
    res.render("employee/education.ejs");
});

 router.post("/education_process",verifyLogin,async function(req,res){
    var d = req.body;
    var sql ="INSERT INTO education(id,degree,institution,field_of_study,start_year,end_year,percentage) VALUES(?,?,?,?,?,?,?)";
    var result = await exe(sql,[req.session.employee_id,d.degree,d.institution,d.field_of_study, d.start_year,d.end_year,d.percentage]);
    res.send("DATE added successfully");
 });


 
module.exports = router;