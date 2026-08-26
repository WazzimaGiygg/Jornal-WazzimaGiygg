// languages/zh.js
const translationsZh = {
    // Header
    'jornal': '报纸',
    'entrar': '登录',
    'sair': '退出',
    'visitante': '访客',
    'carregando': '加载中...',
    'aguarde': '请稍候',
    
    // Newspaper Header
    'jornal_inevitavel': '不可避免的报纸！',
    'edicao_digital': '数字版',
    
    // Navigation
    'todos': '全部',
    'politica': '政治',
    'internacional': '国际',
    'economia': '经济',
    'justica': '司法',
    'cultura': '文化',
    'investigacao': '调查',
    'opiniao': '观点',
    'esporte': '体育',
    'tecnologia': '科技',
    'redes_sociais': '社交媒体',
    'saude': '健康',
    'educacao': '教育',
    'arquivo': '档案',
    'nova_materia': '新文章',
    
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
    'por': '作者',
    'redacao': '编辑部',
    'visualizacoes': '浏览数',
    'continue_lendo': '继续阅读 →',
    'destaque': '精选',
    'foto_divulgacao': '照片：提供',
    'conteudo_indisponivel': '内容不可用。',
    'voltar_inicio': '返回首页',
    'compartilhar_materia': '分享此文章',
    'compilado_por': '编译者',
    'data_desconhecida': '未知日期',
    'idiomas_materia': '此文章的语言',
    'selecione_idiomas': '按住 Ctrl/Cmd 选择多种语言',
    'traducoes': '🌐 翻译',
    'gerenciar_traducoes': '🌐 管理翻译',
    'salvar_traducoes': '💾 保存翻译',
    'adicionar_idioma': '➕ 添加语言',
    'novo_idioma': '(新)',
    
    // Footer
    'doacao': '💝 捐赠',
    'desktop': '🖥️ 桌面版',
    'lgpd': '🔒 隐私',
    'marco_civil': '📜 公民权利',
    'ticket': '🎫 支持',
    'produtos': '🛍️ 产品',
    'sua_conta': '👤 账户',
    'jornal_verdade': '© 2026 WazzimaGiygg Core — 真理的报纸',
    
    // Modals
    'entrar_google': '使用 Google 登录',
    'fazer_login_google': '使用您的 Google 帐户登录以访问管理功能。',
    'fechar': '关闭',
    'compartilhar': '分享文章',
    'copie_link': '复制下面的链接以分享此文章：',
    'copiar_link': '复制链接',
    
    // Article Modal
    'nova_materia_titulo': '新文章',
    'editar_materia_titulo': '编辑文章',
    'titulo_materia': '文章标题',
    'tipo_materia': '文章类型',
    'resumo_descricao': '摘要/描述',
    'conteudo_completo': '完整内容（HTML）',
    'url_imagem': '图片 URL（可选）',
    'publicar_materia': '发布文章',
    'cancelar': '取消',
    'editar': '✏️ 编辑',
    'excluir': '🗑️ 删除',
    
    // Toast messages
    'cookie_aceitos': '✅ 所有 cookie 已被接受！',
    'cookie_recusados': 'ℹ️ 非必要的 cookie 已被拒绝。',
    'cookie_preferencias': '✅ 您的偏好已保存！',
    'logout_sucesso': '登出成功！',
    'materia_publicada': '文章发布成功！',
    'materia_atualizada': '文章更新成功！',
    'materia_excluida': '文章删除成功！',
    'link_copiado': '链接已复制分享！',
    'erro_copiar_link': '复制链接失败',
    'sem_materias': '📭 未找到该分类的文章。',
    'aguardem_publicacoes': '📭 等待新发布...',
    'materias_breve': '📭 更多文章即将推出...',
    'materia_nao_encontrada': '📭 未找到文章。',
    'carregando_noticias': '加载新闻中...',
    'carregando_materia': '加载文章中...',
    'erro_carregar': '❌ 加载错误：',
    'traducoes_salvas': '翻译保存成功！',
    'erro_salvar_traducoes': '保存翻译失败：',
    'apenas_admin': '只有管理员可以管理翻译！'
};

// Registra no LanguageManager
if (typeof LanguageManager !== 'undefined') {
    LanguageManager.registerLanguage('zh', translationsZh);
}

//程式碼結束
