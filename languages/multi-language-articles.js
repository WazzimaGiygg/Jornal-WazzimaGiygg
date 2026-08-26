// languages/multi-language-articles.js
// ============================================
// SISTEMA DE ARTIGOS MULTI-IDIOMA
// ============================================

class MultiLanguageArticles {
    constructor() {
        this.languages = ['pt', 'en', 'es', 'fr', 'de', 'it', 'ja', 'zh'];
        this.defaultLanguage = 'pt';
        this.currentLanguage = window.LanguageManager?.currentLang || 'pt';
        
        // Escuta mudanças de idioma
        document.addEventListener('languageChanged', (e) => {
            this.currentLanguage = e.detail.language;
            this.refreshArticles();
        });
        
        console.log('🌍 MultiLanguageArticles inicializado');
    }
    
    // ============================================
    // BUSCA ARTIGOS NO IDIOMA DO USUÁRIO
    // ============================================
    async searchArticles(language = null, category = null, limit = 50) {
        const targetLang = language || this.currentLanguage || 'pt';
        
        try {
            // Busca artigos ordenados por data
            let query = db.collection('articlesdoc')
                .orderBy('dataPublicacao', 'desc')
                .limit(limit);
            
            if (category && category !== 'todos') {
                query = query.where('categoria', '==', category);
            }
            
            const snapshot = await query.get();
            const articles = [];
            
            snapshot.forEach(doc => {
                const data = doc.data();
                const article = { id: doc.id, ...data };
                
                // Verifica se o artigo está disponível no idioma do usuário
                const translatedArticle = this.getArticleInLanguage(article, targetLang);
                if (translatedArticle) {
                    articles.push(translatedArticle);
                }
            });
            
            return articles;
        } catch (error) {
            console.error('Erro ao buscar artigos:', error);
            return [];
        }
    }
    
    // ============================================
    // OBTÉM UM ARTIGO NO IDIOMA ESPECIFICADO
    // ============================================
    getArticleInLanguage(article, targetLang = null) {
        if (!article) return null;
        
        const lang = targetLang || this.currentLanguage || 'pt';
        
        // Se o artigo não for multi-idioma
        if (!article.isMultiLanguage) {
            // Se o idioma do artigo for português (padrão) ou se o usuário quiser português
            if (article.language === 'pt' || lang === 'pt') {
                return {
                    ...article,
                    _currentLanguage: article.language || 'pt'
                };
            }
            // Se o artigo for em outro idioma e o usuário quer outro, tenta encontrar
            if (article.language === lang) {
                return {
                    ...article,
                    _currentLanguage: lang
                };
            }
            // Fallback: retorna o artigo em português
            return {
                ...article,
                _currentLanguage: 'pt',
                _isFallback: true
            };
        }
        
        // Se for multi-idioma
        const translations = article.translations || {};
        const languages = article.languages || ['pt'];
        
        // 1. Tenta encontrar no idioma solicitado
        if (translations[lang]) {
            return {
                ...article,
                titulo: translations[lang].titulo || article.titulo,
                resumo: translations[lang].resumo || article.resumo,
                conteudo: translations[lang].conteudo || article.conteudo,
                _currentLanguage: lang,
                _availableLanguages: languages
            };
        }
        
        // 2. Fallback: tenta português
        if (translations['pt']) {
            return {
                ...article,
                titulo: translations['pt'].titulo || article.titulo,
                resumo: translations['pt'].resumo || article.resumo,
                conteudo: translations['pt'].conteudo || article.conteudo,
                _currentLanguage: 'pt',
                _availableLanguages: languages,
                _isFallback: true
            };
        }
        
        // 3. Fallback: usa o título original
        return {
            ...article,
            _currentLanguage: 'pt',
            _availableLanguages: languages,
            _isFallback: true
        };
    }
    
    // ============================================
    // BUSCA ARTIGO POR ID COM TRADUÇÃO
    // ============================================
    async getArticleById(articleId, language = null) {
        try {
            const doc = await db.collection('articlesdoc').doc(articleId).get();
            if (!doc.exists) return null;
            
            const data = doc.data();
            const article = { id: doc.id, ...data };
            
            return this.getArticleInLanguage(article, language);
        } catch (error) {
            console.error('Erro ao buscar artigo por ID:', error);
            return null;
        }
    }
    
    // ============================================
    // VERIFICA SE UM ARTIGO ESTÁ DISPONÍVEL EM UM IDIOMA
    // ============================================
    isArticleAvailableInLanguage(article, language) {
        if (!article) return false;
        
        if (!article.isMultiLanguage) {
            return article.language === language || (language === 'pt' && !article.language);
        }
        
        const translations = article.translations || {};
        return !!translations[language];
    }
    
    // ============================================
    // OBTÉM LISTA DE IDIOMAS DISPONÍVEIS PARA UM ARTIGO
    // ============================================
    getAvailableLanguagesForArticle(article) {
        if (!article) return ['pt'];
        
        if (!article.isMultiLanguage) {
            return [article.language || 'pt'];
        }
        
        return article.languages || ['pt'];
    }
    
