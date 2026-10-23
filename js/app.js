const search = document.querySelector('#project-search');
const buttons = [...document.querySelectorAll('[data-filter]')];
const cards = [...document.querySelectorAll('.project-card')];
let category = 'all';
const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
function filterProjects(animate = false) {
    const motion = animate && !reducedMotion.matches && typeof cards[0]?.animate === 'function';
    const previous = new Map();
    cards.forEach(card => {
        card.getAnimations?.().forEach(animation => animation.cancel());
        if (motion && !card.hidden) previous.set(card, card.getBoundingClientRect());
    });
    const query = normalize(search.value.trim());
    let visible = 0;
    cards.forEach(card => {
        const match = (category === 'all' || card.dataset.category === category) && normalize(card.textContent).includes(query);
        card.hidden = !match;
        if (match) visible++;
    });
    if (motion) {
        let entering = 0;
        cards.filter(card => !card.hidden).forEach(card => {
            const before = previous.get(card);
            const after = card.getBoundingClientRect();
            if (before) {
                const x = before.left - after.left;
                const y = before.top - after.top;
                if (x || y) card.animate([
                    { transform: `translate(${x}px, ${y}px)` },
                    { transform: 'translate(0, 0)' }
                ], { duration: 280, easing: 'cubic-bezier(.2,.7,.2,1)' });
            } else {
                card.animate([
                    { opacity: 0, transform: 'translateY(12px)' },
                    { opacity: 1, transform: 'translateY(0)' }
                ], { duration: 240, delay: Math.min(entering++ * 35, 140), easing: 'ease-out', fill: 'backwards' });
            }
        });
    }
    document.querySelector('#result-count').textContent = `${visible} ${visible === 1 ? 'proyecto' : 'proyectos'}`;
    document.querySelector('#empty-state').hidden = visible > 0;
}
buttons.forEach(button => button.addEventListener('click', () => {
    category = button.dataset.filter;
    buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    filterProjects(true);
}));
search.addEventListener('input', () => filterProjects(true));
document.querySelector('#year').textContent = new Date().getFullYear();
filterProjects();
