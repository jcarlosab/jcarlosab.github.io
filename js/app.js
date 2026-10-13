const search = document.querySelector('#project-search');
const buttons = [...document.querySelectorAll('[data-filter]')];
const cards = [...document.querySelectorAll('.project-card')];
let category = 'all';
const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
function filterProjects() {
    const query = normalize(search.value.trim());
    let visible = 0;
    cards.forEach(card => {
        const match = (category === 'all' || card.dataset.category === category) && normalize(card.textContent).includes(query);
        card.hidden = !match;
        if (match) visible++;
    });
    document.querySelector('#result-count').textContent = `${visible} ${visible === 1 ? 'proyecto' : 'proyectos'}`;
    document.querySelector('#empty-state').hidden = visible > 0;
}
buttons.forEach(button => button.addEventListener('click', () => {
    category = button.dataset.filter;
    buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    filterProjects();
}));
search.addEventListener('input', filterProjects);
document.querySelector('#year').textContent = new Date().getFullYear();
filterProjects();
