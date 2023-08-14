function update({key: condition, column: new_value}){
    console.log(key);
    console.log(condition);
    console.log(column);
    console.log(new_value);
}

update({
    a: 5,
    b: 2
})