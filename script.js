const $=id=>document.getElementById(id);
const DEF={info:{name:"مدرسة النجاح لتعليم السياقة",about:"مدرسة معتمدة لتعليم السياقة في الجزائر: دروس القانون، التدريب الميداني مع مؤطرين محترفين، ومرافقة كاملة حتى امتحان النجاح.",tel:"0550 00 00 00",wil:"الجزائر العاصمة",addr:"شارع الاستقلال، وسط المدينة",hrs:"السبت – الخميس: 08:00 – 18:00",map:""},
prices:[{ic:"🚗",n:"رخصة السيارة",d:"صنف B — الأكثر طلباً",p:35000},{ic:"🚌",n:"رخصة الحافلات",d:"صنف D",p:50000}],
pw:"admin123",regs:[]};
let S=DEF;
try{const r=localStorage.getItem("ds_v2");if(r)S=Object.assign({},DEF,JSON.parse(r))}catch(e){}
const save=()=>{try{localStorage.setItem("ds_v2",JSON.stringify(S))}catch(e){}};
const toast=m=>{const t=$("toast");t.textContent=m;t.style.display="block";setTimeout(()=>t.style.display="none",2200)};
const fmt=n=>Number(n).toLocaleString("ar-DZ")+" دج";
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const mapUrl=v=>{v=(v||"").trim();if(!v)return"";return /^https?:\/\//i.test(v)?v:"https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(v)};

function enter(){$("splash").classList.add("out");setTimeout(()=>$("splash").style.display="none",650);try{sessionStorage.setItem("ds_seen","1")}catch(e){}}
try{if(sessionStorage.getItem("ds_seen")){$("splash").style.display="none"}}catch(e){}

function render(){
 const i=S.info;
 $("sName").textContent=i.name;$("hName").textContent=i.name;$("fName").textContent=i.name;$("hAbout").textContent=i.about;
 $("cAddr").textContent=i.addr;$("cWil").textContent=i.wil;$("cHrs").textContent=i.hrs;
 $("cTel").textContent=i.tel;$("cTel").href="tel:"+i.tel.replace(/\s/g,"");
 document.title=i.name;$("yr").textContent=new Date().getFullYear();
 const u=mapUrl(i.map),b=$("mapBtn");
 if(u){b.href=u;b.style.display="inline-flex";$("mapbox").innerHTML="📍 موقعنا محدد على الخريطة<br>اضغط الزر لفتح الاتجاهات"}
 else{b.style.display="none";$("mapbox").textContent="لم يتم تحديد موقع المحل بعد"}
 $("lic").innerHTML=S.prices.map(p=>`<div class="card"><div class="ic">${p.ic}</div><h3>${esc(p.n)}</h3><div class="hint">${esc(p.d)}</div><div class="price">${fmt(p.p)}</div></div>`).join("");
 $("rl").innerHTML=S.prices.map(p=>`<option>${esc(p.n)}</option>`).join("");
}
function sendReg(){
 const n=$("rn").value.trim(),p=$("rp").value.trim();
 if(n.length<3||!/^(0|\+213)[5-7]\d{8}$/.test(p.replace(/\s/g,""))){toast("تحقق من الاسم ورقم الهاتف الجزائري");return}
 S.regs.unshift({n,p,l:$("rl").value,m:$("rm").value,d:new Date().toLocaleDateString("ar-DZ")});save();
 $("rn").value=$("rp").value=$("rm").value="";toast("✅ تم إرسال طلبك بنجاح");
}
function openAdm(){$("adm").classList.add("on")}
function closeAdm(){$("adm").classList.remove("on")}
function login(){if($("pw").value===S.pw){$("login").style.display="none";$("dash").style.display="block";fill();$("pw").value=""}else toast("كلمة المرور غير صحيحة")}
function fill(){
 const i=S.info;$("aName").value=i.name;$("aAbout").value=i.about;$("aTel").value=i.tel;$("aWil").value=i.wil;$("aAddr").value=i.addr;$("aHrs").value=i.hrs;$("aMap").value=i.map;
 $("pl").innerHTML=S.prices.map((p,x)=>`<label>${p.ic} ${esc(p.n)} (دج)</label><input type="number" min="0" data-i="${x}" value="${p.p}">`).join("");
 rows();
}
function rows(){
 $("cnt").textContent="("+S.regs.length+")";
 $("rows").innerHTML=S.regs.map((r,x)=>`<tr><td>${esc(r.n)}</td><td dir="ltr"><a href="tel:${esc(r.p)}">${esc(r.p)}</a></td><td>${esc(r.l)}</td><td>${esc(r.d)}</td><td><button class="btn red" style="padding:4px 10px" onclick="delReg(${x})">حذف</button></td></tr>`).join("");
 $("empty").textContent=S.regs.length?"":"لا توجد طلبات تسجيل بعد.";
}
function delReg(x){S.regs.splice(x,1);save();rows()}
function saveInfo(){S.info={name:$("aName").value||DEF.info.name,about:$("aAbout").value,tel:$("aTel").value,wil:$("aWil").value,addr:$("aAddr").value,hrs:$("aHrs").value,map:$("aMap").value.trim()};save();render();toast("✅ تم الحفظ")}
function savePrices(){document.querySelectorAll("#pl input").forEach(e=>S.prices[e.dataset.i].p=+e.value||0);save();render();toast("✅ تم حفظ الأسعار")}
function savePw(){const v=$("np").value;if(v.length<4){toast("4 أحرف على الأقل");return}S.pw=v;save();$("np").value="";toast("✅ تم تغيير كلمة المرور")}
function geo(){
 if(!navigator.geolocation){toast("المتصفح لا يدعم تحديد الموقع");return}
 navigator.geolocation.getCurrentPosition(p=>{$("aMap").value=p.coords.latitude.toFixed(6)+", "+p.coords.longitude.toFixed(6);toast("تم تحديد موقعك — اضغط حفظ")},()=>toast("تعذّر الحصول على الموقع، الصق الرابط يدوياً"))
}
document.querySelectorAll(".tabs button").forEach(b=>b.onclick=()=>{
 document.querySelectorAll(".tabs button,.tab").forEach(e=>e.classList.remove("on"));b.classList.add("on");$(b.dataset.t).classList.add("on")});
render();
