
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');
const md5 = require('blueimp-md5')

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
        await prisma.user.create({
            data: {
                username: process.argv[1],
                email: 'pp1244qqq@gmail.com',
                passcode: md5(md5(process.argv[2] + "kowkoww151s5ww")),
                level: process.argv[3],
                section: process.argv[4],
                exist: 1,
                verify: 1
            }
        });
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