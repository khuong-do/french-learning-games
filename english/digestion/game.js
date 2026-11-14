'use strict';
// Self-contained static game: no server, no dependencies.
const $=id=>document.getElementById(id);
const organData=[
 {name:'The mouth',vi:'Mouth',x:395,y:103},
 {name:"The esophagus",vi:'Esophagus',x:553,y:362},
 {name:"The stomach",vi:'Stomach',x:661,y:631},
 {name:'The liver',vi:'Liver',x:387,y:587},
 {name:'The gallbladder',vi:'Gallbladder',x:376,y:682},
 {name:'The pancreas',vi:'Pancreas',x:534,y:749},
 {name:"The small intestine",vi:'Small intestine',x:512,y:1035},
 {name:'The large intestine',vi:'Large intestine',x:314,y:932},
 {name:'The rectum',vi:'Rectum',x:505,y:1260},
 {name:"The anus",vi:'Anus',x:507,y:1394}
];
const journey=[organData[0].name,organData[1].name,organData[2].name,organData[6].name,organData[7].name,organData[8].name,organData[9].name];
const questions=[
 {q:'Where does digestion begin?',opts:['In the mouth','In the liver','In the rectum'],a:0,why:'Digestion begins in the mouth.'},
 {q:'Which organ connects the mouth to the stomach?',opts:['The pancreas','The esophagus','The colon'],a:1,why:'The esophagus carries food to the stomach.'},
 {q:'Where are nutrients absorbed into blood or lymph?',opts:['In the rectum','In the large intestine','In the small intestine'],a:2,why:'Nutrients pass through the wall of the small intestine.'},
 {q:'Which organ absorbs water and forms stool?',opts:['The large intestine','The mouth','The esophagus'],a:0,why:'The large intestine absorbs water and helps form stool.'},
 {q:'Where does stool leave the body?',opts:['Through the liver','Through the anus','Through the pancreas'],a:1,why:'Stool leaves the body through the anus.'}
];
let level=1,score=0,step=0,locked=false,route=[],answered=false,quizOrder=[];
const shuffle=a=>{let b=[...a];for(let i=b.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]]}return b};
let identify=shuffle(organData);
function header(){ $('stage').textContent=`Mission ${Math.min(level,3)} / 3`; $('score').textContent=`⭐ ${score} points`; $('bar').style.width=`${level===4?100:((level-1)+(level===1?step/identify.length:level===2?route.length/journey.length:step/questions.length))/3*100}%` }
function btn(text,action,cls=''){let b=document.createElement('button');b.textContent=text;if(cls)b.className=cls;b.addEventListener('click',action);return b}
function feedback(msg,ok){let d=document.createElement('div');d.className='feedback '+(ok?'ok':'bad');d.textContent=msg;return d}
function nextButton(label,fn){let b=btn(label,fn);b.style.marginTop='12px';return b}
function render(){header();let g=$('game');g.replaceChildren();if(level===1)drawIdentify(g);else if(level===2)drawJourney(g);else if(level===3)drawQuiz(g);else drawEnd(g)}
function title(g,h,desc){let a=document.createElement('h2');a.textContent=h;g.append(a);let p=document.createElement('p');p.className='muted';p.textContent=desc;g.append(p)}
function drawIdentify(g){title(g,'🔎 Mission 1 — Find the organ','Look at the picture and tap the numbered marker for the correct organ.');if(step>=identify.length){g.append(feedback('Great job! You identified all the organs.',true),nextButton('Mission 2 →',()=>{level=2;step=0;render()}));return}
 const current=identify[step],p=document.createElement('div');p.className='prompt';p.textContent=`${step+1}/${identify.length} · Where is ${current.name.toLowerCase()}?`;g.append(p);
 const map=document.createElement('div');map.className='map';let img=document.createElement('img');img.src='assets/anatomie.png';img.alt='Hình giải phẫu hệ tiêu hóa, không có nhãn';map.append(img);
 const notice=document.createElement('div');notice.id='notice';
 organData.forEach((o,i)=>{let b=btn(String(i+1),()=>{if(locked)return;locked=true;let good=o.name===current.name;if(good)score+=10;notice.replaceChildren(feedback(good?`✓ Correct! ${o.name} — ${o.vi}`:`Not quite. This is ${o.name} (${o.vi}). Correct answer: ${current.name}.`,good),nextButton('Continue →',()=>{step++;locked=false;render()}));map.querySelectorAll('button').forEach(x=>x.disabled=true);
 if(!good){
   const correctIndex=organData.findIndex(item=>item.name===current.name);
   const correctMarker=map.querySelectorAll('button.hotspot')[correctIndex];
   if(correctMarker){
     correctMarker.classList.add('hotspot-correct');
     correctMarker.setAttribute('aria-label',correctMarker.getAttribute('aria-label')+' — correct answer');
   }
 }
 header()},'hotspot');b.style.left=`${o.x/1024*100}%`;b.style.top=`${o.y/1536*100}%`;b.title=`Marker ${i+1}`;b.setAttribute('aria-label',`Choose marker number ${i+1}`);map.append(b)});g.append(map,notice)}
