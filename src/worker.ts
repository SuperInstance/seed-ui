// ═══════════════════════════════════════════════════════════════════════════
// Seed UI — Five Presentation Layers
// The presentation primitive for Cocapn vessels.
// Every vessel can render any of these layers.
//
// Superinstance & Lucineer (DiGennaro et al.) — 2026-04-03
// ═══════════════════════════════════════════════════════════════════════════

const CSP = "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https:*;";
interface Env { SEED_KV: KVNamespace; }

type Layer = 'spreadsheet' | 'messenger' | 'feed' | 'matrix' | 'research';

interface RenderRequest { layer: Layer; data: Record<string, unknown>; theme?: 'dark' | 'light'; }

const LAYERS: Record<Layer, { name: string; icon: string; description: string }> = {
  spreadsheet: { name: 'Spreadsheet', icon: '📊', description: 'Cells are agents. Values computed. Formulas chain.' },
  messenger: { name: 'Messenger', icon: '💬', description: 'Chat with streaming, threads, reactions.' },
  feed: { name: 'Feed', icon: '📰', description: 'Chronological cards. Social stream.' },
  matrix: { name: 'Matrix', icon: '🎮', description: 'Quest log, XP, levels, achievements.' },
  research: { name: 'Research Lab', icon: '🔬', description: 'Experiments, hypotheses, data tables.' },
};

function renderSpreadsheet(data: Record<string, unknown>): string {
  const cells = (data.cells || [
    { ref: 'A1', value: 'Task', agent: 'label' }, { ref: 'A2', value: 'Build UI', agent: 'captain' },
    { ref: 'A3', value: 'Write docs', agent: 'scribe' }, { ref: 'B1', value: 'Status', agent: 'label' },
    { ref: 'B2', value: '✅ Done', agent: 'captain' }, { ref: 'B3', value: '🔄 Active', agent: 'scribe' },
    { ref: 'C1', value: 'Priority', agent: 'label' }, { ref: 'C2', value: 'High', agent: 'captain' },
    { ref: 'C3', value: 'Normal', agent: 'scribe' },
  ]) as Array<{ ref: string; value: string; agent: string }>;
  return `<div class="sheet"><div class="sheet-row">${['','A','B','C','D','E','F'].map(c=>`<div class="cell hdr">${c}</div>`).join('')}</div>${[1,2,3,4,5].map(r=>{
    const row = cells.filter(c=>c.ref.match(new RegExp(`^[A-F]${r}$`)));
    return `<div class="sheet-row"><div class="cell hdr">${r}</div>${['A','B','C','D','E','F'].map(c=>{
      const cell = row.find(x=>x.ref.startsWith(c));
      return `<div class="cell${cell?.agent?' agent':''}">${cell?.value||''}</div>`;
    }).join('')}</div>`;
  }).join('')}</div>`;
}

function renderMessenger(data: Record<string, unknown>): string {
  const msgs = (data.messages || [
    { from: 'Captain', text: 'Fleet status — all vessels green.', time: '17:30', reactions: ['👍'] },
    { from: 'Admiral', text: 'Start dreaming cycle tonight.', time: '17:32', reactions: ['⭐'] },
  ]) as Array<{ from: string; text: string; time: string; reactions: string[] }>;
  return `<div class="chat">${msgs.map(m=>`<div class="msg"><div class="msg-from">${m.from} <span class="msg-time">${m.time}</span></div><div class="msg-text">${m.text}</div>${m.reactions?.length?`<div class="msg-react">${m.reactions.join(' ')}</div>`:''}</div>`).join('')}<div class="chat-input"><input placeholder="Type..." /><button>Send</button></div></div>`;
}

function renderFeed(data: Record<string, unknown>): string {
  const cards = (data.cards || [
    { title: 'Fleet Command Center Deployed', body: '30 vessels monitored in real-time.', time: '2h ago', author: 'fleet-orchestrator', tag: 'infra' },
    { title: 'Dream Engine Protocol Published', body: 'Background consolidation standardized.', time: '4h ago', author: 'dream-engine', tag: 'protocol' },
  ]) as Array<{ title: string; body: string; time: string; author: string; tag: string }>;
  return `<div class="feed">${cards.map(c=>`<div class="card"><div class="card-header"><span class="card-author">@${c.author}</span><span class="card-tag">${c.tag}</span><span class="card-time">${c.time}</span></div><div class="card-title">${c.title}</div><div class="card-body">${c.body}</div><div class="card-actions">💬 🔗 ⭐</div></div>`).join('')}</div>`;
}

