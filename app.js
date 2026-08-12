const DAYS = [
  { id: 'mon', label: 'Mon', title: 'Push', focus: 'Chest · Shoulders · Triceps' },
  { id: 'tue', label: 'Tue', title: 'Pull', focus: 'Back · Biceps · Core' },
  { id: 'thu', label: 'Thu', title: 'Legs', focus: 'Quads · Glutes · Calves' },
  { id: 'sat', label: 'Sat', title: 'Full Body', focus: 'Strength · Skills · Core' }
];

const EXERCISES = {
  push: { name: 'Push-up', type: 'Push-up', media: 'https://raw.githubusercontent.com/archo-agency/exercise-gifs/main/push-up.gif', muscles: ['Chest', 'Triceps', 'Front delts'], equipment: 'Bodyweight', difficulty: 2, how: 'Keep your body in one straight line. Lower your chest under control, then push the floor away.', progression: ['Incline push-up', 'Push-up', 'Diamond push-up', 'Decline push-up', 'Archer push-up'] },
  pike: { name: 'Pike push-up', type: 'Pike push-up', media: 'https://raw.githubusercontent.com/archo-agency/exercise-gifs/main/pike-push-up.gif', muscles: ['Shoulders', 'Triceps'], equipment: 'Bodyweight', difficulty: 2, how: 'Keep your hips high and lower the head between your hands. Press back up without collapsing the shoulders.', progression: ['Hands elevated', 'Floor pike push-up', 'Feet elevated', 'Handstand push-up progression'] },
  diamond: { name: 'Diamond push-up', type: 'Diamond push-up', media: 'https://raw.githubusercontent.com/archo-agency/exercise-gifs/main/diamond-push-up.gif', muscles: ['Triceps', 'Chest'], equipment: 'Bodyweight', difficulty: 3, how: 'Place the hands close under the chest, lower slowly and keep the elbows controlled.', progression: ['Knee diamond', 'Diamond push-up', 'Slow diamond', 'Decline diamond'] },
  dip: { name: 'Chair dip', type: 'Chair dip', media: 'https://raw.githubusercontent.com/archo-agency/exercise-gifs/main/chair-dip.gif', muscles: ['Triceps', 'Chest'], equipment: 'Stable chair', difficulty: 2, how: 'Use a very stable chair. Bend the elbows and press back up without dropping the shoulders too deep.', progression: ['Bent knees', 'Straight legs', 'Feet elevated'] },
  plank: { name: 'Plank', type: 'Plank', media: 'https://raw.githubusercontent.com/archo-agency/exercise-gifs/main/plank.gif', muscles: ['Core', 'Shoulders'], equipment: 'Bodyweight', difficulty: 1, how: 'Keep ribs down, glutes tight and body straight. Breathe normally.', progression: ['Knee plank', 'Plank', 'Long-lever plank', 'RKC plank'] },
  pull: { name: 'Pull-up', type: 'Pull-up', media: 'https://raw.githubusercontent.com/archo-agency/exercise-gifs/main/pull-up.gif', muscles: ['Lats', 'Biceps', 'Upper back'], equipment: 'Pull-up bar', difficulty: 4, how: 'Start from a controlled hang and pull the body toward the bar without swinging.', progression: ['Dead hang', 'Scapular pull-up', 'Negative', 'Assisted pull-up', 'Pull-up', 'Chest-to-bar'] },
  row: { name: 'Australian row', type: 'Australian row', media: 'https://raw.githubusercontent.com/archo-agency/exercise-gifs/main/australian-row.gif', muscles: ['Upper back', 'Biceps'], equipment: 'Low sturdy bar', difficulty: 2, how: 'Keep the body rigid and pull the chest toward a sturdy horizontal surface.', progression: ['Higher bar', 'Lower bar', 'Feet elevated'] },
  negative: { name: 'Negative pull-up', type: 'Negative pull-up', media: 'https://raw.githubusercontent.com/archo-agency/exercise-gifs/main/negative-pull-up.gif', muscles: ['Lats', 'Biceps'], equipment: 'Pull-up bar', difficulty: 3, how: 'Start at the top and lower slowly for 3–5 seconds. Control the entire descent.', progression: ['3 sec negative', '5 sec negative', 'Assisted pull-up'] },
  chin: { name: 'Chin-up', type: 'Chin-up', media: 'https://raw.githubusercontent.com/archo-agency/exercise-gifs/main/chin-up.gif', muscles: ['Biceps', 'Lats'], equipment: 'Pull-up bar', difficulty: 3, how: 'Use an underhand grip and pull the elbows down. Avoid kicking the legs.', progression: ['Assisted chin-up', 'Chin-up', 'Slow chin-up', 'Weighted chin-up'] },
  raise: { name: 'Hanging knee raise', type: 'Hanging knee raise', media: 'https://raw.githubusercontent.com/archo-agency/exercise-gifs/main/hanging-knee-raise.gif', muscles: ['Abs', 'Hip flexors'], equipment: 'Pull-up bar', difficulty: 3, how: 'Hang with straight arms and raise the knees without swinging. Finish by curling the pelvis.', progression: ['Lying knee raise', 'Hanging knee raise', 'Straight-leg raise'] },
  squat: { name: 'Bodyweight squat', type: 'Squat', media: 'https://raw.githubusercontent.com/archo-agency/exercise-gifs/main/bodyweight-squat.gif', muscles: ['Quads', 'Glutes'], equipment: 'Bodyweight', difficulty: 1, how: 'Sit the hips down between the feet and stand by driving through the whole foot.', progression: ['Squat', 'Pause squat', 'Tempo squat', 'Jump squat'] },
  lunge: { name: 'Reverse lunge', type: 'Reverse lunge', media: 'https://raw.githubusercontent.com/archo-agency/exercise-gifs/main/reverse-lunge.gif', muscles: ['Quads', 'Glutes'], equipment: 'Bodyweight', difficulty: 2, how: 'Step back, keep the torso stable and lower under control. Drive through the front foot.', progression: ['Assisted reverse lunge', 'Reverse lunge', 'Deficit reverse lunge'] },
  calf: { name: 'Single-leg calf raise', type: 'Calf raise', media: 'https://raw.githubusercontent.com/archo-agency/exercise-gifs/main/single-leg-calf-raise.gif', muscles: ['Calves'], equipment: 'Bodyweight', difficulty: 2, how: 'Rise through the ball of the foot and lower slowly through a comfortable range.', progression: ['Two-leg calf raise', 'Single-leg calf raise', 'Deficit single-leg raise'] },
  bridge: { name: 'Glute bridge', type: 'Glute bridge', media: 'https://raw.githubusercontent.com/archo-agency/exercise-gifs/main/glute-bridge.gif', muscles: ['Glutes', 'Hamstrings'], equipment: 'Bodyweight', difficulty: 1, how: 'Drive the hips up and squeeze the glutes. Avoid arching the lower back.', progression: ['Bridge', 'Pause bridge', 'Single-leg bridge'] },
  hollow: { name: 'Hollow body hold', type: 'Hollow body hold', media: 'https://raw.githubusercontent.com/archo-agency/exercise-gifs/main/hollow-body-hold.gif', muscles: ['Core'], equipment: 'Bodyweight', difficulty: 3, how: 'Press the lower back into the floor and hold the body in a shallow curved shape.', progression: ['Tuck hold', 'One-leg hollow', 'Hollow hold'] }
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

function mediaMarkup(exercise) {
  return `<div class="media-frame"><img src="${exercise.media}" alt="Real-world demonstration of ${escapeHtml(exercise.name)}" loading="lazy" referrerpolicy="no-referrer"><div class="media-fallback" hidden><strong>${escapeHtml(exercise.name)}</strong><span>Animation unavailable</span></div></div>`;
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
    const difficulty = '★'.repeat(exercise.difficulty) + '☆'.repeat(5 - exercise.difficulty);
    return `<article class="exercise ${saved.open ? 'open' : ''}" data-index="${index}">
      <div class="row"><div><div class="name">${escapeHtml(name)}</div><div class="target">${escapeHtml(target)}</div></div><button class="btn extend" data-index="${index}">${saved.open ? 'Collapse' : 'Extend'}</button></div>
      <div class="details">
        ${mediaMarkup(exercise)}
        <div class="meta-grid">
          <div><span>Difficulty</span><strong>${difficulty}</strong></div>
          <div><span>Equipment</span><strong>${escapeHtml(exercise.equipment)}</strong></div>
        </div>
        <div class="chips">${exercise.muscles.map(m => `<span>${escapeHtml(m)}</span>`).join('')}</div>
        <div class="tip"><strong>How to:</strong> ${escapeHtml(exercise.how)}</div>
        <div class="progression"><strong>Progression</strong>${exercise.progression.map((step, i) => `<span class="step ${i === 0 ? 'first' : ''}">${escapeHtml(step)}</span>`).join('<span class="arrow">→</span>')}</div>
        <div class="sets">${Array.from({length:sets},(_,setIndex)=>`<div class="set"><label>Set ${setIndex+1}<input class="rep" data-set="${setIndex}" inputmode="numeric" value="${escapeHtml(saved.reps?.[setIndex] || '')}" placeholder="reps"></label></div>`).join('')}</div>
        <label class="check"><input class="done" type="checkbox" ${saved.done ? 'checked' : ''}> Completed</label>
      </div>
    </article>`;
  }).join('');

  document.querySelectorAll('.media-frame img').forEach(img => img.addEventListener('error', () => {
    img.closest('.media-frame').querySelector('.media-fallback').hidden = false;
    img.hidden = true;
  }));

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
