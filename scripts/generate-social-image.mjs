import fs from "node:fs/promises";
import sharp from "sharp";
// Run against a local Next preview and an existing Chrome CDP session.
// Uses the site's actual loaded fonts and untouched favicon artwork; no photography.
const preview = new URL(process.argv[2] || "http://localhost:3140/");
if (!["localhost", "127.0.0.1"].includes(preview.hostname)) throw new Error("Use a local preview URL");
const debug = "http://127.0.0.1:9227";
const target = await (await fetch(`${debug}/json/new?${preview.href}`, { method: "PUT" })).json();
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise(resolve => ws.addEventListener("open", resolve));
let sequence = 0; const waiting = new Map();
ws.addEventListener("message", event => {
  const message = JSON.parse(event.data), entry = waiting.get(message.id);
  if (entry) { waiting.delete(message.id); if(message.error)entry.reject(message.error);else entry.resolve(message.result); }
});
function send(method, params = {}) { return new Promise((resolve, reject) => { const id = ++sequence;waiting.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params})); }); }
async function evaluate(expression) { const result = await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true });if(result.exceptionDetails)throw new Error(result.exceptionDetails.text);return result.result.value; }
try {
  await send("Emulation.setDeviceMetricsOverride", { width: 1200, height: 630, deviceScaleFactor: 1, mobile: false });
  for(let attempt=0;attempt<200;attempt++){if(await evaluate("!!document.querySelector('h1') && document.readyState === 'complete'"))break;if(attempt===199)throw new Error("Preview did not load");await new Promise(resolve=>setTimeout(resolve,100));}
  await evaluate("document.fonts.ready.then(() => true)");
  await evaluate(`(async()=>{
    const display=getComputedStyle(document.querySelector('h1')).fontFamily;
    const sans=getComputedStyle(document.body).fontFamily;
    document.body.innerHTML='<div id="social-art"><div class="social-brand"><img src="/favicon.svg" alt=""/><span>Puraitmaad</span></div><div class="social-promise">Your problem <span>→</span><br/>our responsibility.</div><div class="social-details">Premium home, property &amp; business assistance</div><div class="social-location">Lahore, Pakistan</div></div>';
    const style=document.createElement('style');style.textContent=
      '#social-art{position:fixed;inset:0;width:1200px;height:630px;background:#F8F6F0;color:#193C32;padding:58px 76px;box-sizing:border-box;overflow:hidden}'+
      '.social-brand{display:flex;align-items:center;gap:22px;font:400 52px/1.1 '+display+'}.social-brand img{width:84px;height:84px;object-fit:contain}'+
      '.social-promise{margin-top:38px;font:400 82px/1.06 '+display+';letter-spacing:-2px}.social-promise span{font-size:58px}'+
      '.social-details{margin-top:30px;font:400 25px/1.5 '+sans+';color:#59655E}'+
      '.social-location{margin-top:14px;font:400 19px/1.5 '+sans+';color:#59655E}';
    document.head.appendChild(style);await document.fonts.ready;await document.querySelector('#social-art img').decode();
  })()`);
  const capture = await send("Page.captureScreenshot", { format: "png", clip: { x: 0, y: 0, width: 1200, height: 630, scale: 1 }, captureBeyondViewport: false });
  const output = new URL("../public/images/og-puraitmaad.jpg", import.meta.url);
  await fs.writeFile(output, await sharp(Buffer.from(capture.data, "base64")).jpeg({quality:94,chromaSubsampling:"4:4:4"}).toBuffer());
  console.log("Created public/images/og-puraitmaad.jpg (1200×630 JPEG)");
} finally { ws.close();await fetch(`${debug}/json/close/${target.id}`); }
