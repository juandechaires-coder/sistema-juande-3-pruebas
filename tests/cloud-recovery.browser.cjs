const { chromium } = require(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES + '/playwright');
const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const original={id:'fixture-1',game:'A vs B',market:'TD',selection:'Over',sources:['GameRead'],modules:['Touchdown'],odds:'1.9',prob:'60',status:'Validado',grade:'A',prob_status:'validada',evidence:'Evidence kept',is_bet:false};
const cloud={id:'remote-1',user_id:'u1',source_id:'radar-beta5:fixture-1',event_name:'A vs B',market:'TD',version:1,payload:{schema:'sj3_beta1',kind:'research_only',radar_record:original}};
(async()=>{
 const server=http.createServer(async(req,res)=>{
  const file=path.resolve(root,'.'+new URL(req.url,'http://localhost').pathname);
  if(!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
  try{const data=await fs.readFile(file);res.setHeader('Content-Type',file.endsWith('.js')?'text/javascript':'text/html');res.end(data);}catch{res.writeHead(404);res.end();}
 });
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 let browser;
 try{
  browser=await chromium.launch({headless:true});
  const page=await browser.newPage({viewport:{width:390,height:844}});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('dialog',d=>d.accept());
  let rows=[cloud,{id:'rc1',user_id:'u1',payload:{note:'RC1'}}];let failAuth=false;
  const calls=[];
  await page.route('https://hblfzvfmrnaubetcqayw.supabase.co/**',async route=>{
   const r=route.request(),url=new URL(r.url());calls.push({method:r.method(),path:url.pathname});
   if(url.pathname.startsWith('/auth/')){
    return route.fulfill({status:failAuth?400:200,contentType:'application/json',body:JSON.stringify(failAuth?{msg:'Invalid login credentials'}:{access_token:'test-token',user:{id:'u1'}})});
   }
   assert.equal(r.method(),'GET');assert.equal(r.headers().authorization,'Bearer test-token');assert.equal(url.searchParams.get('user_id'),'eq.u1');
   return route.fulfill({status:200,contentType:'application/json',body:JSON.stringify(rows)});
  });
  const base='http://127.0.0.1:'+server.address().port;
  async function fresh(records){
   await page.goto(base+'/recuperar-radar.html');
   await page.evaluate(records=>{localStorage.clear();if(records!==null)localStorage.setItem('sj3_beta1_investigations',JSON.stringify(records));localStorage.setItem('picks','unchanged');localStorage.setItem('parlays','unchanged');},records);
  }
  async function login(){await page.fill('#email','test@example.invalid');await page.fill('#password','fictional-password');await page.click('#login');await page.waitForFunction(()=>!document.getElementById('login').disabled);}
  await fresh([]);await login();assert.match(await page.locator('#status').textContent(),/2 investigación/);assert.equal(await page.inputValue('#password'),'');
  await page.click('#review');assert.match(await page.locator('#reviewStatus').textContent(),/1 nuevas.*1 incompatibles/);await page.click('#apply');assert.match(await page.locator('#result').textContent(),/1 ficha/);
  const data=await page.evaluate(()=>Object.fromEntries(Object.entries(localStorage)));
  assert.equal(JSON.parse(data.sj3_beta1_investigations)[0].evidence,'Evidence kept');assert.equal(data.picks,'unchanged');assert.equal(data.parlays,'unchanged');assert.equal(Object.keys(data).filter(k=>k.startsWith('sj3_cloud_backup:')).length,1);
  await page.click('#logout');assert.equal(await page.locator('#preview li').count(),0);assert.equal(await page.locator('#review').isDisabled(),true);
  console.log('✓ Mobile login, preview, import, backup and logout');
  await fresh([{...original,evidence:'Local edition'}]);await login();await page.click('#review');assert.match(await page.locator('#reviewStatus').textContent(),/0 nuevas.*1 ya existentes/);assert.equal(await page.locator('#apply').isDisabled(),true);
  assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('sj3_beta1_investigations'))[0].evidence),'Local edition');console.log('✓ Existing local edit is preserved');
  await fresh([]);await login();await page.click('#review');await page.evaluate(()=>localStorage.setItem('sj3_beta1_investigations','[{"id":"created-elsewhere"}]'));await page.click('#apply');assert.match(await page.locator('#result').textContent(),/cambió/);console.log('✓ Stale preview blocks import');
  rows=[{...cloud,user_id:'other-user'}];await fresh([]);await login();assert.match(await page.locator('#status').textContent(),/no corresponde/);assert.equal(await page.locator('#review').isDisabled(),true);console.log('✓ Foreign owner response is rejected');
  rows=[{...cloud,event_name:'<img src=x onerror=alert(1)>',payload:{...cloud.payload,radar_record:{...original,game:'<img src=x onerror=alert(1)>'}}}];await fresh([]);await login();await page.click('#review');assert.equal(await page.locator('#preview img').count(),0);assert.match(await page.locator('#preview').textContent(),/<img/);console.log('✓ Evidence renders as text; mobile page has no overflow');
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
  failAuth=true;await page.fill('#password','wrong-test-password');await page.click('#login');await page.waitForFunction(()=>!document.getElementById('login').disabled);assert.match(await page.locator('#status').textContent(),/Invalid login/);assert.equal(await page.locator('#preview li').count(),0);assert.equal(await page.locator('#apply').isDisabled(),true);console.log('✓ Failed login clears previous query and preview');
  assert.deepEqual(errors,[]);assert.ok(calls.filter(c=>c.path.startsWith('/rest/')).every(c=>c.method==='GET'));console.log('6 browser scenarios passed; no remote data writes');
 }finally{if(browser)await browser.close();await new Promise(resolve=>server.close(resolve));}
})().catch(e=>{console.error(e);process.exitCode=1;});
