/*
 * index.html के एनीमेशन को फ्रेम-बाय-फ्रेम रेंडर करके MP4 वीडियो (साउंड के साथ) बनाता है।
 *
 * ज़रूरी चीज़ें:  Node.js 18+,  ffmpeg,  npm install three@0.160.0 playwright
 *                (पहली बार: npx playwright install chromium)
 * चलाएँ:         node render.cjs                → pepsi-3d-motion.mp4 (1920x1080, 30fps)
 *                node render.cjs 1280 720 30    → चौड़ाई ऊँचाई fps
 */
const { chromium } = require('playwright');
const { spawn, execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const [W = 1920, H = 1080, FPS = 30] = process.argv.slice(2).map(Number);
const DURATION = 12;
const OUT = path.join(__dirname, 'pepsi-3d-motion.mp4');
const SILENT = path.join(__dirname, '.video-silent.mp4');
const AUDIO = path.join(__dirname, '.sfx.wav');
const THREE_DIR = path.join(__dirname, 'node_modules', 'three');

/* ---------- 1) साउंड इफ़ेक्ट्स ffmpeg से सिंथेसाइज़ करो ---------- */
function makeAudio() {
  const P = 3.8; // ढक्कन पॉप का समय
  const expr = [
    // भारी "थंप" जब ढक्कन उछलता है
    `0.9*sin(2*PI*(55+260*exp(-(t-${P})*25))*(t-${P}))*exp(-(t-${P})*9)*gte(t,${P})`,
    // टाइटल आने पर बेस हिट
    `0.8*sin(2*PI*(42+120*exp(-(t-7.5)*20))*(t-7.5))*exp(-(t-7.5)*3.5)*gte(t,7.5)`,
    // हल्का म्यूज़िकल पैड (अंत तक)
    `0.05*(sin(2*PI*110*t)+sin(2*PI*164.8*t)+0.6*sin(2*PI*220*t))*min(1,max(0,(t-6.6)/1.2))*min(1,max(0,(12-t)/1.2))`,
  ].join('+');
  const hiss  = `between(t,2.3,${P})*pow((t-2.3)/1.5,2)*0.35`;          // घुमाने पर "सीsss"
  const burst = `gte(t,${P})*(0.9*exp(-(t-${P})*7)+0.22*exp(-(t-${P})*0.55))`; // "PSSHHH" + फ़िज़
  const whoosh = `between(t,6.5,7.6)*sin(PI*(t-6.5)/1.1)*0.6`;           // वाइप ट्रांज़िशन
  execFileSync('ffmpeg', ['-y', '-hide_banner', '-loglevel', 'error',
    '-f', 'lavfi', '-i', `aevalsrc='${expr}':s=48000:d=${DURATION}`,
    '-f', 'lavfi', '-i', `anoisesrc=color=white:d=${DURATION}:r=48000:seed=3`,
    '-f', 'lavfi', '-i', `anoisesrc=color=pink:d=${DURATION}:r=48000:seed=5`,
    '-filter_complex',
      `[1]highpass=f=2500,asplit[n1][n2];` +
      `[n1]volume='${hiss}':eval=frame[h];` +
      `[n2]volume='${burst}':eval=frame,highpass=f=1200[b];` +
      `[2]bandpass=f=900:w=1200,volume='${whoosh}':eval=frame[w];` +
      `[0][h][b][w]amix=inputs=4:normalize=0,alimiter=limit=0.9,aformat=channel_layouts=stereo[out]`,
    '-map', '[out]', AUDIO]);
}

/* ---------- 2) ब्राउज़र में फ्रेम रेंडर करो ---------- */
(async () => {
  console.log(`Rendering ${W}x${H} @ ${FPS}fps, ${DURATION}s …`);
  makeAudio();

  const browser = await chromium.launch({
    args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'],
  });
  const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
  page.on('pageerror', e => console.error('Page error:', e.message));

  // CDN वाले three.js को लोकल node_modules से सर्व करो (ऑफ़लाइन भी चलेगा)
  await page.route('https://cdn.jsdelivr.net/npm/three@0.160.0/**', route => {
    const rel = route.request().url().split('three@0.160.0/')[1];
    route.fulfill({ path: path.join(THREE_DIR, rel), contentType: 'text/javascript' });
  });

  await page.goto('file://' + path.join(__dirname, 'index.html') + `?render=1&w=${W}&h=${H}`);
  await page.waitForFunction(() => window.__ready === true, null, { timeout: 60000 });

  const ff = spawn('ffmpeg', ['-y', '-hide_banner', '-loglevel', 'error',
    '-f', 'image2pipe', '-framerate', String(FPS), '-i', '-',
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '17', '-pix_fmt', 'yuv420p', SILENT], { stdio: ['pipe', 'inherit', 'inherit'] });

  const frames = Math.round(DURATION * FPS);
  const canvas = await page.$('canvas');
  const t0 = Date.now();
  for (let f = 0; f < frames; f++) {
    await page.evaluate(t => window.__renderAt(t), f / FPS);
    const img = await canvas.screenshot({ type: 'jpeg', quality: 95 });
    if (!ff.stdin.write(img)) await new Promise(r => ff.stdin.once('drain', r));
    if (f % FPS === 0) process.stdout.write(`  frame ${f}/${frames}  (${((Date.now() - t0) / 1000).toFixed(0)}s)\n`);
  }
  ff.stdin.end();
  await new Promise(r => ff.on('close', r));
  await browser.close();

  /* ---------- 3) वीडियो + ऑडियो जोड़ो ---------- */
  execFileSync('ffmpeg', ['-y', '-hide_banner', '-loglevel', 'error', '-i', SILENT, '-i', AUDIO,
    '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-shortest', '-movflags', '+faststart', OUT]);
  fs.unlinkSync(SILENT); fs.unlinkSync(AUDIO);
  console.log('Done →', OUT);
})();
