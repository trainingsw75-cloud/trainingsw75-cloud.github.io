/* WARHOOK Sound — детерминированный «голос» картины из её seed. Чистый Web Audio. */
window.WarhookSound = (function () {
  let ctx, master, analyser, bus = null, playing = false, rafId = 0, endT = 0;
  const SCALES = [[0,2,4,7,9],[0,3,5,7,10],[0,2,3,7,9],[0,2,5,7,10],[0,3,5,8,10],[0,2,4,6,9]];
  function mulberry32(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
  function mf(m){return 440*Math.pow(2,(m-69)/12);}
  function ensure(){
    if (ctx) return;
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    master = ctx.createGain(); master.gain.value = 0.85;
    const comp = ctx.createDynamicsCompressor();
    analyser = ctx.createAnalyser(); analyser.fftSize = 256;
    master.connect(comp); comp.connect(analyser); analyser.connect(ctx.destination);
  }
  function note(freq, t, dur, type, vol, dest){
    const o = ctx.createOscillator(); o.type = type; o.frequency.value = freq;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(vol, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(dest); o.start(t); o.stop(t + dur + 0.05);
  }
  function viz(canvas){
    if (!canvas) return;
    const c2 = canvas.getContext('2d');
    const data = new Uint8Array(analyser.frequencyBinCount);
    function loop(){
      const w = canvas.width = canvas.clientWidth * 2;
      const h = canvas.height = canvas.clientHeight * 2;
      c2.clearRect(0,0,w,h);
      if (!playing) return;
      analyser.getByteFrequencyData(data);
      const n = data.length, bw = w / n;
      for (let i=0;i<n;i++){ const v=data[i]/255, bh=v*h; c2.fillStyle='rgba(228,178,76,'+(0.25+v*0.7)+')'; c2.fillRect(i*bw, h-bh, bw*0.7, bh); }
      rafId = requestAnimationFrame(loop);
    }
    loop();
  }
  function play(seed, canvas, onEnd){
    ensure(); if (ctx.state === 'suspended') ctx.resume();
    stop();
    const r = mulberry32((seed>>>0) || 1), now = ctx.currentTime + 0.06, DUR = 15;
    bus = ctx.createGain(); bus.gain.value = 1; bus.connect(master);
    const lp = ctx.createBiquadFilter(); lp.type='lowpass'; lp.frequency.value = 1500 + r()*2000; lp.connect(bus);
    const delay = ctx.createDelay(); delay.delayTime.value = 0.22 + r()*0.14;
    const fb = ctx.createGain(); fb.gain.value = 0.30; const wet = ctx.createGain(); wet.gain.value = 0.22;
    delay.connect(fb); fb.connect(delay); delay.connect(wet); wet.connect(bus); lp.connect(delay);
    const scale = SCALES[Math.floor(r()*SCALES.length)];
    const root = 48 + Math.floor(r()*9);
    const types = ['sine','triangle','sine','sawtooth'];
    const mType = types[Math.floor(r()*types.length)];
    const step = 0.15 + r()*0.14;
    // pad (root + fifth)
    note(mf(root-12), now, DUR, 'sine', 0.05, bus);
    note(mf(root-12+7), now, DUR, 'sine', 0.045, bus);
    // melody + bass
    let t = now, i = 0;
    while (t < now + DUR - 0.6){
      const m = root + scale[Math.floor(r()*scale.length)] + 12*(1 + Math.floor(r()*2));
      note(mf(m), t, step*(1.3 + r()*1.5), mType, 0.09 + r()*0.09, lp);
      if (i % 4 === 0) note(mf(root-12 + scale[Math.floor(r()*scale.length)]), t, step*3, 'triangle', 0.09, bus);
      t += step * (r() < 0.18 ? 2 : 1); i++;
    }
    playing = true; endT = Date.now() + DUR*1000;
    viz(canvas);
    clearTimeout(play._to);
    play._to = setTimeout(function(){ playing = false; if (onEnd) onEnd(); }, DUR*1000 + 150);
    return DUR;
  }
  function stop(){
    playing = false; cancelAnimationFrame(rafId); clearTimeout(play._to);
    if (bus && ctx){ try { bus.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.05); const b=bus; setTimeout(function(){ try{b.disconnect();}catch(e){} }, 300); } catch(e){} bus = null; }
  }
  return { play: play, stop: stop, isPlaying: function(){ return playing; } };
})();