function drawJourney(g){title(g,'🧭 Mission 2 — The journey of food','Select the organs in the order food travels through them.');let p=document.createElement('div');p.className='prompt';p.textContent=`${route.length} / ${journey.length} steps`;g.append(p);let trail=document.createElement('div');trail.className='trail';route.forEach((n,i)=>{let s=document.createElement('span');s.className='chip';s.textContent=`${i+1}. ${n}`;trail.append(s)});g.append(trail);let choices=document.createElement('div');choices.className='choices';let pool=shuffle(journey.filter(n=>!route.includes(n)));pool.forEach(n=>choices.append(btn(n,()=>{route.push(n);render()},'secondary')));g.append(choices);let controls=document.createElement('div');controls.className='row';controls.append(btn('↶ Undo',()=>{route.pop();render()},'secondary'));if(route.length===journey.length)controls.append(btn('✓ Check',()=>{let correct=route.every((n,i)=>n===journey[i]);g.append(feedback(correct?'Bravo! The entire sequence is correct.':'Not quite. Review the lesson image and try again.',correct));if(correct){score+=70;level=3;step=0;quizOrder=shuffle(questions);g.append(nextButton('Mission 3 →',render))}else g.append(nextButton('Try again',()=>{route=[];render()}));controls.querySelectorAll('button').forEach(b=>b.disabled=true);header()}));g.append(controls)}
function drawQuiz(g){title(g,'🧠 Mission 3 — English challenge','Read the English question and choose the correct answer.');if(step>=quizOrder.length){g.append(feedback('Congratulations! You completed the English challenge.',true),nextButton('See results 🏆',()=>{level=4;render()}));return}let q=quizOrder[step],p=document.createElement('div');p.className='prompt';p.textContent=`${step+1}/${quizOrder.length} · ${q.q}`;g.append(p);let options=document.createElement('div');options.className='choices';let result=document.createElement('div');q.opts.forEach((o,i)=>options.append(btn(o,()=>{if(answered)return;answered=true;let good=i===q.a;if(good)score+=20;result.append(feedback((good?'✓ Bravo ! ':'✗ '+q.opts[q.a]+'. ')+q.why,good),nextButton('Continue →',()=>{step++;answered=false;render()}));options.querySelectorAll('button').forEach(b=>b.disabled=true);header()},'secondary')));g.append(options,result)}
function drawEnd(g){$('stage').textContent='Mission complete';$('bar').style.width='100%';let stars=score>=240?'⭐⭐⭐':score>=160?'⭐⭐':'⭐';g.innerHTML=`<div class="badge">🏆</div><h2 class="center">Expert de la digestion</h2><p class="center">${stars}</p><p class="center">Bravo! You completed all three missions.</p><p class="center"><strong>Score : ${score} / 270</strong></p>`;let row=document.createElement('div');row.className='row';row.append(btn('🔄 Play again',reset),btn('📤 Share',share,'secondary'));g.append(row)}
function reset(){level=1;score=0;step=0;locked=false;route=[];answered=false;identify=shuffle(organData);quizOrder=shuffle(questions);render()}
async function share(){let text=`🏆 Mission Digestion · ${score}/270 points ! Play here: ${location.href}`;if(navigator.share){try{await navigator.share({title:'Mission Digestion',text,url:location.href});return}catch(e){if(e.name==='AbortError')return}}if(navigator.clipboard&&window.isSecureContext){try{await navigator.clipboard.writeText(text);alert('Result copied!');return}catch(e){}}prompt('Copy your result:',text)}
$('studyToggle').addEventListener('click',()=>{let p=$('studyPanel');p.hidden=!p.hidden;$('studyToggle').textContent=p.hidden?'📖 Review the original lesson image':'✕ Close lesson image'});
reset();
