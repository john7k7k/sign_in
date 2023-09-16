
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');
const md5 = require('blueimp-md5');

(async (prisma) => {
    const args = process.argv.slice(2);
    if(!args.length){
        showAll(prisma);
    }
    else if(args[0] === '-s'){
        if(args.length === 1){
            showAll(prisma);
        }
        else{
            for(let arg of args.slice(1)){
                console.log(arg);
                console.table(await prisma[arg].findMany());
            }
        }
    }
    else if(args[0] === '-d'){
        if(args.length === 1){
            await prisma.user.deleteMany();
            await prisma.fish.deleteMany();
            await prisma.fishAble.deleteMany();
            await prisma.fishData.deleteMany();
            await prisma.instruction.deleteMany();
            await prisma.depart.deleteMany();
            await prisma.pool.deleteMany();
            fs.rmdir(`uploads/photos/fish`, () => void 0);
            fs.rmdir(`uploads/photos/user`, () => void 0);
        }
        else{
            for(let i = 1; i < args.length; i++){
                await prisma[args[i]].deleteMany();
            }
            if(args.includes('user')) fs.rmdir(`uploads/photos/user`, () => void 0);
            if(args.includes('fish')) fs.rmdir(`uploads/photos/fish`, () => void 0);
        }
    }
    else if(args[0] === '-r'){
        if(args[1] === 'user')
            await prisma.user.create({
                data: {
                    username: args[2],
                    email: 'pp1244qqq@gmail.com',
                    passcode: md5(md5(args[3] + "kowkoww151s5ww")),
                    level: Number(args[4]),
                    section: args[5],
                    registrationTime: Math.floor((new Date()).getTime()/1000),
                    exist: 1,
                    verify: 1,
                    fishAble: {
                        create: []
                    }
                }
            });
        else if(args[1] === 'pool'){
            await prisma.pool.create({
                data: {
                    id: args[2],
                    mac: '',
                    name: args[3],
                    depart: {
                        connect: {
                            id: args[4]
                        }
                    }
                }
            })
        }
        else if(args[1] === 'depart'){
            await prisma.depart.create({
                data: {
                    id: args[2],
                    name: args[3],
                    instruction: {
                        connect: {
                            id: args[4]
                        }
                    }
                }
            })
        }
        else if(args[1] === 'ins'){
            await prisma.instruction.create({
                data: {
                    id: args[2],
                    name: args[3],
                }
            })
        }
        else if(args[1] === 'init'){
            await prisma.instruction.create({
                data: {
                    id: '002',
                    name: '台北科大',
                }
            })
            await prisma.depart.create({
                data: {
                    id: '002001',
                    name: '先鋒大樓',
                    instruction: {
                        connect: {
                            id: '002'
                        }
                    }
                }
            })
            await prisma.pool.create({
                data: {
                    id: '002001001',
                    mac: 'CSL水池',
                    name: '',
                    depart: {
                        connect: {
                            id: '002001'
                        }
                    }
                }
            })
            await prisma.user.create({
                data: {
                    username: '123',
                    email: 'pp1244qqq@gmail.com',
                    passcode: md5(md5('456' + "kowkoww151s5ww")),
                    level: 5,
                    section: '001',
                    registrationTime: Math.floor((new Date()).getTime()/1000),
                    exist: 1,
                    verify: 1,
                    fishAble: {
                        create: []
                    }
                }
            });
            const fishesUID = ['0023001', '0023004', '0023009', '0023010', '0023011', '0023012', '0023013', '0023036']

            for (let fishUID of fishesUID)
                await prisma.fish.create({
                    data: {
                            fishUID,
                            exist: 1,
                            pool: {
                                connect: {
                                    id: '002001001'
                                }
                            }
                        }
                    }
                )
        }
    }
})(prisma)

async function showAll(prisma){
    console.log('User');
    console.table(await prisma.user.findMany());
    console.log('Fish');
    console.table(await prisma.fish.findMany());
    console.log('FishAble');
    console.table(await prisma.fishAble.findMany());
    console.log('FishData');
    console.table(await prisma.fishData.findMany());
    console.log('Pool');
    console.table(await prisma.pool.findMany());
    console.log('Depart');
    console.table(await prisma.depart.findMany());
    console.log('Instruction');
    console.table(await prisma.instruction.findMany());
}