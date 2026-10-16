const assert = require('node:assert/strict');
const recovery = require('../cloud-recovery.js');
const record = {id:'local-1', game:'A vs B', market:'TD', selection:'Over', sources:['GameRead'],modules:['Touchdown'],odds:'1.9',prob:'60',status:'Validado',grade:'A',prob_status:'validada',evidence:'Fuente original',is_bet:false};
const row = {id:'cloud-1',user_id:'u1',source_id:'radar-beta5:local-1',event_name:'A vs B',market:'TD',version:1,payload:{schema:'sj3_beta1',kind:'research_only',radar_record:record}};
const now = '2026-10-16T05:20:00.000Z';
function storage(initial={}) { const map = new Map(Object.entries(initial));return {getItem:k=>map.has(k)?map.get(k):null,setItem:(k,v)=>map.set(k,v),map}; }
let count=0;
function test(name,fn) {fn();count++;console.log('✓ '+name);}
test('Compatible record preserves evidence and resets approval',()=>{
 const r = recovery.normalize(row,'u1',now); assert.equal(r.evidence,record.evidence);assert.equal(r.is_bet,false);assert.equal(r.status,'En análisis');assert.equal(r.grade,'Sin calificar');assert.equal(r.prob_status,'sin_validar');assert.equal(r.prob,'60');
});
test('Foreign users, RC1 and inconsistent source IDs are rejected',()=>{
 assert.equal(recovery.normalize(row,'u2',now),null);
 assert.equal(recovery.normalize({...row,payload:{note:'RC1'}},'u1',now),null);
 assert.equal(recovery.normalize({...row,source_id:'radar-beta5:different'},'u1',now),null);
 assert.equal(recovery.normalize({...row,event_name:'Other event'},'u1',now),null);
});
test('Malformed odds, numeric field types and executed bets are rejected',()=>{
 for(const changes of [{odds:'NaN'},{odds:'1'},{prob:'101'},{prob:60},{is_bet:true},{sources:'GameRead'}]){
  assert.equal(recovery.normalize({...row,payload:{...row.payload,radar_record:{...record,...changes}}},'u1',now),null);
 }
});
test('Existing records are never replaced, duplicate cloud rows count once',()=>{
 const p = recovery.plan([row,row],[{...record,evidence:'Edited locally'}],'u1',now);assert.equal(p.added.length,0);assert.equal(p.existing,2);
 assert.equal(recovery.plan([row,row],[],'u1',now).added.length,1);
});
test('Successful import backs up exact previous contents and preserves other keys',()=>{
 const old=JSON.stringify([{...record,id:'keep',evidence:'Unchanged'}]); const s=storage({[recovery.KEY]:old,picks:'private-picks',parlays:'private-parlays'});
 const result=recovery.apply(s,[row],'u1',old,now,'one');
 assert.equal(JSON.parse(s.getItem(result.backupKey)).radar_raw,old);assert.deepEqual(JSON.parse(s.getItem(recovery.KEY))[0],JSON.parse(old)[0]);assert.equal(s.getItem('picks'),'private-picks');assert.equal(s.getItem('parlays'),'private-parlays');
 const after=s.getItem(recovery.KEY);recovery.apply(s,[row],'u1',after,now,'two');assert.equal(s.getItem(recovery.KEY),after);assert.equal(s.map.size,4);
});
test('A changed preview and invalid local JSON stop all writes',()=>{
 const s=storage({[recovery.KEY]:'[]'});assert.throws(()=>recovery.apply(s,[row],'u1',null,now,'one'),/cambió/);assert.equal(s.map.size,1);
 s.setItem(recovery.KEY,'not-json');assert.throws(()=>recovery.readLocal(s),/JSON inválido/);assert.equal(s.getItem(recovery.KEY),'not-json');
});
test('Backup failure aborts before the Radar write',()=>{
 const s=storage({[recovery.KEY]:'[]'});const original=s.setItem;s.setItem=(k,v)=>{if(k!==recovery.KEY)throw Error('QuotaExceeded');original(k,v)};
 assert.throws(()=>recovery.apply(s,[row],'u1','[]',now,'one'),/QuotaExceeded/);assert.equal(s.getItem(recovery.KEY),'[]');
});
test('Radar quota failure leaves data unchanged and keeps the backup',()=>{
 const s=storage({[recovery.KEY]:'[]'});const original=s.setItem;s.setItem=(k,v)=>{if(k===recovery.KEY)throw Error('QuotaExceeded');original(k,v)};
 assert.throws(()=>recovery.apply(s,[row],'u1','[]',now,'one'),/QuotaExceeded/);assert.equal(s.getItem(recovery.KEY),'[]');assert.equal(s.map.size,2);
});
test('No compatible new records means no backup or write',()=>{
 const s=storage();const p=recovery.apply(s,[{...row,payload:{note:'RC1'}}],'u1',null,now,'one');assert.equal(p.backupKey,null);assert.equal(s.map.size,0);
});
console.log(count+' tests passed');
