const fileInput = document.getElementById('fileInput');
const contentDiv = document.getElementById('content');
const clearAllBtn = document.getElementById('clearAllBtn');
const STORAGE_KEY = 'markdownFiles';

document.addEventListener('DOMContentLoaded', async () => {
  const stored = await chrome.storage.local.get(STORAGE_KEY);
  if (stored[STORAGE_KEY]) {
    renderAll(stored[STORAGE_KEY]);
  }
});

fileInput.addEventListener('change', async (e) => {
  const files = Array.from(e.target.files);
  const stored = await chrome.storage.local.get(STORAGE_KEY);
  const current = stored[STORAGE_KEY] || [];

  for (const file of files) {
    const text = await file.text();
    current.push({ name: file.name, content: text });
  }

  await chrome.storage.local.set({ [STORAGE_KEY]: current });
  renderAll(current);
});

clearAllBtn.addEventListener('click', async () => {
  await chrome.storage.local.remove(STORAGE_KEY);
  contentDiv.innerHTML = '';
});

function renderAll(files) {
  contentDiv.innerHTML = '';
  files.forEach(file => {
    const container = document.createElement('div');
    // container.innerHTML = `<h2 style="font-size:17px;font-weight:700;color:white;background:linear-gradient(90deg,#007acc,#005fa3);padding:12px 16px;margin:20px 0 10px;border-radius:12px;box-shadow:0 3px 8px rgba(0,0,0,0.15);display:flex;align-items:center;gap:8px;">${file.name}</h2>`;
    container.innerHTML = `<h2 style="font-size:17px;font-weight:700;background: linear-gradient(90deg, #d7e9fb, #bcdffc);padding:12px 16px;margin:20px 0 10px;border-radius:12px;box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);display:flex;align-items:center;gap:8px;">${file.name}</h2>`;
    container.querySelector('h2').addEventListener('click', (e) => {
      e.target.classList.toggle('collapsed');
      const ul = e.target.nextElementSibling;
      if (ul) ul.style.display = ul.style.display === 'none' ? 'block' : 'none';
    });

    const parsed = parseMarkdown(file.content);
    container.appendChild(parsed);
    contentDiv.appendChild(container);
  });
}

function parseMarkdown(markdown) {
  const wrapper = document.createElement('div');
  const lines = markdown.split('\n');
  let currentUl = null;

  for (let line of lines) {
    line = line.trim();
    if (line.startsWith('## ')) {
      const header = document.createElement('h2');
      header.textContent = line.slice(3);
      header.addEventListener('click', () => {
        header.classList.toggle('collapsed');
        const nextUl = header.nextElementSibling;
        if (nextUl) nextUl.style.display = nextUl.style.display === 'none' ? 'block' : 'none';
      });
      wrapper.appendChild(header);
      currentUl = document.createElement('ul');
      wrapper.appendChild(currentUl);
    } else if (line.match(/^\[(.+?)\]\((.+?)\)$/)) {
      const [, text, url] = line.match(/^\[(.+?)\]\((.+?)\)$/);
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.textContent = text;
      li.appendChild(a);
      if (currentUl) currentUl.appendChild(li);
    }
  }

  return wrapper;
}
