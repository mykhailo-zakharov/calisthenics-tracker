(function(){
  const STORAGE_KEY='ct-rest-duration';
  const defaults=90;
  let duration=Number(localStorage.getItem(STORAGE_KEY))||defaults;
  let remaining=duration;
  let interval=null;
  let running=false;
  let paused=false;

  const byId=id=>document.getElementById(id);
  const format=s=>`${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;
  function setTitle(text){document.title=text?`${text} · Calisthenics Tracker`:'Calisthenics Tracker';}
  function update(){
    const display=byId('timerDisplay');
    if(display) display.textContent=format(remaining);
    const start=byId('timerStart');
    if(start) start.textContent=running?(paused?'Resume':'Pause'):'Start';
    const panel=byId('timerPanel');
    if(panel) panel.classList.toggle('running',running);
    document.querySelectorAll('.timer-preset').forEach(b=>b.classList.toggle('active',Number(b.dataset.seconds)===duration));
    setTitle(running?`⏱ ${format(remaining)}`:'');
  }
  function beep(){
    try{
      const C=window.AudioContext||window.webkitAudioContext;
      if(!C)return;
      const ctx=new C();
      const osc=ctx.createOscillator();
      const gain=ctx.createGain();
      osc.type='sine'; osc.frequency.value=880;
      gain.gain.setValueAtTime(0.0001,ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.18,ctx.currentTime+0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001,ctx.currentTime+0.16);
      osc.connect(gain);gain.connect(ctx.destination);osc.start();osc.stop(ctx.currentTime+0.17);
      setTimeout(()=>ctx.close(),250);
    }catch(e){}
  }
  function finish(){
    clearInterval(interval); interval=null; running=false; paused=false; remaining=0; update();
    beep(); setTimeout(beep,220);
    const display=byId('timerDisplay'); if(display){display.classList.add('finished');setTimeout(()=>display.classList.remove('finished'),1200);}
    const title=byId('timerTitle'); if(title) title.textContent='Rest finished — GO!';
    if(navigator.vibrate) navigator.vibrate([100,80,180]);
  }
  function tick(){
    if(!running||paused)return;
    remaining=Math.max(0,remaining-1);
    if(remaining>0 && remaining<=3) beep();
    if(remaining===0) finish(); else update();
  }
  function start(){
    if(running){paused=!paused;update();return;}
    remaining=duration; running=true; paused=false;
    const title=byId('timerTitle'); if(title) title.textContent='Rest timer';
    update(); clearInterval(interval); interval=setInterval(tick,1000);
    beep();
  }
  function reset(){clearInterval(interval);interval=null;running=false;paused=false;remaining=duration;const title=byId('timerTitle');if(title)title.textContent='Ready for your next set?';update();}
  function open(){const p=byId('timerPanel');if(p)p.hidden=false;update();}
  function close(){const p=byId('timerPanel');if(p)p.hidden=true;}
  function choose(s){duration=s;remaining=s;localStorage.setItem(STORAGE_KEY,String(s));reset();}

  function markSetDone(card,setIndex,button){
    const index=Number(card.dataset.index); const k=`${currentDay}-${index}`; const s=state[k]||{};
    const done=[...(s.setsDone||[])]; done[setIndex]=!done[setIndex];
    state[k]={...s,setsDone:done}; save();
    button.classList.toggle('done',!!done[setIndex]); button.textContent=done[setIndex]?'Done ✓':'Done';
    if(done[setIndex]){
      open(); start();
      setTimeout(()=>{const next=card.querySelectorAll('.set-row')[setIndex+1];if(next)next.scrollIntoView({behavior:'smooth',block:'center'});},250);
    }
  }
  function enhanceSets(){
    document.querySelectorAll('.exercise').forEach(card=>{
      card.querySelectorAll('.sets label').forEach((label,i)=>{
        if(label.querySelector('.set-done'))return;
        label.classList.add('set-row');
        const b=document.createElement('button'); b.type='button'; b.className='set-done'; b.textContent='Done';
        const s=state[`${currentDay}-${Number(card.dataset.index)}`]||{}; if(s.setsDone?.[i]){b.classList.add('done');b.textContent='Done ✓';}
        b.addEventListener('click',()=>markSetDone(card,i,b)); label.appendChild(b);
      });
    });
  }
  function init(){
    const openBtn=byId('timerOpen'); if(openBtn)openBtn.addEventListener('click',open);
    const closeBtn=byId('timerClose'); if(closeBtn)closeBtn.addEventListener('click',close);
    const startBtn=byId('timerStart'); if(startBtn)startBtn.addEventListener('click',start);
    const resetBtn=byId('timerReset'); if(resetBtn)resetBtn.addEventListener('click',reset);
    document.querySelectorAll('.timer-preset').forEach(b=>b.addEventListener('click',()=>choose(Number(b.dataset.seconds))));
    const stored=Number(localStorage.getItem(STORAGE_KEY)); if(stored)duration=stored; remaining=duration;
    update(); enhanceSets();
    const observer=new MutationObserver(()=>enhanceSets()); observer.observe(byId('workout'),{childList:true,subtree:true});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();