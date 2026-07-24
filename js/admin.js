let activeFilter = 'all';
const prioMap = { High:'p-high', Medium:'p-medium', Low:'p-low' };
const statLabel = { Urgent:'Urgent', Open:'Open', 'In Progress':'In Progress', Resolved:'Resolved' };
const dotMap = { Urgent:'d-urgent', Open:'d-open', 'In Progress':'d-progress', Resolved:'d-resolved' };

async function loadComplaints() {
  try {
    const res = await fetch('http://localhost:5000/api/complaints');
    const result = await res.json();
    if (result.success) {
      renderTable(result.complaints);
    }
  } catch (err) {
    showToast('Could not load complaints!', 'error');
  }
}

function renderTable(complaints) {
  const tbody = document.getElementById('admin-tbody');
  tbody.innerHTML = '';
  const filtered = activeFilter === 'all'
    ? complaints
    : complaints.filter(c => c.status.toLowerCase().replace(' ', '') === activeFilter);

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="9" style="text-align:center;color:var(--text-muted);padding:2rem;">No complaints found</td></tr>`;
    return;
  }

  filtered.forEach(c => {
    const prio = c.priority || 'Medium';
    const stat = c.status || 'Open';
    tbody.innerHTML += `<tr>
      <td style="color:var(--primary);font-weight:600;">${c.ticketId}</td>
      <td>${c.name}</td>
      <td>${c.title}</td>
      <td style="color:var(--text-muted)">${c.block || '—'}, ${c.room || '—'}</td>
      <td><span style="font-size:0.8rem;color:var(--text-muted)">${c.category}</span></td>
      <td><span class="priority-badge ${prioMap[prio] || 'p-medium'}">${prio}</span></td>
      <td><span class="status-dot"><span class="dot ${dotMap[stat] || 'd-open'}"></span>${stat}</span></td>
      <td style="color:var(--text-muted);font-size:0.82rem">${new Date(c.createdAt).toLocaleDateString()}</td>
      <td><div class="action-btns">
        <button class="act-btn" onclick="showToast('Opening ${c.ticketId}...')">View</button>
        <button class="act-btn resolve" onclick="resolveComplaint(this,'${c.ticketId}')">Resolve</button>
      </div></td>
    </tr>`;
  });
}

function filterAdmin(el, filter) {
  document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  activeFilter = filter;
  loadComplaints();
}

async function resolveComplaint(btn, ticketId) {
  try {
    const res = await fetch(`https://resolv-backend-2mka.onrender.com/api/complaints/${ticketId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'Resolved' })
    });
    const result = await res.json();
    if (result.success) {
      showToast(`${ticketId} marked as resolved!`);
      loadComplaints();
    }
  } catch (err) {
    showToast('Could not update complaint!', 'error');
  }
}

// Init
loadComplaints();