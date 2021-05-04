const express = require('express');
const router = express.Router();
const ImageLocation = require('../models/image_location');
const AccidentProneArea = require('../models/accident_prone_area');
const multer = require('multer');
const path = require('path');
const uploader = multer({
    storage: multer.diskStorage({
        destination(req,file,cb){
            cb(null, 'upload/');
        },
        filename(req,file,cb){
            const ext = path.extname(file.originalname);
	    const userId = req.params.userId 
            cb(null, 'image'+userId+'_'+Date.now()+ext);
        }
    }),
    limits: {fileSize: 5*1024*1024*1024*1024},
});


//유저정보, 비디오id
router.post('/',uploader.single('image'),async(req,res,next)=>{
    try{
        //해당 이미지 db에 경로 저장
        //위도, 경도 저장
        let filename = req.file.filename;
        let imageLocation = await ImageLocation.create({
            longitude: req.body.longitude,
            latitude: req.body.longitude,
            filename: filename,
        })
        res.status(200).send()
    }catch(err){
        next(err);
    }
});

//실시간 알림
/*
router.post('/:userId',uploader.single('image'),async(req,res,next)=>{
    try{
        //해당 이미지 db에 경로 저장
        //위도, 경도 저장
        let filename = req.file.filename;
        console.log(req.body)
        res.status(200).send()
    }catch(err){
        next(err);
    }
});
*/

module.exports = router;