(() => {
    const system = window.matchMedia('(prefers-color-scheme: dark)');
    let saved;
    try { saved = localStorage.getItem('portfolio-theme'); } catch {}
    let explicit = saved === 'dark' || saved === 'light';
    const apply = theme => {
        document.documentElement.dataset.theme = theme;
        const button = document.getElementById('theme-toggle');
        if (!button) return;
        const dark = theme === 'dark';
        button.setAttribute('aria-pressed', String(dark));
        button.setAttribute('aria-label', dark ? 'Activar modo claro' : 'Activar modo oscuro');
        document.getElementById('theme-label').textContent = dark ? 'Claro' : 'Oscuro';
        document.getElementById('theme-icon').textContent = dark ? '☀' : '◐';
    };
    apply(explicit ? saved : system.matches ? 'dark' : 'light');
    system.addEventListener('change', event => {
        if (!explicit) apply(event.matches ? 'dark' : 'light');
    });
    document.addEventListener('DOMContentLoaded', () => {
        apply(document.documentElement.dataset.theme);
        document.getElementById('theme-toggle').addEventListener('click', () => {
            const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
            explicit = true;
            apply(theme);
            try { localStorage.setItem('portfolio-theme', theme); } catch {}
        });
    });
})();
