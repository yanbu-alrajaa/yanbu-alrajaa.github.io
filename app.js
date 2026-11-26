const $=document.getElementById('app');
const ar=n=>String(n).replace(/\d/g,d=>'٠١٢٣٤٥٦٧٨٩'[d]);
const IC={
book:'<rect x="12" y="8" width="24" height="32" rx="3"/><path d="M24 15v14M18 21h12"/>',
chalice:'<path d="M15 10h18c0 9-3 14-9 14s-9-5-9-14zM24 24v10M16 38h16"/>',
clock:'<circle cx="24" cy="24" r="15"/><path d="M24 14v10l7 5"/>',
saint:'<circle cx="24" cy="14" r="8"/><circle cx="24" cy="14" r="3"/><path d="M10 40c0-9 6-14 14-14s14 5 14 14"/>',
cal:'<rect x="9" y="12" width="30" height="27" rx="3"/><path d="M9 20h30M17 8v8M31 8v8M24 25v9M20 29h8"/>',
share:'<circle cx="15" cy="24" r="5"/><circle cx="34" cy="13" r="5"/><circle cx="34" cy="35" r="5"/><path d="M19 22l11-7M19 26l11 7"/>',
play:'<rect x="7" y="12" width="34" height="24" rx="7"/><path d="M20 18v12l10-6z"/>',
fb:'<path d="M28 40V26h5l1-6h-6v-4c0-2 1-3 3-3h3V8h-5c-5 0-7 3-7 7v5h-5v6h5v14"/>',
cam:'<rect x="9" y="9" width="30" height="30" rx="9"/><circle cx="24" cy="24" r="7"/><circle cx="33" cy="15" r="1.5"/>',
music:'<path d="M19 33V12l16-4v21"/><circle cx="14" cy="33" r="5"/><circle cx="30" cy="29" r="5"/>'};
const svg=(k,s=44)=>`<svg width="${s}" height="${s}" viewBox="0 0 48 48">${IC[k]}</svg>`;
const SEC=[['الكتاب المقدس','book','#/bible'],['القداسات','chalice','#/lit'],['الأجبية','clock','#/agpeya'],['السنكسار','saint','#/syn'],['القراءات اليومية','rd','#/rd'],['المناسبات الكنسية','cal','#/soon/المناسبات الكنسية'],['تسابيح وألحان','music','#/soon/تسابيح وألحان'],['سوشيال ميديا','share','#/social']];
const CREDIT='<div class="credit">نص الكتاب المقدس: ترجمة سميث-فان دايك (١٨٦٥)، ملك عام.<br>المصدر: eBible.org (arb-vd)</div>';
let idx=null;
let BIBLE=null;
async function load(){if(!BIBLE)BIBLE=await (await fetch('38-bible.json')).json();idx=BIBLE.books.map(b=>({n:b.n,t:b.t,c:b.ch.length}));return BIBLE}
async function index(){await load();return idx}
let PARTS=null;
const banner=(t,back,x)=>`<div class="banner${x?' hs':''}">${back?`<a class="back" href="${back}" onclick="return gb()">›</a>`:''}<button class="mb" onclick="od('m')" aria-label="القائمة">☰</button>${PARTS?'<button class="mb pb" onclick="od(\'p\')" aria-label="الأجزاء">☷</button>':''}<h1>${t}</h1>${x||''}</div>`;
const st=document.createElement('style');st.textContent=`.dr{position:fixed;top:0;bottom:0;width:78%;max-width:320px;background:#fffdf6;z-index:30;overflow:auto;padding:calc(20px + env(safe-area-inset-top)) 12px 20px;transition:transform .25s;box-shadow:0 0 30px #0005}.dl{left:0;transform:translateX(-110%)}.dr2{right:0;transform:translateX(110%)}.dr.on{transform:none}#ov{position:fixed;inset:0;background:#0006;z-index:29;display:none}#ov.on{display:block}.dr a{display:block;padding:13px 10px;border-bottom:1px solid #e0d4b0;color:#2b2418;text-decoration:none;font-size:18px;font-weight:700}.dr h4{color:#1f3a5f;margin:0 0 8px;font-size:19px}.mb{position:absolute;left:12px;top:calc(14px + env(safe-area-inset-top));background:#0007;color:#fff;border:0;border-radius:12px;padding:2px 10px;font-size:24px;z-index:3}.pb{left:64px}.read>div{scroll-margin-top:190px}`;document.head.append(st);
const OV=document.createElement('div'),DM=document.createElement('div'),DP=document.createElement('div');OV.id='ov';DM.className='dr dl';DP.className='dr dr2';document.body.append(OV,DM,DP);
DM.innerHTML='<h4>الأقسام</h4><a href="#/">الرئيسية</a><a href="#/bible">الكتاب المقدس</a><a href="#/agpeya">الأجبية</a><a href="#/lit">القداسات</a><a href="#/syn">السنكسار</a><a href="#/rd">القراءات اليومية</a><a href="#/soon/المناسبات الكنسية">المناسبات الكنسية</a><a href="#/soon/تسابيح وألحان">تسابيح وألحان</a><a href="#/social">سوشيال ميديا</a>';
DM.onclick=e=>{if(e.target.tagName==='A')cd()};OV.onclick=()=>cd();
const DMB=DM.innerHTML;
function ctx(){const p=nz(location.hash).replace(/^#/,'').split('/').filter(Boolean);const a=(h,l,on)=>`<a href="${h}"${on?' class="cur"':''}>${l}</a>`;let o='';
 if(p[0]==='lit'&&p[1])o='<h4>القداسات</h4>'+LITM.filter(l=>l[2]).map(l=>l[0]===p[1]?`<a class="cur" href="javascript:void 0">${l[1]}</a>`:`<a href="javascript:void 0" onclick="sw('${l[0]}')">${l[1]}</a>`).join('');
 else if(p[0]==='agpeya'&&p[1]!==undefined)o='<h4>الأجبية: الساعات</h4>'+HRS.map((h,i)=>i===+p[1]?`<a class="cur" href="javascript:void 0">صلاة ${h[0]}</a>`:`<a href="javascript:void 0" onclick="swh(${i})">صلاة ${h[0]}</a>`).join('');
 else if(p[0]==='book'&&p[1]!==undefined&&idx&&idx[+p[1]]){const i=+p[1],b=idx[i];if(p[2])o='<h4>إصحاحات '+b.n+'</h4>'+Array.from({length:b.c},(_,k)=>a('#/book/'+i+'/'+(k+1),b.n+' '+ar(k+1),+p[2]===k+1)).join('');o+='<h4>'+(b.t==='NT'?'العهد الجديد':'العهد القديم')+'</h4>'+idx.map((x,j)=>x.t===b.t?a('#/book/'+j,x.n,j===i):'').join('')}
 return o}
function cd(){DM.classList.remove('on');DP.classList.remove('on');OV.classList.remove('on')}
function od(w){cd();if(w==='p'&&!PARTS)return;if(w==='m')DM.innerHTML=(ctx()||DMB)+'<div class="ver">النسخة '+APPV+'</div>';(w==='p'?DP:DM).classList.add('on');OV.classList.add('on')}
function to(i,f){const e=document.getElementById('s'+i);if(!e)return;const b=e.querySelector('.ob');if(!b)return;const o=f===undefined?b.hidden:f;b.hidden=!o;e.querySelector('.pm').textContent=o?'−':'+'}
function gp(i){cd();to(i,true);const e=document.getElementById('s'+i);if(e)e.scrollIntoView({behavior:'smooth',block:'start'})}
const LN=s=>s.replace(/[\u064b-\u0652\u0640]/g,'').replace(/[إأآ]/g,'ا').replace(/ى/g,'ي').replace(/ة/g,'ه').replace(/[^\u0621-\u064a ]/g,' ').replace(/\s+/g,' ').trim();
const TG=[[/الانافورا|مستحق ?و ?عادل/,1],[/^الاعتراف/,2],[/كلمات التاسيس|لانك في الليله/,3],[/اجيوس|انت هو القيام/,4]];const tg=t=>{const x=LN(t);for(const [r,v] of TG)if(r.test(x))return v;return 0};
function tm(a,b){const g=tg(a);if(g&&g===tg(b))return 1;const pa=a.split('/').map(LN).filter(Boolean),pb=b.split('/').map(LN).filter(Boolean);for(const x of pa)for(const y of pb){if(x.replace(/ /g,'')===y.replace(/ /g,''))return 1;const wx=[...new Set(x.split(' ').filter(w=>w.length>1))],wy=[...new Set(y.split(' ').filter(w=>w.length>1))],i=wx.filter(w=>wy.includes(w)).length;if(i>=2&&i===Math.min(wx.length,wy.length))return 1;if(i>=2&&i/Math.max(wx.length,wy.length)>=.6)return 1}return 0}
function swmap(S,T,i){const n=S.length,m=T.length,best=(k)=>{const c=[];T.forEach((t,j)=>{if(tm(S[k].t,t.t))c.push(j)});if(!c.length)return -1;const rp=k/n;c.sort((x,y)=>Math.abs(x/m-rp)-Math.abs(y/m-rp));return c[0]};let j=best(i);if(j>=0)return {j,exact:1};for(let k=i-1;k>=0;k--){j=best(k);if(j>=0)return {j,exact:0}}return {j:0,exact:0}}
function curPart(){let b=0;document.querySelectorAll('.read>div[id^=s]').forEach(e=>{if(e.getBoundingClientRect().top<=200)b=+e.id.slice(1)});return b}
async function sw(to){const from=location.hash.split('/')[2],S=LITC[from].parts,i=curPart();const T=(LITC[to]||(LITC[to]=await (await fetch('lit-'+to+'.json')).json())).parts;const r=swmap(S,T,i),nm=LITM.find(x=>x[0]===to)[1];sessionStorage.swp=r.j;sessionStorage.swm=r.exact?'':'ما فيش الجزء ده («'+S[i].t+'») في '+nm+'، فوصلت لأقرب جزء: «'+T[r.j].t+'»';history.replaceState({n:N},'','#/lit/'+to);route()}
const SWB=cur=>'<div class="sw">'+[['basil','باسيلي'],['gregory','غريغوري'],['cyril','كيرلسي']].map(([k,t])=>{const on=LITM.find(x=>x[0]===k);return k===cur?`<b class="on">${t}</b>`:on&&on[2]?`<button onclick="sw('${k}')">${t}</button>`:`<button disabled>${t}</button>`}).join('')+'</div>';

function hk(s){const n=(s.t||s.c.slice(0,30)).replace(/[أإآ]/g,'ا').replace(/ى/g,'ي').replace(/[ًٌٍَُِّْ]/g,'').trim();if(/^(من )?المزمور الخمسون/.test(n))return 'p50';if(/^(من )?المزمور/.test(n))return 'psalm';if(/^(ال)?انجيل/.test(n))return 'gospel';if(/^(ال)?قطع/.test(n))return 'qata';if(/^تسبحة/.test(n))return 'tasbeha';if(/^بسم الاب/.test(n))return 'open';if(/^التحليل|^تحليل/.test(n))return 'absol';return n.split(/\s+/).slice(0,3).join(' ')}
async function swh(to){cd();const from=+location.hash.split('/')[2];AG=AG||await (await fetch('39-agpeya.json')).json();const S=AG[HRS[from][2]],T=AG[HRS[to][2]],i=curPart(),K=S.map(hk),TK=T.map(hk);let j=-1,ex=0;for(let k=i;k>=0&&j<0;k--){j=TK.indexOf(K[k]);if(j>=0&&k===i)ex=1}if(j<0)j=0;const lb=s=>s.t||(s.c.split(/\s+/).slice(0,4).join(' ')+'…');sessionStorage.swp=j;sessionStorage.swm=ex?'':'ما فيش «'+lb(S[i])+'» في صلاة '+HRS[to][0]+'، فوصلت لأقرب جزء: «'+lb(T[j])+'»';history.replaceState({n:N},'','#/agpeya/'+to);route()}
function g2c(dt){const y=dt.getFullYear(),m=dt.getMonth()+1,d=dt.getDate();const a=Math.floor((14-m)/12),yy=y+4800-a,mm=m+12*a-3;const jdn=d+Math.floor((153*mm+2)/5)+365*yy+Math.floor(yy/4)-Math.floor(yy/100)+Math.floor(yy/400)-32045;const n=jdn-1825030,st=k=>365*(k-1)+Math.floor(k/4);let cy=Math.floor(n/365.25)+1;while(st(cy+1)<=n)cy++;while(st(cy)>n)cy--;const z=n-st(cy);return {y:cy,m:Math.floor(z/30)+1,d:z%30+1}}

const CM=['توت','بابه','هاتور','كيهك','طوبة','أمشير','برمهات','برمودة','بشنس','بؤونة','أبيب','مسرى','النسيء'];let SYN;
const cdn=(y,m)=>m<13?30:(y%4===3?6:5);
async function synr(p){nav(0);PARTS=null;DP.innerHTML='';const t=g2c(new Date());let m=t.m,d=t.d,y=t.y;if(p[1]){const q=p[1].split('-').map(Number);if(q[0]>=1&&q[0]<=13&&q[1]>=1&&q[1]<=(q[0]<13?30:6)){m=q[0];d=q[1]}}
 try{SYN=Object.assign(SYN||{},await (await fetch('syn-'+m+'.json')).json())}catch(x){}
 const mx=m<13?30:6,pv=d>1?m+'-'+(d-1):(m>1?m-1:13)+'-'+(m>1?30:6),nx=d<mx?m+'-'+(d+1):(m<13?m+1:1)+'-1';const e=SYN[m+'-'+d]||[];const isT=(m===t.m&&d===t.d);
 const ms=CM.map((n,i)=>`<option value="${i+1}"${i+1===m?' selected':''}>${n}</option>`).join(''),ds=Array.from({length:mx},(_,i)=>`<option value="${i+1}"${i+1===d?' selected':''}>${ar(i+1)}</option>`).join('');
 $.innerHTML=banner('السنكسار','#/')+`<div class="syn"><div class="sd"><a href="#/syn/${pv}" class="sb">›</a><div class="sc"><b>${ar(d)} ${CM[m-1]}</b><i>${isT?'اليوم · ':''}${ar(t.y)} للشهداء</i></div><a href="#/syn/${nx}" class="sb">‹</a></div><div class="sp"><select onchange="synp()" id="sm">${ms}</select><select onchange="synp(1)" id="sdd">${ds}</select>${isT?'':'<a href="#/syn" class="sb2">اليوم</a>'}</div>`+(e.length?e.map(x=>`<h3>${esc(x.t)}</h3>`+x.p.map(q=>`<p>${esc(q)}</p>`).join('')).join(''):'<div class="soon">مفيش سنكسار متاح لليوم ده.</div>')+`<div class="credit">السنكسار: من مشروع Katameros (github.com/pierresaid/katameros-api)، رخصة MIT.</div></div>`;window.scrollTo(0,0)}
function synp(k){const m=+document.getElementById('sm').value;let d=k?+document.getElementById('sdd').value:1;location.hash='#/syn/'+m+'-'+Math.min(d,m<13?30:6)}
const _s3=document.createElement('style');_s3.textContent='.syn{padding:14px 18px 30px}.syn .sd{display:flex;align-items:center;justify-content:space-between;background:var(--card);border:1.5px solid var(--line);border-radius:18px;padding:10px 14px}.syn .sc{text-align:center}.syn .sc b{display:block;font-size:22px;color:#1b2f55}.syn .sc i{font-style:normal;font-size:13px;color:#8a7f66}.syn .sb{font-size:30px;text-decoration:none;color:#1b2f55;padding:0 12px}.syn .sp{display:flex;gap:8px;margin:12px 0;align-items:center}.syn select{font:inherit;padding:8px;border-radius:12px;border:1.5px solid var(--line);background:#fffdf6;color:#1b2f55;flex:1}.syn .sb2{background:#1b2f55;color:#fff;border-radius:12px;padding:8px 12px;text-decoration:none;font-size:14px}.syn h3{color:#1b2f55;margin:20px 0 6px;font-size:19px}.syn p{line-height:2;font-size:17px;margin:0 0 10px}';document.head.appendChild(_s3);

IC.rd='<path d="M24 12c-4-3-9-4-14-3v26c5-1 10 0 14 3 4-3 9-4 14-3V9c-5-1-10 0-14 3zM24 12v26M14 17h5M14 22h5M29 17h5M29 22h5"/>';
let RD={};const iso=dt=>dt.getFullYear()+'-'+String(dt.getMonth()+1).padStart(2,'0')+'-'+String(dt.getDate()).padStart(2,'0');
const DAYN=['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'],GMN=['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
function rdv(segs,ov,bi){const o=[];for(const [c,r] of segs){for(const x of r.split(',')){const [a,b]=x.split('-').map(Number);for(let n=a;n<=(b||a);n++){let t=ov&&ov[c+':'+n];if(!t&&BIBLE.books[bi]&&BIBLE.books[bi].ch[c-1])t=BIBLE.books[bi].ch[c-1][n-1];if(t)o.push('<sup>'+ar(n)+'</sup> '+esc(t))}}}return o.join(' ')}
async function rdr(p){nav(0);PARTS=null;DP.innerHTML='';await load();const td=iso(new Date());let k=/^\d{4}-\d\d-\d\d$/.test(p[1]||'')?p[1]:td;const f=k<'2027-05-01'?'rd1':'rd2';
 try{if(!RD[f])RD[f]=await (await fetch(f+'.json')).json()}catch(x){}
 const dt=new Date(k+'T12:00:00'),sh=n=>{const q=new Date(dt);q.setDate(q.getDate()+n);return iso(q)},e=(RD.rd1&&RD.rd1[k])||(RD.rd2&&RD.rd2[k]);const c=g2c(dt);
 let body='';if(e)body=e.map(s=>`<h2>${esc(s[0])}</h2>`+s[1].map(u=>`<h3>${esc(u[0])}</h3>`+u[1].map(q=>{const bk=BIBLE.books[q[0]];const nm=bk?bk.n:'';const t=rdv(q[2],q[3],q[0]);return t?`<div class="rp"><b>${esc(nm)} ${esc(q[1])}</b><p>${t}</p></div>`:''}).join('')).join('')).join('');
 else body='<div class="soon">مفيش قراءات متاحة لليوم ده.</div>';
 $.innerHTML=banner('القراءات اليومية','#/')+`<div class="syn rdp"><div class="sd"><a href="#/rd/${sh(-1)}" class="sb">›</a><div class="sc"><b>${DAYN[dt.getDay()]} ${ar(dt.getDate())} ${GMN[dt.getMonth()]} ${ar(dt.getFullYear())}</b><i>${k===td?'اليوم · ':''}${ar(c.d)} ${CM[c.m-1]} ${ar(c.y)} للشهداء</i></div><a href="#/rd/${sh(1)}" class="sb">‹</a></div><div class="sp"><input type="date" id="rdd" value="${k}" min="2026-11-26" max="2027-12-30" onchange="location.hash='#/rd/'+this.value">${k===td?'':'<a href="#/rd" class="sb2">اليوم</a>'}</div>${body}<div class="credit">جدول القراءات: من مشروع Katameros (github.com/pierresaid/katameros-api)، رخصة MIT. نص الكتاب المقدس: فان دايك.</div></div>`;window.scrollTo(0,0)}
const _s4=document.createElement('style');_s4.textContent='.rdp h2{color:#9a7b1c;margin:24px 0 4px;font-size:21px;border-bottom:1.5px solid #e3c77a}.rdp .rp{margin:8px 0 14px}.rdp .rp b{color:#1b2f55;font-size:16px}.rdp sup{color:#9a7b1c;font-size:11px;margin-left:2px}.rdp input[type=date]{font:inherit;flex:1;padding:8px;border-radius:12px;border:1.5px solid var(--line);background:#fffdf6;color:#1b2f55}';document.head.appendChild(_s4);
function swd(){if(sessionStorage.swp===undefined)return;const k=+sessionStorage.swp,m=sessionStorage.swm;sessionStorage.removeItem('swp');sessionStorage.removeItem('swm');setTimeout(()=>{to(k,true);const el=document.getElementById('s'+k);if(el)el.scrollIntoView({block:'start'});if(m){const d=document.createElement('div');d.className='toast';d.textContent=m;document.body.appendChild(d);setTimeout(()=>d.remove(),5000)}},60)}
const _st=document.createElement('style');_st.textContent='.banner.hs{flex-direction:column;justify-content:flex-end;align-items:center}.banner.hs h1{font-size:30px;margin:0 0 8px}.banner .sw{position:relative;display:flex;gap:6px;z-index:3;white-space:nowrap;margin-bottom:14px}.banner .sw button,.banner .sw b{font:inherit;font-size:13px;font-weight:700;padding:6px 10px;border-radius:16px;border:1px solid #e3c77a99;background:#0008;color:#fff}.banner .sw b{background:#e3c77a;color:#1b2f55;border-color:#e3c77a}.banner .sw button:disabled{opacity:.4}.read>div{scroll-margin-top:182px}.dr a.cur{background:#e3c77a55;font-weight:800;border-radius:8px}.dr .ver{font-size:12px;color:#8a7f66;text-align:center;margin-top:22px}.dr hr{border:0;border-top:1px solid #e3c77a;margin:10px 0}.toast{position:fixed;bottom:84px;left:12px;right:12px;z-index:30;background:#1b2f55;color:#fff;padding:10px 14px;border-radius:14px;font-size:14px;text-align:center;box-shadow:0 4px 16px #0006}';document.head.appendChild(_st);
function setParts(title,items){PARTS=items;DP.innerHTML='<h4>'+title+'</h4>'+items.map((x,i)=>x.h?`<a href="${x.h}" onclick="cd()">${x.l}</a>`:`<a href="javascript:void 0" onclick="gp(${i})">${x.l}</a>`).join('')}
let tx=0,ty=0;addEventListener('touchstart',e=>{tx=e.touches[0].clientX;ty=e.touches[0].clientY},{passive:true});
addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-tx,dy=e.changedTouches[0].clientY-ty;if(Math.abs(dx)<70||Math.abs(dy)>Math.abs(dx)/1.5)return;if(tx<25||tx>innerWidth-25)return;const m=DM.classList.contains('on'),p=DP.classList.contains('on');if(dx<0){if(m)cd();else od('p')}else{if(p||m)cd();else od('m')}},{passive:true});

