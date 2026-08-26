// multi-language-articles.js
class MultiLanguageArticles {
    constructor() {
        this.languages = ['pt', 'en', 'es', 'fr', 'de', 'it', 'ja', 'zh'];
        this.defaultLanguage = 'pt';
        this.currentLanguage = window.LanguageManager?.currentLang || 'pt';
        
        document.addEventListener('languageChanged', (e) => {
            this.currentLanguage = e.detail.language;
            this.refreshArticles();
        });
    }
    
    async saveArticleWithLanguages(articleData, languages = ['pt']) {
        if (!articleData.titulo || !articleData.resumo) {
            throw new Error('Título e resumo são obrigatórios');
        }
        
        if (languages.length === 1 && languages[0] === 'pt') {
            return await this.saveSingleLanguageArticle(articleData);
        }
        
        const masterData = {
            titulo: articleData.titulo,
            categoria: articleData.categoria,
            resumo: articleData.resumo,
            conteudo: articleData.conteudo,
            imagemUrl: articleData.imagemUrl,
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
    
    async getArticleInLanguage(articleId) {
        const doc = await db.collection('articlesdoc').doc(articleId).get();
        if (!doc.exists) return null;
        
        const data = doc.data();
        
        if (!data.isMultiLanguage) {
            return { id: doc.id, ...data };
        }
        
        const currentLang = this.currentLanguage;
        const translation = data.translations?.[currentLang];
        
        if (translation) {
            return {
                id: doc.id,
                ...data,
                titulo: translation.titulo || data.titulo,
                resumo: translation.resumo || data.resumo,
                conteudo: translation.conteudo || data.conteudo,
                _originalLanguage: 'pt',
                _currentLanguage: currentLang
            };
        }
        
        return {
            id: doc.id,
            ...data,
            _originalLanguage: 'pt',
            _currentLanguage: 'pt'
        };
    }
    
    async updateTranslation(articleId, language, translationData) {
        const docRef = db.collection('articlesdoc').doc(articleId);
        const doc = await docRef.get();
        if (!doc.exists) throw new Error('Artigo não encontrado');
        
        const data = doc.data();
        
        if (!data.isMultiLanguage) {
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
            const translations = data.translations || {};
            translations[language] = translationData;
            await docRef.update({
                translations: translations,
                languages: [...new Set([...(data.languages || []), language])]
            });
        }
    }
    
    refreshArticles() {
        if (typeof loadArticles === 'function') {
            loadArticles();
        }
    }
}

// Inicializa o sistema multi-idioma
let multiLangArticles = null;

// Inicializa quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    if (typeof MultiLanguageArticles !== 'undefined') {
        multiLangArticles = new MultiLanguageArticles();
        window.multiLangArticles = multiLangArticles;
    }
});

// Disponibiliza globalmente
window.MultiLanguageArticles = MultiLanguageArticles;
