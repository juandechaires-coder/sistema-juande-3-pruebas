const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const html=fs.readFileSync(path.join(root,'recuperar-radar.html'),'utf8');
const script=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(m=>m[1]).filter(s=>s.trim()).join('\n');
const original={id:'fixture-1',game:'A vs B',market:'TD',selection:'Over',sources:['GameRead'],modules:['Touchdown'],odds:'1.9',prob:'60',status:'Validado',grade:'A',prob_status:'validada',evidence:'Evidence kept',is_bet:false};
const cloud={id:'remote-1',user_id:'u1',source_id:'radar-beta5:fixture-1',event_name:'A vs B',market:'TD',version:1,payload:{schema:'sj3_beta1',kind:'research_only',radar_record:original}};
function app(initial, remote=[cloud,{id:'rc1',user_id:'u1',payload:{note:'RC1'}}]){
 const elements={},map=new Map([['picks','unchanged'],['parlays','unchanged']]);if(initial!==null)map.set('sj3_beta1_investigations',JSON.stringify(initial));
 function element(){return {textContent:'',value:'',disabled:false,hidden:false,children:[],events:{},append(item){this.children.push(item)},replaceChildren(){this.children=[]},addEventListener(name,fn){this.events[name]=fn}};}
 for(const match of html.matchAll(/id="([^"]+)"/g))elements[match[1]]=element();
 const calls=[],response={rows:remote,failAuth:false};
 const context=vm.createContext({console,URL,Date,JSON,Set,Map,Number,Object,Array,Error,encodeURIComponent,crypto:{randomUUID:()=> 'fixture-backup'},confirm:()=>true,document:{getElementById:id=>elements[id],createElement:()=>element()},localStorage:{getItem:k=>map.has(k)?map.get(k):null,setItem:(k,v)=>map.set(k,v)},fetch:async(url,options)=>{
  const u=new URL(url);calls.push({url:u,options});
  if(u.pathname.startsWith('/auth/'))return {ok:!response.failAuth,status:response.failAuth?400:200,json:async()=>response.failAuth?{msg:'Invalid credentials'}:{access_token:'test-token',user:{id:'u1'}}};
  assert.equal(options.method||'GET','GET');assert.equal(options.headers.Authorization,'Bearer test-token');assert.equal(u.searchParams.get('user_id'),'eq.u1');
  const offset=Number(u.searchParams.get('offset'));return {ok:true,status:200,json:async()=>response.rows.slice(offset,offset+200)};
 }});
 vm.runInContext(fs.readFileSync(path.join(root,'cloud-recovery.js'),'utf8'),context);vm.runInContext(script,context);
 return {elements,map,calls,response,login:async()=>{elements.email.value='test@example.invalid';elements.password.value='fake-password';await elements.loginForm.events.submit({preventDefault(){}})}};
}
(async()=>{
 let a=app([]);await a.login();assert.match(a.elements.status.textContent,/2 investigación/);assert.equal(a.elements.password.value,'');a.elements.review.onclick();assert.match(a.elements.reviewStatus.textContent,/1 nuevas.*1 incompatibles/);a.elements.apply.onclick();assert.match(a.elements.result.textContent,/1 ficha/);assert.equal(JSON.parse(a.map.get('sj3_beta1_investigations'))[0].evidence,'Evidence kept');assert.equal(a.map.get('picks'),'unchanged');assert.equal(a.map.get('parlays'),'unchanged');assert.equal([...a.map.keys()].filter(k=>k.startsWith('sj3_cloud_backup:')).length,1);a.elements.logout.onclick();assert.equal(a.elements.preview.children.length,0);assert.equal(a.elements.review.disabled,true);console.log('✓ Login, consultation, preview, import, backup, logout');
 a=app([{...original,evidence:'Local edition'}]);await a.login();a.elements.review.onclick();assert.match(a.elements.reviewStatus.textContent,/0 nuevas.*1 ya existentes/);assert.equal(a.elements.apply.disabled,true);assert.equal(JSON.parse(a.map.get('sj3_beta1_investigations'))[0].evidence,'Local edition');console.log('✓ Existing local edit preserved');
 a=app([]);await a.login();a.elements.review.onclick();a.map.set('sj3_beta1_investigations','[{"id":"another-tab"}]');a.elements.apply.onclick();assert.match(a.elements.result.textContent,/cambió/);console.log('✓ Changed local data invalidates preview');
 a=app([],[{...cloud,user_id:'u2'}]);await a.login();assert.match(a.elements.status.textContent,/no corresponde/);assert.equal(a.elements.review.disabled,true);console.log('✓ Foreign owner response rejected');
 a=app([]);await a.login();a.elements.review.onclick();a.response.failAuth=true;await a.login();assert.match(a.elements.status.textContent,/Invalid credentials/);assert.equal(a.elements.preview.children.length,0);assert.equal(a.elements.apply.disabled,true);assert.equal(a.elements.password.value,'');console.log('✓ Failed login clears previous query');
 a=app([],Array.from({length:201},(_,i)=>({...cloud,id:'remote-'+i})));await a.login();assert.match(a.elements.status.textContent,/201 investigación/);assert.equal(a.calls.filter(c=>c.url.pathname.startsWith('/rest/')).length,2);assert.ok(a.calls.filter(c=>c.url.pathname.startsWith('/rest/')).every(c=>(c.options.method||'GET')==='GET'));console.log('✓ Paginated read-only requests');
 console.log('6 integration scenarios passed using simulated DOM and API; no browser rendering test');
})().catch(error=>{console.error(error);process.exitCode=1});