{const lk=document.createElement('link');lk.rel='stylesheet';lk.href='coptic.css';document.head.append(lk)}
const st2=document.createElement('style');st2.textContent=`.grid6{padding-top:46px!important;gap:16px 10px!important}.logo{margin-top:38px!important}.s:last-child:nth-child(3n+1){grid-column:2}.soc{display:flex;flex-direction:column;gap:14px;padding:22px 18px}.soc a,.soc div.n{display:flex;align-items:center;gap:14px;background:var(--card);border:1.5px solid var(--line);border-radius:18px;padding:12px 16px;text-decoration:none;color:var(--ink);font-weight:800;font-size:19px}.soc .c{width:56px;height:56px;border-radius:50%;background:var(--navy);border:3px solid var(--gold);display:flex;align-items:center;justify-content:center;flex:none}.soc .n{opacity:.6}.soc i{margin-inline-start:auto;font-style:normal;font-size:14px;color:var(--soft);font-weight:600}.lt{display:flex;gap:8px;justify-content:center;margin:12px 12px 0;flex-wrap:wrap}.lt button{border:1.5px solid var(--navy);background:#fffdf6;color:var(--navy);border-radius:20px;padding:7px 14px;font-size:15px;font-family:inherit;font-weight:700}.lt button.on{background:var(--navy);color:#fff6dc}.lt button:disabled{opacity:.45;border-style:dashed}.lr{display:grid;gap:12px;padding:8px 0;border-bottom:1px solid #e8dcb8}.lr .sp{grid-column:1/-1;font-size:.7em;color:var(--gold);font-weight:800;margin-bottom:-6px}.lr p{margin:0;line-height:1.9;font-size:var(--fs);font-weight:var(--fw)}.lr.c2 p{font-size:.8em}.lr.c3 p{font-size:.6em;line-height:1.7}.lr .cp{font-family:CopticYR,'Noto Sans Coptic','Antinoou',serif;direction:ltr;text-align:left}.lr .tr{font-size:.95em}.sc .lr p{color:#9b927a;font-size:calc(var(--fs) - 4px)}.sc .lr .rb{font-size:.9em}.rb{display:block;font-style:italic;color:#9a3b2e;font-size:.85em;font-weight:700}.oh{cursor:pointer;display:flex;align-items:center;gap:10px;background:#efe6cc;border-radius:12px;padding:8px 12px;margin:14px 0 6px}.oh small{margin-inline-start:auto;font-size:.6em;color:#7a6a3a;font-weight:600}.pm{flex:none;width:28px;height:28px;border-radius:50%;background:var(--navy);color:#fff6dc;display:flex;align-items:center;justify-content:center;font-size:20px;line-height:1}.lnote{margin:14px 16px 0;padding:10px 14px;background:#efe6cc;border-radius:14px;font-size:15px;line-height:1.7}.lnote a{color:var(--navy);font-weight:800}`;document.head.append(st2);
const LCREDIT='<div class="credit">نصوص القداس الباسيلي ورفع بخور باكر (العربي والقبطي): Coptish Datastore (github.com/markrofail/coptish-datastore)، رخصة MPL-2.0. الكتابة بحروف عربية متوفرة لجزء من الأسطر فقط. خط قبطي: Noto Sans Coptic (رخصة OFL). رفع بخور عشية: coptic.io (github.com/abanobmikaeel/coptic.io)، رخصة MIT؛ الأسطر غير المتطابقة تظهر بالعربي فقط.</div>';
const LITM=[["basil","القداس الباسيلي",55],["gregory","القداس الغريغوري",33],["cyril","القداس الكيرلسي",41],["incense","رفع بخور باكر",29],["vespers","رفع بخور عشية",25]];
const LITC={};
const LC=()=>{try{return JSON.parse(localStorage.lc||'')}catch(e){return {a:1,c:1,t:0}}};
function lt(k){const c=LC();c[k]=c[k]?0:1;if(!c.a&&!c.c&&!c.t)c.a=1;localStorage.lc=JSON.stringify(c);route()}
const VW=()=>localStorage.vw==='list'?'list':'grid';
const VT=()=>`<button class="vt" onclick="tv()">${VW()==='list'?'▦ عرض شبكي':'☰ عرض قائمة'}</button>`;
function tv(){localStorage.vw=VW()==='list'?'grid':'list';route()}
const HRS=[['باكر','الساعة الأولى، ٦ صباحًا','Prime'],['الثالثة','الساعة الثالثة، ٩ صباحًا','Terce'],['السادسة','الساعة السادسة، ١٢ ظهرًا','Sext'],['التاسعة','الساعة التاسعة، ٣ عصرًا','None'],['الغروب','الساعة الحادية عشرة، ٥ مساءً','Vespers'],['النوم','الساعة الثانية عشرة، ٩ مساءً','Compline'],['نصف الليل ١','الخدمة الأولى','Midnight_1'],['نصف الليل ٢','الخدمة الثانية','Midnight_2'],['نصف الليل ٣','الخدمة الثالثة','Midnight_3'],['الستار','صلاة الستار','Viel']];
let AG=null;
const ACREDIT='<div class="credit">نصوص الأجبية: النص التقليدي للكنيسة القبطية الأرثوذكسية، مأخوذ من تطبيق «الأجبية» المفتوح المصدر (github.com/abanoubha/agpeya).</div>';
const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;');
function fb(){localStorage.fbold=localStorage.fbold==='1'?'0':'1';document.documentElement.style.setProperty('--fw',localStorage.fbold==='1'?'700':'400')}
document.documentElement.style.setProperty('--fw',localStorage.fbold==='1'?'700':'400');
function nav(a){document.getElementById('n1').className=a==1?'on':'';document.getElementById('n2').className=a==2?'on':''}
async function route(){
 hfix();PARTS=null;cd();
 const h=decodeURIComponent(location.hash.slice(1))||'/';const p=h.split('/').filter(Boolean);
 if(!p.length){nav(1);$.innerHTML=`<img class="logo" src="33-logo.jpg" alt="ينبوع الرجاء"><div class="grid6">${SEC.map(s=>`<a class="s" href="${s[2]}"><div class="c">${svg(s[1])}</div>${s[0]}</a>`).join('')}</div>`;return}

 if(p[0]==='social'){nav(0);const S=[['YouTube','play','https://www.youtube.com/@yanbu.alrajaa'],['Facebook','fb','https://www.facebook.com/profile.php?id=61596842011158'],['TikTok','music','https://www.tiktok.com/@yanbu.alrajaa'],['Instagram','cam','https://www.instagram.com/yanbualrajaa/']];
  $.innerHTML=banner('سوشيال ميديا','#/')+`<div class="soc">${S.map(s=>s[2]?`<a href="${s[2]}" target="_blank" rel="noopener"><div class="c">${svg(s[1],30)}</div>${s[0]}<i>فتح ›</i></a>`:`<div class="n"><div class="c">${svg(s[1],30)}</div>${s[0]}<i>قريبًا</i></div>`).join('')}</div>`;return}
 if(p[0]==='lit'){nav(0);
  if(p.length===1){$.innerHTML=banner('القداسات','#/')+VT()+`<div class="books ${VW()}">${LITM.map(l=>l[2]?`<a class="t" href="#/lit/${l[0]}"><div class="c">${svg('chalice',26)}</div><b>${l[1]}</b><i>${ar(l[2])} جزءًا</i></a>`:`<div class="t" style="opacity:.55"><div class="c">${svg('chalice',26)}</div><b>${l[1]}</b><i>قيد البحث عن مصدر نظيف</i></div>`).join('')}</div>`+LCREDIT;return}
  if(!LITM.find(x=>x[0]===p[1]&&x[2])){location.hash='#/lit';return}
  const l=LITC[p[1]]||(LITC[p[1]]=await (await fetch('lit-'+p[1]+'.json')).json());
  setParts('أجزاء '+l.title,l.parts.map(x=>({l:esc(x.t)})));
  const hc=l.parts.some(s=>s.r.some(r=>r[2])),ht=l.parts.some(s=>s.r.some(r=>r[3]));
  const c=LC(),cols=['a'];if(hc&&c.c)cols.push('c');if(ht&&c.t)cols.push('t');
  if(!c.a&&cols.length>1)cols.shift();
  const fx=x=>esc(x||'').replace(/\n/g,'<br>').split('§').map((t,j)=>j?`<span class="rb">${t}</span>`:t).join('');
  const cell=(k,r)=>`<p class="${k==='c'?'cp':k==='t'?'tr':''}">${fx(k==='a'?r[1]:k==='c'?r[2]:r[3])}</p>`;
  const rows=s=>{const o=[];for(let i=0;i<s.r.length;i++){let r=s.r[i];if(r[4]>1&&cols.includes('t')){const g=s.r.slice(i,i+r[4]);r=[r[0],g.map(x=>x[1]).join('\n'),g.map(x=>x[2]).filter(Boolean).join('\n'),r[3]];i+=g.length-1}o.push(r)}return o.map(r=>`<div class="lr c${cols.length}" style="grid-template-columns:repeat(${cols.length},1fr)">${r[0]?`<div class="sp">${esc(r[0])}</div>`:''}${cols.map(k=>cell(k,r)).join('')}</div>`).join('')};
  const body=l.parts.map((s,k)=>s.o?`<div id="s${k}" class="op${s.s?' sc':''}"><h3 class="oh" onclick="to(${k})"><span class="pm">+</span>${esc(s.t)}<small>اختياري</small></h3><div class="ob" hidden>${rows(s)}</div></div>`:`<div id="s${k}"${s.s?' class="sc"':''}><h3>${esc(s.t)}</h3>${rows(s)}</div>`).join('');
  const bt=(k,t,h)=>h?`<button class="${c[k]?'on':''}" onclick="lt('${k}')">${t}</button>`:`<button disabled title="قريبًا">${t} · قريبًا</button>`;
  $.innerHTML=banner(l.title,'#/lit',SWB(p[1]))+`<div class="lt">${bt('a','عربي',1)}${bt('c','قبطي',hc)}${bt('t','قبطي بحروف عربية',ht)}</div><div class="ctl"><button onclick="fs(-2)">أ-</button><button onclick="fs(2)">أ+</button><button onclick="fb()" style="font-weight:900">B</button></div>${l.note?`<div class="lnote">${l.note} <a href="#/lit/basil">القداس الباسيلي ›</a></div>`:''}<div class="read">${body}</div>`+LCREDIT;window.scrollTo(0,0);swd();return}
 if(p[0]==='syn'){await synr(p);return}
 if(p[0]==='rd'){await rdr(p);return}
 if(p[0]==='soon'){nav(0);$.innerHTML=banner(p[1],'#/')+`<div class="soon">قسم ${p[1]} قيد الإعداد.<br>سيُضاف قريبًا.</div>`;return}

 if(p[0]==='agpeya'){nav(0);
  if(p.length===1){$.innerHTML=banner('الأجبية','#/')+VT()+`<div class="books ${VW()}">${HRS.map((h,i)=>`<a class="t" href="#/agpeya/${i}"><div class="c">${svg('clock',26)}</div><b>${h[0]}</b><i>${h[1]}</i></a>`).join('')}</div>`+ACREDIT;return}
  const h=HRS[+p[1]];if(!h){location.hash='#/agpeya';return}
  if(!AG)AG=await (await fetch('39-agpeya.json')).json();
  const secs=AG[h[2]];const lab=s=>s.t||(s.c.split(/\s+/).slice(0,4).join(' ')+'…');
  setParts('أجزاء صلاة '+h[0],secs.map(s=>({l:esc(lab(s))})));
  const body=secs.map((s,k)=>`<div id="s${k}">`+(s.t?`<h3>${esc(s.t)}</h3>`:'')+s.c.split(/\n\n+/).map(q=>`<p>${esc(q).replace(/\n/g,'<br>')}</p>`).join('')+'</div>').join('');
  $.innerHTML=banner('صلاة '+h[0],'#/agpeya')+`<div class="ctl"><button onclick="fs(-2)">أ-</button><button onclick="fs(2)">أ+</button><button onclick="fb()" style="font-weight:900">B</button></div><div class="read">${body}</div>`+ACREDIT;window.scrollTo(0,0);swd();return}
 if(p[0]==='bible'){nav(2);const I=await index();
  if(p.length===1||p[1]==='OT'||p[1]==='NT'){const t=p[1]==='NT'?'NT':'OT';
   $.innerHTML=banner('الكتاب المقدس','#/')+`<div class="tabs"><a class="${t=='OT'?'on':''}" href="#/bible/OT">العهد القديم</a><a class="${t=='NT'?'on':''}" href="#/bible/NT">العهد الجديد</a></div>${VT()}<div class="books ${VW()}">${I.map((b,i)=>b.t===t?`<a class="t" href="#/book/${i}"><div class="c">${svg('book',26)}</div><b>${b.n}</b><i>${ar(b.c)} إصحاحًا</i></a>`:'').join('')}</div>`+CREDIT;return}}
 if(p[0]==='book'){nav(2);const I=await index(),i=+p[1],b=I[i];
  if(p.length===2){$.innerHTML=banner(b.n,'#/bible/'+b.t)+`${VT()}<div class="chs ${VW()}">${Array.from({length:b.c},(_,k)=>`<a href="#/book/${i}/${k+1}">${ar(k+1)}</a>`).join('')}</div>`+CREDIT;return}
  const c=+p[2];setParts('الإصحاحات: '+b.n,Array.from({length:b.c},(_,k)=>({l:b.n+' '+ar(k+1),h:'#/book/'+i+'/'+(k+1)})));$.innerHTML=banner(`${b.n} ${ar(c)}`,'#/book/'+i)+'<div class="soon">...</div>';
  const d=BIBLE.books[i].ch;
  const nx=c<b.c?`<a href="#/book/${i}/${c+1}">التالي ‹</a>`:'',pv=c>1?`<a href="#/book/${i}/${c-1}">› السابق</a>`:'';
  $.innerHTML=banner(`${b.n} ${ar(c)}`,'#/book/'+i)+`<div class="ctl">${pv}<button onclick="fs(-2)">أ-</button><button onclick="fs(2)">أ+</button><button onclick="fb()" style="font-weight:900">B</button>${nx}</div><div class="read">${d[c-1].map((v,k)=>`<p><sup>${ar(k+1)}</sup>${v}</p>`).join('')}</div><div class="ctl">${pv}${nx}</div>`+CREDIT;window.scrollTo(0,0);return}
 location.hash='#/'}
