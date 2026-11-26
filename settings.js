(function(){
const D=document.documentElement,L=localStorage;
const FS=[['صغير',.9],['عادي',1],['كبير',1.15],['كبير جدا',1.3],['ضخم',1.5]];
const FF=[['sys','الافتراضي (خط الجهاز)',''],['naskh','نسخ','Noto Naskh Arabic'],['amiri','أميري','Amiri'],['cairo','كايرو','Cairo'],['taj','تجوال','Tajawal']];
const TH=[['light','فاتح','☀','#fffdf6','#1d3f66'],['dark','داكن','☾','#1d2229','#3b78a8'],['passion','أسبوع الآلام','✝','#271519','#8a2335'],['resurrection','القيامة','✦','#fffaf0','#c9a24a']];
let fl=0;
function loadFonts(){if(fl)return;fl=1;const k=document.createElement('link');k.rel='stylesheet';k.href='https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Noto+Naskh+Arabic:wght@400..700&family=Cairo:wght@400..800&family=Tajawal:wght@400;700;800&display=swap';document.head.appendChild(k)}
const get=()=>({th:TH.some(x=>x[0]===L.yrth)?L.yrth:'light',sz:Math.max(0,Math.min(4,L.yrsz==null?1:+L.yrsz)),b:L.fbold==='1',ff:FF.some(x=>x[0]===L.yrff)?L.yrff:'sys'});
function apply(){const s=get();
 D.setAttribute('data-th',s.th);
 D.style.setProperty('--fw',s.b?'700':'400');D.toggleAttribute('data-b',s.b);
 const z=FS[s.sz][1];D.style.setProperty('--z',z);
 const f=FF.find(x=>x[0]===s.ff);
 if(f[2]){loadFonts();D.style.setProperty('--ff',"'"+f[2]+"'");D.setAttribute('data-ff','1')}else{D.removeAttribute('data-ff')}
 const m=document.querySelector('meta[name=theme-color]');if(m)m.content={light:'#f8f4e8',dark:'#14171c',passion:'#1a0f12',resurrection:'#fffaf0'}[s.th];
}
apply();
function page(el){
 loadFonts();
 const s=get();
 const seg=(arr,cur,k)=>arr.map((x,i)=>`<button data-k="${k}" data-v="${i}" class="${i===cur?'on':''}">${x[0]}</button>`).join('');
 el.innerHTML=(typeof banner!=="undefined"?banner('إعدادات البرنامج','#/'):'')+`<div class="stg">
 <div class="sg"><h3>المظهر</h3><div class="th" id="g-th">${TH.map(x=>`<button data-k="th" data-v="${x[0]}" class="${x[0]===s.th?'on':''}"><i style="background:${x[3]};border-color:${x[4]}">${x[2]}</i>${x[1]}</button>`).join('')}</div></div>
 <div class="sg"><h3>إعداد النص</h3><h4>حجم الخط</h4><div class="seg wrap" id="g-sz">${seg(FS,s.sz,'sz')}</div><h4>سمك الخط</h4><div class="seg"><button data-k="b" data-v="0" class="${!s.b?'on':''}">عادي</button><button data-k="b" data-v="1" class="${s.b?'on':''}" style="font-weight:900">B عريض</button></div><h4>نوع الخط</h4><div class="fl" id="g-ff">${FF.map(x=>`<button data-k="ff" data-v="${x[0]}" class="${x[0]===s.ff?'on':''}" style="${x[2]?"font-family:'"+x[2]+"'":''}">${x[1]}<small>بسم الآب والابن والروح القدس إله واحد</small></button>`).join('')}</div></div>
 </div>`;
 el.querySelector('.stg').onclick=e=>{const b=e.target.closest('button[data-k]');if(!b)return;const k=b.dataset.k,v=b.dataset.v;
  if(k==='th')L.yrth=v;else if(k==='sz')L.yrsz=v;else if(k==='b')L.fbold=v==='1'?'1':'0';else if(k==='ff')L.yrff=v;
  apply();b.parentNode.querySelectorAll('button').forEach(x=>x.classList.toggle('on',x===b));
 };
}
window.YRS={page,apply};
})();
