// languages/it.js
const translationsIt = {
    // Header
    'jornal': 'Giornale',
    'entrar': 'Accedi',
    'sair': 'Esci',
    'visitante': 'Visitatore',
    'carregando': 'Caricamento...',
    'aguarde': 'attendere prego',
    
    // Newspaper Header
    'jornal_inevitavel': 'IL GIORNALE INEVITABILE!',
    'edicao_digital': 'Edizione Digitale',
    
    // Navigation
    'todos': 'TUTTI',
    'politica': 'POLITICA',
    'internacional': 'INTERNAZIONALE',
    'economia': 'ECONOMIA',
    'justica': 'GIUSTIZIA',
    'cultura': 'CULTURA',
    'investigacao': 'INDAGINE',
    'opiniao': 'OPINIONE',
    'esporte': 'SPORT',
    'tecnologia': 'TECNOLOGIA',
    'redes_sociais': 'SOCIAL MEDIA',
    'saude': 'SALUTE',
    'educacao': 'ISTRUZIONE',
    'arquivo': 'ARCHIVIO',
    'nova_materia': 'NUOVO ARTICOLO',
    
    // Categories icons
    'cat_todos': '📰',
    'cat_politica': '🏛️',
    'cat_internacional': '🌍',
    'cat_economia': '📊',
    'cat_justica': '⚖️',
    'cat_cultura': '🎭',
    'cat_investigacao': '🔍',
    'cat_opiniao': '✍️',
    'cat_esporte': '⚽',
    'cat_tecnologia': '💻',
    'cat_redes_sociais': '📱',
    'cat_saude': '🏥',
    'cat_educacao': '📚',
    'cat_arquivo': '📚',
    
    // Article
    'por': 'Di',
    'redacao': 'Redazione',
    'visualizacoes': 'visualizzazioni',
    'continue_lendo': 'Continua a leggere →',
    'destaque': 'IN EVIDENZA',
    'foto_divulgacao': 'Foto: Divulgazione',
    'conteudo_indisponivel': 'Contenuto non disponibile.',
    'voltar_inicio': 'Torna alla home',
    'compartilhar_materia': 'Condividi questo articolo',
    'compilado_por': 'Compilato da',
    'data_desconhecida': 'Data sconosciuta',
    'idiomas_materia': 'Lingue per questo articolo',
    'selecione_idiomas': 'Tieni premuto Ctrl/Cmd per selezionare più lingue',
    'traducoes': '🌐 Traduzioni',
    'gerenciar_traducoes': '🌐 Gestisci Traduzioni',
    'salvar_traducoes': '💾 Salva Traduzioni',
    'adicionar_idioma': '➕ Aggiungi Lingua',
    'novo_idioma': '(nuovo)',
    
    // Footer
    'doacao': '💝 Donazione',
    'desktop': '🖥️ Desktop',
    'lgpd': '🔒 Privacy',
    'marco_civil': '📜 Diritti Civili',
    'ticket': '🎫 Supporto',
    'produtos': '🛍️ Prodotti',
    'sua_conta': '👤 Il tuo Account',
    'jornal_verdade': '© 2026 WazzimaGiygg Core — Il Giornale della Verità',
    
    // Modals
    'entrar_google': 'Accedi con Google',
    'fazer_login_google': 'Accedi con il tuo account Google per accedere alle funzionalità amministrative.',
    'fechar': 'Chiudi',
    'compartilhar': 'Condividi Articolo',
    'copie_link': 'Copia il link qui sotto per condividere questo articolo:',
    'copiar_link': 'Copia Link',
    
    // Article Modal
    'nova_materia_titulo': 'Nuovo Articolo',
    'editar_materia_titulo': 'Modifica Articolo',
    'titulo_materia': 'Titolo dell\'Articolo',
    'tipo_materia': 'Tipo di Articolo',
    'resumo_descricao': 'Riepilogo/Descrizione',
    'conteudo_completo': 'Contenuto Completo (HTML)',
    'url_imagem': 'URL dell\'Immagine (opzionale)',
    'publicar_materia': 'Pubblica Articolo',
    'cancelar': 'Annulla',
    'editar': '✏️ Modifica',
    'excluir': '🗑️ Elimina',
    
    // Toast messages
    'cookie_aceitos': '✅ Tutti i cookie sono stati accettati!',
    'cookie_recusados': 'ℹ️ I cookie non essenziali sono stati rifiutati.',
    'cookie_preferencias': '✅ Le tue preferenze sono state salvate!',
    'logout_sucesso': 'Disconnessione riuscita!',
    'materia_publicada': 'Articolo pubblicato con successo!',
    'materia_atualizada': 'Articolo aggiornato con successo!',
    'materia_excluida': 'Articolo eliminato con successo!',
    'link_copiado': 'Link copiato per condividere!',
    'erro_copiar_link': 'Errore durante la copia del link',
    'sem_materias': '📭 Nessun articolo trovato in questa categoria.',
    'aguardem_publicacoes': '📭 Attendere nuove pubblicazioni...',
    'materias_breve': '📭 Altri articoli in arrivo...',
    'materia_nao_encontrada': '📭 Articolo non trovato.',
    'carregando_noticias': 'Caricamento notizie...',
    'carregando_materia': 'Caricamento articolo...',
    'erro_carregar': '❌ Errore durante il caricamento:',
    'traducoes_salvas': 'Traduzioni salvate con successo!',
    'erro_salvar_traducoes': 'Errore durante il salvataggio delle traduzioni:',
    'apenas_admin': 'Solo gli amministratori possono gestire le traduzioni!'
};

// Registra no LanguageManager
if (typeof LanguageManager !== 'undefined') {
    LanguageManager.registerLanguage('it', translationsIt);
}

//fin
