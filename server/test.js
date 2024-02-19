const puppeteer = require('puppeteer');

(async () => {
  // 启动一个浏览器
  const browser = await puppeteer.launch();

  // 打开一个新页面
  const page = await browser.newPage();

  // 模拟浏览器访问你的目标网站
  await page.goto('https://frp.aifish.cc/api/proxy/tcp'); // 替换为你的目标网站

  // 等待一段时间，确保页面加载完成（根据需要调整等待时间）
  await page.waitForTimeout(5000); // 5秒钟

  // 获取页面内容
  let content = await page.content();
  console.log(content);
  content = content.slice(content.indexOf('{'),content.lastIndexOf('}')+1)
  console.log(JSON.parse(content));
  // 关闭浏览器
  await browser.close();
})();