function fs(d){const v=Math.max(18,Math.min(40,(+localStorage.fs||24)+d));localStorage.fs=v;document.documentElement.style.setProperty('--fs',v+'px')}
document.documentElement.style.setProperty('--fs',(localStorage.fs||24)+'px');
let N=-1,PH=null;
const nz=h=>(h&&h!=='#')?h:'#/';
function par(h){const p=nz(h).replace(/^#/,'').split('/').filter(Boolean);if(!p.length)return null;if(p[0]==='lit'&&p.length>1)return '#/lit';if(p[0]==='agpeya'&&p.length>1)return '#/agpeya';if(p[0]==='book'){if(p.length>2)return '#/book/'+p[1];return '#/bible/'+(idx&&idx[+p[1]]?idx[+p[1]].t:(+p[1]<39?'OT':'NT'))}return '#/'}
function hfix(){const st=history.state;let back=false;if(st&&typeof st.n==='number'){back=st.n<N;N=st.n}else{N++;history.replaceState({n:N},'')}
 const cur=nz(location.hash);if(back&&PH&&PH!=='#/'&&cur!==par(PH))history.replaceState({n:N},'',par(PH));PH=nz(location.hash)}
function gb(){const n=history.state&&history.state.n;if(n>0){history.back();return false}return true}
(function(){const h=nz(location.hash);if(h==='#/'||history.state)return;const ch=[];let x=par(h);while(x){ch.unshift(x);x=par(x)}history.replaceState({n:0},'',ch[0]);ch.slice(1).forEach((u,i)=>history.pushState({n:i+1},'',u));history.pushState({n:ch.length},'',h)})();
addEventListener('hashchange',route);route();
const APPV='v14';
async function chk(){try{const t=await (await fetch('app.js?x='+Date.now(),{cache:'no-store'})).text();const m=t.match(/const APPV='([^']+)'/);if(m&&m[1]!==APPV){const k=+sessionStorage.rl||0;if(Date.now()-k<60000)return;sessionStorage.rl=Date.now();try{await fetch('app.js',{cache:'reload'});await fetch('index.html',{cache:'reload'});const r=await navigator.serviceWorker.getRegistration();if(r)await r.update()}catch(e){}location.reload()}}catch(e){}}
addEventListener('visibilitychange',()=>{if(!document.hidden)chk()});addEventListener('pageshow',e=>{if(e.persisted)chk()});chk();
if('serviceWorker'in navigator)navigator.serviceWorker.register('sw.js',{updateViaCache:'none'});
