var user = document.getElementById("username");
var passwordDom = document.getElementById("password");
var sign_in = document.getElementById("sign-in");
var sign_up = document.getElementById("sign-up");
var sign_up1 = document.getElementById("sign-up1");
var user1 = document.getElementById("username1");
var password1 = document.getElementById("password1");
var password_check1 = document.getElementById("password_check1");
var login1 = document.getElementById("login1");
var sign_in_inner = document.getElementById("inner");
var sign_up_inner = document.getElementById("inner1");
var forget_inner = document.getElementById("inner2");
var forget_link = document.getElementById("forget");
var sign_in_link2 = document.getElementById("sign-in-link2");
var reset2 = document.getElementById("reset2");
var user2 = document.getElementById("username2");
var mail2 = document.getElementById("mail");
var password2 = document.getElementById("password2");
var password_check2 = document.getElementById("password_check2");
var mail1 = document.getElementById("mail1");
var logined_block = document.getElementById("logined-block");
var logout = document.getElementById("logout");
var emailValid = (msg) => !/^[a-zA-Z0-9-_]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(msg);
var fish_data = ''

sign_up.onclick = function() {
  sign_in_inner.style.display = "none";
  sign_up_inner.style.display = "block";
};

login1.onclick = function() {
  sign_in_inner.style.display = "block";
  sign_up_inner.style.display = "none";
};

forget_link.onclick = function() {
  sign_in_inner.style.display = "none";
  forget_inner.style.display = "block";
};

sign_in_link2.onclick = function() {
  sign_in_inner.style.display = "block";
  forget_inner.style.display = "none";
};

sign_up1.onclick = async function() {
  if (user1.value == "") {
    alert("帳號不得為空");
    return;
  }
  if (mail1.value == "") alert("請設定電子郵件");
  else if (
    !/^[a-zA-Z0-9-_]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(mail1.value)
  )
    alert("電子郵件有誤");
  else if (password1.value == "") alert("請設定密碼");
  else if (password_check1.value == "") alert("請確認密碼");
  else if (password1.value != password_check1.value) alert("密碼不一致");
  else {
    const password = md5(password1.value + salt);
    const account = user1.value;
    const mail = mail1.value;
    const res = await axios({
      method: "post",
      url: "https://localhost/sign_up",
      data: {
        account,
        mail,
        password,
      },
    });
    alert(res.data);
    if (res.data == "註冊失敗，帳號已存在") return;
    user1.value = "";
    mail1.value = "";
    password1.value = "";
    password_check1.value = "";
    login1.onclick();
  }
};

reset2.onclick = async function() {
  if (!user2.value) {
    alert("帳號不得為空");
    return;
  }
  if (!mail2.value) {
    alert("請設定電子郵件");
  } else if (emailValid(mail2.value)) {
    alert("電子郵件有誤");
  } else if (password2.value == "") {
    alert("請設定密碼");
  } else if (password_check2.value == "") alert("請確認密碼");
  else if (password2.value != password_check2.value) alert("密碼不一致");
  else {
    const password = md5(password2.value + salt);
    const account = user2.value;
    const mail = mail2.value;
    const res = await axios({
      method: "post",
      url: "/reset_response",
      data: {
        account,
        mail,
        password,
      },
    });
    if (res.data == "10") {
      const code = prompt("請輸入驗證碼")
      let res2 = await axios({
        method: "post",
        url: "/reset_check_code",
        data: {
          code
        },
      });
      if (res2.data == "重設密碼成功") {
        alert(res2.data);
        user2.value = "";
        mail2.value = "";
        password2.value = "";
        password_check2.value = "";
        sign_in_link2.onclick();
        return;
      }
      alert("驗證碼錯誤，請再次點擊'重設密碼'，我們會重新發送驗證碼")
      return
    }
    alert(res.data);
    if (res.data === "重設密碼失敗，電子郵件錯誤") return;
    if (res.data === "重設密碼失敗，查無此帳號") return;
  }
};

logout.onclick = function() {
  logined_block.style.display = "none";
  sign_in_inner.style.display = "block";
};

