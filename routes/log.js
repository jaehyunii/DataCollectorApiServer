const express = require('express');
const router = express.Router();
const ImageLocation = require('../models/image_location');
const Video = require('../models/video');
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
        const longitude = req.body.longitude;
        const latitude = req.body.latitude;
        const altitude = req.body.altitude;
	const videoId = typeof req.body.videoId == 'undefined'? 0 : req.body.videoId;
            cb(null, videoId+'_'+longitude+'_'+latitude+'_'+altitude+'_'+Date.now()+ext);
        }
    }),
    limits: {fileSize: 5*1024*1024*1024*1024},
});

//이미지
router.post('/image',uploader.single('image'),async(req,res,next)=>{
    try{
        //해당 이미지 db에 경로 저장
        //위도, 경도 저장
        const filename = req.file.filename;
        const imageLocation = await ImageLocation.create({
            longitude: req.body.longitude,
            latitude: req.body.latitude,
            altitude: req.body.altitude,
            filename: filename,
        })
        res.status(200).send(imageLocation)
    }catch(err){
        next(err);
    }
});

//비디오
router.get('/video/start/:userId',async(req,res,next)=>{
    try{
        const video = await Video.create({
            filename: "",
        })
        res.status(200).send(video)
    }catch(err){
        next(err);
    }
});

//이미지
router.post('/video/frame',uploader.single('image'),async(req,res,next)=>{
    try{
        //해당 이미지 db에 경로 저장
        //위도, 경도 저장
        const filename = req.file.filename;
        const imageLocation = await ImageLocation.create({
	    videoId: req.body.videoId,
            longitude: req.body.longitude,
            latitude: req.body.latitude,
            altitude: req.body.altitude,
            filename: filename,
        })
        res.status(200).send(imageLocation)
    }catch(err){
        next(err);
    }
});

router.post('/video/stop',uploader.single('video'),async(req,res,next)=>{
    try{
        //해당 이미지 db에 경로 저장
        //위도, 경도 저장
        const filename = req.file.filename;
	const video = await Video.findOne({
	    where:{id:req.body.videoId}
	});
	video.filename = filename;
	await video.save();
        res.status(200).send(video)
    }catch(err){
        next(err);
    }
});

module.exports = router;
