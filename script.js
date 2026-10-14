document.addEventListener('DOMContentLoaded', () => {
    // 1. Menu Mobile Moderno: Slide-over Drawer com Micro-animações e Backdrop Blur
    function initModernMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        if (!menuToggle) return;

        // Injetar as 3 barras animadas no botão hambúrguer
        menuToggle.innerHTML = `
            <div class="hamburger-icon" aria-hidden="true">
                <span class="hamburger-line"></span>
                <span class="hamburger-line"></span>
                <span class="hamburger-line"></span>
            </div>
        `;
        menuToggle.setAttribute('aria-label', 'Abrir menu de navegação');
        menuToggle.setAttribute('aria-expanded', 'false');

        // Determinar página atual para destacar o item ativo
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';

        // Criar Overlay Escuro com Backdrop Blur se não existir
        let overlay = document.querySelector('.mobile-drawer-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'mobile-drawer-overlay';
            overlay.setAttribute('aria-hidden', 'true');
            document.body.appendChild(overlay);
        }

        // Criar Drawer Lateral se não existir
        let drawer = document.querySelector('.mobile-drawer');
        if (!drawer) {
            drawer = document.createElement('aside');
            drawer.className = 'mobile-drawer';
            drawer.setAttribute('aria-label', 'Navegação mobile');
            drawer.setAttribute('role', 'dialog');
            drawer.setAttribute('aria-modal', 'true');

            drawer.innerHTML = `
                <div class="drawer-header">
                    <a href="index.html" class="drawer-brand" aria-label="RadarIA Início">
                        <img src="radaria_top_logo.png" alt="RadarIA" class="drawer-logo">
                    </a>
                    <button type="button" class="drawer-close-btn" aria-label="Fechar menu">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                <div class="drawer-search-box">
                    <form action="ferramentas.html" method="GET" class="drawer-search-form">
                        <span class="drawer-search-icon">🔍</span>
                        <input type="text" name="busca" class="drawer-search-input" placeholder="Buscar ferramentas, prompts..." aria-label="Buscar no RadarIA">
                    </form>
                </div>

                <div class="drawer-scrollable">
                    <div class="drawer-nav-section">
                        <span class="drawer-section-title">EXPLORAR RADAR</span>
                        
                        <a href="ferramentas.html" class="drawer-nav-item ${currentPath === 'ferramentas.html' ? 'active' : ''}">
                            <div class="drawer-nav-icon icon-blue">⚡</div>
                            <div class="drawer-nav-text">
                                <span class="drawer-nav-title">Ferramentas de IA</span>
                                <span class="drawer-nav-desc">15 soluções testadas e catalogadas</span>
                            </div>
                            <span class="drawer-nav-arrow">›</span>
                        </a>

                        <a href="comparador.html" class="drawer-nav-item ${currentPath === 'comparador.html' ? 'active' : ''}">
                            <div class="drawer-nav-icon icon-indigo">⚔️</div>
                            <div class="drawer-nav-text">
                                <div class="drawer-title-row">
                                    <span class="drawer-nav-title">Comparador Direto</span>
                                    <span class="drawer-badge badge-new">Novo</span>
                                </div>
                                <span class="drawer-nav-desc">Duelos de IAs lado a lado</span>
                            </div>
                            <span class="drawer-nav-arrow">›</span>
                        </a>

                        <a href="prompts.html" class="drawer-nav-item ${currentPath === 'prompts.html' ? 'active' : ''}">
                            <div class="drawer-nav-icon icon-emerald">📋</div>
                            <div class="drawer-nav-text">
                                <div class="drawer-title-row">
                                    <span class="drawer-nav-title">Prompt Hub</span>
                                    <span class="drawer-badge badge-pop">1-Clique</span>
                                </div>
                                <span class="drawer-nav-desc">Comandos profissionais testados</span>
                            </div>
                            <span class="drawer-nav-arrow">›</span>
                        </a>

                        <a href="categorias.html" class="drawer-nav-item ${currentPath === 'categorias.html' ? 'active' : ''}">
                            <div class="drawer-nav-icon icon-amber">🏷️</div>
                            <div class="drawer-nav-text">
                                <span class="drawer-nav-title">Categorias</span>
                                <span class="drawer-nav-desc">Explore por especialidade</span>
                            </div>
                            <span class="drawer-nav-arrow">›</span>
                        </a>

                        <a href="artigos.html" class="drawer-nav-item ${currentPath === 'artigos.html' || currentPath.startsWith('artigo-') ? 'active' : ''}">
                            <div class="drawer-nav-icon icon-purple">📰</div>
                            <div class="drawer-nav-text">
                                <div class="drawer-title-row">
                                    <span class="drawer-nav-title">Artigos & Guias</span>
                                    <span class="drawer-badge badge-info">10 Guias</span>
                                </div>
                                <span class="drawer-nav-desc">Análises aprofundadas e tutoriais</span>
                            </div>
                            <span class="drawer-nav-arrow">›</span>
                        </a>
                    </div>

                    <div class="drawer-nav-section">
                        <span class="drawer-section-title">CATEGORIAS EM ALTA</span>
                        <div class="drawer-categories-pills">
                            <a href="categoria-escrita.html" class="drawer-cat-pill">✍️ Escrita</a>
                            <a href="categoria-imagens.html" class="drawer-cat-pill">🎨 Imagens</a>
                            <a href="categoria-programacao.html" class="drawer-cat-pill">💻 Código</a>
                            <a href="categoria-video.html" class="drawer-cat-pill">🎬 Vídeo</a>
                            <a href="categoria-audio.html" class="drawer-cat-pill">🎙️ Áudio</a>
                            <a href="categoria-produtividade.html" class="drawer-cat-pill">⚡ Produtividade</a>
                        </div>
                    </div>

                    <div class="drawer-nav-section">
                        <span class="drawer-section-title">INSTITUCIONAL</span>
                        
                        <a href="sobre.html" class="drawer-nav-item ${currentPath === 'sobre.html' ? 'active' : ''}">
                            <div class="drawer-nav-icon icon-slate">ℹ️</div>
                            <div class="drawer-nav-text">
                                <span class="drawer-nav-title">Sobre o RadarIA</span>
                                <span class="drawer-nav-desc">Nossa proposta e curadoria</span>
                            </div>
                            <span class="drawer-nav-arrow">›</span>
                        </a>

                        <a href="contato.html" class="drawer-nav-item ${currentPath === 'contato.html' ? 'active' : ''}">
                            <div class="drawer-nav-icon icon-cyan">✉️</div>
                            <div class="drawer-nav-text">
                                <span class="drawer-nav-title">Contato</span>
                                <span class="drawer-nav-desc">Dúvidas, parcerias ou sugestões</span>
                            </div>
                            <span class="drawer-nav-arrow">›</span>
                        </a>
                    </div>
                </div>

                <div class="drawer-footer">
                    <a href="comparador.html" class="drawer-cta-primary">
                        <span>⚔️ Duelo de IAs: Comparar Agora</span>
                    </a>
                    <div class="drawer-footer-credits">
                        <span>RadarIA ⚡ O portal definitivo de inteligência artificial</span>
                    </div>
                </div>
            `;
            document.body.appendChild(drawer);
        }

        const closeBtn = drawer.querySelector('.drawer-close-btn');

        function openMenu() {
            drawer.classList.add('is-open');
            overlay.classList.add('is-visible');
            menuToggle.classList.add('is-active');
            menuToggle.setAttribute('aria-expanded', 'true');
            document.body.classList.add('drawer-open');

            // Animar entrada fluida dos itens
            const items = drawer.querySelectorAll('.drawer-nav-item, .drawer-cat-pill');
            items.forEach((item, index) => {
                item.style.animation = `drawerItemFadeIn 0.32s cubic-bezier(0.16, 1, 0.3, 1) ${0.03 + index * 0.02}s backwards`;
            });
        }

        function closeMenu() {
            drawer.classList.remove('is-open');
            overlay.classList.remove('is-visible');
            menuToggle.classList.remove('is-active');
            menuToggle.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('drawer-open');
            drawer.style.transform = '';
        }

        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            if (drawer.classList.contains('is-open')) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', closeMenu);
        }

        overlay.addEventListener('click', closeMenu);

        // Fechar com tecla ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
                closeMenu();
            }
        });

        // Fechar ao clicar em qualquer link interno
        drawer.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                closeMenu();
            });
        });

        // Busca rápida no Drawer com redirecionamento inteligente
        const drawerSearchForm = drawer.querySelector('.drawer-search-form');
        const drawerSearchInput = drawer.querySelector('.drawer-search-input');
        if (drawerSearchForm && drawerSearchInput) {
            drawerSearchForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const term = drawerSearchInput.value.trim();
                if (!term) return;
                closeMenu();

                const isToolsPage = window.location.pathname.endsWith('ferramentas.html') || 
                                    window.location.pathname.endsWith('index.html');
                const pageSearch = document.getElementById('tool-search');

                if (isToolsPage && pageSearch) {
                    pageSearch.value = term;
                    pageSearch.focus();
                    window.filterToolsFn && window.filterToolsFn();
                    pageSearch.scrollIntoView({ behavior: 'smooth', block: 'center' });
                } else {
                    window.location.href = `ferramentas.html?busca=${encodeURIComponent(term)}`;
                }
            });
        }

        // Gesto de Swipe para a direita no celular (fechamento natural por toque)
        let touchStartX = 0;
        let touchCurrentX = 0;

        drawer.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            touchCurrentX = touchStartX;
        }, { passive: true });

        drawer.addEventListener('touchmove', (e) => {
            touchCurrentX = e.touches[0].clientX;
            const diff = touchCurrentX - touchStartX;
            if (diff > 0) {
                drawer.style.transform = `translateX(${diff}px)`;
            }
        }, { passive: true });

        drawer.addEventListener('touchend', () => {
            const diff = touchCurrentX - touchStartX;
            drawer.style.transform = '';
            if (diff > 75) {
                closeMenu();
            }
        });

        // Fechar automaticamente se a tela for redimensionada para desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && drawer.classList.contains('is-open')) {
                closeMenu();
            }
        });
    }

    initModernMobileMenu();

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

        // Leitura de parâmetros de busca via URL (ex: ?busca=deepseek ou ?q=deepseek)
        const urlParams = new URLSearchParams(window.location.search);
        const queryParam = urlParams.get('busca') || urlParams.get('q');
        if (queryParam && searchInput) {
            searchInput.value = queryParam;
        }

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
