document.addEventListener('DOMContentLoaded', () => {
	const t = document.getElementById('table-of-contents');
	if (!t) return;
	genTOC();
	setupObs();
	handleResp();
});

function genTOC() {
	const t = document.getElementById('table-of-contents'),
		c = document.querySelector('article');
	if (!c) return;
	const h = c.querySelectorAll('h2,h3,h4');
	if (!h.length) {
		const p = document.getElementById('toc-container');
		if (p) p.style.display = 'none';
		return;
	}
	const p = document.getElementById('toc-container');
	if (p) p.classList.remove('hidden');
	const l = document.createElement('ul');
	l.className = 'space-y-1';
	t.appendChild(l);
	h.forEach(e => {
		if (!e.id) e.id = e.textContent.trim().toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
		const v = parseInt(e.tagName[1]),
			i = document.createElement('li'),
			cls = {
				2: 'toc-h2 font-medium',
				3: 'toc-h3 pl-4 text-sm',
				4: 'toc-h4 pl-6 text-xs'
			};
		i.className = cls[v] || 'toc-h4 pl-6 text-xs';
		const txt = e.textContent.trim().replace(/^#+\s*/, '').replace(/\s*#+$/, ''),
			a = document.createElement('a');
		a.href = `#${e.id}`;
		a.textContent = txt;
		a.className = 'toc-link block py-1 hover:text-orange-500 transition-colors duration-200';
		a.dataset.target = e.id;
		a.addEventListener('click', ev => {
			ev.preventDefault();
			const tgt = document.getElementById(e.id);
			if (tgt) {
				tgt.scrollIntoView({
					behavior: 'smooth'
				});
				history.pushState(null, null, `#${e.id}`);
			}
		});
		i.appendChild(a);
		l.appendChild(i);
	});
}

function setupObs() {
	const c = document.querySelector('article');
	if (!c) return;
	const h = c.querySelectorAll('h2,h3,h4'),
		l = document.querySelectorAll('.toc-link');
	if (!h.length) return;
	const pos = Array.from(h).map(e => ({
			id: e.id,
			offsetTop: e.offsetTop
		})),
		vis = new Set();
	let curr = null,
		tick = false;

	const findCurr = () => {
		const s = window.pageYOffset;
		for (let i = pos.length - 1; i >= 0; i--)
			if (pos[i].offsetTop <= s + 100) return pos[i].id;
		return null;
	};

	const update = () => {
		curr = findCurr();
		l.forEach(lnk => {
			const id = lnk.dataset.target,
				should = vis.has(id) || id === curr;
			if (should && !lnk.classList.contains('active')) lnk.classList.add('active');
			else if (!should && lnk.classList.contains('active')) lnk.classList.remove('active');
		});
		tick = false;
	};

	const onScroll = () => {
		if (!tick) {
			requestAnimationFrame(update);
			tick = true;
		}
	};

	const obs = new IntersectionObserver(entries => {
		entries.forEach(e => {
			if (e.isIntersecting) vis.add(e.target.id);
			else vis.delete(e.target.id);
		});
		update();
	}, {
		root: null,
		rootMargin: '-50px 0px -50px 0px',
		threshold: [0, 0.1]
	});

	h.forEach(e => obs.observe(e));
	window.addEventListener('scroll', onScroll, {
		passive: true
	});
	update();
}

function handleResp() {
	const t = document.getElementById('toc-container');
	if (!t) return;
	const check = () => t.classList[window.innerWidth < 1024 ? 'add' : 'remove']('hidden');
	check();
	window.addEventListener('resize', check);
}
