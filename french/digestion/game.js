'use strict';
// Self-contained static game: no server, no dependencies.
const $=id=>document.getElementById(id);
// GA4 custom events: safely ignored when offline or analytics is blocked.
const gameLanguage = document.documentElement.lang === 'en' ? 'en' : 'fr';
function trackGame(eventName, extra={}) {
  window.llgTrack?.(eventName, {
    game_id: 'game_04',
    game_name: 'mission_digestion',
    language: gameLanguage,
    ...extra
  });
}

const organData=[
 {name:'La bouche',vi:'Miệng',x:395,y:103},
 {name:"L’œsophage",vi:'Thực quản',x:553,y:362},
 {name:"L’estomac",vi:'Dạ dày',x:661,y:631},
 {name:'Le foie',vi:'Gan',x:387,y:587},
 {name:'La vésicule biliaire',vi:'Túi mật',x:376,y:682},
 {name:'Le pancréas',vi:'Tuyến tụy',x:534,y:749},
 {name:"L’intestin grêle",vi:'Ruột non',x:512,y:1035},
 {name:'Le gros intestin',vi:'Ruột già',x:314,y:932},
 {name:'Le rectum',vi:'Trực tràng',x:505,y:1260},
 {name:"L’anus",vi:'Hậu môn',x:507,y:1394}
];
const journey=[organData[0].name,organData[1].name,organData[2].name,organData[6].name,organData[7].name,organData[8].name,organData[9].name];
const questions=[
 {q:'Où commence la digestion ?',opts:['Dans la bouche','Dans le foie','Dans le rectum'],a:0,why:'La digestion commence dans la bouche.'},
 {q:'Quel organe relie la bouche à l’estomac ?',opts:['Le pancréas','L’œsophage','Le côlon'],a:1,why:'L’œsophage conduit les aliments vers l’estomac.'},
 {q:'Où les nutriments passent-ils dans le sang ou la lymphe ?',opts:['Dans le rectum','Dans le gros intestin','Dans l’intestin grêle'],a:2,why:'Les nutriments traversent la paroi de l’intestin grêle.'},
 {q:'Quel organe absorbe l’eau et forme les selles ?',opts:['Le gros intestin','La bouche','L’œsophage'],a:0,why:'Le gros intestin absorbe l’eau et contribue à former les selles.'},
 {q:'Par où les selles sont-elles évacuées ?',opts:['Par le foie','Par l’anus','Par le pancréas'],a:1,why:'Les selles sont évacuées par l’anus.'}
];
let level=1,score=0,step=0,locked=false,route=[],answered=false,quizOrder=[],journeyAttempts=0,firstCorrect=0;
const shuffle=a=>{let b=[...a];for(let i=b.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]]}return b};
let identify=shuffle(organData);
function header(){ $('stage').textContent=`Mission ${Math.min(level,3)} / 3`; $('score').textContent=`⭐ ${score} points`; $('bar').style.width=`${level===4?100:((level-1)+(level===1?step/identify.length:level===2?route.length/journey.length:step/questions.length))/3*100}%` }
function btn(text,action,cls=''){let b=document.createElement('button');b.textContent=text;if(cls)b.className=cls;b.addEventListener('click',action);return b}
function feedback(msg,ok){let d=document.createElement('div');d.className='feedback '+(ok?'ok':'bad');d.textContent=msg;return d}
function nextButton(label,fn){let b=btn(label,fn);b.style.marginTop='12px';return b}
function render(){header();let g=$('game');g.replaceChildren();if(level===1)drawIdentify(g);else if(level===2)drawJourney(g);else if(level===3)drawQuiz(g);else drawEnd(g)}
function title(g,h,desc){let a=document.createElement('h2');a.textContent=h;g.append(a);let p=document.createElement('p');p.className='muted';p.textContent=desc;g.append(p)}
function drawIdentify(g){title(g,'🔎 Mission 1 — Trouve l’organe','Nhìn hình và chọn đúng vị trí cơ quan. Chạm vào chấm số trên hình.');if(step>=identify.length){g.append(feedback('Bravo ! Bạn đã hoàn thành màn nhận biết cơ quan.',true),nextButton('Mission 2 →',()=>{trackGame('mission_complete',{mission_number:1,score});level=2;step=0;render()}));return}
 const current=identify[step],p=document.createElement('div');p.className='prompt';p.textContent=`${step+1}/${identify.length} · Où est ${current.name.toLowerCase()} ?`;g.append(p);
 const map=document.createElement('div');map.className='map';let img=document.createElement('img');img.src='assets/anatomie.png';img.alt='Hình giải phẫu hệ tiêu hóa, không có nhãn';map.append(img);
 const notice=document.createElement('div');notice.id='notice';
 organData.forEach((o,i)=>{let b=btn(String(i+1),()=>{if(locked)return;locked=true;let good=o.name===current.name;if(good){score+=10;firstCorrect++}trackGame('answer',{mission_number:1,question_number:step+1,correct:good?1:0,attempt:1});notice.replaceChildren(feedback(good?`✓ Chính xác! ${o.name} — ${o.vi}`:`Chưa đúng. Đây là ${o.name} (${o.vi}). Đáp án: ${current.name}.`,good),nextButton('Tiếp tục →',()=>{step++;locked=false;render()}));map.querySelectorAll('button').forEach(x=>x.disabled=true);
 if(!good){
   const correctIndex=organData.findIndex(item=>item.name===current.name);
   const correctMarker=map.querySelectorAll('button.hotspot')[correctIndex];
   if(correctMarker){
     correctMarker.classList.add('hotspot-correct');
     correctMarker.setAttribute('aria-label',correctMarker.getAttribute('aria-label')+' — correct answer');
   }
 }
 header()},'hotspot');b.style.left=`${o.x/1024*100}%`;b.style.top=`${o.y/1536*100}%`;b.title=`Vị trí ${i+1}`;b.setAttribute('aria-label',`Chọn vị trí số ${i+1}`);map.append(b)});g.append(map,notice)}
