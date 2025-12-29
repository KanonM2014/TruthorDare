const baseUrl = 'http://localhost:8000'

// Helpers
const qs = (s) => document.querySelector(s)
const qsa = (s) => document.querySelectorAll(s)

async function request(path, method='GET'){
  const url = `${baseUrl}${path}`
  const res = await fetch(url, { method })
  return res.ok ? res.text() : Promise.reject(await res.text())
}

// Players
async function loadPlayers(){
  try{
    const text = await request('/Pemain')
    const list = JSON.parse(JSON.stringify(eval(text)))
    // backend returns plain list; if string, try to parse
    const players = Array.isArray(list)? list : (typeof text === 'string' && text.startsWith('[')? JSON.parse(text) : [])
    renderList('playersList', players)
  }catch(e){
    // fallback: try text
    const t = await request('/Pemain')
    try{ renderList('playersList', JSON.parse(t)) }catch{ document.getElementById('playersList').innerHTML = `<li class="muted">${t}</li>` }
  }
}

async function addPlayer(){
  const name = qs('#playerName').value.trim()
  if(!name) return
  await fetch(`${baseUrl}/Pemain?Nama_Pemain=${encodeURIComponent(name)}`,{ method:'POST' })
  qs('#playerName').value=''
  await refreshAll()
}

// Questions
async function loadQuestions(){
  try{
    const t = await request('/Pertanyaan')
    try{ renderList('questionsList', JSON.parse(t)) }catch{ document.getElementById('questionsList').innerHTML = `<li class="muted">${t}</li>` }
  }catch(e){ document.getElementById('questionsList').innerHTML = `<li class="muted">${e}</li>` }
}

async function addQuestion(){
  const q = qs('#questionText').value.trim()
  if(!q) return
  await fetch(`${baseUrl}/Pertanyaan?pertanyaan=${encodeURIComponent(q)}`,{ method:'POST' })
  qs('#questionText').value=''
  await refreshAll()
}

// Challenges
async function loadChallenges(){
  try{
    const t = await request('/Tantang')
    try{ renderList('challengesList', JSON.parse(t)) }catch{ document.getElementById('challengesList').innerHTML = `<li class="muted">${t}</li>` }
  }catch(e){ document.getElementById('challengesList').innerHTML = `<li class="muted">${e}</li>` }
}

async function addChallenge(){
  const c = qs('#challengeText').value.trim()
  if(!c) return
  await fetch(`${baseUrl}/Tantang?Tantangan=${encodeURIComponent(c)}`,{ method:'POST' })
  qs('#challengeText').value=''
  await refreshAll()
}

// Render helper
function renderList(elId, items){
  const ul = document.getElementById(elId)
  ul.innerHTML = ''
  if(!items || items.length===0){ ul.innerHTML = '<li class="muted">(Kosong)</li>'; return }
  items.forEach((it, idx)=>{
    const li = document.createElement('li')
    li.innerHTML = `<span>${it}</span><div><button class="small-btn" data-idx="${idx+1}" data-list="${elId}">Hapus</button></div>`
    ul.appendChild(li)
  })
}

// Delete handler (shared)
async function handleDelete(idx, listName){
  // determine endpoint from list
  if(listName==='playersList'){
    await fetch(`${baseUrl}/Pemain?Urutan=${idx}`,{ method:'DELETE' })
  }else if(listName==='questionsList'){
    await fetch(`${baseUrl}/Pertanyaan?Urutan=${idx}`,{ method:'DELETE' })
  }else if(listName==='challengesList'){
    await fetch(`${baseUrl}/Tantang?Urutan=${idx}`,{ method:'DELETE' })
  }
  await refreshAll()
}

// Game actions
async function pickPlayer(){
  try{
    const t = await request('/Acak-acakan')
    qs('#result').textContent = t
  }catch(e){ qs('#result').textContent = `Error: ${e}` }
}

async function pickTruthOrDare(){
  try{
    const td = await request('/Acak-TruthorDare')
    qs('#result').textContent = td
  }catch(e){ qs('#result').textContent = `Error: ${e}` }
}

async function playRound(){
  try{
    const player = await request('/Acak-acakan')
    const td = await request('/Acak-TruthorDare')
    let extra = ''
    if(td.includes('Truth')){
      const q = await request(encodeURI('/Acak Pertanyaan'))
      extra = q
    }else{
      const c = await request(encodeURI('/Acak Tantangan'))
      extra = c
    }
    qs('#result').textContent = `${player} ${td} ${extra}`
  }catch(e){ qs('#result').textContent = `Error: ${e}` }
}

async function refreshAll(){
  await Promise.all([loadPlayers(), loadQuestions(), loadChallenges()])
}

// Event wiring
document.addEventListener('DOMContentLoaded', ()=>{
  qs('#addPlayer').addEventListener('click', addPlayer)
  qs('#addQuestion').addEventListener('click', addQuestion)
  qs('#addChallenge').addEventListener('click', addChallenge)

  qs('#pickPlayer').addEventListener('click', pickPlayer)
  qs('#pickTruthOrDare').addEventListener('click', pickTruthOrDare)
  qs('#playRound').addEventListener('click', playRound)

  document.body.addEventListener('click', (ev)=>{
    const b = ev.target.closest('button[data-idx]')
    if(b){
      const idx = b.getAttribute('data-idx')
      const list = b.getAttribute('data-list')
      handleDelete(idx, list)
    }
  })

  refreshAll()
})
