(function(){
const D=document.documentElement,L=localStorage;
const FS=[['صغير',.9],['عادي',1],['كبير',1.15],['كبير جدا',1.3],['ضخم',1.5]];
const FF=[['sys','الافتراضي (خط الجهاز)',''],['naskh','نسخ','Noto Naskh Arabic'],['amiri','أميري','Amiri'],['cairo','كايرو','Cairo'],['taj','تجوال','Tajawal']];
const TH=[['light','فاتح','☀','#fffdf6','#1d3f66'],['dark','داكن','☾','#1d2229','#3b78a8'],['passion','أسبوع الآلام','<svg width="27" height="27" style="stroke:#c9a24a;fill:none" viewBox="0 0 48 48" fill="none" stroke="#c9a24a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M24 6V28M18 12H30"/><path d="M11 16V30M7 20H15"/><path d="M37 16V30M33 20H41"/><path d="M4 40Q14 28 24 31Q34 28 44 40Z" fill="#c9a24a" fill-opacity=".35"/></svg>','#271519','#8a2335'],['resurrection','القيامة','<svg width="27" height="27" style="stroke:#c9a24a;fill:none" viewBox="0 0 48 48" fill="none" stroke="#c9a24a" stroke-width="2.2" stroke-linecap="round"><path d="M6 34H42"/><path d="M14 34A10 10 0 0 1 34 34Z" fill="#c9a24a" fill-opacity=".4"/><path d="M11.2 31.7L6.3 30.9M13.6 26.2L9.6 23.3M18.2 22.4L15.9 17.9M24.0 21.0L24.0 16.0M29.8 22.4L32.1 17.9M34.4 26.2L38.4 23.3M36.8 31.7L41.7 30.9" stroke-width="1.8"/><path d="M24 4V16M19 8H29" stroke-width="2.4"/></svg>','#fffaf0','#c9a24a']];
let fl=0;
function loadFonts(){if(fl)return;fl=1;const k=document.createElement('link');k.rel='stylesheet';k.href='https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Noto+Naskh+Arabic:wght@400..700&family=Cairo:wght@400..800&family=Tajawal:wght@400;700;800&display=swap';document.head.appendChild(k)}
const get=()=>({th:TH.some(x=>x[0]===L.yrth)?L.yrth:'light',sz:Math.max(0,Math.min(4,L.yrsz==null?1:+L.yrsz)),b:L.fbold==='1',ff:FF.some(x=>x[0]===L.yrff)?L.yrff:'sys',or:['land','port'].includes(L.yror)?L.yror:'auto'});
function apply(){const s=get();
 D.setAttribute('data-th',s.th);
 D.style.setProperty('--fw',s.b?'700':'400');D.toggleAttribute('data-b',s.b);
 const z=FS[s.sz][1];D.style.setProperty('--z',z);
 const f=FF.find(x=>x[0]===s.ff);
 if(f[2]){loadFonts();D.style.setProperty('--ff',"'"+f[2]+"'");D.setAttribute('data-ff','1')}else{D.removeAttribute('data-ff')}
 D.setAttribute('data-or',s.or);try{const o=screen.orientation;if(o&&o.lock){if(s.or==='auto'){o.unlock&&o.unlock()}else{o.lock(s.or==='land'?'landscape':'portrait').catch(()=>{})}}}catch(x){}
 const m=document.querySelector('meta[name=theme-color]');if(m)m.content={light:'#f8f4e8',dark:'#14171c',passion:'#1a0f12',resurrection:'#fffaf0'}[s.th];
}

const TSHR=/[\u064B-\u065F\u0670\u06D6-\u06ED]/g,TST=/[\u064B-\u065F\u0670\u06D6-\u06ED]/,TSM=new WeakMap();
function tsAll(root){const on=L.yrdt==='1';const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);const a=[];let n;while(n=w.nextNode())a.push(n);a.forEach(n=>{const pn=n.parentNode&&n.parentNode.nodeName;if(pn==='SCRIPT'||pn==='STYLE')return;if(on){const v=n.nodeValue;if(TST.test(v)){TSM.set(n,v);n.nodeValue=v.replace(TSHR,'')}}else if(TSM.has(n)){n.nodeValue=TSM.get(n);TSM.delete(n)}})}
let tb=0;const mo=new MutationObserver(ms=>{if(L.yrdt!=='1'||tb)return;tb=1;ms.forEach(m=>m.addedNodes.forEach(a=>{if(a.nodeType===1)tsAll(a);else if(a.parentNode)tsAll(a.parentNode)}));tb=0});
function tsSet(v){L.yrdt=v?'1':'0';tsAll(document.body);document.querySelectorAll('.rdp .tsh').forEach(b=>b.textContent=v?'إظهار التشكيل':'إلغاء التشكيل');document.querySelectorAll('#g-ts button').forEach(b=>b.classList.toggle('on',(b.dataset.v==='1')===!!v))}
const tsInit=()=>{mo.observe(document.body,{childList:true,subtree:true});if(L.yrdt==='1')tsAll(document.body)};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',tsInit);else tsInit();
apply();

function vodSw(el){
 const sw=el.querySelector('#vsw'),nt=el.querySelector('#vnote');if(!sw)return;
 const ua=navigator.userAgent,ios=/iPhone|iPad|iPod/.test(ua),sa=navigator.standalone||matchMedia('(display-mode: standalone)').matches,can='Notification'in window&&'serviceWorker'in navigator&&'PushManager'in window;
 const show=m=>{nt.textContent=m;nt.style.display=m?'block':'none'};
 const set=v=>{sw.setAttribute('aria-checked',v?'true':'false');sw.classList.toggle('on',!!v)};
 set(L.vodOn==='1'&&can&&Notification.permission==='granted');
 if(L.vodOn==='1'&&can&&Notification.permission==='granted'&&typeof osLoad==='function'){osLoad().then(OS=>{try{set(!!OS.User.PushSubscription.optedIn)}catch(x){}}).catch(()=>{})}
 let busy=0;
 sw.onclick=async()=>{if(busy)return;busy=1;show('');const want=sw.getAttribute('aria-checked')!=='true';
  try{
   if(want){
    if(!can){show(ios&&!sa?'علشان توصلك الإشعارات: افتح البرنامج من أيقونته على الشاشة الرئيسية الأول.':'المتصفح ده مش بيدعم الإشعارات.');return}
    if(Notification.permission==='denied'){show('الإشعارات مقفولة للبرنامج. فعّلها من إعدادات الجهاز > الإشعارات.');return}
    const OS=await osLoad();if(Notification.permission==='default')await OS.Notifications.requestPermission();
    if(Notification.permission==='granted'){await OS.User.PushSubscription.optIn();L.vodOn='1';set(1)}else{set(0)}
   }else{
    L.vodOn='0';set(0);
    if(typeof osLoad==='function'){const OS=await osLoad();await OS.User.PushSubscription.optOut()}
   }
  }catch(x){show('حصلت مشكلة. جرب تاني.')}finally{busy=0}
 };
}
function page(el){
 loadFonts();
 const s=get();
 const seg=(arr,cur,k)=>arr.map((x,i)=>`<button data-k="${k}" data-v="${i}" class="${i===cur?'on':''}">${x[0]}</button>`).join('');
 el.innerHTML=(typeof banner!=="undefined"?banner('إعدادات البرنامج','#/','',typeof IM!=="undefined"?IM.t:''):'')+`<div class="stg">
<div class="sg nt"><div class="ntr"><div class="ntx"><h3>إشعارات آية اليوم</h3><small>استقبال آية اليوم كل صباح الساعة ٨</small></div><button class="swt" id="vsw" role="switch" aria-checked="false" aria-label="إشعارات آية اليوم"><i></i></button></div><p class="note" id="vnote" style="display:none"></p></div>
  <div class="sg"><h3>طريقة عرض البرنامج</h3><div class="seg" id="g-or">${[['land','عرضي'],['port','طولي'],['auto','أوتوماتيك']].map(x=>`<button data-k="or" data-v="${x[0]}" class="${x[0]===s.or?'on':''}">${x[1]}</button>`).join('')}</div><p class="note">${/iPhone|iPad|iPod/.test(navigator.userAgent)?'الآيفون مش بيسمح للتطبيق إنه يقفل اتجاه الشاشة. «طولي» بيخلي شكل البرنامج طولي حتى لو لفّيت الموبايل. للقفل الفعلي استخدم قفل التدوير من مركز التحكم.':'«عرضي» و«طولي» بيقفلوا اتجاه الشاشة على الأجهزة اللي بتسمح بكده. «أوتوماتيك» يتبع الموبايل.'}</p></div>
  <div class="sg"><h3>المظهر</h3><div class="th" id="g-th">${TH.map(x=>`<button data-k="th" data-v="${x[0]}" class="${x[0]===s.th?'on':''}"><i style="background:${x[3]};border-color:${x[4]}">${x[2]}</i>${x[1]}</button>`).join('')}</div></div>
 <div class="sg"><h3>إعداد النص</h3><h4>حجم الخط</h4><div class="seg wrap" id="g-sz">${seg(FS,s.sz,'sz')}</div><h4>سمك الخط</h4><div class="seg"><button data-k="b" data-v="0" class="${!s.b?'on':''}">عادي</button><button data-k="b" data-v="1" class="${s.b?'on':''}" style="font-weight:900">B عريض</button></div><h4>التشكيل</h4><div class="seg" id="g-ts"><button data-k="ts" data-v="0" class="${L.yrdt!=='1'?'on':''}">بالتشكيل</button><button data-k="ts" data-v="1" class="${L.yrdt==='1'?'on':''}">إلغاء التشكيل</button></div><h4>نوع الخط</h4><div class="fl" id="g-ff">${FF.map(x=>`<button data-k="ff" data-v="${x[0]}" class="${x[0]===s.ff?'on':''}" style="${x[2]?"font-family:'"+x[2]+"'":''}">${x[1]}<small>بسم الآب والابن والروح القدس إله واحد</small></button>`).join('')}</div></div>
 <a class="sg abt" href="#/settings/about"><span>من نحن</span><b>‹</b></a>
 </div>`;
 vodSw(el);
 const bk=el.querySelector('.back');if(bk){bk.textContent='✕';bk.setAttribute('aria-label','إغلاق');bk.removeAttribute('onclick');bk.onclick=e=>{e.preventDefault();closeS()}}
 el.querySelector('.stg').onclick=e=>{const b=e.target.closest('button[data-k]');if(!b)return;const k=b.dataset.k,v=b.dataset.v;
  if(k==='th')L.yrth=v;else if(k==='sz')L.yrsz=v;else if(k==='b')L.fbold=v==='1'?'1':'0';else if(k==='ff')L.yrff=v;else if(k==='or')L.yror=v;else if(k==='ts'){tsSet(v==='1')}
  apply();b.parentNode.querySelectorAll('button').forEach(x=>x.classList.toggle('on',x===b));
 };
}
let prev='';
function track(){const h=location.hash;if(h.indexOf('#/settings')!==0)prev=h}
track();addEventListener('hashchange',track);
function closeS(){location.replace(location.pathname+location.search+(prev||'#/'))}
document.addEventListener('click',e=>{const a=e.target.closest&&e.target.closest('#n3');if(a&&location.hash.indexOf('#/settings')===0){e.preventDefault();closeS()}});
window.YRS={page,apply,ts:tsSet};
})();
