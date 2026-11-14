const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
const root='./';const scripts={};for(const lang of ['french','english'])for(const game of ['cuisine-equipee','accessoires-cuisine','supermarche']){const file=lang+'/'+game+'.html';scripts[file]=[...fs.readFileSync(root+file,'utf8').matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(m=>m[1]);}
class Element{
 constructor(tag='div'){this.tag=tag;this.children=[];this.handlers={};this.style={};this.textContent='';this.classList={add(){},remove(){}};}
 append(...x){this.children.push(...x)}appendChild(x){this.append(x)}replaceChildren(...x){this.children=x}insertBefore(x){this.children.unshift(x)}setAttribute(k,v){this[k]=v}getAttribute(k){return this[k]||''}remove(){this.removed=true}
 addEventListener(k,f){this.handlers[k]=f}querySelector(){return null}querySelectorAll(s){return this.children.flatMap(x=>x instanceof Element?[...(s.includes('button')&&x.tag==='button'?[x]:[]),...x.querySelectorAll(s)]:[])}
}
function context(lang,choice='yes'){
 const elements={},storage=new Map(choice?[['llg_analytics',choice]]:[]),events={};
 const c={console,Date,Math,document:{documentElement:{lang,dataset:{}},head:new Element(),body:new Element(),createElement:t=>new Element(t),getElementById:id=>elements[id]??=(new Element()),querySelector:()=>elements.end??=(new Element()),addEventListener:(n,f)=>(events[n]??=[]).push(f)},localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v),removeItem:k=>storage.delete(k)},location:{href:'https://example.test/game'},navigator:{},alert(){},prompt(){}};c.window=c;c.isSecureContext=true;vm.createContext(c);c.run=s=>vm.runInContext(s,c);c.fire=()=>events.DOMContentLoaded?.forEach(f=>f());c.el=id=>elements[id];c.storage=storage;return c;
}
function load(c,file){for(const s of scripts[file]||[])c.run(s);c.fire()}
function shared(c){c.run(fs.readFileSync(root+'shared/analytics.js','utf8'));c.run(fs.readFileSync(root+'shared/rewards.js','utf8'))}
for(const lang of ['french','english']){
 for(const game of ['cuisine-equipee','accessoires-cuisine']){
  const c=context(lang==='french'?'fr':'en');shared(c);load(c,lang+'/'+game+'.html');
  const n=c.run('questions.length');for(let i=0;i<n;i++){c.run('choose(questions[index].options.indexOf(questions[index].word))');c.el('next').handlers.click()}
  assert.equal(c.run('score'),n);assert.equal(c.el('score').textContent,'⭐ Score: '+n);assert.equal(c.el('final').textContent,'⭐ Score: '+n+' / '+n);const e=c.run("dataLayer.filter(x=>x[0]==='event')");assert.equal(e.filter(x=>x[1]==='answer').length,n);assert.equal(e.filter(x=>x[1]==='game_complete').length,1);assert.equal(e.find(x=>x[1]==='game_complete')[2].stars,3);
  c.el('restart').handlers.click();assert.equal(c.run('score'),0);assert.equal(c.run('index'),0);console.log('PASS',lang,game,'full perfect run, events and replay');
 }
 const c=context(lang==='french'?'fr':'en');shared(c);load(c,lang+'/supermarche.html');
 c.run('paint=()=>{}');
 for(let i=0;i<15;i++){c.run('selected=[];for(const w of order[idx].tokens){selected.push(shuffled.findIndex((t,i)=>t.w===w&&!selected.includes(i)))};check();next()')}
 assert.equal(c.run('score'),15);assert.equal(c.el('liveScore').textContent,'⭐ Score: 15');assert.equal(c.el('score').textContent,'⭐ Score: 15 / 15');c.run('start();selected=shuffled.map((_,i)=>i).reverse();if(selected.map(i=>shuffled[i].w).join()==order[idx].tokens.join())selected.reverse();check();selected=[];for(const w of order[idx].tokens)selected.push(shuffled.findIndex((t,i)=>t.w===w&&!selected.includes(i)));check()');assert.equal(c.run('score'),0);assert.equal(c.el('liveScore').textContent,'⭐ Score: 0');console.log('PASS',lang,'supermarket complete run and retry does not earn point');
 for(const retry of [false,true]){
  const d=context(lang==='french'?'fr':'en');shared(d);d.run(fs.readFileSync(root+lang+'/digestion/game.js','utf8'));
  for(let i=0;i<10;i++){
   const n=d.run('organData.findIndex(o=>o.name===identify[step].name)');d.el('game').querySelectorAll('button').filter(x=>x.className==='hotspot')[n].handlers.click();
   d.run('step++;locked=false;render()');
  }
  d.el('game').querySelectorAll('button').at(-1).handlers.click();
  if(retry){d.run('route=[...journey].reverse();render()');d.el('game').querySelectorAll('button').at(-1).handlers.click();d.run('route=[];render()')}
  d.run('route=[...journey];render()');d.el('game').querySelectorAll('button').at(-1).handlers.click();d.run('render()');
  for(let i=0;i<5;i++){d.el('game').querySelectorAll('button')[d.run('quizOrder[step].a')].handlers.click();d.run('step++;answered=false;render()')}
  d.el('game').querySelectorAll('button').at(-1).handlers.click();assert.equal(d.run('score'),retry?200:270);assert.equal(d.el('score').textContent,'⭐ Score: '+(retry?200:270));assert.equal(d.run('firstCorrect'),retry?15:16);
  const e=d.run("dataLayer.filter(x=>x[0]==='event')");assert.equal(e.filter(x=>x[1]==='mission_complete').length,3);assert.equal(e.filter(x=>x[1]==='game_complete').length,1);assert(e.every(x=>x[2].game_id==='mission_digestion'));d.run('reset(true)');assert.equal(d.run('journeyAttempts'),0);console.log('PASS',lang,'digestion',retry?'retry 200/270':'perfect 270/270','accuracy, events and replay');
 }
}
const c=context('en');shared(c);c.run('llgTrack("before")');c.run('llgAnalyticsSettings()');
// getElementById stub always returns an element; invoke banner directly through DOMContentLoaded in fresh-choice context.
const d=context('en',null);shared(d);d.fire();const dialog=d.document.body.children[0];dialog.children[2].onclick();assert.equal(d.storage.get('llg_analytics'),'yes');assert.equal(d.document.documentElement.dataset.llgAnalytics,'yes');d.run('llgTrack("accepted")');dialog.children[1].onclick();const n=d.dataLayer.length;d.run('llgTrack("declined")');assert.equal(d.dataLayer.length,n);assert.equal(d['ga-disable-G-JXNH96HZ0Q'],true);assert.equal(d.document.documentElement.dataset.llgAnalytics,'no');console.log('PASS consent gates event calls and revocation disables analytics');

assert.equal(c.document.documentElement.dataset.llgAnalytics,'yes');console.log('PASS remembered Accept hides preferences and Decline restores visibility');
