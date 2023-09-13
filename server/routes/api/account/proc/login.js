const md5 = require('blueimp-md5');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const dotenv = require("dotenv").config();

module.exports = async function(req, res) {
    console.log(req.body);
    const userTable = await prisma.user.findMany();
    for (let user of userTable) {
        if (req.body.username !== user.username) continue;
        if(md5(req.body.password) !== user.passcode || !user.verify) return res.sendStatus(403); 
        jwt.sign(
            { username: req.body.username },
            process.env.DB_JWTKEY,
            {expiresIn: '9000s'},
            async (err, token) => {
                resData  = await prisma.user.findUnique({
                    where: {username: req.body.username},
                    include: {
                        fishAble: { 
                            include: { 
                                fish: { 
                                    include: {
                                        fishData: {
                                            orderBy: {
                                                time: 'desc'
                                            },
                                            take: 1 
                                        }
                                    }
                                }
                            } 
                        }
                    }
                });
                resData.fishesID = {};
                resData.fishAble.forEach(({fish: {location, fishUID, fishData: [{ active } = {active: 3}]}}) => {
                    resData.fishesID[location] ??= {};
                    resData.fishesID[location][fishUID] = active;
                })
                delete resData.fishAble;
                delete resData.passcode;
                delete resData.exist;
                delete resData.verify;
                resData.instructionTable = await prisma.instruction.findMany();
                resData.departTable = await prisma.depart.findMany();
                resData.poolTable = await prisma.pool.findMany();
                resData.stickerURL = `uploads/photos/user/${req.body.username}/sticker/image.png`;
                resData.token = token
                res.send(resData)
            }
        )
        return;
    }
    res.sendStatus(403); //
    console.log("無帳號")
}