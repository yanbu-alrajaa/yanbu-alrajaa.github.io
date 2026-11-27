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
const r = VODL[n % VODL.length];
const b = bible.books.find(x => x.n === r[0]);
const text = b.ch[r[1] - 1][r[2] - 1];
const ar = x => String(x).replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
const body = `${text}\n${r[0]} ${ar(r[1])}: ${ar(r[2])}`;
const payload = { app_id: APP_ID, target_channel: 'push', included_segments: ['Subscribed Users'], headings: { en: 'آية اليوم', ar: 'آية اليوم' }, contents: { en: body, ar: body }, url: 'https://yanbu-alrajaa.github.io/#/vod' };
if (process.env.DRY) { console.log(JSON.stringify(payload, null, 1)); process.exit(0); }
const res = await fetch('https://api.onesignal.com/notifications?c=push', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: 'Key ' + process.env.ONESIGNAL_REST_API_KEY }, body: JSON.stringify(payload) });
const out = await res.text(); console.log(res.status, out);
if (!res.ok) process.exit(1);
