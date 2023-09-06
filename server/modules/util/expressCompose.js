const express = require('express');
const app = express();

const compose = function (...fns){
    return input => fns.reduceRight((acc ,fn) => fn(acc), input)
}

const expressCompose = function (...fns){
    return (req, res) => fns.forEach(fn => fn(req,res))
}

app.listen(300, () => void 0)

app.get('/abc', (req, res, next) => {console.log('hi');next()}, (req, res) => {
    res.send('hello');
})

const com = expressCompose((req, res) => {console.log('hi')}, (req, res) => {
    res.send('hello');
})
app.get('/abcd', com)