function drawJourney(g){title(g,'🧭 Mission 2 — Le voyage des aliments','Chọn các cơ quan theo thứ tự thức ăn đi qua.');let p=document.createElement('div');p.className='prompt';p.textContent=`${route.length} / ${journey.length} étapes`;g.append(p);let trail=document.createElement('div');trail.className='trail';route.forEach((n,i)=>{let s=document.createElement('span');s.className='chip';s.textContent=`${i+1}. ${n}`;trail.append(s)});g.append(trail);let choices=document.createElement('div');choices.className='choices';let pool=shuffle(journey.filter(n=>!route.includes(n)));pool.forEach(n=>choices.append(btn(n,()=>{route.push(n);render()},'secondary')));g.append(choices);let controls=document.createElement('div');controls.className='row';controls.append(btn('↶ Hoàn tác',()=>{route.pop();render()},'secondary'));if(route.length===journey.length)controls.append(btn('✓ Kiểm tra',()=>{let correct=route.every((n,i)=>n===journey[i]);journeyAttempts++;if(journeyAttempts===1)trackGame('answer',{mission_number:2,correct:correct?1:0,attempt:1});g.append(feedback(correct?'Bravo ! Đúng toàn bộ hành trình.':'Chưa đúng. Hãy xem lại hình bài học và thử lại.',correct));if(correct){if(journeyAttempts===1){score+=70;firstCorrect++}trackGame('mission_complete',{mission_number:2,score});level=3;step=0;quizOrder=shuffle(questions);g.append(nextButton('Mission 3 →',render))}else g.append(nextButton('Thử lại',()=>{route=[];render()}));controls.querySelectorAll('button').forEach(b=>b.disabled=true);header()}));g.append(controls)}
function drawQuiz(g){title(g,'🧠 Mission 3 — Défi français','Đọc câu hỏi tiếng Pháp và chọn đáp án đúng.');if(step>=quizOrder.length){g.append(feedback('Félicitations ! Bạn đã hoàn thành thử thách tiếng Pháp.',true),nextButton('Xem kết quả 🏆',()=>{trackGame('mission_complete',{mission_number:3,score});level=4;render();LLG.finish({game:'mission_digestion',score,max:270,firstCorrect,total:16,missions:3})}));return}let q=quizOrder[step],p=document.createElement('div');p.className='prompt';p.textContent=`${step+1}/${quizOrder.length} · ${q.q}`;g.append(p);let options=document.createElement('div');options.className='choices';let result=document.createElement('div');q.opts.forEach((o,i)=>options.append(btn(o,()=>{if(answered)return;answered=true;let good=i===q.a;if(good){score+=20;firstCorrect++}trackGame('answer',{mission_number:3,question_number:step+1,correct:good?1:0,attempt:1});result.append(feedback((good?'✓ Bravo ! ':'✗ '+q.opts[q.a]+'. ')+q.why,good),nextButton('Tiếp tục →',()=>{step++;answered=false;render()}));options.querySelectorAll('button').forEach(b=>b.disabled=true);header()},'secondary')));g.append(options,result)}
function drawEnd(g){$('stage').textContent='Mission terminée';$('bar').style.width='100%';let stars=score>=240?'⭐⭐⭐':score>=160?'⭐⭐':'⭐';g.innerHTML=`<div class="badge">🏆</div><h2 class="center">Expert de la digestion</h2><p class="center">${stars}</p><p class="center">Bravo ! Vous avez terminé les trois missions.</p><p class="center"><strong>Score : ${score} / 270</strong></p>`;let row=document.createElement('div');row.className='row';row.append(btn('🔄 Rejouer',()=>reset(true)),btn('📤 Partager',share,'secondary'));g.append(row)}
function reset(isReplay=false){if(isReplay)trackGame('game_replay',{previous_score:score});trackGame('game_start',{replay:!!isReplay});level=1;score=0;step=0;locked=false;route=[];answered=false;journeyAttempts=0;firstCorrect=0;identify=shuffle(organData);quizOrder=shuffle(questions);render()}
async function share(){let text=`🏆 Mission Digestion · ${score}/270 points ! Joue aussi : ${location.href}`;if(navigator.share){try{await navigator.share({title:'Mission Digestion',text,url:location.href});trackGame('share_result',{score,share_method:'native'});return}catch(e){if(e.name==='AbortError')return}}if(navigator.clipboard&&window.isSecureContext){try{await navigator.clipboard.writeText(text);trackGame('share_result',{score,share_method:'clipboard'});alert('Résultat copié !');return}catch(e){}}prompt('Copiez votre résultat :',text)}
$('studyToggle').addEventListener('click',()=>{let p=$('studyPanel');p.hidden=!p.hidden;$('studyToggle').textContent=p.hidden?'📖 Xem lại hình bài học gốc':'✕ Đóng hình bài học'});
reset();
