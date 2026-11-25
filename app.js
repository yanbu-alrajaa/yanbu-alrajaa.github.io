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
const SEC=[['الكتاب المقدس','book','#/bible'],['القداسات','chalice','#/lit'],['الأجبية','clock','#/agpeya'],['السنكسار','saint','#/soon/السنكسار'],['المناسبات الكنسية','cal','#/soon/المناسبات الكنسية'],['تسابيح وألحان','music','#/soon/تسابيح وألحان'],['سوشيال ميديا','share','#/social']];
const CREDIT='<div class="credit">نص الكتاب المقدس: ترجمة سميث-فان دايك (١٨٦٥)، ملك عام.<br>المصدر: eBible.org (arb-vd)</div>';
let idx=null;
let BIBLE=null;
async function load(){if(!BIBLE)BIBLE=await (await fetch('38-bible.json')).json();idx=BIBLE.books.map(b=>({n:b.n,t:b.t,c:b.ch.length}));return BIBLE}
async function index(){await load();return idx}
let PARTS=null;
const banner=(t,back,x)=>`<div class="banner${x?' hs':''}">${back?`<a class="back" href="${back}" onclick="return gb()">›</a>`:''}<button class="mb" onclick="od('m')" aria-label="القائمة">☰</button>${PARTS?'<button class="mb pb" onclick="od(\'p\')" aria-label="الأجزاء">☷</button>':''}<h1>${t}</h1>${x||''}</div>`;
const st=document.createElement('style');st.textContent=`.dr{position:fixed;top:0;bottom:0;width:78%;max-width:320px;background:#fffdf6;z-index:30;overflow:auto;padding:calc(20px + env(safe-area-inset-top)) 12px 20px;transition:transform .25s;box-shadow:0 0 30px #0005}.dl{left:0;transform:translateX(-110%)}.dr2{right:0;transform:translateX(110%)}.dr.on{transform:none}#ov{position:fixed;inset:0;background:#0006;z-index:29;display:none}#ov.on{display:block}.dr a{display:block;padding:13px 10px;border-bottom:1px solid #e0d4b0;color:#2b2418;text-decoration:none;font-size:18px;font-weight:700}.dr h4{color:#1f3a5f;margin:0 0 8px;font-size:19px}.mb{position:absolute;left:12px;top:calc(14px + env(safe-area-inset-top));background:#0007;color:#fff;border:0;border-radius:12px;padding:2px 10px;font-size:24px;z-index:3}.pb{left:64px}.read>div{scroll-margin-top:190px}`;document.head.append(st);
const OV=document.createElement('div'),DM=document.createElement('div'),DP=document.createElement('div');OV.id='ov';DM.className='dr dl';DP.className='dr dr2';document.body.append(OV,DM,DP);
DM.innerHTML='<h4>الأقسام</h4><a href="#/">الرئيسية</a><a href="#/bible">الكتاب المقدس</a><a href="#/agpeya">الأجبية</a><a href="#/lit">القداسات</a><a href="#/soon/السنكسار">السنكسار</a><a href="#/soon/المناسبات الكنسية">المناسبات الكنسية</a><a href="#/soon/تسابيح وألحان">تسابيح وألحان</a><a href="#/social">سوشيال ميديا</a>';
DM.onclick=e=>{if(e.target.tagName==='A')cd()};OV.onclick=()=>cd();
function cd(){DM.classList.remove('on');DP.classList.remove('on');OV.classList.remove('on')}
function od(w){cd();if(w==='p'&&!PARTS)return;(w==='p'?DP:DM).classList.add('on');OV.classList.add('on')}
function to(i,f){const e=document.getElementById('s'+i);if(!e)return;const b=e.querySelector('.ob');if(!b)return;const o=f===undefined?b.hidden:f;b.hidden=!o;e.querySelector('.pm').textContent=o?'−':'+'}
function gp(i){cd();to(i,true);const e=document.getElementById('s'+i);if(e)e.scrollIntoView({behavior:'smooth',block:'start'})}
const LN=s=>s.replace(/[\u064b-\u0652\u0640]/g,'').replace(/[إأآ]/g,'ا').replace(/ى/g,'ي').replace(/ة/g,'ه').replace(/[^\u0621-\u064a ]/g,' ').replace(/\s+/g,' ').trim();
const TG=[[/الانافورا|مستحق ?و ?عادل/,1],[/^الاعتراف/,2],[/كلمات التاسيس|لانك في الليله/,3],[/اجيوس|انت هو القيام/,4]];const tg=t=>{const x=LN(t);for(const [r,v] of TG)if(r.test(x))return v;return 0};
function tm(a,b){const g=tg(a);if(g&&g===tg(b))return 1;const pa=a.split('/').map(LN).filter(Boolean),pb=b.split('/').map(LN).filter(Boolean);for(const x of pa)for(const y of pb){if(x.replace(/ /g,'')===y.replace(/ /g,''))return 1;const wx=[...new Set(x.split(' ').filter(w=>w.length>1))],wy=[...new Set(y.split(' ').filter(w=>w.length>1))],i=wx.filter(w=>wy.includes(w)).length;if(i>=2&&i===Math.min(wx.length,wy.length))return 1;if(i>=2&&i/Math.max(wx.length,wy.length)>=.6)return 1}return 0}
function swmap(S,T,i){const n=S.length,m=T.length,best=(k)=>{const c=[];T.forEach((t,j)=>{if(tm(S[k].t,t.t))c.push(j)});if(!c.length)return -1;const rp=k/n;c.sort((x,y)=>Math.abs(x/m-rp)-Math.abs(y/m-rp));return c[0]};let j=best(i);if(j>=0)return {j,exact:1};for(let k=i-1;k>=0;k--){j=best(k);if(j>=0)return {j,exact:0}}return {j:0,exact:0}}
function curPart(){let b=0;document.querySelectorAll('.read>div[id^=s]').forEach(e=>{if(e.getBoundingClientRect().top<=200)b=+e.id.slice(1)});return b}
async function sw(to){const from=location.hash.split('/')[2],S=LITC[from].parts,i=curPart();const T=(LITC[to]||(LITC[to]=await (await fetch('lit-'+to+'.json')).json())).parts;const r=swmap(S,T,i),nm=LITM.find(x=>x[0]===to)[1];sessionStorage.swp=r.j;sessionStorage.swm=r.exact?'':'ما فيش الجزء ده («'+S[i].t+'») في '+nm+'، فوصلت لأقرب جزء: «'+T[r.j].t+'»';history.replaceState({n:N},'','#/lit/'+to);route()}
const SWB=cur=>'<div class="sw">'+[['basil','باسيلي'],['gregory','غريغوري'],['cyril','كيرلسي']].map(([k,t])=>{const on=LITM.find(x=>x[0]===k);return k===cur?`<b class="on">${t}</b>`:on&&on[2]?`<button onclick="sw('${k}')">${t}</button>`:`<button disabled>${t}</button>`}).join('')+'</div>';
function swd(){if(sessionStorage.swp===undefined)return;const k=+sessionStorage.swp,m=sessionStorage.swm;sessionStorage.removeItem('swp');sessionStorage.removeItem('swm');setTimeout(()=>{to(k,true);const el=document.getElementById('s'+k);if(el)el.scrollIntoView({block:'start'});if(m){const d=document.createElement('div');d.className='toast';d.textContent=m;document.body.appendChild(d);setTimeout(()=>d.remove(),5000)}},60)}
const _st=document.createElement('style');_st.textContent='.banner.hs{flex-direction:column;justify-content:flex-end;align-items:center}.banner.hs h1{font-size:30px;margin:0 0 8px}.banner .sw{position:relative;display:flex;gap:6px;z-index:3;white-space:nowrap;margin-bottom:14px}.banner .sw button,.banner .sw b{font:inherit;font-size:13px;font-weight:700;padding:6px 10px;border-radius:16px;border:1px solid #e3c77a99;background:#0008;color:#fff}.banner .sw b{background:#e3c77a;color:#1b2f55;border-color:#e3c77a}.banner .sw button:disabled{opacity:.4}.read>div{scroll-margin-top:182px}.toast{position:fixed;bottom:84px;left:12px;right:12px;z-index:30;background:#1b2f55;color:#fff;padding:10px 14px;border-radius:14px;font-size:14px;text-align:center;box-shadow:0 4px 16px #0006}';document.head.appendChild(_st);
function setParts(title,items){PARTS=items;DP.innerHTML='<h4>'+title+'</h4>'+items.map((x,i)=>x.h?`<a href="${x.h}" onclick="cd()">${x.l}</a>`:`<a href="javascript:void 0" onclick="gp(${i})">${x.l}</a>`).join('')}
let tx=0,ty=0;addEventListener('touchstart',e=>{tx=e.touches[0].clientX;ty=e.touches[0].clientY},{passive:true});
addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-tx,dy=e.changedTouches[0].clientY-ty;if(Math.abs(dx)<70||Math.abs(dy)>Math.abs(dx)/1.5)return;if(tx<25||tx>innerWidth-25)return;const m=DM.classList.contains('on'),p=DP.classList.contains('on');if(dx<0){if(m)cd();else od('p')}else{if(p||m)cd();else if(history.state&&history.state.n>0)history.back()}},{passive:true});

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

 if(p[0]==='social'){nav(0);const S=[['YouTube','play','https://www.youtube.com/@yanbu.alrajaa'],['Facebook','fb','https://www.facebook.com/profile.php?id=61596842011158'],['TikTok','music','https://www.tiktok.com/@yanbu.alrajaa'],['Instagram','cam','']];
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
 if(p[0]==='soon'){nav(0);$.innerHTML=banner(p[1],'#/')+`<div class="soon">قسم ${p[1]} قيد الإعداد.<br>سيُضاف قريبًا.</div>`;return}

 if(p[0]==='agpeya'){nav(0);
  if(p.length===1){$.innerHTML=banner('الأجبية','#/')+VT()+`<div class="books ${VW()}">${HRS.map((h,i)=>`<a class="t" href="#/agpeya/${i}"><div class="c">${svg('clock',26)}</div><b>${h[0]}</b><i>${h[1]}</i></a>`).join('')}</div>`+ACREDIT;return}
  const h=HRS[+p[1]];if(!h){location.hash='#/agpeya';return}
  if(!AG)AG=await (await fetch('39-agpeya.json')).json();
  const secs=AG[h[2]];const lab=s=>s.t||(s.c.split(/\s+/).slice(0,4).join(' ')+'…');
  setParts('أجزاء صلاة '+h[0],secs.map(s=>({l:esc(lab(s))})));
  const body=secs.map((s,k)=>`<div id="s${k}">`+(s.t?`<h3>${esc(s.t)}</h3>`:'')+s.c.split(/\n\n+/).map(q=>`<p>${esc(q).replace(/\n/g,'<br>')}</p>`).join('')+'</div>').join('');
  $.innerHTML=banner('صلاة '+h[0],'#/agpeya')+`<div class="ctl"><button onclick="fs(-2)">أ-</button><button onclick="fs(2)">أ+</button><button onclick="fb()" style="font-weight:900">B</button></div><div class="read">${body}</div>`+ACREDIT;window.scrollTo(0,0);return}
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
if('serviceWorker'in navigator)navigator.serviceWorker.register('sw.js');
