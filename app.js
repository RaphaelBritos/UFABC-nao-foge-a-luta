/*
 * UFABC NÃO FOGE À LUTA!
 * Site estático no GitHub Pages + banco/autenticação Supabase.
 *
 * 1) Crie um projeto Supabase (veja README.md)
 * 2) Execute schema.sql no SQL Editor
 * 3) Substitua SOMENTE as duas constantes abaixo.
 *
 * IMPORTANTE: A chave "anon" / "publishable" é pública por design.
 * NUNCA coloque sua senha, a service_role key ou uma secret key aqui.
 */
const SUPABASE_URL = 'https://kvpcrpqucazpfedmkngh.supabase.co/rest/v1/';
const SUPABASE_ANON_KEY = 'sb_publishable_pdLhxfvaDFpDVN1X_hoyQg_pdMhrDel';

// Link público de convite ou contato. Ex.: https://chat.whatsapp.com/SEU_CODIGO
// Também aceita um link wa.me, ex.: https://wa.me/5511999999999
const WHATSAPP_URL = 'https://wa.me/5511950222180/?text=Oi, gostaria de conhecer melhor a chapa 1: UFABC Não foge a luta!'; // <--- COLE SEU LINK DE WHATSAPP AQUI

const SEED_PROPOSALS = window.PROPOSTAS_INICIAIS || [];
const AXIS_INFO = window.EIXOS_PROPOSTAS || [];

const $ = (selector) => document.querySelector(selector);
const els = {
  grid:$('#proposal-grid'), filters:$('#category-filters'), search:$('#proposal-search'),
  favorites:$('#favorites-toggle'), favoriteCount:$('#favorite-count'),
  resultCount:$('#result-count'), empty:$('#empty-state'), modeLabel:$('#public-mode-label'),
  modal:$('#admin-modal'), form:$('#login-form'), dashboard:$('#admin-dashboard'),
  loginError:$('#login-error'), setup:$('#admin-setup'), editor:$('#proposal-form'),
  adminItems:$('#admin-items'), editorFeedback:$('#editor-feedback')
};

const state={proposals:[], selectedCategory:'Todas', search:'', favoritesOnly:false, favoriteIds:new Set(), session:null, isAdmin:false, client:null, connected:false};
const favoriteStoreKey='ufabc-nao-foge-a-luta-favoritos-v1';
try{state.favoriteIds=new Set(JSON.parse(localStorage.getItem(favoriteStoreKey)||'[]').map(String));}catch{state.favoriteIds=new Set();}
let toastTimer;
let lastFocusedElement;

