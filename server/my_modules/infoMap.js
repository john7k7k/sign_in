module.exports = (oldDatas, newDatas) => {
    return {
        encode(specity){
            for(const num in oldDatas){
                if(specity === oldDatas[num]) return newDatas[num];
            }
        },
        decode(specity){
            for(const num in newDatas){
                if(specity === newDatas[num]) return oldDatas[num];
            }
        }
    }
}