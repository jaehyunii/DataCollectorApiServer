const express = require('express');
const router = express.Router();
const User = require('../models/user');
const crypto = require('crypto');

const LOGIN_ID_EXIST = 100;

const ADMIN_PASSWORD = "1234";

//테스트용 전체 유저 조회
router.get('/',async(req,res,next)=>{
    try{
        const user = await User.findAll({});
        res.status(200).send(user);
    }catch(err){
        next(err);
    }
});

//관리자 접속
router.get('/admin',async(req,res,next)=>{
    try{
        const user = await User.findOne({
            where:{loginId:"admin"}
        });
        if(user==null){
            const admin = await User.create({
                loginId :"admin",
                password : crypto.createHash('sha512').update(ADMIN_PASSWORD).digest('base64')
            })
            res.status(200).send(admin);
        }
        else{
            res.status(200).send(user);
        }
    }catch(err){
        next(err);
    }
});




//POSTMAN
router.get('/login/:loginId/:password',async(req,res,next)=>{
    //let transaction;
    try{
        //transaction = await User.sequelize.transaction();
        const user = await User.findOne({
            where:{
				loginId:req.params.loginId,
                password:crypto.createHash('sha512').update(req.params.password).digest('base64')
            }//,transaction:transaction
        });
        if(user){
            res.status(200).send(user);
        }else{
            res.status(204).send();
        }
    } catch(err){
        if(transaction)
            await transaction.rollback();
        console.log(err);
        next(err);
    }
});


//POSTMAN: 유저 추가@
router.post('/',async(req,res,next)=>{
    try{
        const user = await User.findOne({
            where:{loginId:req.body.loginId}
        });
        if(user!=null)
            res.status(204).send({'code':LOGIN_ID_EXIST,'error':'loginId Exists'})
        else{
            const user = await User.create({
                loginId: req.body.loginId,
                password: crypto.createHash('sha512').update(req.body.password).digest('base64')
            });
            res.status(200).send(user);
        }
    }catch(err){
        next(err);
    }
});




module.exports = router;