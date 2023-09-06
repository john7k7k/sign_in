let obj0 = {a: 1, b: {c: 2}};
mul10(obj0);
console.log(obj0.a, obj0.b.c)

function mul10(obj0){
    obj0.a = 10;
    obj0.b.c = 20;
}