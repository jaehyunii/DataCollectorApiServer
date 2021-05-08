const express = require('express');
const router = express.Router();
const AccidentProneArea = require('../models/accident_prone_area');

//실시간 알림
router.get('/:longitude/:latitude',async(req,res,next)=>{
    try{
        //해당 이미지 db에 경로 저장
        //위도, 경도 저장
	const longitude = req.params.longitude;
	const latitude = req.params.latitude;
	const sql = `SELECT id, spot_name, longitude, latitude,`
        + `(6371*acos(cos(radians(${latitude}))*cos(radians(latitude))*cos(radians(longitude)-radians(${longitude}))`
        + `+sin(radians(${latitude}))*sin(radians(latitude)))) AS distance `
        + `FROM ACCIDENT_PRONE_AREA `
        + `HAVING distance < 1 ORDER BY distance`;
	
	const result = await AccidentProneArea.sequelize.query(sql,{type:AccidentProneArea.sequelize.QueryTypes.SELECT});
     
        res.status(200).send(result)
    }catch(err){
        next(err);
    }
});


module.exports = router;
