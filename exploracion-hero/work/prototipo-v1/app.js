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
  const DURATION = 2800;
  const recordingMime = typeof MediaRecorder!=='undefined' && canvas.captureStream
    ? ['video/mp4','video/webm;codecs=vp9','video/webm;codecs=vp8','video/webm'].find(x=>MediaRecorder.isTypeSupported(x)) : null;
  const sprites = [
    {x:114,y:199,w:324,h:338}, {x:525,y:199,w:326,h:338},
    {x:943,y:199,w:324,h:338}, {x:1353,y:199,w:324,h:338},
    {x:1771,y:199,w:324,h:338}
  ];
  const hero = new Image(); const keys = new Image();
  let width=0, height=0, imageHeight=0, bg, shadow;
  let ready=false, heroReady=false, keysReady=false, raf=0, started=0, elapsed=0, running=false;
  let lastFrame=0, intervals=[], recording=null, exportUrl=null, hiddenAt=0;
  const clamp = n => Math.min(1,Math.max(0,n));
  const smooth = n => {n=clamp(n); return n*n*(3-2*n);};
  const easeOut = n => 1-Math.pow(1-clamp(n),3);
  const range = (t,a,b) => clamp((t-a)/(b-a));
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
    const p=range(t,200+index*240,440+index*240);
    if(p<=0||p>=1)return 0;
    if(p<.29)return smooth(p/.29);
    if(p<.46)return 1;
    return 1-easeOut((p-.46)/.54);
  }
  function render(t){
    if(!width||!bg)return;
    ctx.globalAlpha=1;ctx.drawImage(bg,0,0,width,height);
    const reveal=smooth(range(t,1400,2500));
    if(heroReady&&reveal>0){ctx.globalAlpha=reveal;ctx.drawImage(hero,0,0,width,imageHeight);ctx.globalAlpha=1;}
    const introAlpha=smooth(range(t,0,190))*(1-smooth(range(t,1420,2250)));
    if(keysReady&&introAlpha>0){
      const groupWidth=Math.min(width*.58,700), gap=groupWidth*.012;
      const keyW=(groupWidth-gap*4)/5,keyH=keyW*338/324;
      const startX=(width-groupWidth)/2, y=(imageHeight-keyH)/2;
      for(let i=0;i<5;i++){
        const p=press(t,i),x=startX+i*(keyW+gap);
        ctx.globalAlpha=introAlpha*(.7+.2*p);
        const shadowW=keyW*(1.3-.08*p);
        ctx.drawImage(shadow,x+(keyW-shadowW)/2,y+keyH*.76,shadowW,keyH*.64);
        const h=keyH*(1-.065*p),dy=y+keyH-h;
        ctx.save();ctx.globalAlpha=introAlpha;
        ctx.beginPath();ctx.roundRect(x,dy,keyW,h,keyW*.14);ctx.clip();
        const s=sprites[i];ctx.drawImage(keys,s.x,s.y,s.w,s.h,x,dy,keyW,h);
        ctx.restore();
      }
    }
    const glow=Math.sin(range(t,1330,2500)*Math.PI)*.17;
    if(glow>0){
      const g=ctx.createRadialGradient(width*.09,imageHeight*.11,0,width*.09,imageHeight*.11,width*.78);
      g.addColorStop(0,`rgba(255,174,65,${glow})`);g.addColorStop(.42,`rgba(255,194,103,${glow*.35})`);g.addColorStop(1,'rgba(255,209,150,0)');ctx.fillStyle=g;ctx.globalAlpha=1;ctx.fillRect(0,0,width,imageHeight);
    }
    drawCopy(smooth(range(t,2350,2800)));
    ctx.globalAlpha=1;
    canvas.dataset.elapsed=Math.round(t);
  }
  function finish(){running=false;elapsed=DURATION;render(elapsed);setPhase('Mi espacio','hero');if(document.activeElement===skip)replay.focus();skip.hidden=true;replay.disabled=!ready||!!recording;exportButton.disabled=!ready||!recordingMime||!!recording;report();try{sessionStorage.setItem('hello-intro-seen','1');}catch{} }
  function tick(now){
    if(!running)return;
    if(lastFrame&&now-lastFrame<250)intervals.push(now-lastFrame);
    lastFrame=now;elapsed=Math.min(now-started,DURATION);render(elapsed);
    if(elapsed<1400)setPhase('HELLO','intro');else if(elapsed<DURATION)setPhase('Se revela','reveal');
    if(elapsed<DURATION)raf=requestAnimationFrame(tick);else {finish();if(recording)setTimeout(stopRecording,450);}
  }
  function play(force=false){
    if(!ready)return;
    cancelAnimationFrame(raf);
    if(motion.matches&&!force){finish();return;}
    running=true;elapsed=0;intervals=[];lastFrame=0;skip.hidden=false;
    setPhase('HELLO','intro');replay.disabled=!!recording;exportButton.disabled=true;
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
      const link=document.getElementById('download');link.href=exportUrl;link.download='entrada-hello-portafolio.'+(mime.includes('mp4')?'mp4':'webm');link.hidden=false;link.textContent='Descargar grabación';link.click();link.hidden=true;
      stream.getTracks().forEach(t=>t.stop());recording=null;exportButton.disabled=false;replay.disabled=false;
    };
    recording.start();play(true);
  }
  replay.addEventListener('click',()=>play());skip.addEventListener('click',stop);exportButton.addEventListener('click',record);
  motion.addEventListener('change',()=>{if(motion.matches)stop();});
  document.addEventListener('visibilitychange',()=>{
    if(document.hidden&&running){hiddenAt=performance.now();cancelAnimationFrame(raf);}
    else if(!document.hidden&&running&&hiddenAt){started+=performance.now()-hiddenAt;hiddenAt=0;lastFrame=0;raf=requestAnimationFrame(tick);}
  });
  new ResizeObserver(resize).observe(canvas.parentElement);
  async function load(img,url){img.src=url;await img.decode();}
  const timeout=setTimeout(()=>{if(!ready&&heroReady)stop();},3000);
  Promise.all([load(hero,'assets/setup.png').then(()=>{heroReady=true;}),load(keys,'assets/hello-keys.png').then(()=>{keysReady=true;})]).then(()=>{
    clearTimeout(timeout);ready=true;replay.disabled=false;
    exportButton.disabled=!recordingMime;
    let seen=false;try{seen=sessionStorage.getItem('hello-intro-seen')==='1';}catch{}
    if(motion.matches||seen)finish();else play();
  }).catch(()=>{
    clearTimeout(timeout);error.hidden=false;error.textContent='No se pudieron preparar todos los recursos de la entrada.';
    if(heroReady)finish();else {setPhase('Vista no disponible','error');render(DURATION);}
  });
  // Read-only diagnostics support visual review without adding controls to the portfolio.
  window.portfolioPreview=Object.freeze({getMetrics:report,getState:()=>({ready,running,elapsed,width,height,reducedMotion:motion.matches,phase:canvas.dataset.phase})});
})();
