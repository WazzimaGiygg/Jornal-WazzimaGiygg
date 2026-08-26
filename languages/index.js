// languages/index.js
const LanguageManager = {
    currentLang: 'pt',
    translations: {},
    availableLanguages: {
        'pt': { name: 'Português', nativeName: 'Português', flag: '🇧🇷' },
        'en': { name: 'English', nativeName: 'English', flag: '🇺🇸' },
        'es': { name: 'Español', nativeName: 'Español', flag: '🇪🇸' },
        'fr': { name: 'Français', nativeName: 'Français', flag: '🇫🇷' },
        'de': { name: 'Deutsch', nativeName: 'Deutsch', flag: '🇩🇪' },
        'it': { name: 'Italiano', nativeName: 'Italiano', flag: '🇮🇹' },
        'ja': { name: '日本語', nativeName: '日本語', flag: '🇯🇵' },
        'zh': { name: '中文', nativeName: '中文', flag: '🇨🇳' }
    },
    
    // Caminho base para os arquivos de tradução
    basePath: 'languages/',
    
    // Inicializa o gerenciador
    async init(defaultLang = 'pt') {
        // Detecta idioma do navegador
        const browserLang = navigator.language.split('-')[0];
        
        // Verifica se há preferência salva
        const savedLang = localStorage.getItem('wzzm_language');
        
        // Define o idioma (prioridade: salvo > navegador > padrão)
        let lang = savedLang || browserLang || defaultLang;
        
        // Verifica se o idioma é suportado
        if (!this.availableLanguages[lang]) {
            lang = defaultLang;
        }
        
        this.currentLang = lang;
        await this.loadLanguage(lang);
        this.setLanguageSelector();
        this.applyTranslations();
        this.updateDateLocale();
        
        // Notifica que o idioma foi alterado
        document.dispatchEvent(new CustomEvent('languageChanged', { 
            detail: { language: lang } 
        }));
        
        return lang;
    },
    
    // Carrega um idioma específico
    async loadLanguage(lang) {
        try {
            const response = await fetch(`${this.basePath}${lang}.js`);
            const text = await response.text();
            
            // Extrai o objeto de tradução do arquivo
            const match = text.match(/const translations\s*=\s*({[\s\S]*?});/);
            if (match) {
                const data = eval('(' + match[1] + ')');
                this.translations = data;
                this.currentLang = lang;
                localStorage.setItem('wzzm_language', lang);
                return true;
            }
            throw new Error('Formato de tradução inválido');
        } catch (error) {
            console.error(`Erro ao carregar idioma ${lang}:`, error);
            // Tenta carregar o idioma padrão
            if (lang !== 'pt') {
                console.log('Tentando carregar Português como fallback...');
                return this.loadLanguage('pt');
            }
            return false;
        }
    },
    
    // Traduz uma chave
    translate(key, params = {}) {
        let text = this.translations[key] || key;
        
        // Substitui parâmetros
        Object.keys(params).forEach(param => {
            text = text.replace(new RegExp(`{${param}}`, 'g'), params[param]);
        });
        
        return text;
    },
    
    // Aplica traduções a todos os elementos com data-i18n
    applyTranslations() {
        // Atualiza elementos com data-i18n
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const translation = this.translate(key);
            if (translation && translation !== key) {
                if (el.tagName === 'INPUT' && el.getAttribute('data-i18n-attr') === 'placeholder') {
                    el.placeholder = translation;
                } else if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    // Não altera valor de inputs
                } else {
                    el.textContent = translation;
                }
            }
        });
        
        // Atualiza atributos específicos
        document.querySelectorAll('[data-i18n-attr]').forEach(el => {
            const attr = el.getAttribute('data-i18n-attr');
            const key = el.getAttribute('data-i18n');
            const translation = this.translate(key);
            if (translation && translation !== key) {
                el.setAttribute(attr, translation);
            }
        });
        
        // Atualiza o título da página
        const titleKey = document.querySelector('title')?.getAttribute('data-i18n');
        if (titleKey) {
            const translation = this.translate(titleKey);
            if (translation && translation !== titleKey) {
                document.title = translation;
            }
        }
    },
    
    // Cria o seletor de idioma
    setLanguageSelector() {
        // Remove seletor existente
        const existing = document.getElementById('languageSelector');
        if (existing) existing.remove();
        
        // Cria novo seletor
        const selector = document.createElement('div');
        selector.id = 'languageSelector';
        selector.className = 'language-selector';
        selector.setAttribute('data-i18n', 'idioma');
        
        const currentLang = this.availableLanguages[this.currentLang];
        
        selector.innerHTML = `
            <button class="lang-toggle" onclick="LanguageManager.toggleDropdown()">
                <span class="lang-flag">${currentLang.flag}</span>
                <span class="lang-code">${this.currentLang.toUpperCase()}</span>
                <span class="lang-arrow">▼</span>
            </button>
            <div class="lang-dropdown" id="langDropdown">
                ${Object.entries(this.availableLanguages).map(([code, lang]) => `
                    <button class="lang-option ${code === this.currentLang ? 'active' : ''}" 
                            onclick="LanguageManager.changeLanguage('${code}')">
                        <span class="lang-flag">${lang.flag}</span>
                        <span class="lang-name">${lang.nativeName}</span>
                        <span class="lang-code-small">${code.toUpperCase()}</span>
                    </button>
                `).join('')}
            </div>
        `;
        
        // Adiciona ao header
        const headerContent = document.querySelector('.header-content');
        if (headerContent) {
            headerContent.appendChild(selector);
        }
        
        // Adiciona estilos do seletor
        this.addSelectorStyles();
    },
    
    // Estilos do seletor de idioma
    addSelectorStyles() {
        if (document.getElementById('langSelectorStyles')) return;
        
        const styles = document.createElement('style');
        styles.id = 'langSelectorStyles';
        styles.textContent = `
            .language-selector {
                position: relative;
                display: inline-flex;
                align-items: center;
                margin-left: 10px;
            }
            
            .lang-toggle {
                background: rgba(255,255,255,0.1);
                border: 1px solid rgba(255,255,255,0.2);
                color: white;
                padding: 6px 12px;
                border-radius: 20px;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 6px;
                font-size: 12px;
                transition: all 0.3s;
            }
            
            .lang-toggle:hover {
                background: rgba(255,255,255,0.2);
            }
            
            .lang-flag {
                font-size: 16px;
            }
            
            .lang-code {
                font-weight: 600;
                font-size: 11px;
            }
            
            .lang-arrow {
                font-size: 10px;
                transition: transform 0.3s;
            }
            
            .lang-toggle.active .lang-arrow {
                transform: rotate(180deg);
            }
            
            .lang-dropdown {
                position: absolute;
                top: calc(100% + 8px);
                right: 0;
                background: #1a1a2e;
                border-radius: 12px;
                padding: 8px;
                min-width: 200px;
                box-shadow: 0 8px 30px rgba(0,0,0,0.4);
                display: none;
                z-index: 200;
                border: 1px solid rgba(255,255,255,0.1);
            }
            
            .lang-dropdown.show {
                display: block;
            }
            
            .lang-option {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 8px 12px;
                width: 100%;
                background: none;
                border: none;
                color: #ddd;
                cursor: pointer;
                border-radius: 8px;
                transition: all 0.2s;
                font-size: 13px;
            }
            
            .lang-option:hover {
                background: rgba(255,255,255,0.1);
                color: white;
            }
            
            .lang-option.active {
                background: rgba(74, 158, 255, 0.2);
                color: #4a9eff;
            }
            
            .lang-name {
                flex: 1;
                text-align: left;
            }
            
            .lang-code-small {
                font-size: 10px;
                opacity: 0.5;
                font-weight: 300;
            }
            
            @media (max-width: 768px) {
                .language-selector {
                    margin-left: 0;
                }
                .lang-name {
                    font-size: 12px;
                }
                .lang-code {
                    display: none;
                }
            }
        `;
        document.head.appendChild(styles);
    },
    
    // Alterna o dropdown
    toggleDropdown() {
        const dropdown = document.getElementById('langDropdown');
        const toggle = document.querySelector('.lang-toggle');
        if (dropdown) {
            dropdown.classList.toggle('show');
            toggle?.classList.toggle('active');
        }
    },
    
    // Muda o idioma
    async changeLanguage(lang) {
        if (lang === this.currentLang) {
            this.toggleDropdown();
            return;
        }
        
        // Mostra indicador de loading
        const toggle = document.querySelector('.lang-toggle');
        const originalText = toggle?.textContent;
        if (toggle) {
            toggle.textContent = '⏳';
            toggle.disabled = true;
        }
        
        const success = await this.loadLanguage(lang);
        
        if (success) {
            this.currentLang = lang;
            this.applyTranslations();
            this.updateDateLocale();
            this.setLanguageSelector();
            
            // Dispara evento
            document.dispatchEvent(new CustomEvent('languageChanged', { 
                detail: { language: lang } 
            }));
            
            // Recarrega artigos para atualizar textos
            if (typeof loadArticles === 'function') {
                loadArticles();
            }
            
            // Mostra toast
            const langName = this.availableLanguages[lang].nativeName;
            if (typeof showToast === 'function') {
                showToast(`🌍 Idioma alterado para ${langName}`);
            }
        }
        
        // Restaura toggle
        if (toggle) {
            toggle.textContent = originalText || '🌍';
            toggle.disabled = false;
        }
    },
    
    // Atualiza data no idioma atual
    updateDateLocale() {
        const dateElement = document.getElementById('currentDate');
        if (dateElement) {
            const now = new Date();
            const options = {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            };
            
            try {
                // Tenta usar o locale nativo
                const localeMap = {
                    'pt': 'pt-BR',
                    'en': 'en-US',
                    'es': 'es-ES',
                    'fr': 'fr-FR',
                    'de': 'de-DE',
                    'it': 'it-IT',
                    'ja': 'ja-JP',
                    'zh': 'zh-CN'
                };
                const locale = localeMap[this.currentLang] || 'pt-BR';
                dateElement.textContent = now.toLocaleDateString(locale, options);
            } catch {
                // Fallback: usa traduções manuais
                const weekdays = {
                    'pt': ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'],
                    'en': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                    'es': ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
                    'fr': ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
                    'de': ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
                    'it': ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'],
                    'ja': ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
                    'zh': ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
                };
                
                const months = {
                    'pt': ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'],
                    'en': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                    'es': ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
                    'fr': ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
                    'de': ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
                    'it': ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'],
                    'ja': ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                    'zh': ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
                };
                
                const wd = weekdays[this.currentLang] || weekdays['pt'];
                const m = months[this.currentLang] || months['pt'];
                const day = now.getDay();
                const month = now.getMonth();
                const date = now.getDate();
                const year = now.getFullYear();
                
                dateElement.textContent = `${wd[day]}, ${date} ${m[month]} ${year}`;
            }
        }
    },
    
    // Traduz os meses
    getMonthName(monthIndex) {
        const months = {
            'pt': ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'],
            'en': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            'es': ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
            'fr': ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
            'de': ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember']
        };
        return (months[this.currentLang] || months['pt'])[monthIndex] || '';
    },
    
    // Formata data com tradução
    formatDate(date) {
        if (!date) return '';
        const d = date.toDate ? date.toDate() : new Date(date);
        const day = d.getDate().toString().padStart(2, '0');
        const month = this.getMonthName(d.getMonth());
        const year = d.getFullYear();
        return `${day} ${month} ${year}`;
    }
};

// Exporta o gerenciador
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LanguageManager;
}

// Disponibiliza globalmente
window.LanguageManager = LanguageManager;
