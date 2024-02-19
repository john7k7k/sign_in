const express = require('express');
const router = express.Router();

const login = require('./proc/login');
const verify = require('./proc/verify');
const signUp = require('./proc/signUp');
const resetPassword = require('./proc/resetPassword');
const resetPasswordCheck = require('./proc/resetPasswordCheck');
const logout = require('./proc/logout')
const deleteUser = require('./proc/deleteUser');
const info = require('./proc/info');
const list = require('./proc/list');
const removeUser = require('./proc/removeUser');
const reviseLevel = require('./proc/reviseLevel');
const reviseSection = require('./proc/reviseSection');
const sticker = require('./proc/sticker');
const changePassword = require('./proc/changePassword');

const verifyTokenBy = require('../../../modules/middleware/verifyToken');
const verifyAdmin = require('../../../modules/middleware/verifyAdmin')

router.post(`/login`, login);
  
router.get(`/verify`, verify)

router.post(`/sign_up`, signUp)

router.post(`/reset_password`, resetPassword)

router.post(`/reset_password_check`, resetPasswordCheck)

router.post(`/logout`, 
    verifyTokenBy('Header')(),  
    logout
)

router.post(`/delete_user`, 
    verifyTokenBy('Header')(), 
    deleteUser
)

router.get(`/`, verifyTokenBy('Header')(), info);

router.get(`/list`, 
    verifyTokenBy('Header')(20), 
    list
);

router.post(`/remove_user`, 
    verifyTokenBy('Header')(20, false), 
    verifyAdmin(), 
    removeUser
);

router.post(`/revise/level`, 
    verifyTokenBy('Header')(20, false), 
    verifyAdmin(),
    reviseLevel
);

router.post(`/revise/section`, 
    verifyTokenBy('Header')(10, false), 
    verifyAdmin(), 
    reviseSection
)

router.post(`/sticker`, 
    verifyTokenBy('Header')(),
    sticker.upSticker.single('image'),
    sticker.process
)

router.get(`/sticker`, 
    verifyTokenBy('Header')(),
    sticker.get
)

//router.post(`/change/password`, verifyTokenBy('Header')(), changePassword);

module.exports = router;