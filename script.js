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

    // 2. Sistema de Favoritos (LocalStorage)
    const STORAGE_KEY = 'radaria_user_favorites';
    
    function getFavorites() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        } catch {
            return [];
        }
    }

    function saveFavorites(favs) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(favs));
        } catch (e) {
            console.error('Erro ao salvar favoritos:', e);
        }
    }

    function initFavorites() {
        const favButtons = document.querySelectorAll('.fav-btn');
        const favorites = getFavorites();

        favButtons.forEach(btn => {
            const card = btn.closest('.card, .tool-card');
            const toolId = card?.getAttribute('data-id') || btn.getAttribute('data-id');
            if (!toolId) return;

            const isFav = favorites.includes(toolId);
            btn.classList.toggle('active', isFav);
            btn.innerHTML = isFav ? '★' : '☆';
            btn.setAttribute('aria-label', isFav ? 'Remover dos favoritos' : 'Adicionar aos favoritos');
            btn.setAttribute('title', isFav ? 'Salvo nos Favoritos' : 'Salvar nos Favoritos');

            // Click listener
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();

                let currentFavs = getFavorites();
                const nowFav = !currentFavs.includes(toolId);

                if (nowFav) {
                    currentFavs.push(toolId);
                } else {
                    currentFavs = currentFavs.filter(id => id !== toolId);
                }

                saveFavorites(currentFavs);

                // Atualizar todos os botões com o mesmo id na página
                document.querySelectorAll(`.fav-btn[data-id="${toolId}"]`).forEach(b => {
                    b.classList.toggle('active', nowFav);
                    b.innerHTML = nowFav ? '★' : '☆';
                    b.setAttribute('aria-label', nowFav ? 'Remover dos favoritos' : 'Adicionar aos favoritos');
                    b.setAttribute('title', nowFav ? 'Salvo nos Favoritos' : 'Salvar nos Favoritos');
                });

                // Se o filtro ativo for de favoritos, re-filtrar
                if (window.activePriceFilter === 'favoritos') {
                    window.filterToolsFn && window.filterToolsFn();
                }
            });
        });
    }

    // 3. Busca e Filtro Multi-critério (index.html e ferramentas.html)
    const searchInput = document.getElementById('tool-search');
    const categoryChips = document.querySelectorAll('.filter-chips:not(.pricing-chips) .filter-chip');
    const priceChips = document.querySelectorAll('.pricing-chips .filter-chip');
    const toolCards = document.querySelectorAll('.tools-grid .tool-card, .cards .card');
    const countDisplay = document.getElementById('tools-count');
    const noResultsMsg = document.getElementById('no-results-msg');

    if (toolCards.length > 0) {
        let activeCategory = 'todas';
        let activePrice = 'todos';
        window.activePriceFilter = activePrice;

        function filterTools() {
            const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
            const favorites = getFavorites();
            let visibleCount = 0;

            toolCards.forEach(card => {
                const toolId = card.getAttribute('data-id') || '';
                const title = (card.querySelector('h2') || card.querySelector('h3'))?.textContent.toLowerCase() || '';
                const desc = card.querySelector('p')?.textContent.toLowerCase() || '';
                const category = (card.getAttribute('data-category') || '').toLowerCase();
                const pricing = (card.getAttribute('data-pricing') || '').toLowerCase();

                const matchesQuery = !query || title.includes(query) || desc.includes(query) || category.includes(query);
                const matchesCategory = activeCategory === 'todas' || category.includes(activeCategory);
                
                let matchesPrice = true;
                if (activePrice === 'favoritos') {
                    matchesPrice = favorites.includes(toolId);
                } else if (activePrice !== 'todos') {
                    matchesPrice = pricing === activePrice;
                }

                if (matchesQuery && matchesCategory && matchesPrice) {
                    card.style.display = '';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });

            if (countDisplay) {
                let suffix = '';
                if (activePrice === 'favoritos') suffix = ' nos Favoritos';
                countDisplay.textContent = `${visibleCount} ferramenta${visibleCount === 1 ? '' : 's'} encontrada${visibleCount === 1 ? '' : 's'}${suffix}`;
            }

            if (noResultsMsg) {
                noResultsMsg.style.display = visibleCount === 0 ? 'block' : 'none';
            }
        }

        window.filterToolsFn = filterTools;

        if (searchInput) {
            searchInput.addEventListener('input', filterTools);
        }

        // Filtro de Categoria
        categoryChips.forEach(chip => {
            chip.addEventListener('click', () => {
                categoryChips.forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                activeCategory = chip.getAttribute('data-filter') || 'todas';
                filterTools();
            });
        });

        // Filtro de Preço / Favoritos
        priceChips.forEach(chip => {
            chip.addEventListener('click', () => {
                priceChips.forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                activePrice = chip.getAttribute('data-price') || 'todos';
                window.activePriceFilter = activePrice;
                filterTools();
            });
        });

        initFavorites();
        filterTools();
    } else {
        initFavorites();
    }

    // 4. Busca e Filtro de Artigos (artigos.html)
    const articleSearchInput = document.getElementById('article-search');
    const articleFilterChips = document.querySelectorAll('.article-filter-chip');
    const articleCards = document.querySelectorAll('.articles-grid .article-card');
    const articleCountDisplay = document.getElementById('articles-count');
    const articleNoResultsMsg = document.getElementById('article-no-results');

    if (articleCards.length > 0 && (articleSearchInput || articleFilterChips.length > 0)) {
        let activeArticleCategory = 'todos';

        function filterArticles() {
            const query = articleSearchInput ? articleSearchInput.value.toLowerCase().trim() : '';
            let visibleCount = 0;

            articleCards.forEach(card => {
                const title = card.querySelector('h2')?.textContent.toLowerCase() || '';
                const desc = card.querySelector('p')?.textContent.toLowerCase() || '';
                const category = (card.getAttribute('data-category') || '').toLowerCase();

                const matchesQuery = !query || title.includes(query) || desc.includes(query) || category.includes(query);
                const matchesCategory = activeArticleCategory === 'todos' || category.includes(activeArticleCategory);

                if (matchesQuery && matchesCategory) {
                    card.style.display = '';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });

            if (articleCountDisplay) {
                articleCountDisplay.textContent = `${visibleCount} artigo${visibleCount === 1 ? '' : 's'} disponível${visibleCount === 1 ? '' : 'is'}`;
            }

            if (articleNoResultsMsg) {
                articleNoResultsMsg.style.display = visibleCount === 0 ? 'block' : 'none';
            }
        }

        if (articleSearchInput) {
            articleSearchInput.addEventListener('input', filterArticles);
        }

        articleFilterChips.forEach(chip => {
            chip.addEventListener('click', () => {
                articleFilterChips.forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                activeArticleCategory = chip.getAttribute('data-filter') || 'todos';
                filterArticles();
            });
        });

        filterArticles();
    }

    // 5. Comparador de IAs - Alternância de Abas (comparador.html)
    const battleTabs = document.querySelectorAll('.battle-tab');
    const comparisonBoxes = document.querySelectorAll('.comparison-box');

    if (battleTabs.length > 0 && comparisonBoxes.length > 0) {
        battleTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetBattle = tab.getAttribute('data-battle');

                battleTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                comparisonBoxes.forEach(box => {
                    if (box.getAttribute('data-battle') === targetBattle) {
                        box.style.display = 'block';
                    } else {
                        box.style.display = 'none';
                    }
                });
            });
        });
    }

    // 6. Prompt Hub - Copiar Prompt com 1 Clique (prompts.html)
    const copyPromptBtns = document.querySelectorAll('.copy-prompt-btn');

    if (copyPromptBtns.length > 0) {
        copyPromptBtns.forEach(btn => {
            btn.addEventListener('click', async () => {
                const card = btn.closest('.prompt-card');
                const promptBox = card?.querySelector('.prompt-box');
                if (!promptBox) return;

                const textToCopy = promptBox.innerText.trim();

                try {
                    await navigator.clipboard.writeText(textToCopy);
                    const originalHtml = btn.innerHTML;
                    btn.classList.add('copied');
                    btn.innerHTML = '✓ Copiado para a Área de Transferência!';

                    setTimeout(() => {
                        btn.classList.remove('copied');
                        btn.innerHTML = originalHtml;
                    }, 2200);
                } catch (err) {
                    console.error('Erro ao copiar prompt:', err);
                }
            });
        });
    }

    // 7. Filtro no Prompt Hub (prompts.html)
    const promptSearchInput = document.getElementById('prompt-search');
    const promptFilterChips = document.querySelectorAll('.prompt-filter-chip');
    const promptCards = document.querySelectorAll('.prompt-card');
    const promptCountDisplay = document.getElementById('prompts-count');
    const promptNoResultsMsg = document.getElementById('prompts-no-results');

    if (promptCards.length > 0 && (promptSearchInput || promptFilterChips.length > 0)) {
        let activePromptCat = 'todos';

        function filterPrompts() {
            const query = promptSearchInput ? promptSearchInput.value.toLowerCase().trim() : '';
            let visibleCount = 0;

            promptCards.forEach(card => {
                const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
                const desc = card.querySelector('p')?.textContent.toLowerCase() || '';
                const body = card.querySelector('.prompt-box')?.textContent.toLowerCase() || '';
                const category = (card.getAttribute('data-category') || '').toLowerCase();

                const matchesQuery = !query || title.includes(query) || desc.includes(query) || body.includes(query);
                const matchesCat = activePromptCat === 'todos' || category.includes(activePromptCat);

                if (matchesQuery && matchesCat) {
                    card.style.display = '';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });

            if (promptCountDisplay) {
                promptCountDisplay.textContent = `${visibleCount} prompt${visibleCount === 1 ? '' : 's'} pronto${visibleCount === 1 ? '' : 's'}`;
            }

            if (promptNoResultsMsg) {
                promptNoResultsMsg.style.display = visibleCount === 0 ? 'block' : 'none';
            }
        }

        if (promptSearchInput) {
            promptSearchInput.addEventListener('input', filterPrompts);
        }

        promptFilterChips.forEach(chip => {
            chip.addEventListener('click', () => {
                promptFilterChips.forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                activePromptCat = chip.getAttribute('data-filter') || 'todos';
                filterPrompts();
            });
        });

        filterPrompts();
    }

    // 8. Formulário de Contato (contato.html)
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
