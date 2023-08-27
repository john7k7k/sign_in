const compose = (...args) => value => args.reverse().reduce((first, fnc) => fnc(first), value);
const curry = (fn, ...args) =>  args.length === fn.length ? fn(...args) : function curried (...argv){return [...args, ...argv].length === fn.length ? fn(...args, ...argv) : (...arga) => curried(...argv, ...arga)} 
function add1(a){
    return a+1;
}

function squad(a){
    return a*a;
}


const squadOfAdd = compose(add1, squad, add);

//console.log(squadOfAdd(2));
function add(a,b,c,d){
    return a+b+c+d
}

console.log(curry(add)(1,2)(3,8));

const addMany = (...args) => {
    return args.reduce((a,b) => a+b)
}

console.log(addMany(5,6))