const $=document.getElementById('app');
const ar=n=>String(n).replace(/\d/g,d=>'٠١٢٣٤٥٦٧٨٩'[d]);
const IC={
book:'<rect x="12" y="8" width="24" height="32" rx="3"/><path d="M24 15v14M18 21h12"/>',
chalice:'<path d="M15 10h18c0 9-3 14-9 14s-9-5-9-14zM24 24v10M16 38h16"/>',
clock:'<circle cx="24" cy="24" r="15"/><path d="M24 14v10l7 5"/>',
saint:'<circle cx="24" cy="14" r="8"/><circle cx="24" cy="14" r="3"/><path d="M10 40c0-9 6-14 14-14s14 5 14 14"/>',
cal:'<rect x="9" y="12" width="30" height="27" rx="3"/><path d="M9 20h30M17 8v8M31 8v8M24 25v9M20 29h8"/>',
music:'<path d="M19 33V12l16-4v21"/><circle cx="14" cy="33" r="5"/><circle cx="30" cy="29" r="5"/>'};
const svg=(k,s=44)=>`<svg width="${s}" height="${s}" viewBox="0 0 48 48">${IC[k]}</svg>`;
const SEC=[['الكتاب المقدس','book','#/bible'],['القداسات','chalice','#/soon/القداسات'],['الأجبية','clock','#/agpeya'],['السنكسار','saint','#/soon/السنكسار'],['المناسبات الكنسية','cal','#/soon/المناسبات الكنسية'],['تسابيح وألحان','music','#/soon/تسابيح وألحان']];
const CREDIT='<div class="credit">نص الكتاب المقدس: ترجمة سميث-فان دايك (١٨٦٥)، ملك عام.<br>المصدر: eBible.org (arb-vd)</div>';
let idx=null;
let BIBLE=null;
async function load(){if(!BIBLE)BIBLE=await (await fetch('38-bible.json')).json();idx=BIBLE.books.map(b=>({n:b.n,t:b.t,c:b.ch.length}));return BIBLE}
async function index(){await load();return idx}
let PARTS=null;
const banner=(t,back)=>`<div class="banner">${back?`<a class="back" href="${back}">›</a>`:''}<button class="mb" onclick="od('m')" aria-label="القائمة">☰</button>${PARTS?'<button class="mb pb" onclick="od(\'p\')" aria-label="الأجزاء">☷</button>':''}<h1>${t}</h1></div>`;
const st=document.createElement('style');st.textContent=`.dr{position:fixed;top:0;bottom:0;width:78%;max-width:320px;background:#fffdf6;z-index:30;overflow:auto;padding:calc(20px + env(safe-area-inset-top)) 12px 20px;transition:transform .25s;box-shadow:0 0 30px #0005}.dl{left:0;transform:translateX(-110%)}.dr2{right:0;transform:translateX(110%)}.dr.on{transform:none}#ov{position:fixed;inset:0;background:#0006;z-index:29;display:none}#ov.on{display:block}.dr a{display:block;padding:13px 10px;border-bottom:1px solid #e0d4b0;color:#2b2418;text-decoration:none;font-size:18px;font-weight:700}.dr h4{color:#1f3a5f;margin:0 0 8px;font-size:19px}.mb{position:absolute;left:12px;top:calc(14px + env(safe-area-inset-top));background:#0007;color:#fff;border:0;border-radius:12px;padding:2px 10px;font-size:24px;z-index:3}.pb{left:64px}.read>div{scroll-margin-top:190px}`;document.head.append(st);
const OV=document.createElement('div'),DM=document.createElement('div'),DP=document.createElement('div');OV.id='ov';DM.className='dr dl';DP.className='dr dr2';document.body.append(OV,DM,DP);
DM.innerHTML='<h4>الأقسام</h4><a href="#/">الرئيسية</a><a href="#/bible">الكتاب المقدس</a><a href="#/agpeya">الأجبية</a><a href="#/soon/القداسات">القداسات</a><a href="#/soon/السنكسار">السنكسار</a><a href="#/soon/المناسبات الكنسية">المناسبات الكنسية</a><a href="#/soon/تسابيح وألحان">تسابيح وألحان</a>';
DM.onclick=e=>{if(e.target.tagName==='A')cd()};OV.onclick=()=>cd();
function cd(){DM.classList.remove('on');DP.classList.remove('on');OV.classList.remove('on')}
function od(w){cd();if(w==='p'&&!PARTS)return;(w==='p'?DP:DM).classList.add('on');OV.classList.add('on')}
function gp(i){cd();const e=document.getElementById('s'+i);if(e)e.scrollIntoView({behavior:'smooth',block:'start'})}
function setParts(title,items){PARTS=items;DP.innerHTML='<h4>'+title+'</h4>'+items.map((x,i)=>x.h?`<a href="${x.h}" onclick="cd()">${x.l}</a>`:`<a href="javascript:void 0" onclick="gp(${i})">${x.l}</a>`).join('')}
let tx=0,ty=0;addEventListener('touchstart',e=>{tx=e.touches[0].clientX;ty=e.touches[0].clientY},{passive:true});
addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-tx,dy=e.changedTouches[0].clientY-ty;if(Math.abs(dx)<70||Math.abs(dy)>Math.abs(dx)/1.5)return;const m=DM.classList.contains('on'),p=DP.classList.contains('on');if(dx<0){if(m)cd();else od('p')}else{if(p)cd();else od('m')}},{passive:true});
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
 PARTS=null;cd();
 const h=decodeURIComponent(location.hash.slice(1))||'/';const p=h.split('/').filter(Boolean);
 if(!p.length){nav(1);$.innerHTML=`<img class="logo" src="33-logo.jpg" alt="ينبوع الرجاء"><div class="grid6">${SEC.map(s=>`<a class="s" href="${s[2]}"><div class="c">${svg(s[1])}</div>${s[0]}</a>`).join('')}</div>`;return}
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
addEventListener('hashchange',route);route();
if('serviceWorker'in navigator)navigator.serviceWorker.register('sw.js');
