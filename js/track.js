function loadTrack() {
  const ticketId = document.getElementById('track-input').value.trim();
  if (!ticketId) {
    showToast('Please enter a ticket ID!', 'error');
    return;
  }

  fetch('https://resolv-backend-2mka.onrender.com/api/complaints/' + ticketId)
    .then(res => res.json())
    .then(result => {
      if (result.success) {
        const c = result.complaint;

        document.getElementById('track-result').style.display = 'block';
        document.getElementById('track-title').textContent = c.title;
        document.getElementById('track-ticket').textContent = 'Ticket #' + c.ticketId;
        document.getElementById('track-category').textContent = c.category;
        document.getElementById('track-location').textContent = `${c.room || '—'}, ${c.block || '—'}, ${c.floor || '—'}`;
        document.getElementById('track-filed').textContent = c.name + ' (' + c.studentId + ')';
        document.getElementById('track-status').textContent = c.status;
        document.getElementById('track-priority').textContent = c.priority;
        document.getElementById('track-priority-badge').textContent = c.priority + ' Priority';
        document.getElementById('track-assigned').textContent = c.assignedTo || 'Unassigned';
        document.getElementById('track-date').textContent = new Date(c.createdAt).toLocaleString();
        document.getElementById('tl-submitted-time').textContent = new Date(c.createdAt).toLocaleString();

        // Update timeline based on status
        if (c.status === 'In Progress' || c.status === 'Resolved') {
          document.getElementById('tl-progress').classList.add('done');
        }
        if (c.status === 'Resolved') {
          document.getElementById('tl-resolved').classList.add('done');
          document.getElementById('tl-resolved').querySelector('.event-time').textContent = new Date(c.updatedAt).toLocaleString();
        }

      } else {
        showToast('Ticket not found!', 'error');
      }
    })
    .catch(() => showToast('Could not connect to server!', 'error'));
}

function rateStar(n) {
  const stars = document.querySelectorAll('#star-rating span');
  stars.forEach((s,i) => { s.textContent = i < n ? '⭐' : '☆'; });
  showToast(`You rated ${n} star${n>1?'s':''}!`);
}