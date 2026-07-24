let currentStep = 1;
let selectedCat = '';
let selectedPriority = '';

function selectChip(el, group) {
  document.querySelectorAll('.chip').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  selectedCat = el.textContent;
}

function selectPriority(el, val) {
  document.querySelectorAll('.priority-opt').forEach(p => p.classList.remove('selected'));
  el.classList.add('selected');
  selectedPriority = val;
}

function nextStep(step) {
  document.getElementById('fs-' + currentStep).classList.remove('active');
  const oldPs = document.getElementById('ps-' + currentStep);
  oldPs.classList.remove('active');
  oldPs.classList.add('done');
  oldPs.querySelector('.prog-circle').textContent = '✓';
  if(step === 4) buildReview();
  document.getElementById('fs-' + step).classList.add('active');
  const newPs = document.getElementById('ps-' + step);
  if(newPs) { newPs.classList.add('active'); newPs.classList.remove('done'); newPs.querySelector('.prog-circle').textContent = step; }
  currentStep = step;
}

function buildReview() {
  const fields = [
    ['Name', document.getElementById('inp-name')?.value || '—'],
    ['Student ID', document.getElementById('inp-id')?.value || '—'],
    ['Category', selectedCat || '—'],
    ['Issue Title', document.getElementById('inp-title')?.value || '—'],
    ['Description', document.getElementById('inp-desc')?.value || '—'],
    ['Block', document.getElementById('inp-block')?.value || '—'],
    ['Floor', document.getElementById('inp-floor')?.value || '—'],
    ['Room', document.getElementById('inp-room')?.value || 'N/A'],
    ['Priority', selectedPriority || '—'],
  ];
  document.getElementById('review-content').innerHTML = fields.map(([k,v]) => `
    <div class="detail-row"><span class="detail-key">${k}</span><span class="detail-val">${v}</span></div>
  `).join('');
}

async function submitComplaint() {
  const data = {
    name: document.getElementById('inp-name')?.value || '',
    studentId: document.getElementById('inp-id')?.value || '',
    phone: document.getElementById('inp-phone')?.value || '',
    category: selectedCat,
    title: document.getElementById('inp-title')?.value || '',
    description: document.getElementById('inp-desc')?.value || '',
    block: document.getElementById('inp-block')?.value || '',
    floor: document.getElementById('inp-floor')?.value || '',
    room: document.getElementById('inp-room')?.value || '',
    priority: selectedPriority || 'Medium'
  };
  try {
    const response = await fetch('https://resolv-backend-2mka.onrender.com/api/complaints', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    if (result.success) {
      document.getElementById('ticket-display').textContent = result.ticketId;
      document.getElementById('fs-4').classList.remove('active');
      document.getElementById('success-screen').classList.add('active');
      document.getElementById('prog-steps').style.display = 'none';
      showToast('Complaint submitted successfully!');
    } else {
      showToast('Error: ' + result.error, 'error');
    }
  } catch (err) {
    showToast('Could not connect to server!', 'error');
  }
}

function resetForm() {
  currentStep = 1;
  for(let i=1;i<=4;i++) {
    const s = document.getElementById('fs-'+i);
    if(s) s.classList.remove('active');
    const ps = document.getElementById('ps-'+i);
    if(ps) { ps.classList.remove('active','done'); ps.querySelector('.prog-circle').textContent = i; }
  }
  document.getElementById('fs-1').classList.add('active');
  document.getElementById('ps-1').classList.add('active');
  document.getElementById('success-screen').classList.remove('active');
  document.getElementById('prog-steps').style.display = 'flex';
  selectedCat = ''; selectedPriority = '';
}