// Simple client-side app for workouts
// If backend runs on different port, set API_BASE = 'http://localhost:3000'
const API_BASE = ''; // '' means same origin. Change if needed.

(async function(){
    // Utilities
    function qs(sel){ return document.querySelector(sel); }
    function qsa(sel){ return document.querySelectorAll(sel); }
    function showAlert(msg, type='success'){
        const p = document.createElement('div');
        p.className = `alert alert-${type} alert-dismissible fade show`;
        p.role = 'alert';
        p.innerHTML = `${msg}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`;
        const ph = qs('#alert-placeholder');
        if(ph){ ph.appendChild(p); setTimeout(()=>p.classList.remove('show'), 2500); setTimeout(()=>p.remove(), 3000); }
    }
    function escapeHtml(s){ return String(s || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[c])); }

    // Fetch and render workouts
    async function fetchWorkouts(){
        try {
            const res = await fetch(API_BASE + '/workouts');
            if (!res.ok) throw new Error('Chyba: ' + res.status);
            const data = await res.json();
            renderWorkouts(data || []);
            renderStats(data || []);
        } catch (e) {
            console.error(e);
            showAlert('Chyba pri načítaní tréningov', 'danger');
        }
    }

    function renderWorkouts(list){
        const tbody = qs('#workouts-tbody');
        const emptyMsg = qs('#empty-msg');
        if(!tbody) return;
        if(!list.length){
            tbody.innerHTML = '';
            if(emptyMsg) emptyMsg.style.display = 'block';
            return;
        }
        if(emptyMsg) emptyMsg.style.display = 'none';
        tbody.innerHTML = list.map((w,i) => `
      <tr data-id="${escapeHtml(w.id || w._id || '')}">
        <th scope="row">${i+1}</th>
        <td>${escapeHtml(w.date || w.createdAt || '')}</td>
        <td>${escapeHtml(w.type || '')}</td>
        <td>${escapeHtml(w.duration || '')}</td>
        <td>${escapeHtml(w.notes || '')}</td>
        <td class="text-end">
          <button class="btn btn-sm btn-outline-danger btn-delete">Vymaž</button>
        </td>
      </tr>
    `).join('');
        // wire delete buttons
        qsa('.btn-delete').forEach(btn => btn.addEventListener('click', async (e) => {
            const tr = e.target.closest('tr');
            const id = tr?.dataset?.id;
            if(!id) return;
            if(!confirm('Naozaj vymazať tento tréning?')) return;
            try {
                const dres = await fetch(API_BASE + '/workouts/' + encodeURIComponent(id), { method: 'DELETE' });
                if (!dres.ok) throw new Error('Delete failed');
                showAlert('Tréning vymazaný', 'success');
                await fetchWorkouts();
            } catch(err){
                console.error(err);
                showAlert('Chyba pri mazani', 'danger');
            }
        }));
    }

    function renderStats(list){
        const countEl = qs('#stat-count');
        const totalEl = qs('#stat-total-duration');
        if(!countEl || !totalEl) return;
        const count = list.length;
        const total = list.reduce((s, w) => s + (Number(w.duration) || 0), 0);
        countEl.textContent = count;
        totalEl.textContent = total;
    }

    // Add workout
    const modalEl = qs('#workoutModal');
    const workoutModal = modalEl ? new bootstrap.Modal(modalEl) : null;
    const addBtn = qs('#addWorkoutBtn');
    if(addBtn) addBtn.addEventListener('click', () => workoutModal?.show());

    const form = qs('#workoutForm');
    if(form){
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            if(!form.checkValidity()) { form.classList.add('was-validated'); return; }
            const fd = new FormData(form);
            const payload = {
                date: fd.get('date'),
                type: fd.get('type'),
                duration: Number(fd.get('duration')),
                notes: fd.get('notes')
            };
            try {
                const res = await fetch(API_BASE + '/workouts', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                if (res.status === 201 || res.ok) {
                    showAlert('Tréning pridaný', 'success');
                    workoutModal?.hide();
                    form.reset();
                    form.classList.remove('was-validated');
                    await fetchWorkouts();
                } else {
                    const t = await res.text();
                    throw new Error('Server: ' + t);
                }
            } catch (err){
                console.error(err);
                showAlert('Chyba pri pridávaní tréningu', 'danger');
            }
        });
    }

    // initial load
    await fetchWorkouts();

    // If on stats page, also fetch on load (same script used)
    if(window.location.pathname.endsWith('stats.html')){
        // fetchWorkouts already updates stats when workouts fetched
    }

})();