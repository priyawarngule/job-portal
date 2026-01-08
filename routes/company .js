var express = require('express');
var router = express.Router();
var exe = require('./../mysql_conn');



router.get('/', function(req, res) {
    res.render("company/home.ejs");
});

router.get('/post_job', function(req, res) {
    res.render("company/post_job.ejs");
});


function verifyLogin(req, res, next) {
    if (req.session.company_id) {
        next();
    } else {
      res.send("please login first");
    }
}

router.post("/post_job_process",verifyLogin, async function(req,res){
    var d = req.body;
   var sql = "INSERT INTO jobs(company_id, job_title, job_description, job_type, min_experience, max_experience, skill, vacancies,refrence_link) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
   var result = await exe(sql, [req.session.company_id, d.job_title, d.job_description, d.job_type, d.min_experience, d.max_experience, d.skill, d.vacancies, d.refrence_link]);
   res.redirect("/company/jobs");
});
router.get('/jobs',verifyLogin, async function(req, res) {
    var sql = "SELECT * FROM jobs WHERE company_id=?";
    var result = await exe(sql, [req.session.company_id]);
    res.render("company/jobs.ejs",{jobs:result});
});


router.get('/profile',verifyLogin, async function(req, res) {
    var sql = "SELECT * FROM company WHERE company_id=?";
    var result = await exe(sql, [req.session.company_id]);
    res.render("company/profile.ejs",{company:result[0]});
});


router.get("/logout",function(req,res){
    req.session.destroy();
    res.redirect('/company_login');
});

 router.get("/company/deletejob/:job_id" ,async function(req,res){
   var sql = `delete from jobs where job_id=? and company_id = ?`;
    await exe(sql,[req.params.job_id,req.session.company_id]);
    res.redirect("/company/jobs");  
 });

 router.get("/company/editjob/:job_id",async function(req,res){
    var job_id = req.params.job_id;
    var sql = "select * from jobs where job_id=?";
    var result = await exe(sql,[job_id]);
    res.render("company/edit_job.ejs",{job:result[0]});
 });

 router.post("/update_job/:job_id",async function(req,res){
    var d = req.body;
    var sql = "update jobs set job_title=?,job_description=?,job_type=?,min_experience=?,max_experience=?,skill=?,vacancies=?,refrence_link=? where job_id=?";
    await exe(sql,[d.job_title,d.job_description,d.job_type,d.min_experience,d.max_experience,d.skill,d.vacancies,d.refrence_link,req.params.job_id]);
    res.redirect("/company/jobs");
 });

module.exports = router;