function renderMatrix(data: Record<string, unknown>): string {
  const quests = (data.quests || [
    { name: 'Deploy Fleet Orchestrator', xp: 500, status: 'complete' },
    { name: 'Build Dream Engine', xp: 400, status: 'complete' },
    { name: 'Wire Circuit Breaker', xp: 600, status: 'active' },
    { name: 'Muscle Memory Transfer', xp: 350, status: 'queued' },
  ]) as Array<{ name: string; xp: number; status: string }>;
  const totalXp = quests.filter(q=>q.status==='complete').reduce((a,q)=>a+q.xp,0);
  const lvl = Math.floor(totalXp/1000)+1;
  return `<div class="matrix"><div class="profile"><div class="avatar">⚓</div><div class="profile-info"><div class="profile-name">Fleet Captain</div><div class="profile-level">Level ${lvl}</div><div class="xp-bar"><div class="xp-fill" style="width:${(totalXp%1000)/10}%"></div></div><div class="xp-text">${totalXp} XP</div></div></div><div class="quests">${quests.map(q=>`<div class="quest ${q.status}"><div class="quest-icon">${q.status==='complete'?'✅':q.status==='active'?'🔄':'⏳'}</div><div class="quest-info"><div class="quest-name">${q.name}</div><div class="quest-meta">${q.xp} XP</div></div></div>`).join('')}</div></div>`;
}

function renderResearch(data: Record<string, unknown>): string {
  const exps = (data.experiments || [
    { id: 'EXP-001', hypothesis: 'Worker-to-worker fetch unreliable', status: 'confirmed', evidence: '404 on all 30 vessels' },
    { id: 'EXP-002', hypothesis: 'Client-side checks solve it', status: 'testing', evidence: 'Fleet orchestrator deployed' },
  ]) as Array<{ id: string; hypothesis: string; status: string; evidence: string }>;
  return `<div class="lab"><table class="lab-table"><tr><th>ID</th><th>Hypothesis</th><th>Status</th><th>Evidence</th></tr>${exps.map(e=>`<tr><td>${e.id}</td><td>${e.hypothesis}</td><td><span class="badge ${e.status}">${e.status}</span></td><td>${e.evidence||'—'}</td></tr>`).join('')}</table></div>`;
}

function renderLayer(layer: Layer, data: Record<string, unknown>): string {
  switch (layer) {
    case 'spreadsheet': return renderSpreadsheet(data);
    case 'messenger': return renderMessenger(data);
    case 'feed': return renderFeed(data);
    case 'matrix': return renderMatrix(data);
    case 'research': return renderResearch(data);
  }
}

