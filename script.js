// RadarIA - Scripts Interativos

document.addEventListener('DOMContentLoaded', () => {
    // 1. Menu Mobile Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('header nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            nav.classList.toggle('is-open');
            const isOpen = nav.classList.contains('is-open');
            menuToggle.setAttribute('aria-expanded', isOpen);
            menuToggle.innerHTML = isOpen ? '✕' : '☰';
        });

        // Fechar ao clicar fora do menu
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
                if (nav.classList.contains('is-open')) {
                    nav.classList.remove('is-open');
                    menuToggle.setAttribute('aria-expanded', 'false');
                    menuToggle.innerHTML = '☰';
                }
            }
        });

        // Fechar ao clicar em qualquer link da navegação
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (nav.classList.contains('is-open')) {
                    nav.classList.remove('is-open');
                    menuToggle.setAttribute('aria-expanded', 'false');
                    menuToggle.innerHTML = '☰';
                }
            });
        });
    }

    // 2. Busca e Filtro em Tempo Real (index.html e ferramentas.html)
    const searchInput = document.getElementById('tool-search');
    const filterChips = document.querySelectorAll('.filter-chip');
    const toolCards = document.querySelectorAll('.tools-grid .tool-card, .cards .card');
    const countDisplay = document.getElementById('tools-count');
    const noResultsMsg = document.getElementById('no-results-msg');

    if (toolCards.length > 0 && (searchInput || filterChips.length > 0)) {
        let activeCategory = 'todas';

        function filterTools() {
            const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
            let visibleCount = 0;

            toolCards.forEach(card => {
                const title = (card.querySelector('h2') || card.querySelector('h3'))?.textContent.toLowerCase() || '';
                const desc = card.querySelector('p')?.textContent.toLowerCase() || '';
                const category = (card.getAttribute('data-category') || '').toLowerCase();

                const matchesQuery = !query || title.includes(query) || desc.includes(query) || category.includes(query);
                const matchesCategory = activeCategory === 'todas' || category.includes(activeCategory);

                if (matchesQuery && matchesCategory) {
                    card.style.display = '';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });

            if (countDisplay) {
                countDisplay.textContent = `${visibleCount} ferramenta${visibleCount === 1 ? '' : 's'} encontrada${visibleCount === 1 ? '' : 's'}`;
            }

            if (noResultsMsg) {
                noResultsMsg.style.display = visibleCount === 0 ? 'block' : 'none';
            }
        }

        if (searchInput) {
            searchInput.addEventListener('input', filterTools);
        }

        filterChips.forEach(chip => {
            chip.addEventListener('click', () => {
                filterChips.forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                activeCategory = chip.getAttribute('data-filter') || 'todas';
                filterTools();
            });
        });

        // Contagem inicial
        filterTools();
    }

    // 3. Formulário de Contato (contato.html)
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');

            const name = document.getElementById('contact-name')?.value.trim();
            const email = document.getElementById('contact-email')?.value.trim();
            const message = document.getElementById('contact-message')?.value.trim();

            if (!name || !email || !message) {
                if (formFeedback) {
                    formFeedback.className = 'form-feedback alert-error';
                    formFeedback.textContent = 'Por favor, preencha todos os campos obrigatórios.';
                    formFeedback.style.display = 'block';
                }
                return;
            }

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Enviando mensagem...';
            }

            setTimeout(() => {
                if (formFeedback) {
                    formFeedback.className = 'form-feedback alert-success';
                    formFeedback.innerHTML = '<strong>Mensagem enviada com sucesso!</strong> Agradecemos o contato, responderemos em breve.';
                    formFeedback.style.display = 'block';
                }
                contactForm.reset();
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Enviar Mensagem';
                }
            }, 600);
        });
    }
});
