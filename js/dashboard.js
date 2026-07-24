async function loadDashboardStats() {
  try {
    const res = await fetch('https://resolv-backend-2mka.onrender.com/api/complaints');
    const result = await res.json();
    if (!result.success) return;

    const complaints = result.complaints;
    const total = complaints.length;
    const urgent = complaints.filter(c => c.status === 'Urgent').length;
    const resolved = complaints.filter(c => c.status === 'Resolved').length;
    const open = complaints.filter(c => c.status === 'Open').length;

    // Update metric cards
    document.querySelector('.mc-purple .metric-value').textContent = total;
    document.querySelector('.mc-red .metric-value').textContent = urgent;
    document.querySelector('.mc-green .metric-value').textContent = resolved;

    // Update recent complaints table
    const tbody = document.querySelector('.complaints-table tbody');
    if (tbody) {
      tbody.innerHTML = '';
      const recent = complaints.slice(0, 6);
      if (recent.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;color:var(--text-muted);padding:2rem;">No complaints yet</td></tr>`;
      } else {
        recent.forEach(c => {
          const prioClass = c.priority === 'High' ? 'p-high' : c.priority === 'Low' ? 'p-low' : 'p-medium';
          const dotClass = c.status === 'Resolved' ? 'd-resolved' : c.status === 'In Progress' ? 'd-progress' : c.status === 'Urgent' ? 'd-urgent' : 'd-open';
          const timeAgo = getTimeAgo(c.createdAt);
          tbody.innerHTML += `<tr>
            <td>${c.title}</td>
            <td>${c.block || '—'}, ${c.floor || '—'}</td>
            <td><span class="priority-badge ${prioClass}">${c.priority}</span></td>
            <td><span class="status-dot"><span class="dot ${dotClass}"></span>${c.status}</span></td>
            <td style="color:var(--text-muted)">${timeAgo}</td>
          </tr>`;
        });
      }
    }

    // Update activity feed
    const activityList = document.querySelector('.activity-list');
    if (activityList) {
      activityList.innerHTML = '';
      complaints.slice(0, 4).forEach(c => {
        const initials = c.name.split(' ').map(n => n[0]).join('').toUpperCase();
        activityList.innerHTML += `
          <div class="activity-item">
            <div class="activity-avatar" style="background:rgba(108,99,255,0.15);color:var(--primary)">${initials}</div>
            <div>
              <div class="activity-text"><span class="activity-name">${c.name}</span> filed a complaint: ${c.title}</div>
              <div class="activity-time">${getTimeAgo(c.createdAt)}</div>
            </div>
          </div>`;
      });
    }

  } catch (err) {
    console.log('Could not load dashboard:', err);
  }
}

function getTimeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  const hrs = Math.floor(mins / 60);
  const days = Math.floor(hrs / 24);
  if (days > 0) return `${days}d ago`;
  if (hrs > 0) return `${hrs}h ago`;
  if (mins > 0) return `${mins}m ago`;
  return 'Just now';
}

loadDashboardStats();