sign_in.onclick = async function() {
  const account = user.value;
  let password = md5(passwordDom.value);
  const res = await axios({
    method: "post",
    url: "/login_respond",
    data: {
      account,
      password,
    },
  });
  alert(res.data);
  if (res.data === "密碼錯誤" || res.data === "查無此帳號") return;
  await fetch('/api/sql/fish_data')
  .then(response => response.json())
  .then(data => fish_data = data)
  console.log(fish_data)
  logined_block.firstElementChild.innerHTML = 
    '紀錄時間: ' + fish_data['0'].time + '</br>' +
    'id: ' + fish_data['0'].id + ', ' +
    '電量: ' + fish_data['0'].battery + ', ' +
    'err: ' + fish_data['0'].err
  sign_in_inner.style.display = "none";
  logined_block.style.display = "block";
};

function md5(string) {
  function md5_RotateLeft(lValue, iShiftBits) {
    return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
  }
  function md5_AddUnsigned(lX, lY) {
    var lX4, lY4, lX8, lY8, lResult;
    lX8 = lX & 0x80000000;
    lY8 = lY & 0x80000000;
    lX4 = lX & 0x40000000;
    lY4 = lY & 0x40000000;
    lResult = (lX & 0x3fffffff) + (lY & 0x3fffffff);
    if (lX4 & lY4) {
      return lResult ^ 0x80000000 ^ lX8 ^ lY8;
    }
    if (lX4 | lY4) {
      if (lResult & 0x40000000) {
        return lResult ^ 0xc0000000 ^ lX8 ^ lY8;
      } else {
        return lResult ^ 0x40000000 ^ lX8 ^ lY8;
      }
    } else {
      return lResult ^ lX8 ^ lY8;
    }
  }
  function md5_F(x, y, z) {
    return (x & y) | (~x & z);
  }
  function md5_G(x, y, z) {
    return (x & z) | (y & ~z);
  }
  function md5_H(x, y, z) {
    return x ^ y ^ z;
  }
  function md5_I(x, y, z) {
    return y ^ (x | ~z);
  }
  function md5_FF(a, b, c, d, x, s, ac) {
    a = md5_AddUnsigned(
      a,
      md5_AddUnsigned(md5_AddUnsigned(md5_F(b, c, d), x), ac)
    );
    return md5_AddUnsigned(md5_RotateLeft(a, s), b);
  }
  function md5_GG(a, b, c, d, x, s, ac) {
    a = md5_AddUnsigned(
      a,
      md5_AddUnsigned(md5_AddUnsigned(md5_G(b, c, d), x), ac)
    );
    return md5_AddUnsigned(md5_RotateLeft(a, s), b);
  }
  function md5_HH(a, b, c, d, x, s, ac) {
    a = md5_AddUnsigned(
      a,
      md5_AddUnsigned(md5_AddUnsigned(md5_H(b, c, d), x), ac)
    );
    return md5_AddUnsigned(md5_RotateLeft(a, s), b);
  }
  function md5_II(a, b, c, d, x, s, ac) {
    a = md5_AddUnsigned(
      a,
      md5_AddUnsigned(md5_AddUnsigned(md5_I(b, c, d), x), ac)
    );
    return md5_AddUnsigned(md5_RotateLeft(a, s), b);
  }
  function md5_ConvertToWordArray(string) {
    var lWordCount;
    var lMessageLength = string.length;
    var lNumberOfWords_temp1 = lMessageLength + 8;
    var lNumberOfWords_temp2 =
      (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
    var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
    var lWordArray = Array(lNumberOfWords - 1);
    var lBytePosition = 0;
    var lByteCount = 0;
    while (lByteCount < lMessageLength) {
      lWordCount = (lByteCount - (lByteCount % 4)) / 4;
      lBytePosition = (lByteCount % 4) * 8;
      lWordArray[lWordCount] =
        lWordArray[lWordCount] |
        (string.charCodeAt(lByteCount) << lBytePosition);
      lByteCount++;
    }
    lWordCount = (lByteCount - (lByteCount % 4)) / 4;
    lBytePosition = (lByteCount % 4) * 8;
    lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
    lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
    lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
    return lWordArray;
  }
  function md5_WordToHex(lValue) {
    var WordToHexValue = "",
      WordToHexValue_temp = "",
      lByte,
      lCount;
    for (lCount = 0; lCount <= 3; lCount++) {
      lByte = (lValue >>> (lCount * 8)) & 255;
      WordToHexValue_temp = "0" + lByte.toString(16);
      WordToHexValue =
        WordToHexValue +
        WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
    }
    return WordToHexValue;
  }
  function md5_Utf8Encode(string) {
    string = string.replace(/\r\n/g, "\n");
    var utftext = "";
    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);
      if (c < 128) {
        utftext += String.fromCharCode(c);
      } else if (c > 127 && c < 2048) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      } else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }
    }
    return utftext;
  }
  var x = Array();
  var k, AA, BB, CC, DD, a, b, c, d;
  var S11 = 7,
    S12 = 12,
    S13 = 17,
    S14 = 22;
  var S21 = 5,
    S22 = 9,
    S23 = 14,
    S24 = 20;
  var S31 = 4,
    S32 = 11,
    S33 = 16,
    S34 = 23;
  var S41 = 6,
    S42 = 10,
    S43 = 15,
    S44 = 21;
  string = md5_Utf8Encode(string);
  x = md5_ConvertToWordArray(string);
  a = 0x67452301;
  b = 0xefcdab89;
  c = 0x98badcfe;
  d = 0x10325476;
  for (k = 0; k < x.length; k += 16) {
    AA = a;
    BB = b;
    CC = c;
    DD = d;
    a = md5_FF(a, b, c, d, x[k + 0], S11, 0xd76aa478);
    d = md5_FF(d, a, b, c, x[k + 1], S12, 0xe8c7b756);
    c = md5_FF(c, d, a, b, x[k + 2], S13, 0x242070db);
    b = md5_FF(b, c, d, a, x[k + 3], S14, 0xc1bdceee);
    a = md5_FF(a, b, c, d, x[k + 4], S11, 0xf57c0faf);
    d = md5_FF(d, a, b, c, x[k + 5], S12, 0x4787c62a);
    c = md5_FF(c, d, a, b, x[k + 6], S13, 0xa8304613);
    b = md5_FF(b, c, d, a, x[k + 7], S14, 0xfd469501);
    a = md5_FF(a, b, c, d, x[k + 8], S11, 0x698098d8);
    d = md5_FF(d, a, b, c, x[k + 9], S12, 0x8b44f7af);
    c = md5_FF(c, d, a, b, x[k + 10], S13, 0xffff5bb1);
    b = md5_FF(b, c, d, a, x[k + 11], S14, 0x895cd7be);
    a = md5_FF(a, b, c, d, x[k + 12], S11, 0x6b901122);
    d = md5_FF(d, a, b, c, x[k + 13], S12, 0xfd987193);
    c = md5_FF(c, d, a, b, x[k + 14], S13, 0xa679438e);
    b = md5_FF(b, c, d, a, x[k + 15], S14, 0x49b40821);
    a = md5_GG(a, b, c, d, x[k + 1], S21, 0xf61e2562);
    d = md5_GG(d, a, b, c, x[k + 6], S22, 0xc040b340);
    c = md5_GG(c, d, a, b, x[k + 11], S23, 0x265e5a51);
    b = md5_GG(b, c, d, a, x[k + 0], S24, 0xe9b6c7aa);
    a = md5_GG(a, b, c, d, x[k + 5], S21, 0xd62f105d);
    d = md5_GG(d, a, b, c, x[k + 10], S22, 0x2441453);
    c = md5_GG(c, d, a, b, x[k + 15], S23, 0xd8a1e681);
    b = md5_GG(b, c, d, a, x[k + 4], S24, 0xe7d3fbc8);
    a = md5_GG(a, b, c, d, x[k + 9], S21, 0x21e1cde6);
    d = md5_GG(d, a, b, c, x[k + 14], S22, 0xc33707d6);
    c = md5_GG(c, d, a, b, x[k + 3], S23, 0xf4d50d87);
    b = md5_GG(b, c, d, a, x[k + 8], S24, 0x455a14ed);
    a = md5_GG(a, b, c, d, x[k + 13], S21, 0xa9e3e905);
    d = md5_GG(d, a, b, c, x[k + 2], S22, 0xfcefa3f8);
    c = md5_GG(c, d, a, b, x[k + 7], S23, 0x676f02d9);
    b = md5_GG(b, c, d, a, x[k + 12], S24, 0x8d2a4c8a);
    a = md5_HH(a, b, c, d, x[k + 5], S31, 0xfffa3942);
    d = md5_HH(d, a, b, c, x[k + 8], S32, 0x8771f681);
    c = md5_HH(c, d, a, b, x[k + 11], S33, 0x6d9d6122);
    b = md5_HH(b, c, d, a, x[k + 14], S34, 0xfde5380c);
    a = md5_HH(a, b, c, d, x[k + 1], S31, 0xa4beea44);
    d = md5_HH(d, a, b, c, x[k + 4], S32, 0x4bdecfa9);
    c = md5_HH(c, d, a, b, x[k + 7], S33, 0xf6bb4b60);
    b = md5_HH(b, c, d, a, x[k + 10], S34, 0xbebfbc70);
    a = md5_HH(a, b, c, d, x[k + 13], S31, 0x289b7ec6);
    d = md5_HH(d, a, b, c, x[k + 0], S32, 0xeaa127fa);
    c = md5_HH(c, d, a, b, x[k + 3], S33, 0xd4ef3085);
    b = md5_HH(b, c, d, a, x[k + 6], S34, 0x4881d05);
    a = md5_HH(a, b, c, d, x[k + 9], S31, 0xd9d4d039);
    d = md5_HH(d, a, b, c, x[k + 12], S32, 0xe6db99e5);
    c = md5_HH(c, d, a, b, x[k + 15], S33, 0x1fa27cf8);
    b = md5_HH(b, c, d, a, x[k + 2], S34, 0xc4ac5665);
    a = md5_II(a, b, c, d, x[k + 0], S41, 0xf4292244);
    d = md5_II(d, a, b, c, x[k + 7], S42, 0x432aff97);
    c = md5_II(c, d, a, b, x[k + 14], S43, 0xab9423a7);
    b = md5_II(b, c, d, a, x[k + 5], S44, 0xfc93a039);
    a = md5_II(a, b, c, d, x[k + 12], S41, 0x655b59c3);
    d = md5_II(d, a, b, c, x[k + 3], S42, 0x8f0ccc92);
    c = md5_II(c, d, a, b, x[k + 10], S43, 0xffeff47d);
    b = md5_II(b, c, d, a, x[k + 1], S44, 0x85845dd1);
    a = md5_II(a, b, c, d, x[k + 8], S41, 0x6fa87e4f);
    d = md5_II(d, a, b, c, x[k + 15], S42, 0xfe2ce6e0);
    c = md5_II(c, d, a, b, x[k + 6], S43, 0xa3014314);
    b = md5_II(b, c, d, a, x[k + 13], S44, 0x4e0811a1);
    a = md5_II(a, b, c, d, x[k + 4], S41, 0xf7537e82);
    d = md5_II(d, a, b, c, x[k + 11], S42, 0xbd3af235);
    c = md5_II(c, d, a, b, x[k + 2], S43, 0x2ad7d2bb);
    b = md5_II(b, c, d, a, x[k + 9], S44, 0xeb86d391);
    a = md5_AddUnsigned(a, AA);
    b = md5_AddUnsigned(b, BB);
    c = md5_AddUnsigned(c, CC);
    d = md5_AddUnsigned(d, DD);
  }
  return (
    md5_WordToHex(a) +
    md5_WordToHex(b) +
    md5_WordToHex(c) +
    md5_WordToHex(d)
  ).toLowerCase();
}