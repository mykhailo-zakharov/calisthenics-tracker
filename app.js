const DAYS = [
  { id: 'mon', label: 'Mon', title: 'Push', focus: 'Chest · Shoulders · Triceps' },
  { id: 'tue', label: 'Tue', title: 'Pull', focus: 'Back · Biceps · Core' },
  { id: 'thu', label: 'Thu', title: 'Legs', focus: 'Quads · Glutes · Calves' },
  { id: 'sat', label: 'Sat', title: 'Full Body', focus: 'Strength · Skills · Core' }
];

const EXERCISES = {
  push: { type:'push', how:'Keep your body in one straight line. Lower the chest under control, then push the floor away.', progression:'Incline → Push-up → Diamond → Decline → Archer' },
  pike: { type:'pike', how:'Keep hips high and lower the head between the hands. Press back up without collapsing the shoulders.', progression:'Hands elevated → Floor → Feet elevated → Handstand prep' },
  diamond: { type:'push', how:'Hands close together below the chest. Lower slowly and keep elbows controlled.', progression:'Knee → Diamond → Slow diamond → Decline diamond' },
  dip: { type:'dip', how:'Use a very stable chair. Bend the elbows and press back up without dropping too deep.', progression:'Bent knees → Straight legs → Feet elevated' },
  plank: { type:'plank', how:'Keep ribs down, glutes tight and body straight. Breathe normally.', progression:'Knee plank → Plank → Long-lever → RKC plank' },
  pull: { type:'pull', how:'Start from a controlled hang and pull your body toward the bar without swinging.', progression:'Dead hang → Negative → Assisted → Pull-up → Chest-to-bar' },
  row: { type:'pull', how:'Keep the body rigid and pull the chest toward a sturdy horizontal surface.', progression:'High bar → Low bar → Feet elevated' },
  negative: { type:'pull', how:'Start at the top and lower slowly for 3–5 seconds. Control the entire descent.', progression:'3 sec negative → 5 sec negative → Assisted pull-up' },
  chin: { type:'pull', how:'Use an underhand grip and pull the elbows down. Avoid kicking the legs.', progression:'Assisted → Chin-up → Slow → Weighted' },
  raise: { type:'raise', how:'Hang with straight arms and raise the knees without swinging. Finish by curling the pelvis.', progression:'Lying raise → Hanging knee raise → Straight-leg raise' },
  squat: { type:'squat', how:'Sit the hips down between the feet and stand by driving through the whole foot.', progression:'Squat → Pause squat → Tempo squat → Jump squat' },
  lunge: { type:'lunge', how:'Step back, keep the torso stable and lower under control. Drive through the front foot.', progression:'Assisted → Reverse lunge → Deficit reverse lunge' },
  calf: { type:'calf', how:'Rise through the ball of the foot and lower slowly through a comfortable range.', progression:'Two-leg → Single-leg → Deficit single-leg' },
  bridge: { type:'bridge', how:'Drive the hips up and squeeze the glutes. Avoid arching the lower back.', progression:'Bridge → Pause bridge → Single-leg bridge' },
  hollow: { type:'plank', how:'Press the lower back into the floor and hold the body in a shallow curved shape.', progression:'Tuck → One-leg → Hollow hold' }
};

const WORKOUTS = {
  mon: [['Push-ups','4 × 6–15','push'],['Pike push-ups','3 × 5–12','pike'],['Diamond push-ups','3 × 5–12','diamond'],['Chair dips','3 × 8–15','dip'],['Plank','3 × 30–60 sec','plank']],
  tue: [['Pull-ups','4 × 3–10','pull'],['Australian rows','4 × 6–15','row'],['Negative pull-ups','3 × 3–6','negative'],['Chin-ups','3 × 4–10','chin'],['Hanging knee raises','3 × 8–15','raise']],
  thu: [['Bodyweight squats','4 × 10–20','squat'],['Bulgarian split squats','3 × 8–15 / leg','lunge'],['Reverse lunges','3 × 8–15 / leg','lunge'],['Single-leg calf raises','4 × 12–20 / leg','calf'],['Glute bridges','3 × 12–20','bridge'],['Plank','3 × 40–60 sec','plank']],
  sat: [['Push-ups','3 × 8–15','push'],['Pull-ups','3 × 4–10','pull'],['Bulgarian split squats','3 × 8–12 / leg','lunge'],['Pike push-ups','3 × 6–12','pike'],['Hanging knee raises','3 × 8–15','raise'],['Hollow body hold','3 × 20–40 sec','hollow']]
};

let currentDay = localStorage.getItem('ct-day') || 'mon';
let state = JSON.parse(localStorage.getItem('ct-state') || '{}');

const escapeHtml = value => String(value)
  .replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;')
  .replaceAll('"','&quot;').replaceAll("'",'&#039;');

function itemKey(index) { return `${currentDay}-${index}`; }
function save() {
  localStorage.setItem('ct-day', currentDay);
  localStorage.setItem('ct-state', JSON.stringify(state));
}

