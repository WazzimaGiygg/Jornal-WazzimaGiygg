// languages/ja.js
const translationsJa = {
    // Header
    'jornal': '新聞',
    'entrar': 'ログイン',
    'sair': 'ログアウト',
    'visitante': 'ゲスト',
    'carregando': '読み込み中...',
    'aguarde': 'お待ちください',
    
    // Newspaper Header
    'jornal_inevitavel': '避けられない新聞！',
    'edicao_digital': 'デジタル版',
    
    // Navigation
    'todos': 'すべて',
    'politica': '政治',
    'internacional': '国際',
    'economia': '経済',
    'justica': '司法',
    'cultura': '文化',
    'investigacao': '調査',
    'opiniao': '意見',
    'esporte': 'スポーツ',
    'tecnologia': 'テクノロジー',
    'redes_sociais': 'ソーシャルメディア',
    'saude': '健康',
    'educacao': '教育',
    'arquivo': 'アーカイブ',
    'nova_materia': '新着記事',
    
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
    'por': '著者',
    'redacao': '編集部',
    'visualizacoes': '閲覧数',
    'continue_lendo': '続きを読む →',
    'destaque': '注目',
    'foto_divulgacao': '写真：提供',
    'conteudo_indisponivel': 'コンテンツが利用できません。',
    'voltar_inicio': 'ホームに戻る',
    'compartilhar_materia': 'この記事を共有',
    'compilado_por': '編纂者',
    'data_desconhecida': '不明な日付',
    'idiomas_materia': 'この記事の言語',
    'selecione_idiomas': 'Ctrl/Cmdを押しながら複数の言語を選択',
    'traducoes': '🌐 翻訳',
    'gerenciar_traducoes': '🌐 翻訳を管理',
    'salvar_traducoes': '💾 翻訳を保存',
    'adicionar_idioma': '➕ 言語を追加',
    'novo_idioma': '(新規)',
    
    // Footer
    'doacao': '💝 寄付',
    'desktop': '🖥️ デスクトップ',
    'lgpd': '🔒 プライバシー',
    'marco_civil': '📜 公民権',
    'ticket': '🎫 サポート',
    'produtos': '🛍️ 製品',
    'sua_conta': '👤 アカウント',
    'jornal_verdade': '© 2026 WazzimaGiygg Core — 真実の新聞',
    
    // Modals
    'entrar_google': 'Googleでログイン',
    'fazer_login_google': '管理機能にアクセスするにはGoogleアカウントでログインしてください。',
    'fechar': '閉じる',
    'compartilhar': '記事を共有',
    'copie_link': '以下のリンクをコピーしてこの記事を共有してください：',
    'copiar_link': 'リンクをコピー',
    
    // Article Modal
    'nova_materia_titulo': '新着記事',
    'editar_materia_titulo': '記事を編集',
    'titulo_materia': '記事タイトル',
    'tipo_materia': '記事タイプ',
    'resumo_descricao': '概要/説明',
    'conteudo_completo': '全文（HTML）',
    'url_imagem': '画像URL（任意）',
    'publicar_materia': '記事を公開',
    'cancelar': 'キャンセル',
    'editar': '✏️ 編集',
    'excluir': '🗑️ 削除',
    
    // Toast messages
    'cookie_aceitos': '✅ すべてのクッキーが受け入れられました！',
    'cookie_recusados': 'ℹ️ 必須でないクッキーは拒否されました。',
    'cookie_preferencias': '✅ 設定が保存されました！',
    'logout_sucesso': 'ログアウトしました！',
    'materia_publicada': '記事が公開されました！',
    'materia_atualizada': '記事が更新されました！',
    'materia_excluida': '記事が削除されました！',
    'link_copiado': '共有リンクをコピーしました！',
    'erro_copiar_link': 'リンクのコピーに失敗しました',
    'sem_materias': '📭 このカテゴリには記事がありません。',
    'aguardem_publicacoes': '📭 新しい公開をお待ちください...',
    'materias_breve': '📭 近日公開予定...',
    'materia_nao_encontrada': '📭 記事が見つかりません。',
    'carregando_noticias': 'ニュースを読み込み中...',
    'carregando_materia': '記事を読み込み中...',
    'erro_carregar': '❌ 読み込みエラー:',
    'traducoes_salvas': '翻訳が保存されました！',
    'erro_salvar_traducoes': '翻訳の保存に失敗しました:',
    'apenas_admin': '管理者のみが翻訳を管理できます！'
};

// Registra no LanguageManager
if (typeof LanguageManager !== 'undefined') {
    LanguageManager.registerLanguage('ja', translationsJa);
}

//end
