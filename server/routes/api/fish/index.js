const express = require('express');
const router = express.Router();

const addFish = require('./proc/addFish');
const addFishData = require('./proc/addFishData');
const fishAssign = require('./proc/fishAssign');
const fishControl = require('./proc/fishControl');
const fishDelete = require('./proc/fishDelete');
const fishDisassign = require('./proc/fishDisassign');
const getFishData = require('./proc/getFIshData.js');
const getFishTable = require('./proc/getFishTable');
const getHistoryData = require('./proc/getHistoryData');
const verifyTokenBy = require('../../../modules/middleware/verifyToken');
const verifyAdmin = require('../../../modules/middleware/verifyAdmin');
const fishPhoto = require('./proc/fishPhoto');
const relocalFish = require('./proc/relocalFish');
const changePhoto = require('./proc/changePhoto.js');
const reviseTime = require('./proc/reviseTime.js');
const fishExplore = require('./proc/fishExplore.js');
const voiceControl = require("./proc/voiceControl.js");
const nickName = require("./proc/nickName.js");

router.post(`/`, verifyTokenBy('Header')(30), addFish);

//此API可新增fish的data
router.post(`/data`, verifyTokenBy('Header')(40, false),  addFishData)

//此API可取得fish的table，路由參數fish_ids以逗號分隔多個id，例如: /sql/fish_data/IDs=23,24,26，
router.get(`/table`, verifyTokenBy('Header')(50, false), getFishTable);

router.post(`/assign`, 
  verifyTokenBy('Header')(20, false), 
  verifyAdmin(), 
  fishAssign
)

//此API可取得fish的最新data
router.get(`/data`, verifyTokenBy('Header')(50, false), getFishData);

//此API可取得fish的指定版本data
router.get(`/history_data`, verifyTokenBy('Header')(50, false), getHistoryData);

//此API可控制fish (LED,action,mode)
router.post(`/control`, verifyTokenBy('Header')(60), fishControl)

router.post(`/delete`, verifyTokenBy('Header')(30, false),  fishDelete)

router.post(`/disassign`, 
  verifyTokenBy('Header')(20, false), 
  verifyAdmin(),
  fishDisassign
)

router.get(`/photosURL`, verifyTokenBy('Header')(),  fishPhoto.getURL);

router.get(`/photos`, fishPhoto.get);

router.post(`/photos`, verifyTokenBy('Header')(),  fishPhoto.upload.single('image'), fishPhoto.process);

router.post(`/relocal`, verifyTokenBy('Header')(), relocalFish);

router.post('/photo/delete', verifyTokenBy('Header')(), fishPhoto.remove)

router.post('/photo/change', verifyTokenBy('Header')(), changePhoto)

router.post('/reviseTime', verifyTokenBy('Header')(), reviseTime)

router.get('/explore', verifyTokenBy('Header')(), fishExplore)

router.post('/voice', verifyTokenBy('Header')(), voiceControl)

router.post('/nickname', verifyTokenBy('Header')(), nickName.setNickName)

module.exports = router;