function landingPage(): string {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Seed UI — Five Presentation Layers</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}body{font-family:system-ui;background:#0a0a1a;color:#e2e8f0}
.hero{text-align:center;padding:2rem;background:radial-gradient(ellipse at 50% 0%,#1a1040 0%,#0a0a1a 70%)}
.hero h1{font-size:2rem;background:linear-gradient(135deg,#7c3aed,#3b82f6);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.hero p{color:#64748b;margin:.5rem 0}
.tabs{display:flex;justify-content:center;gap:.5rem;padding:1rem;flex-wrap:wrap}
.tab{padding:.5rem 1rem;background:#111;border:1px solid #1e293b;border-radius:8px;color:#94a3b8;cursor:pointer;font-size:.85rem;transition:all .2s}
.tab:hover,.tab.active{border-color:#7c3aed;color:#a78bfa;background:#1a1040}
.panel{max-width:900px;margin:0 auto;padding:1.5rem;display:none}.panel.active{display:block}
.panel h3{margin-bottom:.25rem;color:#e2e8f0}.panel .layer-desc{color:#64748b;font-size:.85rem;margin-bottom:1rem}
.demo{background:#111;border:1px solid #1e293b;border-radius:10px;padding:1rem;min-height:200px}
.sheet{font-family:monospace;font-size:.8rem}.sheet-row{display:flex}.cell{min-width:100px;min-height:28px;padding:2px 6px;border:1px solid #1e293b;display:flex;align-items:center}.cell.hdr{background:#1a1a2e;color:#64748b;font-size:.7rem;min-width:30px;justify-content:center}.cell.agent{cursor:pointer}.cell.agent:hover{background:#7c3aed22;border-color:#7c3aed}
.chat{display:flex;flex-direction:column;gap:.75rem}.msg{padding:.6rem .75rem;background:#111;border:1px solid #1e293b;border-radius:10px}.msg-from{font-size:.75rem;color:#a78bfa;margin-bottom:.15rem}.msg-time{color:#475569;margin-left:.5rem}.msg-text{font-size:.85rem}.msg-react{margin-top:.25rem;font-size:.7rem;color:#64748b}.chat-input{display:flex;gap:.5rem;margin-top:.5rem}.chat-input input{flex:1;background:#1a1a2e;border:1px solid #1e293b;border-radius:8px;padding:.4rem .6rem;color:#e2e8f0;outline:none}.chat-input button{background:#7c3aed;color:white;border:none;border-radius:8px;padding:.4rem .8rem;cursor:pointer}
.feed{display:flex;flex-direction:column;gap:.75rem}.card{background:#111;border:1px solid #1e293b;border-radius:10px;padding:.75rem}.card-header{display:flex;gap:.5rem;font-size:.75rem;margin-bottom:.35rem}.card-author{color:#a78bfa}.card-tag{color:#3b82f6}.card-time{color:#475569;margin-left:auto}.card-title{font-size:.9rem;margin-bottom:.25rem}.card-body{font-size:.8rem;color:#94a3b8}.card-actions{margin-top:.5rem;display:flex;gap:.5rem;font-size:.75rem;color:#475569;cursor:pointer}
.matrix{display:flex;flex-direction:column;gap:1rem}.profile{display:flex;gap:1rem;align-items:center;padding:1rem;background:#111;border:1px solid #1e293b;border-radius:10px}.avatar{width:48px;height:48px;background:linear-gradient(135deg,#7c3aed,#3b82f6);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:1.5rem}.profile-name{font-size:1rem}.profile-level{font-size:.75rem;color:#a78bfa}.xp-bar{width:200px;height:6px;background:#1e293b;border-radius:3px;margin-top:.35rem}.xp-fill{height:100%;background:linear-gradient(90deg,#7c3aed,#3b82f6);border-radius:3px}.xp-text{font-size:.7rem;color:#475569;margin-top:.15rem}.quests{display:flex;flex-direction:column;gap:.5rem}.quest{display:flex;gap:.75rem;align-items:center;padding:.5rem .75rem;background:#111;border:1px solid #1e293b;border-radius:8px}.quest-icon{font-size:1.2rem}.quest-name{font-size:.85rem}.quest-meta{font-size:.7rem;color:#64748b}.quest.active{border-color:#f59e0b33}.quest.queued{opacity:.6}
.lab-table{width:100%;border-collapse:collapse;font-size:.8rem}.lab-table th,.lab-table td{padding:.5rem .75rem;text-align:left;border-bottom:1px solid #1e293b}.lab-table th{color:#a78bfa;font-weight:600}.lab-table td{color:#94a3b8}.badge{padding:.1rem .4rem;border-radius:8px;font-size:.7rem;font-weight:600}.badge.confirmed{background:#10b98133;color:#34d399}.badge.testing{background:#f59e0b33;color:#fbbf24}.badge.planned{background:#3b82f633;color:#60a5fa}
footer{text-align:center;padding:2rem;color:#475569;font-size:.75rem}
</style></head><body>
<div class="hero">
      <img src="https://cocapn-logos.casey-digennaro.workers.dev/img/cocapn-logo-v1.png" alt="Cocapn" style="width:64px;height:auto;margin-bottom:.5rem;border-radius:8px;display:block;margin-left:auto;margin-right:auto">
      <h1>🌱 Seed UI</h1><p>Five presentation layers for Cocapn vessels</p></div>
<div class="tabs">
<div class="tab" data-layer="spreadsheet">📊 Spreadsheet</div>
<div class="tab" data-layer="messenger">💬 Messenger</div>
<div class="tab" data-layer="feed">📰 Feed</div>
<div class="tab" data-layer="matrix">🎮 Matrix</div>
<div class="tab" data-layer="research">🔬 Research</div>
</div>
${Object.entries(LAYERS).map(([k,v])=>`<div class="panel" id="panel-${k}"><h3>${v.icon} ${v.name}</h3><p class="layer-desc">${v.description}</p><div class="demo" id="demo-${k}"></div></div>`).join('')}
<footer>Superinstance & Lucineer (DiGennaro et al.) — seed-ui is the presentation primitive</footer>
<script>
const demos=${JSON.stringify({
  spreadsheet:{cells:[{ref:'A1',value:'Task',agent:'label'},{ref:'A2',value:'Build UI',agent:'captain'},{ref:'A3',value:'Write docs',agent:'scribe'},{ref:'B1',value:'Status',agent:'label'},{ref:'B2',value:'✅ Done',agent:'captain'},{ref:'B3',value:'🔄 Active',agent:'scribe'},{ref:'C1',value:'Priority',agent:'label'},{ref:'C2',value:'High',agent:'captain'},{ref:'C3',value:'Normal',agent:'scribe'}]},
  messenger:{messages:[{from:'Captain',text:'Fleet status — all vessels green.',time:'17:30',reactions:['👍']},{from:'Admiral',text:'Start dreaming cycle tonight.',time:'17:32',reactions:['⭐']},{from:'Captain',text:'Aye. Dream engine queued for 23:00.',time:'17:33',reactions:[]}]},
  feed:{cards:[{title:'Fleet Command Center Deployed',body:'30 vessels monitored in real-time.',time:'2h ago',author:'fleet-orchestrator',tag:'infra'},{title:'Dream Engine Protocol Published',body:'Background consolidation standardized.',time:'4h ago',author:'dream-engine',tag:'protocol'},{title:'Equipment Catalog Expanded',body:'6 new items. 16 BYOK providers.',time:'6h ago',author:'cocapn-com',tag:'economy'}]},
  matrix:{quests:[{name:'Deploy Fleet Orchestrator',xp:500,status:'complete'},{name:'Build Dream Engine',xp:400,status:'complete'},{name:'Wire Circuit Breaker',xp:600,status:'active'},{name:'Muscle Memory Transfer',xp:350,status:'queued'}]},
  research:{experiments:[{id:'EXP-001',hypothesis:'Worker-to-worker fetch unreliable',status:'confirmed',evidence:'404 on all 30 vessels'},{id:'EXP-002',hypothesis:'Client-side checks solve it',status:'testing',evidence:'Fleet orchestrator deployed'},{id:'EXP-003',hypothesis:'Coding plans reduce dream costs 80-90%',status:'planned',evidence:''}]}
})};
document.querySelectorAll('.tab').forEach(t=>{
  t.addEventListener('click',()=>{
    document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));
    document.querySelectorAll('.panel').forEach(x=>x.classList.remove('active'));
    t.classList.add('active');
    const l=t.dataset.layer;
    document.getElementById('panel-'+l).classList.add('active');
    fetch('/api/render',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({layer:l,data:demos[l]})})
    .then(r=>r.text()).then(h=>{document.getElementById('demo-'+l).innerHTML=h;}).catch(()=>{});
  });
});
document.querySelector('.tab').click();
</script></body></html>`;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const h = { 'Content-Type': 'application/json', 'Content-Security-Policy': CSP };
    const hh = { 'Content-Type': 'text/html;charset=UTF-8', 'Content-Security-Policy': CSP };
    if (url.pathname === '/') return new Response(landingPage(), { headers: hh });
    if (url.pathname === '/health') return new Response(JSON.stringify({ status: 'ok', vessel: 'seed-ui', layers: 5 }), { headers: h });
    if (url.pathname === '/api/render' && request.method === 'POST') {
      const body = await request.json() as RenderRequest;
      return new Response(renderLayer(body.layer, body.data || {}), { headers: { 'Content-Type': 'text/html', 'Content-Security-Policy': CSP } });
    }
    if (url.pathname === '/api/layers') return new Response(JSON.stringify({ version: '1.0', layers: LAYERS }), { headers: h });
    if (url.pathname === '/api/a2a/layers') return new Response(JSON.stringify({ version: '1.0', type: 'structural', layers: Object.entries(LAYERS).map(([k,v])=>({id:k,name:v.name,icon:v.icon,description:v.description})), renderEndpoint: '/api/render' }), { headers: h });
    return new Response('Not found', { status: 404 });
  },
};
