function buildHeatMap() {
  const grid = document.getElementById('heat-grid');
  if(!grid || grid.childElementCount > 0) return;
  const data = [2,1,0,3,4,2,1,0,1,2,3,4,3,2,1,2,3,4,3,2,1,0,1,2,3,2,1,0,
                1,2,3,4,3,2,1,0,1,2,3,2,0,0,1,3,4,4,3,2,1,2,3,4,3,2,1,0,
                2,1,0,1,2,3,1,0,0,1,2,3,2,1,0,1,2,3,4,3,2,1,0,1,2,3,4,2];
  data.forEach(v => {
    const cell = document.createElement('div');
    cell.className = `heat-cell heat-${v}`;
    cell.textContent = v > 0 ? v : '';
    grid.appendChild(cell);
  });
}
buildHeatMap();