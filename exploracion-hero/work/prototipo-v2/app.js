(() => {
  'use strict';
  const canvas = document.getElementById('scene');
  const ctx = canvas.getContext('2d', { alpha: false });
  const phase = document.getElementById('phase');
  const skip = document.getElementById('skip');
  const replay = document.getElementById('replay');
  const exportButton = document.getElementById('export');
  const error = document.getElementById('error');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const timeline = document.getElementById('timeline');
  const timeLabel = document.getElementById('time-label');
  const DURATION = 4700;
  const SESSION_KEY = 'hello-intro-zoom-v2-seen';
  const O = {x:930,y:709,w:44};
  const MACRO = {x:783,y:456,key:{x:650,y:330,w:278,h:288}};
  const recordingMime = typeof MediaRecorder!=='undefined' && canvas.captureStream
    ? ['video/mp4','video/webm;codecs=vp9','video/webm;codecs=vp8','video/webm'].find(x=>MediaRecorder.isTypeSupported(x)) : null;
  const sprites = [
    {x:114,y:199,w:324,h:338}, {x:525,y:199,w:326,h:338},
    {x:943,y:199,w:324,h:338}, {x:1353,y:199,w:324,h:338},
    {x:1771,y:199,w:324,h:338}
  ];
  const hero = new Image(); const keys = new Image();const detail=new Image();
  let detailReady=false,detailLayer;
  let width=0, height=0, imageHeight=0, bg, shadow;
  let ready=false, heroReady=false, keysReady=false, raf=0, started=0, elapsed=0, running=false;
  let lastFrame=0, intervals=[], recording=null, exportUrl=null, hiddenAt=0;
  const clamp = n => Math.min(1,Math.max(0,n));
  const smooth = n => {n=clamp(n); return n*n*(3-2*n);};
  const easeOut = n => 1-Math.pow(1-clamp(n),3);
  const range = (t,a,b) => clamp((t-a)/(b-a));
  const mix = (a,b,p) => a+(b-a)*p;
  function report(){
    const sorted=intervals.slice().sort((a,b)=>a-b);
    const average=intervals.reduce((a,b)=>a+b,0)/(intervals.length||1);
    const metrics={frames:intervals.length,fps:average?Math.round(1000/average):null,p95ms:sorted.length?Math.round(sorted[Math.floor(sorted.length*.95)]*10)/10:null,over50ms:intervals.filter(v=>v>50).length};
    canvas.dataset.metrics=JSON.stringify(metrics);
    return metrics;
  }
  function setPhase(label,state){phase.textContent=label;canvas.dataset.phase=state;}
  function resize(){
    width=Math.round(canvas.parentElement.clientWidth);
    imageHeight=width*2/3;
    height=width<=650 ? imageHeight+270 : imageHeight;
    const dpr=Math.min(devicePixelRatio||1,2);
    canvas.style.height=height+'px';
    canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0);
    bg=document.createElement('canvas');bg.width=Math.ceil(width*dpr);bg.height=Math.ceil(height*dpr);
    const b=bg.getContext('2d');b.scale(dpr,dpr);b.fillStyle='#f4f0e9';b.fillRect(0,0,width,height);
    const wash=b.createRadialGradient(width*.12,height*.07,0,width*.12,height*.07,width*.95);
    wash.addColorStop(0,'rgba(255,244,223,.68)');wash.addColorStop(.75,'rgba(255,255,255,.02)');
    b.fillStyle=wash;b.fillRect(0,0,width,height);
    const step=Math.max(16,width*30/1536);b.beginPath();
    for(let x=0;x<width;x+=step){b.moveTo(x+.5,0);b.lineTo(x+.5,height);}
    for(let y=0;y<height;y+=step){b.moveTo(0,y+.5);b.lineTo(width,y+.5);}
    b.strokeStyle='rgba(151,137,116,.105)';b.lineWidth=.65;b.stroke();
    shadow=document.createElement('canvas');shadow.width=240;shadow.height=100;
    const s=shadow.getContext('2d');const g=s.createRadialGradient(120,48,8,120,48,115);
    g.addColorStop(0,'rgba(57,42,22,.35)');g.addColorStop(.5,'rgba(57,42,22,.18)');g.addColorStop(1,'rgba(57,42,22,0)');
    s.scale(1,.38);s.fillStyle=g;s.fillRect(0,0,240,265);
    render(elapsed);
  }
  function drawCopy(alpha){
    if(alpha<=0)return;
    const mobile=width<=650, scale=width/1536;
    const x=mobile?26:300*scale, top=mobile?imageHeight+36:250*scale;
    ctx.save();ctx.globalAlpha=alpha;ctx.fillStyle='#282725';ctx.textBaseline='top';
    const font='-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
    ctx.font=`500 ${mobile?10:15*scale}px ${font}`;
    ctx.fillText('DISEÑO UI/UX',x,top);
    ctx.font=`600 ${mobile?26:43*scale}px ${font}`;
    const lines=mobile?['Diseño experiencias','digitales pensando','en las personas.']:['Diseño experiencias digitales','pensando en las personas.'];
    const lineHeight=mobile?31:51*scale, headingTop=top+(mobile?27:35*scale);
    lines.forEach((line,i)=>ctx.fillText(line,x,headingTop+i*lineHeight));
    ctx.font=`400 ${mobile?13:20*scale}px ${font}`;ctx.fillStyle='#49433c';
    const subTop=headingTop+lines.length*lineHeight+(mobile?13:12*scale);
    if(mobile){ctx.fillText('Explora mis proyectos y mi proceso',x,subTop);ctx.fillText('de diseño.',x,subTop+20);}
    else ctx.fillText('Explora mis proyectos y mi proceso de diseño.',x,subTop);
    ctx.fillStyle='#ef762d';ctx.fillRect(x,subTop+(mobile?55:48*scale),mobile?52:75*scale,mobile?3:3*scale);
    ctx.restore();
  }
  function press(t,index){
    const p=range(t,200+index*260,460+index*260);
    if(p<=0||p>=1)return 0;
    if(p<.28)return smooth(p/.28);
    if(p<.53)return 1;
    return 1-easeOut((p-.53)/.47);
  }
  function drawKey(index,x,y,w,h,p,detailBlend=0){
    const s=sprites[index],travel=h*.16*p,split=s.h*.79;
    // The top and its printed letter move as one rigid surface. Only the
    // front wall shortens; the foot of the switch stays on the desk.
    ctx.save();
    const alpha=ctx.globalAlpha;
    ctx.globalAlpha=alpha*(.78-.3*p);
    const sw=w*(1.42-.29*p);
    ctx.drawImage(shadow,x+(w-sw)/2,y+h*.79+travel*.12,sw,h*(.68-.25*p));
    ctx.globalAlpha=alpha;
    ctx.fillStyle='#a19b91';ctx.beginPath();ctx.roundRect(x+w*.025,y+h*.20,w*.95,h*.82,w*.13);ctx.fill();
    ctx.fillStyle='rgba(42,36,29,.7)';ctx.beginPath();ctx.roundRect(x+w*.055,y+h*.23,w*.89,h*.72,w*.1);ctx.fill();
    ctx.save();ctx.beginPath();ctx.roundRect(x,y+travel,w,h-travel,w*.14);ctx.clip();
    ctx.drawImage(keys,s.x,s.y,s.w,split,x,y+travel,w,h*.79);
    ctx.drawImage(keys,s.x,s.y+split,s.w,s.h-split,x,y+travel+h*.79,w,h*.21-travel+.25);
    if(index===4&&detailReady&&detailBlend>0){
      const m=MACRO.key;ctx.globalAlpha=alpha*detailBlend;
      ctx.drawImage(detail,m.x,m.y,m.w,m.h*.79,x,y+travel,w,h*.79);
      ctx.drawImage(detail,m.x,m.y+m.h*.79,m.w,m.h*.21,x,y+travel+h*.79,w,h*.21-travel+.25);
    }
    ctx.restore();ctx.restore();
  }
  function drawIntro(t){
      const groupWidth=width*.76, gap=groupWidth*.012;
      const keyW=(groupWidth-gap*4)/5,keyH=keyW*338/324;
      const startX=(width-groupWidth)/2, y=(imageHeight-keyH)/2;
      const focus=smooth(range(t,1500,2250));
      const zoom=Math.exp(Math.log(.34*width/keyW)*focus);
      const ox=startX+4*(keyW+gap)+keyW*mix(.506,(MACRO.x-MACRO.key.x)/MACRO.key.w,focus);
      const oy=y+keyH*mix(.462,(MACRO.y-MACRO.key.y)/MACRO.key.h,focus);
      ctx.save();
      ctx.translate(width/2-zoom*mix(width/2,ox,focus),imageHeight/2-zoom*mix(imageHeight/2,oy,focus));
      ctx.scale(zoom,zoom);ctx.drawImage(bg,0,0,width,height);
      ctx.globalAlpha=smooth(range(t,0,160));
      for(let i=0;i<5;i++){
        drawKey(i,startX+i*(keyW+gap),y,keyW,keyH,press(t,i),focus);
      }
      ctx.restore();
  }
  function drawSetup(t,alpha){
    const out=smooth(range(t,2550,4300));
    const macro=.34*1536/O.w;
    const zoom=Math.exp(Math.log(macro)*(1-out));
    const anchorX=O.x*width/1536,anchorY=O.y*imageHeight/1024;
    ctx.save();ctx.globalAlpha=alpha;
    ctx.translate(width/2-zoom*mix(anchorX,width/2,out),imageHeight/2-zoom*mix(anchorY,imageHeight/2,out));
    ctx.scale(zoom,zoom);ctx.drawImage(hero,0,0,width,imageHeight);
    if(detailReady&&zoom>2){
      const ratio=O.w/MACRO.key.w,unit=width/1536;
      ctx.globalAlpha=alpha*smooth(range(zoom,7,9.5));
      ctx.drawImage(detailLayer,(O.x-MACRO.x*ratio)*unit,(O.y-MACRO.y*ratio)*unit,detail.width*ratio*unit,detail.height*ratio*unit);
    }
    ctx.restore();
    canvas.dataset.cameraScale=zoom.toFixed(3);
  }
  function render(t){
    if(!width||!bg)return;
    ctx.globalAlpha=1;ctx.drawImage(bg,0,0,width,height);
    ctx.save();ctx.beginPath();ctx.rect(0,0,width,imageHeight);ctx.clip();
    if(keysReady&&t<2550)drawIntro(t);
    if(heroReady&&t>=2250)drawSetup(t,smooth(range(t,2250,2550)));
    ctx.restore();
    drawCopy(smooth(range(t,4200,DURATION)));
    ctx.globalAlpha=1;
    canvas.dataset.elapsed=Math.round(t);
    timeline.value=Math.round(t);timeLabel.textContent=(t/1000).toFixed(1)+' s';
    if(t<1500)setPhase('HELLO','intro');
    else if(t<2250)setPhase('Acercamiento a la O','zoom-in');
    else if(t<2550)setPhase('La O del teclado','match');
    else if(t<4300)setPhase('Se revela el escritorio','zoom-out');
    else setPhase('Mi espacio','hero');
  }
  function finish(){running=false;elapsed=DURATION;render(elapsed);setPhase('Mi espacio','hero');if(document.activeElement===skip)replay.focus();skip.hidden=true;replay.disabled=!ready||!!recording;exportButton.disabled=!ready||!recordingMime||!!recording;timeline.disabled=!ready||!!recording;report();try{sessionStorage.setItem(SESSION_KEY,'1');}catch{} }
  function tick(now){
    if(!running)return;
    if(lastFrame)intervals.push(now-lastFrame);
    lastFrame=now;elapsed=Math.min(now-started,DURATION);render(elapsed);
    if(elapsed<DURATION)raf=requestAnimationFrame(tick);else {finish();if(recording)setTimeout(stopRecording,450);}
  }
  function play(force=false){
    if(!ready)return;
    cancelAnimationFrame(raf);
    if(motion.matches&&!force){finish();return;}
    running=true;elapsed=0;intervals=[];lastFrame=0;skip.hidden=false;
    setPhase('HELLO','intro');replay.disabled=!!recording;exportButton.disabled=true;
    timeline.disabled=!!recording;
    started=performance.now();render(0);raf=requestAnimationFrame(tick);
  }
  function stop(){cancelAnimationFrame(raf);finish();if(recording)stopRecording();}
  function stopRecording(){if(recording?.state==='recording')recording.stop();}
  function record(){
    if(!ready||recording||!recordingMime)return;
    const mime=recordingMime;
    if(!mime){error.hidden=false;error.textContent='Este navegador no permite guardar el video. Puedes seguir usando la vista previa.';return;}
    const stream=canvas.captureStream(60),chunks=[];
    recording=new MediaRecorder(stream,{mimeType:mime,videoBitsPerSecond:6500000});
    recording.ondataavailable=e=>{if(e.data.size)chunks.push(e.data);};
    recording.onstop=()=>{
      const blob=new Blob(chunks,{type:mime});if(exportUrl)URL.revokeObjectURL(exportUrl);exportUrl=URL.createObjectURL(blob);
      const link=document.getElementById('download');link.href=exportUrl;link.download='entrada-hello-zoom-v2.'+(mime.includes('mp4')?'mp4':'webm');link.hidden=false;link.textContent='Descargar grabación';link.click();link.hidden=true;
      stream.getTracks().forEach(t=>t.stop());recording=null;exportButton.disabled=false;replay.disabled=false;timeline.disabled=false;
    };
    recording.start();play(true);
  }
  replay.addEventListener('click',()=>play());skip.addEventListener('click',stop);exportButton.addEventListener('click',record);
  timeline.addEventListener('input',()=>{
    if(!ready||recording)return;
    cancelAnimationFrame(raf);running=false;elapsed=Number(timeline.value);render(elapsed);
    skip.hidden=elapsed>=DURATION;exportButton.disabled=!recordingMime;report();
  });
  motion.addEventListener('change',()=>{if(motion.matches)stop();});
  document.addEventListener('visibilitychange',()=>{
    if(document.hidden&&running){hiddenAt=performance.now();cancelAnimationFrame(raf);}
    else if(!document.hidden&&running&&hiddenAt){started+=performance.now()-hiddenAt;hiddenAt=0;lastFrame=0;raf=requestAnimationFrame(tick);}
  });
  new ResizeObserver(resize).observe(canvas.parentElement);
  async function load(img,url){img.src=url;await img.decode();}
  async function prepareDetail(){
    try{
      await load(detail,'assets/keyboard-macro-v2.png');
      detailLayer=document.createElement('canvas');detailLayer.width=detail.width;detailLayer.height=detail.height;
      const d=detailLayer.getContext('2d');d.drawImage(detail,0,0);d.globalCompositeOperation='destination-in';
      // Feather the detail into the unmodified photograph during the pullback.
      for(const [x0,y0,x1,y1] of [[0,0,detail.width*.09,0],[detail.width,0,detail.width*.91,0],[0,0,0,detail.height*.09],[0,detail.height,0,detail.height*.91]]){
        const fade=d.createLinearGradient(x0,y0,x1,y1);fade.addColorStop(0,'rgba(0,0,0,0)');fade.addColorStop(1,'rgba(0,0,0,1)');d.fillStyle=fade;d.fillRect(0,0,detail.width,detail.height);
      }
      detailReady=true;
    }catch{ /* The approved image remains a complete fallback. */ }
  }
  const timeout=setTimeout(()=>{if(!ready&&heroReady)stop();},3000);
  Promise.all([load(hero,'assets/setup.png').then(()=>{heroReady=true;}),load(keys,'assets/hello-keys.png').then(()=>{keysReady=true;}),prepareDetail()]).then(()=>{
    clearTimeout(timeout);ready=true;replay.disabled=false;
    exportButton.disabled=!recordingMime;
    timeline.disabled=false;
    let seen=false;try{seen=sessionStorage.getItem(SESSION_KEY)==='1';}catch{}
    if(motion.matches||seen)finish();else play();
  }).catch(()=>{
    clearTimeout(timeout);error.hidden=false;error.textContent='No se pudieron preparar todos los recursos de la entrada.';
    if(heroReady)finish();else {setPhase('Vista no disponible','error');render(DURATION);}
  });
  // Read-only diagnostics support visual review without adding controls to the portfolio.
  window.portfolioPreview=Object.freeze({getMetrics:report,getState:()=>({ready,running,elapsed,width,height,reducedMotion:motion.matches,phase:canvas.dataset.phase})});
})();