function figure(type) {
  const ground = '<line class="ground" x1="40" y1="190" x2="460" y2="190"/>';
  if (type === 'pull' || type === 'raise') return `<svg viewBox="0 0 500 230" role="img" aria-label="Animated exercise demonstration"><line class="person" x1="125" y1="25" x2="375" y2="25"/><g class="${type}"><circle class="joint" cx="250" cy="88" r="13"/><path class="person" d="M250 102 L250 150 M250 112 L195 72 M250 112 L305 72 M250 150 L215 190 M250 150 L285 190"/></g><path class="arrow" d="M420 45 L420 165"/></svg>`;
  if (type === 'squat') return `<svg viewBox="0 0 500 230" role="img" aria-label="Animated squat demonstration"><g class="squat"><circle class="joint" cx="250" cy="55" r="14"/><path class="person" d="M250 70 L250 120 L205 165 L180 190 M250 120 L295 165 L320 190 M250 90 L205 115 M250 90 L295 115"/></g>${ground}<path class="arrow" d="M390 45 L390 160"/></svg>`;
  if (type === 'bridge') return `<svg viewBox="0 0 500 230" role="img" aria-label="Animated glute bridge demonstration"><g class="bridge"><circle class="joint" cx="175" cy="135" r="12"/><path class="person" d="M188 140 L260 145 L330 175 L390 190 M260 145 L245 190 M330 175 L345 190"/></g>${ground}<path class="arrow" d="M210 176 Q270 85 350 176"/></svg>`;
  if (type === 'pike') return `<svg viewBox="0 0 500 230" role="img" aria-label="Animated pike push-up demonstration"><g class="pike"><circle class="joint" cx="160" cy="88" r="13"/><path class="person" d="M175 98 L245 125 L315 90 L385 175 M245 125 L210 180 M315 90 L345 180"/></g>${ground}<path class="arrow" d="M155 55 Q125 105 155 150"/></svg>`;
  if (type === 'lunge') return `<svg viewBox="0 0 500 230" role="img" aria-label="Animated lunge demonstration"><g class="lunge"><circle class="joint" cx="250" cy="55" r="14"/><path class="person" d="M250 70 L250 120 L220 165 L180 190 M250 120 L315 160 L375 190 M250 92 L210 115 M250 92 L290 115"/></g>${ground}<path class="arrow" d="M150 120 Q130 165 160 185"/></svg>`;
  return `<svg viewBox="0 0 500 230" role="img" aria-label="Animated exercise demonstration"><g class="${type}"><circle class="joint" cx="120" cy="88" r="13"/><path class="person" d="M135 98 L205 130 L285 145 L365 165 M205 130 L160 178 M205 130 L240 178 M285 145 L330 188 M365 165 L405 190"/></g>${ground}<path class="arrow" d="M120 55 Q95 115 120 165"/></svg>`;
}

function render() {
  const day = DAYS.find(item => item.id === currentDay);
  const items = WORKOUTS[currentDay] || [];
  const done = items.filter((_, index) => state[itemKey(index)]?.done).length;
  const pct = items.length ? Math.round(done / items.length * 100) : 0;

  document.getElementById('dayBadge').textContent = day.title;
  document.getElementById('tabs').innerHTML = DAYS.map(item =>
    `<button class="tab ${item.id === currentDay ? 'active' : ''}" data-day="${item.id}">${item.label}<br>${item.title}</button>`
  ).join('');

  document.getElementById('stats').innerHTML = `
    <div class="stat"><div class="stat-label">Exercises</div><div class="stat-value">${items.length}</div></div>
    <div class="stat"><div class="stat-label">Completed</div><div class="stat-value">${done}/${items.length}</div></div>
    <div class="stat wide"><div class="stat-label">Progress</div><div class="progress-wrap" style="margin-top:7px"><div class="progress-bar" style="width:${pct}%"></div></div><div class="hint">${pct}% complete · ${day.focus}</div></div>`;

  document.getElementById('workout').innerHTML = items.map((item,index) => {
    const [name,target,id] = item;
    const exercise = EXERCISES[id];
    const saved = state[itemKey(index)] || {};
    const sets = parseInt(target, 10) || 3;
    return `<article class="exercise ${saved.open ? 'open' : ''}" data-index="${index}">
      <div class="row"><div><div class="name">${escapeHtml(name)}</div><div class="target">${escapeHtml(target)}</div></div><button class="btn extend" data-index="${index}">${saved.open ? 'Collapse' : 'Extend'}</button></div>
      <div class="details">
        <div class="demo">${figure(exercise.type)}</div>
        <div class="tip"><strong>How to:</strong> ${escapeHtml(exercise.how)}</div>
        <div class="progression"><strong>Progression</strong>${escapeHtml(exercise.progression)}</div>
        <div class="sets">${Array.from({length:sets},(_,setIndex)=>`<div class="set"><label>Set ${setIndex+1}<input class="rep" data-set="${setIndex}" inputmode="numeric" value="${escapeHtml(saved.reps?.[setIndex] || '')}" placeholder="reps"></label></div>`).join('')}</div>
        <label class="check"><input class="done" type="checkbox" ${saved.done ? 'checked' : ''}> Completed</label>
      </div>
    </article>`;
  }).join('');

  document.querySelectorAll('.tab').forEach(button => button.addEventListener('click', () => {
    currentDay = button.dataset.day;
    save();
    render();
  }));

  document.querySelectorAll('.extend').forEach(button => button.addEventListener('click', () => {
    const index = Number(button.dataset.index);
    const key = itemKey(index);
    state[key] = {...(state[key] || {}), open: !state[key]?.open};
    save();
    render();
  }));

  document.querySelectorAll('.done').forEach(box => box.addEventListener('change', () => {
    const index = Number(box.closest('.exercise').dataset.index);
    const key = itemKey(index);
    state[key] = {...(state[key] || {}), done: box.checked};
    save();
    render();
  }));

  document.querySelectorAll('.rep').forEach(input => input.addEventListener('input', () => {
    const index = Number(input.closest('.exercise').dataset.index);
    const key = itemKey(index);
    const saved = state[key] || {};
    const reps = [...(saved.reps || [])];
    reps[Number(input.dataset.set)] = input.value;
    state[key] = {...saved, reps};
    save();
  }));
}

render();
