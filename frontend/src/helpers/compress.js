import pako from "pako";

// Inferred from https://www.planttext.com/js/jquery-plantuml/plantuml.js

const inflate = data => {
  return pako.inflateRaw(data, { to: "string" });
};

const deflate = data => {
  return pako.deflateRaw(data, { to: "string" });
};

function decode6bit(c) {
  if (c >= "0" && c <= "9") return c.charCodeAt(0) - 48;
  if (c >= "A" && c <= "Z") return c.charCodeAt(0) - 65 + 10;
  if (c >= "a" && c <= "z") return c.charCodeAt(0) - 97 + 36;
  if (c == "-") return 62;
  if (c == "_") return 63;
  return 0;
}

function decode64(data) {
  var ss = "";
  for (let i = 0; i < data.length; i += 4) {
    var c1 = decode6bit(data.substring(i, i + 1));
    var c2 = decode6bit(data.substring(i + 1, i + 2));
    var c3 = decode6bit(data.substring(i + 2, i + 3));
    var c4 = decode6bit(data.substring(i + 3, i + 4));
    ss += String.fromCharCode((c1 << 2) | (c2 >> 4));
    ss += String.fromCharCode(((c2 & 0x0f) << 4) | (c3 >> 2));
    ss += String.fromCharCode(((c3 & 0x3) << 6) | c4);
  }
  return ss;
}

function encode64(data) {
  let r = "";
  for (let i = 0; i < data.length; i += 3) {
    if (i + 2 == data.length) {
      r += append3bytes(data.charCodeAt(i), data.charCodeAt(i + 1), 0);
    } else if (i + 1 == data.length) {
      r += append3bytes(data.charCodeAt(i), 0, 0);
    } else {
      r += append3bytes(
        data.charCodeAt(i),
        data.charCodeAt(i + 1),
        data.charCodeAt(i + 2)
      );
    }
  }
  return r;
}

function append3bytes(b1, b2, b3) {
  const c1 = b1 >> 2;
  const c2 = ((b1 & 0x3) << 4) | (b2 >> 4);
  const c3 = ((b2 & 0xf) << 2) | (b3 >> 6);
  const c4 = b3 & 0x3f;
  let r = "";
  r += encode6bit(c1 & 0x3f);
  r += encode6bit(c2 & 0x3f);
  r += encode6bit(c3 & 0x3f);
  r += encode6bit(c4 & 0x3f);
  return r;
}

function encode6bit(b) {
  if (b < 10) {
    return String.fromCharCode(48 + b);
  }
  b -= 10;
  if (b < 26) {
    return String.fromCharCode(65 + b);
  }
  b -= 26;
  if (b < 26) {
    return String.fromCharCode(97 + b);
  }
  b -= 26;
  if (b == 0) {
    return "-";
  }
  if (b == 1) {
    return "_";
  }
  return "?";
}

export function compress(s) {
  s = unescape(encodeURIComponent(s));
  return encode64(deflate(s, 9));
}

export function decompress(s) {
  s = inflate(decode64(s));
  return decodeURIComponent(escape(s));
}

// function compress2(s) {
//   s = unescape(encodeURIComponent(s));

//   var deflatedVar = deflate(s);
//   var encodedText = encode64(deflatedVar);
//   var plantumlserver = document.getElementById("plantumlserver").value;

//   if (plantumlserver.trim() == "") {
//     //plantumlserver = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '') + "/plantuml/";
//     plantumlserver = "https://www.plantuml.com/plantuml/";
//   }

//   var fullimageLink = plantumlserver + "img/" + encodedText;
//   var fullsvgLink = plantumlserver + "svg/" + encodedText;
//   var fulltxtLink = plantumlserver + "txt/" + encodedText;
//   document.getElementById("im").src = fullimageLink;
//   $("a#plantimagelink").attr("href", fullimageLink);
//   $("a#plantsvglink").attr("href", fullsvgLink);
//   $("a#planttxtlink").attr("href", fulltxtLink);
//   $("a#planteditorlink").attr("href", "?text=" + encodedText);
// }
