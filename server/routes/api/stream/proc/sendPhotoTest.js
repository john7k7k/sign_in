const express = require('express');
const fs = require('fs');
const path = require('path');
module.exports = async (req, res) => {
  const imagesDir = path.join(__dirname, '/image');

  fs.readdir(imagesDir, (err, files) => {
    if (err) {
      return res.status(500).send('Unable to scan directory: ' + err);
    }

    // 過濾出圖片檔案
    const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif|bmp|svg)$/.test(file));

    if (imageFiles.length === 0) {
      return res.status(404).send('No images found');
    }

    // 生成 HTML，包含所有圖片
    const imageTags = imageFiles.map(file => {
      return `<img src="data:image/jpeg;base64,${fs.readFileSync(path.join(imagesDir, file)).toString('base64')}" alt="${file}" style="max-width: 200px; margin: 10px;">`;
    }).join('');
    res.send(`<div>${imageTags}</div>`);
  });
};