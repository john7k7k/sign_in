const fs = require('fs');

module.exports = (filePath) => {
    try {
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (error) {
        console.error('解析JSON數據時發生錯誤：', error);
    }
    
}
