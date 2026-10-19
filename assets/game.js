(() => {
  const trips = [
    { title: 'Read the terminal', budget: 24, arrival: [2, 4], delay: false },
    { title: 'Same number, split path', budget: 23, arrival: [2, 5], delay: false },
    { title: 'Festival rush', budget: 22, arrival: [3, 8], delay: true }
  ];
  const $ = id => document.getElementById(id);
  const state = { round: 0, time: 0, train: null, position: 0, transfers: 0, mapOpen: true, boardedCount: 0, done: false };
  const routes = {
    correct: ['YOU', 'CENTRAL', 'WEST GATE', 'MARKET', 'FESTIVAL'],
    wrong: ['YOU', 'CENTRAL', 'RIVER EAST', 'HARBOR', 'RIVER TERMINAL']
  };
  const cost = [0, 3, 4, 3, 3];

  function trip() { return trips[state.round]; }
  function announce(msg) { $('announcement').textContent = msg; }
  function feedback(msg, kind = '') { const el = $('feedback'); el.textContent = msg; el.className = `feedback ${kind}`; }
  function setTime(mins) { state.time = Math.max(0, state.time + mins); const left = Math.max(0, trip().budget - state.time); $('timeLeft').textContent = `${left} min`; $('timeLeft').parentElement.classList.toggle('low', left <= 6); if (left <= 0 && !state.done) finish(false, 'The deadline passed before you reached the festival.'); }
  function showTrains() {
    const waits = trip().arrival;
    const service = state.transfers ? [{terminal: 'West Gate · Festival', wait: 1, route:'correct', stops:'Central → West Gate → Market → Festival', only:true}] : [
      {terminal: 'West Gate · Festival', wait: waits[0], route: 'correct', stops: 'Central → West Gate → Market → Festival'},
      {terminal: 'River Terminal', wait: waits[1], route: 'wrong', stops: 'Central → River East → Harbor → River Terminal'}
    ];
    $('trains').innerHTML = service.map((t,i) => `<div class="train-card ${state.train===t.route&&state.position===0?'selected':''}" data-route="${t.route}" role="button" tabindex="0" aria-label="Line 10 train to ${t.terminal}"><div class="train-card-top"><span class="line-pill">LINE 10</span><span class="train-time">${t.wait} MIN</span></div><div class="train-terminal">${t.terminal}</div><div class="train-stops">${t.stops}</div><div class="train-status">${t.only?'Transfer service':(t.route==='correct'?'Festival branch':'Other branch')}</div></div>`).join('');
    document.querySelectorAll('.train-card').forEach(card => { card.addEventListener('click', () => selectTrain(card.dataset.route)); card.addEventListener('keydown', e => { if(e.key==='Enter'||e.key===' '){e.preventDefault();selectTrain(card.dataset.route);} }); });
  }
  function selectTrain(route) {
    if (state.done || state.position !== 0) return;
    state.train = route; document.querySelectorAll('.train-card').forEach(c=>c.classList.toggle('selected',c.dataset.route===route));
    feedback(route==='correct'?'Good route match. Check the terminal and stop list before you board.':'This service ends at River Terminal. Compare its stops with the festival destination.');
    $('actions').innerHTML = `<button id="boardBtn">Board this train</button><button id="waitBtn" class="secondary">Wait for another train</button>`;
    $('boardBtn').onclick=board; $('waitBtn').onclick=wait;
  }
  function board(){ if(!state.train||state.done)return; const wait=state.transfers?1:trip().arrival[state.train==='correct'?0:1]; setTime(wait); if(state.done)return; state.boardedCount++; state.position=1; announce('You are at Central. The two branches split here — check the next-stop display.'); feedback(state.train==='correct'?'The terminal matches. Ride on and keep checking the next stop.':'The route will branch away from the festival. You can still get off and recover at the junction.'); drawMap(); renderActions(); }
  function wait(){ if(state.done)return; const other=state.train==='correct'?'wrong':'correct'; setTime(2); if(state.done)return; state.train=other; showTrains(); selectTrain(other); announce('A different Line 10 service is approaching. Read its terminal.'); }
  function ride(){ if(state.done)return; const path=routes[state.train]; const next=state.position+1; setTime(cost[Math.min(next,cost.length-1)]); if(state.done)return; state.position=next;
    if(state.position===2 && state.train==='wrong'){ announce('Next stop: River East. Your train has taken the other branch. Get off now to transfer, or ride farther away.'); feedback('The highlighted route has diverged. A transfer now costs less time than continuing to the terminal.','error'); }
    else if(state.position>=4){ if(state.train==='correct') finish(true,'You read the terminal, followed the festival branch and arrived with time to spare.'); else {announce('River Terminal. The festival is on the other branch.');feedback('You reached the wrong terminal. You can retry the trip and check the terminal first.','error');$('actions').innerHTML='<button id="retryBtn">Retry this trip</button>'; $('retryBtn').onclick=resetRound;} }
    else { announce(`Next stop: ${path[state.position]}. ${state.position===1?'The branch split is ahead.':'Check the route display against your destination.'}`); feedback(state.train==='correct'?'Your train remains on the festival branch. Keep following the stops.':'The next-stop sign shows the branch you are taking.'); }
    drawMap(); if(!state.done&&state.position<4)renderActions();
  }
  function recover(){ if(state.done||state.position<2||state.train!=='wrong')return; setTime(5); if(state.done)return; state.transfers++;state.train=null;state.position=0;showTrains();announce('You changed at Central. A festival-bound train is approaching; check its terminal before boarding.');feedback('Recovery used 5 minutes. You spotted the branch mismatch before the terminal.','success');drawMap();$('actions').innerHTML=''; }
  function renderActions(){ if(state.done)return; const wrongAtBranch=state.train==='wrong'&&state.position>=2&&state.position<4; $('actions').innerHTML=`<button id="rideBtn">Ride to next stop <span>→</span></button>${wrongAtBranch?'<button class="secondary" id="transferBtn">Get off &amp; transfer at Central</button>':''}`; $('rideBtn').onclick=ride; if(wrongAtBranch)$('transferBtn').onclick=recover; }
  function finish(won,msg){ state.done=true;announce(won?'Trip complete!':"Time's up.");feedback(''); const el=$('feedback'); el.className='feedback'; const more=won?(state.round<trips.length-1?`Trip ${state.round+1} complete in ${state.time} minutes. The next trip adds a new challenge.`:'You completed all three trips. Route-checking helped you reach the festival.'):msg; $('actions').innerHTML=`<div class="result-card ${won?'':'fail'}"><h3>${won?'You made it!':'Trip ended'}</h3><p>${more}</p></div><button id="continueBtn">${won?(state.round<trips.length-1?'Next trip →':'Play again ↻'):'Retry this trip ↻'}</button>`; $('continueBtn').onclick=()=>{ if(won&&state.round<trips.length-1){state.round++;resetRound();}else if(won){state.round=0;resetRound();}else resetRound();}; }
  function resetRound(){state.time=0;state.train=null;state.position=0;state.transfers=0;state.boardedCount=0;state.done=false;$('tripTitle').textContent=trip().title;$('progress').textContent=`TRIP ${String(state.round+1).padStart(2,'0')} / 03`;$('timeLeft').textContent=`${trip().budget} min`;$('timeLeft').parentElement.classList.remove('low');$('transferCount').innerHTML='TRANSFERS&nbsp;&nbsp; 0';$('labelCorrectMid').textContent=trip().delay?'WEST GATE':'WEST GATE';$('labelWrongMid').textContent='RIVER EAST';$('hint').querySelector('p').textContent=trip().round===2?'A service alert can make the direct route slower. Compare the ETA before choosing.':'Line number tells you the service. The terminal tells you which way this train goes.'; if(state.round===2)$('hint').querySelector('p').textContent='Festival rush: the direct train is delayed. Check the arrival minutes and choose the safer path.';announce(trip().round===2?'A delay is posted for the festival branch. Compare each train’s terminal and arrival time.':'Two Line 10 services are approaching. Where does each one go?');feedback('');$('actions').innerHTML='';showTrains();drawMap(); }
  function drawMap(){ $('transferCount').innerHTML=`TRANSFERS&nbsp;&nbsp; ${state.transfers}`;const token=$('trainToken');let x=65,y=150;if(state.position>0){const p=state.train==='correct'?[[65,150],[340,150],[470,83],[575,83],[685,83]][Math.min(state.position,4)]:[[65,150],[340,150],[470,228],[575,228],[685,228]][Math.min(state.position,4)];[x,y]=p;}token.setAttribute('transform',`translate(${x} ${y})`);document.querySelectorAll('.track').forEach(el=>el.classList.remove('highlight','wrong-highlight'));document.querySelectorAll('.stations circle').forEach(el=>el.classList.remove('target','visited'));document.querySelectorAll('.stations circle')[5].classList.add('target');if(state.train==='correct')document.querySelectorAll('.track').forEach((el,i)=>{if([1,3].includes(i))el.classList.add('highlight')});if(state.train==='wrong')document.querySelectorAll('.track').forEach((el,i)=>{if(i===2||i===4)el.classList.add('wrong-highlight')}); }
  $('mapToggle').onclick=()=>{state.mapOpen=!state.mapOpen;$('routeMap').style.display=state.mapOpen?'block':'none';$('mapToggle').textContent=state.mapOpen?'Hide branch map':'Show branch map';};
  resetRound();
})();
