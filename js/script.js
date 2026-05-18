
const CONFIG = {
  botInvite: "https://discord.com/oauth2/authorize?client_id=1500350503832518846",
  discordInvite: "https://discord.gg/AUWnMAZTC",
  botCommandsChannel: "https://discord.com/channels/1499969209080217751/1499969210183454802",
  supabaseUrl: "https://yphcdpzkzdlerriclzrn.supabase.co",
  supabaseAnonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwaGNkcHpremRsZXJyaWNsenJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxNDEwNzksImV4cCI6MjA5NDcxNzA3OX0.Dj9lDuSPDns29XgCjeHyrcPDuovaqzAQsVMrdPGvhHs"
};

let ranks = [];

const demoRanks = [
  {username:"Gojo", aura:"Omega", kakera:18420, collection:42, luck:845},
  {username:"Sukuna", aura:"Criador", kakera:14210, collection:38, luck:540},
  {username:"Shadow", aura:"???", kakera:11780, collection:31, luck:1200},
  {username:"Rem", aura:"Solar", kakera:9800, collection:55, luck:420},
  {username:"Madara", aura:"Eclipse", kakera:7450, collection:27, luck:390}
];

function toast(text){
  const t=document.getElementById("toast");
  if(!t) return;
  t.innerText=text;
  t.style.display="block";
  setTimeout(()=>t.style.display="none",2600);
}

function openLink(url){ window.open(url, "_blank"); }
function addBot(){ openLink(CONFIG.botInvite); }
function joinDiscord(){ openLink(CONFIG.discordInvite); }
function goBot(){ openLink(CONFIG.botCommandsChannel); }

function buyItem(command){
  navigator.clipboard?.writeText(command);
  toast(`Comando copiado: ${command}`);
  setTimeout(()=>goBot(),650);
}

function openVerify(){ document.getElementById("verifyModal").style.display="flex"; }
function closeVerify(){ document.getElementById("verifyModal").style.display="none"; }

function fakeVerify(){
  const key=document.getElementById("verifyKey").value.trim();
  const result=document.getElementById("verifyResult");
  if(key.length < 12){
    result.innerHTML="❌ Key muito curta. Use a key privada gerada pelo bot.";
    return;
  }
  result.innerHTML="✅ Preview visual: no Discord o bot vai validar sua key real.";
}

async function loadRanks(){
  if(CONFIG.supabaseAnonKey.includes("COLE_SUA_ANON_KEY")){
    ranks = demoRanks;
    renderRanks();
    showRankStatus("⚠️ Usando ranking demo. Cole sua anon key no js/script.js.");
    return;
  }

  try{
    const res = await fetch(`${CONFIG.supabaseUrl}/rest/v1/rankings?select=*&order=kakera.desc`, {
      headers: {
        apikey: CONFIG.supabaseAnonKey,
        Authorization: `Bearer ${CONFIG.supabaseAnonKey}`
      }
    });

    if(!res.ok) throw new Error("Erro Supabase " + res.status);

    const data = await res.json();
    ranks = data.length ? data : demoRanks;
    renderRanks();
    showRankStatus(data.length ? "✅ Ranking real carregado do Supabase." : "⚠️ Banco vazio, mostrando ranking demo.");
  }catch(err){
    console.error(err);
    ranks = demoRanks;
    renderRanks();
    showRankStatus("❌ Não consegui carregar o Supabase. Conferir URL, anon key e tabela rankings.");
  }
}

function showRankStatus(text){
  const el=document.getElementById("rankStatus");
  if(el) el.innerHTML=text;
}

function renderRanks(){
  const el=document.getElementById("rankList");
  if(!el) return;

  const type=document.getElementById("rankType")?.value || "kakera";
  const q=(document.getElementById("rankSearch")?.value || "").toLowerCase();

  const filtered=[...ranks]
    .filter(r=>(r.username||"").toLowerCase().includes(q) || (r.aura||"").toLowerCase().includes(q))
    .sort((a,b)=>(Number(b[type])||0)-(Number(a[type])||0));

  el.innerHTML = filtered.map((r,i)=>{
    const medal = i===0?"🥇":i===1?"🥈":i===2?"🥉":`#${i+1}`;
    const scoreLabel = type==="kakera" ? `💎 ${Number(r.kakera||0).toLocaleString()}` :
                       type==="collection" ? `🎌 ${Number(r.collection||0)} chars` :
                       `🍀 x${Number(r.luck||0)}`;
    return `
      <div class="rank-row">
        <div class="medal">${medal}</div>
        <div class="userline">
          <strong>@${r.username || "Desconhecido"}</strong>
          <span>Aura: ${r.aura || "Nenhuma"}</span>
        </div>
        <div class="score">${scoreLabel}</div>
      </div>
    `;
  }).join("");
}

document.addEventListener("DOMContentLoaded",()=>{
  loadRanks();
  document.getElementById("rankType")?.addEventListener("change", renderRanks);
  document.getElementById("rankSearch")?.addEventListener("input", renderRanks);
});