function toast(message){
  const e=$('#toast');e.textContent=message;e.classList.add('show');clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>e.classList.remove('show'),3300);
}
function textNode(tag,text,className){const el=document.createElement(tag);el.textContent=text;if(className)el.className=className;return el;}
function normalize(value){return String(value??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('pt-BR');}
function visibleProposals(){return state.proposals.filter(p=>p.is_published);}
function sortedPublicProposals(){
  return visibleProposals().filter(p=>state.selectedCategory==='Todas'||p.category===state.selectedCategory)
    .filter(p=>normalize(`${p.title} ${p.description} ${p.category}`).includes(normalize(state.search)))
    .filter(p=>!state.favoritesOnly||state.favoriteIds.has(String(p.id)));
}
function saveFavorites(){try{localStorage.setItem(favoriteStoreKey,JSON.stringify([...state.favoriteIds]));}catch{toast('Não foi possível salvar favoritos neste navegador.');}}
function renderFilters(){
  const cats=['Todas',...AXIS_INFO.map(a=>a.name).filter(name=>visibleProposals().some(p=>p.category===name)),...new Set(visibleProposals().map(p=>p.category).filter(name=>!AXIS_INFO.some(a=>a.name===name)))];
  if(!cats.includes(state.selectedCategory)) state.selectedCategory='Todas';
  els.filters.replaceChildren();
  cats.forEach(cat=>{
    const btn=textNode('button',cat,'filter-chip'+(state.selectedCategory===cat?' active':''));
    btn.type='button';btn.setAttribute('aria-pressed',String(state.selectedCategory===cat));
    btn.addEventListener('click',()=>{state.selectedCategory=cat;renderProposals();});
    els.filters.append(btn);
  });
}
function makeProposalCard(proposal,index){
  const card=document.createElement('article');card.className='proposal-card';
  const top=document.createElement('div');top.className='proposal-card-top';
  const tag=textNode('span',proposal.category,'category-tag');tag.dataset.category=proposal.category;
  const fav=document.createElement('button');fav.className='favorite-btn'+(state.favoriteIds.has(String(proposal.id))?' is-favorite':'');
  fav.type='button';fav.textContent=state.favoriteIds.has(String(proposal.id))?'♥':'♡';
  fav.setAttribute('aria-label',`${state.favoriteIds.has(String(proposal.id))?'Remover das':'Salvar nas'} favoritas: ${proposal.title}`);
  fav.setAttribute('aria-pressed',String(state.favoriteIds.has(String(proposal.id))));
  fav.addEventListener('click',()=>{
    const id=String(proposal.id);
    if(state.favoriteIds.has(id)){state.favoriteIds.delete(id);toast('Proposta removida das salvas.');}
    else{state.favoriteIds.add(id);toast('Proposta salva neste navegador.');}
    saveFavorites();renderProposals();
  });
  top.append(tag,fav);
  const title=textNode('h3',proposal.title);
  const body=textNode('p',proposal.description,'proposal-description');
  const bodyId='descricao-'+String(proposal.id).replace(/[^a-zA-Z0-9_-]/g,'');
  body.id=bodyId;body.hidden=true;
  const expand=textNode('button','Ler proposta completa +','proposal-expand');
  expand.type='button';expand.setAttribute('aria-expanded','false');expand.setAttribute('aria-controls',bodyId);
  expand.addEventListener('click',()=>{
    const wasOpen=expand.getAttribute('aria-expanded')==='true';
    body.hidden=wasOpen;expand.setAttribute('aria-expanded',String(!wasOpen));
    expand.textContent=wasOpen?'Ler proposta completa +':'Recolher proposta −';
  });
  const bottom=document.createElement('div');bottom.className='proposal-card-foot';
  bottom.append(textNode('span',`PROPOSTA ${String(index+1).padStart(2,'0')}`),textNode('span','✳','spark'));
  card.append(top,title,expand,body,bottom);
  return card;
}
function renderProposals(){
  renderFilters();
  const list=sortedPublicProposals();els.grid.replaceChildren();
  const favoriteTotal=visibleProposals().filter(p=>state.favoriteIds.has(String(p.id))).length;
  els.favoriteCount.textContent=favoriteTotal;
  els.favorites.setAttribute('aria-pressed',String(state.favoritesOnly));
  els.favorites.textContent=`♡ Salvas ${favoriteTotal}`;
  els.resultCount.textContent=`${list.length} ${list.length===1?'proposta encontrada':'propostas encontradas'}`;
  els.empty.hidden=list.length>0;
  const groups=[...new Set(list.map(p=>p.category))].sort((a,b)=>{
    const ia=AXIS_INFO.findIndex(x=>x.name===a),ib=AXIS_INFO.findIndex(x=>x.name===b);
    return (ia<0?999:ia)-(ib<0?999:ib);
  });
  groups.forEach(cat=>{
    const group=document.createElement('section');group.className='axis-group';
    group.setAttribute('aria-label',`Eixo ${cat}`);
    const heading=document.createElement('div');heading.className='axis-heading';
    const h3=textNode('h3',cat);const info=AXIS_INFO.find(axis=>axis.name===cat);
    const count=list.filter(p=>p.category===cat).length;
    const intro=textNode('p',info?.description||'Propostas para a comunidade universitária.');
    const num=textNode('span',`${count} ${count===1?'proposta':'propostas'}`,'axis-count');
    heading.append(h3,intro,num);
    const cards=document.createElement('div');cards.className='axis-cards';
    list.filter(p=>p.category===cat).forEach((proposal,index)=>{
      cards.append(makeProposalCard(proposal,index));
    });
    group.append(heading,cards);els.grid.append(group);
  });
}

function revealOnScroll(){
  if(!('IntersectionObserver' in window)){document.querySelectorAll('.reveal').forEach(e=>e.classList.add('visible'));return;}
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}});
  },{threshold:.10,rootMargin:'0px 0px 25px 0px'});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
}
function openModal(){
  lastFocusedElement=document.activeElement;
  els.modal.hidden=false;
  document.body.style.overflow='hidden';
  renderAdminAccess();
  ($('#login-email').offsetParent?$('#login-email'):$('#close-admin')).focus();
}
function closeModal(){els.modal.hidden=true;document.body.style.overflow='';lastFocusedElement?.focus?.();}
function renderAdminAccess(){
  els.setup.hidden=state.connected;
  els.form.hidden=!state.connected||state.isAdmin;
  els.dashboard.hidden=!state.connected||!state.isAdmin;
  if(state.isAdmin){$('#admin-identity').textContent=`Conectado: ${state.session?.user?.email||'Equipe'}`;renderAdminItems();}
}
function setupModalEvents(){
  $('#admin-trigger').addEventListener('click',openModal);
  $('#close-admin').addEventListener('click',closeModal);
  els.modal.addEventListener('click',e=>{if(e.target===els.modal)closeModal();});
  document.addEventListener('keydown',e=>{
    if((e.ctrlKey||e.metaKey)&&e.altKey&&e.key.toLowerCase()==='p'){e.preventDefault();openModal();}
    if(e.key==='Escape'&&!els.modal.hidden)closeModal();
    if(e.key==='Tab'&&!els.modal.hidden){
      const items=[...els.modal.querySelectorAll('button,input,select,textarea,a[href]')].filter(el=>!el.disabled&&el.getClientRects().length);
      if(!items.length)return;
      const first=items[0],last=items[items.length-1];
      if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
      else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
    }
  });
}
async function verifyAdmin(){
  if(!state.client||!state.session?.user)return false;
  const {data,error}=await state.client.from('site_admins').select('user_id').eq('user_id',state.session.user.id).maybeSingle();
  if(error){console.warn('Falha ao verificar acesso:',error.message);return false;}
  return Boolean(data);
}
async function refreshData(){
  if(!state.connected)return;
  const q=state.client.from('proposals').select('id,title,category,description,is_published,created_at').order('created_at',{ascending:true});
  const {data,error}=await q;
  if(error){toast('Falha ao carregar propostas. Consulte a configuração.');console.error(error);return;}
  state.proposals=data||[];renderProposals();renderAdminItems();
}
async function authChanged(session){
  state.session=session;
  state.isAdmin=await verifyAdmin();
  if(session&&!state.isAdmin){await state.client.auth.signOut();state.session=null;els.loginError.textContent='Conta sem permissão de administração.';els.loginError.hidden=false;}
  renderAdminAccess();
  await refreshData();
}
async function initBackend(){
  state.connected=Boolean(SUPABASE_URL&&SUPABASE_ANON_KEY&&window.supabase?.createClient);
  els.modeLabel.hidden=state.connected;
  if(!state.connected){state.proposals=SEED_PROPOSALS;renderProposals();renderAdminAccess();return;}
  try{
    state.client=window.supabase.createClient(SUPABASE_URL,SUPABASE_ANON_KEY,{
      auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}
    });
    const {data:{session},error}=await state.client.auth.getSession();
    if(error)throw error;
    state.session=session;state.isAdmin=await verifyAdmin();
    state.client.auth.onAuthStateChange((_event,session)=>{
      // Evita chamadas ao banco dentro do callback síncrono de auth.
      setTimeout(()=>authChanged(session),0);
    });
    renderAdminAccess();await refreshData();
  }catch(error){
    console.error('Erro de configuração do Supabase:',error);
    state.connected=false;state.client=null;state.proposals=SEED_PROPOSALS;
    els.modeLabel.hidden=false;renderProposals();renderAdminAccess();
    toast('Não foi possível conectar ao banco. Exibindo exemplos.');
  }
}
function resetEditor(){
  els.editor.reset();$('#edit-id').value='';$('#edit-published').checked=true;
  $('#save-proposal').textContent='Salvar proposta';els.editorFeedback.textContent='';
}
function renderAdminItems(){
  if(!state.isAdmin)return;
  $('#admin-total').textContent=state.proposals.length;els.adminItems.replaceChildren();
  if(!state.proposals.length){els.adminItems.append(textNode('p','Nenhuma proposta cadastrada ainda.','dashboard-info'));return;}
  state.proposals.forEach(proposal=>{
    const item=document.createElement('div');item.className='admin-item';
    const copy=document.createElement('div');copy.append(
      textNode('p',proposal.title,'admin-item-title'),
      textNode('span',`${proposal.category} · ${proposal.is_published?'Publicada':'Rascunho'}`,'admin-item-meta')
    );
    const actions=document.createElement('div');actions.className='admin-item-actions';
    const edit=textNode('button','Editar');edit.type='button';edit.addEventListener('click',()=>{
      $('#edit-id').value=proposal.id;$('#edit-title').value=proposal.title;
      $('#edit-category').value=proposal.category;$('#edit-description').value=proposal.description;
      $('#edit-published').checked=proposal.is_published;
      $('#save-proposal').textContent='Atualizar proposta';els.editorFeedback.textContent='';
      $('#edit-title').focus();
    });
    const del=textNode('button','Excluir','danger');del.type='button';del.addEventListener('click',()=>deleteProposal(proposal));
    actions.append(edit,del);item.append(copy,actions);els.adminItems.append(item);
  });
}
async function deleteProposal(proposal){
  if(!state.isAdmin||!window.confirm(`Excluir permanentemente a proposta "${proposal.title}"?`))return;
  const {error}=await state.client.from('proposals').delete().eq('id',proposal.id);
  if(error){els.editorFeedback.textContent=`Não foi possível excluir: ${error.message}`;return;}
  if(String($('#edit-id').value)===String(proposal.id))resetEditor();
  toast('Proposta excluída.');await refreshData();
}
function bindAuthAndEditor(){
  els.form.addEventListener('submit',async e=>{
    e.preventDefault();if(!state.client)return;
    els.loginError.hidden=true;const btn=$('#login-submit');btn.disabled=true;btn.textContent='Verificando...';
    try{
      const {data,error}=await state.client.auth.signInWithPassword({email:$('#login-email').value.trim(),password:$('#login-password').value});
      if(error)throw error;
      state.session=data.session;
      state.isAdmin=await verifyAdmin();
      if(!state.isAdmin){await state.client.auth.signOut();state.session=null;throw new Error('Esta conta não tem permissão para gerenciar propostas.');}
      $('#login-password').value='';renderAdminAccess();await refreshData();toast('Acesso administrativo liberado.');
    }catch(error){els.loginError.textContent=error.message||'Erro ao entrar.';els.loginError.hidden=false;}
    finally{btn.disabled=false;btn.textContent='Entrar no painel ↗';}
  });
  $('#logout-button').addEventListener('click',async()=>{
    if(state.client)await state.client.auth.signOut();
    state.session=null;state.isAdmin=false;resetEditor();
    await refreshData();renderAdminAccess();toast('Você saiu do painel.');
  });
  $('#cancel-edit').addEventListener('click',resetEditor);
  els.editor.addEventListener('submit',async e=>{
    e.preventDefault();if(!state.isAdmin||!state.client)return;
    const id=$('#edit-id').value;
    const record={title:$('#edit-title').value.trim(),category:$('#edit-category').value,description:$('#edit-description').value.trim(),is_published:$('#edit-published').checked};
    if(record.title.length<5||record.description.length<15){els.editorFeedback.textContent='Preencha título e descrição com mais detalhes.';return;}
    const saveBtn=$('#save-proposal');saveBtn.disabled=true;els.editorFeedback.textContent='Salvando...';
    try{
      const request=id?state.client.from('proposals').update(record).eq('id',id):state.client.from('proposals').insert(record);
      const {error}=await request;if(error)throw error;
      resetEditor();await refreshData();toast(id?'Proposta atualizada!':'Nova proposta cadastrada!');
    }catch(error){els.editorFeedback.textContent=`Erro ao salvar: ${error.message}`;}
    finally{saveBtn.disabled=false;}
  });
}
async function shareSite(){
  const data={title:'UFABC Não Foge à Luta!',text:'Por permanência, formação e moradia. Conheça as propostas da chapa!',url:location.href.split('#')[0]};
  try{
    if(navigator.share){await navigator.share(data);return;}
    await navigator.clipboard.writeText(`${data.text}\n${data.url}`);toast('Convite copiado! Compartilhe com a galera.');
  }catch(e){if(e.name!=='AbortError')toast('Não foi possível compartilhar. Copie o endereço do navegador.');}
}
function bindPageEvents(){
  els.search.addEventListener('input',e=>{state.search=e.target.value;renderProposals();});
  els.favorites.addEventListener('click',()=>{state.favoritesOnly=!state.favoritesOnly;renderProposals();});
  $('#reset-filters').addEventListener('click',()=>{state.search='';state.selectedCategory='Todas';state.favoritesOnly=false;els.search.value='';renderProposals();});
  document.querySelectorAll('[data-category-link]').forEach(a=>a.addEventListener('click',()=>{
    state.search='';els.search.value='';state.favoritesOnly=false;state.selectedCategory=a.dataset.categoryLink;renderProposals();
  }));
  // Atualize apenas a constante WHATSAPP_URL no começo deste arquivo.
  const validWhatsapp=()=>{
    try {const url=new URL(WHATSAPP_URL);
      return url.protocol==='https:' && ['chat.whatsapp.com','wa.me','api.whatsapp.com','www.whatsapp.com'].includes(url.hostname);
    }catch{return false;}
  };
  document.querySelectorAll('[data-whatsapp-link]').forEach(link=>{
    if(validWhatsapp()){
      link.href=WHATSAPP_URL;
      link.target='_blank';link.rel='noopener noreferrer';
    }else{
      link.href='#participar';
      link.addEventListener('click',e=>{e.preventDefault();toast('O link do WhatsApp ainda não foi configurado pela chapa.');});
    }
  });
  $('#share-site').addEventListener('click',shareSite);
  $('#copy-link').addEventListener('click',async()=>{
    try{await navigator.clipboard.writeText(location.href.split('#')[0]);toast('Link copiado!');}
    catch{toast('Copie o endereço do navegador.');}
  });
  const menu=$('#main-menu'),toggle=$('#menu-toggle');
  toggle.addEventListener('click',()=>{
    const open=menu.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');
  });
  const closeMenu=()=>{menu.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Abrir menu');};
  menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
  document.addEventListener('click',e=>{if(!menu.contains(e.target)&&!toggle.contains(e.target))closeMenu();});
  window.addEventListener('resize',()=>{if(window.innerWidth>800)closeMenu();});
}
function init(){bindPageEvents();setupModalEvents();bindAuthAndEditor();revealOnScroll();initBackend();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
