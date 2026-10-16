const fs=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const path=require('node:path');
const source=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8');
const render=source.slice(source.indexOf('function render(){'),source.indexOf('\n\nfunction uniqueKey'));
const status=source.match(/function parlayStatus\(legs\)\{[^\n]+/)[0];
const editStart=source.indexOf("$('parlayList').addEventListener('click',function(e){");
const editEnd=source.indexOf('\naddParlayLeg();',editStart);
const edit=source.slice(editStart,editEnd);
function app(picks,answers=[]){
 const elements={};let callback,saves=0;
 const context=vm.createContext({db:{picks,opportunities:[]},Number,Array,JSON,Math,Date,renderParlays(){},renderRadar(){},renderHistorico(){},cloudMerged:()=>[],makeChart:()=>'',esc:v=>String(v??''),num:v=>v===''||v==null?null:Number(v),$:id=>elements[id]||(elements[id]={textContent:'',innerHTML:'',addEventListener:(_name,fn)=>{callback=fn}}),prompt:()=>answers.shift(),alert(){},save:()=>{saves++}});
 vm.runInContext(render+'\n'+status+'\n'+edit,context);
 return {context,elements,render:()=>vm.runInContext('render()',context),parlay:legs=>{context.testLegs=legs;return vm.runInContext('parlayStatus(testLegs)',context)},edit:()=>callback({target:{closest:()=>({getAttribute:()=>picks[0].id})}}),saves:()=>saves};
}
let tests=0;function test(name,fn){fn();tests++;console.log('✓ '+name)}
const pick=(id,status,odds,units,extra={})=>({id,status,odds,units,execution:'realizada',...extra});
test('A winning unit at 1.69 returns net 0.69 U',()=>{const a=app([pick('1','ganado',1.69,1)]);a.render();assert.equal(a.elements['m-profit'].textContent,'+0.69 U');assert.equal(a.elements['m-roi'].textContent,'69.0%')});
test('Loss deducts full stake; push returns zero; pending has no settled exposure',()=>{const a=app([pick('1','perdido',2,1),pick('2','nulo',2,1),pick('3','pendiente',2,50)]);a.render();assert.equal(a.elements['m-profit'].textContent,'-1.00 U');assert.equal(a.elements['m-roi'].textContent,'-50.0%');assert.equal(a.elements['m-pending'].textContent,1)});
test('Parlay counts once, never once per winning leg',()=>{const a=app([pick('1','ganado',1.69,1),pick('2','perdido',2,1),pick('3','ganado',3,2,{type:'parlay',legs:[{status:'ganado',units:50},{status:'ganado',units:50}]}),pick('4','nulo',2,1)]);a.render();assert.equal(a.elements['m-profit'].textContent,'+3.69 U');assert.equal(a.elements['m-roi'].textContent,'73.8%');assert.equal(a.elements['m-resueltos'].textContent,3);assert.equal(a.elements['m-win'].textContent,'66.7%')});
test('Skipped bets and nonfinite or missing odds/stakes cannot pollute ROI',()=>{const a=app([pick('1','ganado',2,1),pick('2','ganado',Infinity,1),pick('3','ganado',2,Infinity),pick('4','ganado',null,1),pick('5','ganado',10,50,{execution:'omitida'})]);a.render();assert.equal(a.elements['m-profit'].textContent,'+1.00 U');assert.equal(a.elements['m-roi'].textContent,'100.0%')});
test('Research outcomes do not count as executed bets',()=>{const a=app([]);a.context.db.opportunities=[{status:'ganado',odds:5,units:100}];a.render();assert.equal(a.elements['m-profit'].textContent,'—');assert.equal(a.elements['m-executed'].textContent,0)});
test('Won plus void settles won; all void settles void; unresolved stays pending',()=>{const a=app([]);const legs=(...statuses)=>statuses.map(status=>({status}));assert.equal(a.parlay(legs('ganado','nulo')),'ganado');assert.equal(a.parlay(legs('nulo','nulo')),'nulo');assert.equal(a.parlay(legs('ganado','pendiente')),'pendiente');assert.equal(a.parlay(legs('perdido','pendiente')),'perdido');assert.equal(a.parlay([]),'pendiente');assert.equal(a.parlay(legs('ganado','invalid')),'pendiente')});
test('Canceling parlay update preserves every saved field',()=>{const ticket=pick('p','pendiente',3,1,{type:'parlay',legs:[{status:'pendiente',market:'1'},{status:'pendiente',market:'2'}]});const before=JSON.stringify(ticket);const a=app([ticket],['ganado','nulo',null]);a.edit();assert.equal(JSON.stringify(ticket),before);assert.equal(a.saves(),0)});
test('Won plus void requires and uses the adjusted sportsbook odds',()=>{const ticket=pick('p','pendiente',3,1,{type:'parlay',legs:[{status:'pendiente',market:'1'},{status:'pendiente',market:'2'}]});const a=app([ticket],['ganado','nulo','ganado','1.5']);a.edit();assert.equal(ticket.status,'ganado');assert.equal(ticket.odds,1.5);assert.equal(ticket.legs[1].status,'nulo');assert.equal(a.saves(),1);assert.equal(a.elements['m-profit'].textContent,'+0.50 U')});
test('Canceling adjusted odds leaves original parlay untouched',()=>{const ticket=pick('p','pendiente',3,1,{type:'parlay',legs:[{status:'pendiente',market:'1'},{status:'pendiente',market:'2'}]});const before=JSON.stringify(ticket);const a=app([ticket],['ganado','nulo','ganado',null]);a.edit();assert.equal(JSON.stringify(ticket),before);assert.equal(a.saves(),0)});
console.log(tests+' financial and parlay tests passed');
