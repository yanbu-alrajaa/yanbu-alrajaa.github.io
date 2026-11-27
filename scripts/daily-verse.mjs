// Sends the daily verse through OneSignal at 8:00 Italy time. Use DRY=1 to print only.
import fs from 'node:fs';
const APP_ID = 'd4afa55f-eb6b-4ffc-8b70-f685c132edf9';
const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Rome', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', hour12: false }).formatToParts(new Date());
const g = k => +parts.find(p => p.type === k).value;
const [Y, M, D, H] = [g('year'), g('month'), g('day'), g('hour') % 24];
if (H !== 8 && !process.env.FORCE) { console.log('Rome hour is', H, '- not 8, skipping'); process.exit(0); }
const n = Math.round((Date.UTC(Y, M - 1, D) - Date.UTC(Y, 0, 0)) / 864e5);
const app = fs.readFileSync('app.js', 'utf8');
const VODL = JSON.parse(app.match(/const VODL=(\[.*?\]);/)[1].replace(/'/g, '"'));
const bible = JSON.parse(fs.readFileSync('38-bible.json', 'utf8'));
let r = VODL[n % VODL.length], v2 = r[2];
try { const S = JSON.parse(fs.readFileSync('vodsched.json', 'utf8')); const k = `${Y}-${String(M).padStart(2, '0')}-${String(D).padStart(2, '0')}`; if (S[k]) { r = [S[k][0], S[k][1], S[k][2]]; v2 = S[k][3]; } } catch {}
const b = bible.books.find(x => x.n === r[0]);
let text = ''; for (let i = r[2]; i <= v2; i++) text += (text ? ' ' : '') + b.ch[r[1] - 1][i - 1];
const ar = x => String(x).replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
const body = `${text}\n${r[0]} ${ar(r[1])}: ${ar(r[2])}${v2 > r[2] ? '-' + ar(v2) : ''}`;
const payload = { app_id: APP_ID, target_channel: 'push', included_segments: ['Total Subscriptions'], headings: { en: 'آية اليوم', ar: 'آية اليوم' }, contents: { en: body, ar: body }, url: 'https://yanbu-alrajaa.github.io/#/vod' };
if (process.env.DRY) { console.log(JSON.stringify(payload, null, 1)); process.exit(0); }
const res = await fetch('https://api.onesignal.com/notifications?c=push', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: 'Key ' + process.env.ONESIGNAL_REST_API_KEY }, body: JSON.stringify(payload) });
const out = await res.text(); console.log(res.status, out);
if (!res.ok) process.exit(1);