    // ============================================
    // SALVA ARTIGO COM MÚLTIPLOS IDIOMAS
    // ============================================
    async saveArticleWithLanguages(articleData, languages = ['pt']) {
        if (!articleData.titulo || !articleData.resumo) {
            throw new Error('Título e resumo são obrigatórios');
        }
        
        // Se for apenas Português, salva normalmente
        if (languages.length === 1 && languages[0] === 'pt') {
            return await this.saveSingleLanguageArticle(articleData);
        }
        
        // Cria um artigo mestre com referências
        const masterData = {
            titulo: articleData.titulo,
            categoria: articleData.categoria,
            resumo: articleData.resumo,
            conteudo: articleData.conteudo,
            imagemUrl: articleData.imagemUrl || null,
            autorId: articleData.autorId,
            autorNome: articleData.autorNome,
            autorEmail: articleData.autorEmail,
            dataPublicacao: firebase.firestore.FieldValue.serverTimestamp(),
            ultimaEdicao: firebase.firestore.FieldValue.serverTimestamp(),
            visualizacoes: 0,
            isMultiLanguage: true,
            languages: languages,
            defaultLanguage: 'pt',
            translations: {}
        };
        
        // Adiciona traduções para cada idioma
        for (const lang of languages) {
            if (lang === 'pt') {
                masterData.translations[lang] = {
                    titulo: articleData.titulo,
                    resumo: articleData.resumo,
                    conteudo: articleData.conteudo
                };
            } else {
                const translationKey = `translation_${lang}`;
                if (articleData[translationKey]) {
                    masterData.translations[lang] = articleData[translationKey];
                } else {
                    masterData.translations[lang] = {
                        titulo: `[${lang.toUpperCase()}] ${articleData.titulo}`,
                        resumo: `[${lang.toUpperCase()}] ${articleData.resumo}`,
                        conteudo: `[${lang.toUpperCase()}] ${articleData.conteudo}`
                    };
                }
            }
        }
        
        const docRef = await db.collection('articlesdoc').add(masterData);
        return docRef;
    }
    
    // ============================================
    // SALVA ARTIGO EM UM ÚNICO IDIOMA
    // ============================================
    async saveSingleLanguageArticle(articleData) {
        const data = {
            ...articleData,
            isMultiLanguage: false,
            language: 'pt',
            dataPublicacao: firebase.firestore.FieldValue.serverTimestamp(),
            ultimaEdicao: firebase.firestore.FieldValue.serverTimestamp(),
            visualizacoes: 0
        };
        
        const docRef = await db.collection('articlesdoc').add(data);
        return docRef;
    }
    
    // ============================================
    // ATUALIZA TRADUÇÃO DE UM ARTIGO
    // ============================================
    async updateTranslation(articleId, language, translationData) {
        try {
            const docRef = db.collection('articlesdoc').doc(articleId);
            const doc = await docRef.get();
            if (!doc.exists) throw new Error('Artigo não encontrado');
            
            const data = doc.data();
            
            if (!data.isMultiLanguage) {
                // Converte para multi-idioma
                const newData = {
                    ...data,
                    isMultiLanguage: true,
                    languages: ['pt', language],
                    defaultLanguage: 'pt',
                    translations: {
                        pt: {
                            titulo: data.titulo,
                            resumo: data.resumo,
                            conteudo: data.conteudo
                        }
                    }
                };
                newData.translations[language] = translationData;
                await docRef.update(newData);
            } else {
                // Atualiza tradução existente
                const translations = data.translations || {};
                translations[language] = translationData;
                const languages = data.languages || ['pt'];
                if (!languages.includes(language)) {
                    languages.push(language);
                }
                await docRef.update({
                    translations: translations,
                    languages: languages
                });
            }
            return true;
        } catch (error) {
            console.error('Erro ao atualizar tradução:', error);
            throw error;
        }
    }
    
    // ============================================
    // REFRESCA ARTIGOS AO MUDAR IDIOMA
    // ============================================
    refreshArticles() {
        if (typeof window.loadArticles === 'function') {
            window.loadArticles();
        }
    }
    
    // ============================================
    // FILTRA ARTIGOS POR IDIOMA E CATEGORIA
    // ============================================
    async filterArticlesByLanguageAndCategory(language, category) {
        const articles = await this.searchArticles(language, category);
        return articles.filter(article => {
            // Verifica se o artigo está disponível no idioma
            return this.isArticleAvailableInLanguage(article, language);
        });
    }
    
    // ============================================
    // OBTÉM ESTATÍSTICAS DE IDIOMAS
    // ============================================
    async getLanguageStats() {
        try {
            const snapshot = await db.collection('articlesdoc').get();
            const stats = {
                total: 0,
                byLanguage: {},
                multiLanguage: 0,
                singleLanguage: 0
            };
            
            snapshot.forEach(doc => {
                const data = doc.data();
                stats.total++;
                
                if (data.isMultiLanguage) {
                    stats.multiLanguage++;
                    const languages = data.languages || ['pt'];
                    languages.forEach(lang => {
                        stats.byLanguage[lang] = (stats.byLanguage[lang] || 0) + 1;
                    });
                } else {
                    stats.singleLanguage++;
                    const lang = data.language || 'pt';
                    stats.byLanguage[lang] = (stats.byLanguage[lang] || 0) + 1;
                }
            });
            
            return stats;
        } catch (error) {
            console.error('Erro ao obter estatísticas:', error);
            return null;
        }
    }
}

// ============================================
// INICIALIZAÇÃO
// ============================================
let multiLangArticles = null;

// Inicializa quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    if (typeof MultiLanguageArticles !== 'undefined') {
        multiLangArticles = new MultiLanguageArticles();
        window.multiLangArticles = multiLangArticles;
        console.log('✅ MultiLanguageArticles inicializado e disponível globalmente');
    }
});

// Inicializa também se o Firebase já estiver pronto
if (typeof firebase !== 'undefined' && firebase.auth) {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user && !multiLangArticles) {
            multiLangArticles = new MultiLanguageArticles();
            window.multiLangArticles = multiLangArticles;
            console.log('✅ MultiLanguageArticles inicializado após autenticação');
        }
    });
}

// Disponibiliza globalmente
window.MultiLanguageArticles = MultiLanguageArticles;
