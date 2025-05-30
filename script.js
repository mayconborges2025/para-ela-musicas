const audio = document.getElementById('audio-player');
const mensagemEl = document.getElementById('mensagem');
const tituloEl = document.getElementById('musica-titulo');
const themeToggle = document.getElementById('theme-toggle');
const playlistButtons = document.querySelectorAll('.playlist-btn');
const btnPrev = document.getElementById('btn-prev');
const btnPlay = document.getElementById('btn-play');
const btnNext = document.getElementById('btn-next');

btnPrev.addEventListener('click', () => {
  currentSongIndex--;
  if (currentSongIndex < 0) {
    currentSongIndex = playlists[currentPlaylist].length - 1;
  }
  playSong(currentSongIndex);
});

btnNext.addEventListener('click', () => {
  currentSongIndex++;
  if (currentSongIndex >= playlists[currentPlaylist].length) {
    currentSongIndex = 0;
  }
  playSong(currentSongIndex);
});

btnPlay.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    btnPlay.textContent = '⏸️';
  } else {
    audio.pause();
    btnPlay.textContent = '▶️';
  }
});

audio.addEventListener('play', () => {
  btnPlay.textContent = '⏸️';
});
audio.addEventListener('pause', () => {
  btnPlay.textContent = '▶️';
});
audio.addEventListener('ended', () => {
  btnPlay.textContent = '▶️';
});

// Frases e playlists
const frases = [
  "Foi só uma chamada... mas virou lembrança pra sempre.",
  "Essa música ainda toca, mesmo que você não esteja mais ouvindo.",
  "Você lembra disso? Eu nunca esqueci.",
  "Se um dia apertar o play de novo... eu ainda tô aqui.",
  "Nesse dia eu vi seu lado safada e menina ao mesmo tempo.",
  "Vi seu lado carinhosa.",
];

const playlists = {
  princesa: [
    { title: "Any Gabrielly", file: "assets/princesaedisney/m1.mp3" },
    { title: "Sylvia Salustti", file: "assets/princesaedisney/m2.mp3" },
    { title: "Minha princesa", file: "assets/princesaedisney/mb3.mp3" },
    { title: "Lembre de mim", file: "assets/princesaedisney/mb4.mp3" },
    { title: "Amo tu", file: "assets/princesaedisney/mb5.mp3" },
    { title: "Gosto da sua energia", file: "assets/princesaedisney/mb6.mp3" },
    { title: "Voce tem a magia", file: "assets/princesaedisney/mb7.mp3" },
    { title: "Minha fada", file: "assets/princesaedisney/mb8.mp3" },
    { title: "Gata da minha vida", file: "assets/princesaedisney/mb9.mp3" },
    { title: "Princesa", file: "assets/princesaedisney/mb10.mp3" }
  ],
  tv: [
    { title: "Nós dois juntos", file: "assets/tv/m3.mp3" },
    { title: "na sala", file: "assets/tv/mb1.mp3" },
    { title: "TV ligada", file: "assets/tv/mb2.mp3" },
    { title: "Luz apagada", file: "assets/tv/mb3.mp3" },
    { title: "A gente", file: "assets/tv/mb4.mp3" },
    { title: "No Sofá", file: "assets/tv/mb5.mp3" },
    { title: "Escutando", file: "assets/tv/mb6.mp3" },
    { title: "Música", file: "assets/tv/mb7.mp3" },
    { title: "Cantando", file: "assets/tv/mb8.mp3" },
    { title: "Juntos", file: "assets/tv/mb9.mp3" },
    { title: "Sem ligar", file: "assets/tv/mb10.mp3" },
    { title: "Pra nada", file: "assets/tv/mb11.mp3" },
  ],
  relax: [
    { title: "Paz Profunda", file: "/assets/oroche/mb1.mp3" },
    { title: "Brisa Suave", file: "assets/oroche/mb2.mp3" },
    { title: "Horizonte Calmo", file: "assets/oroche/mb3.mp3" },
    { title: "Horizonte Calmo", file: "assets/oroche/mb4.mp3" },
    { title: "Horizonte Calmo", file: "assets/oroche/mb5.mp3" },
    { title: "Horizonte Calmo", file: "assets/oroche/mb6.mp3" },
    { title: "Horizonte Calmo", file: "assets/oroche/mb7.mp3" },
    { title: "Horizonte Calmo", file: "assets/oroche/mb8.mp3" },
    { title: "Horizonte Calmo", file: "assets/oroche/mb9.mp3" },
    { title: "Horizonte Calmo", file: "assets/oroche/mb10.mp3" },
    { title: "Horizonte Calmo", file: "assets/oroche/mb11.mp3" },
    { title: "Horizonte Calmo", file: "assets/oroche/mb12.mp3" },
    { title: "Horizonte Calmo", file: "assets/oroche/mb13.mp3" },
    { title: "Horizonte Calmo", file: "assets/oroche/mb14.mp3" },
    { title: "Horizonte Calmo", file: "assets/oroche/mb15.mp3" },
    { title: "Horizonte Calmo", file: "assets/oroche/mb17.mp3" },
    { title: "Horizonte Calmo", file: "assets/oroche/mb18.mp3" },
  ]
};

let currentPlaylist = 'princesa';
let currentSongIndex = 0;
let currentPhraseIndex = 0;
let fadeInterval, phraseInterval;

function loadTheme() {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    document.body.classList.add('dark');
    themeToggle.textContent = '☀️';
  } else {
    document.body.classList.add('light');
    themeToggle.textContent = '🌙';
  }
}

function toggleTheme() {
  if (document.body.classList.contains('dark')) {
    document.body.classList.replace('dark', 'light');
    themeToggle.textContent = '🌙';
    localStorage.setItem('theme', 'light');
  } else {
    document.body.classList.replace('light', 'dark');
    themeToggle.textContent = '☀️';
    localStorage.setItem('theme', 'dark');
  }
}

function setPlaylist(name) {
  currentPlaylist = name;
  currentSongIndex = 0;
  updatePlaylistButtons();

  // Define música atual mas NÃO toca automaticamente
  tituloEl.textContent = playlists[currentPlaylist][currentSongIndex].title;
  audio.src = playlists[currentPlaylist][currentSongIndex].file;
  audio.load(); // carrega sem tocar
}

function updatePlaylistButtons() {
  playlistButtons.forEach(btn => {
    if (btn.dataset.playlist === currentPlaylist) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

function playSong(index) {
  if (fadeInterval) clearInterval(fadeInterval);
  audio.pause();

  let vol = audio.volume;
  fadeInterval = setInterval(() => {
    if (vol > 0) {
      vol = Math.max(0, vol - 0.1);
      audio.volume = vol;
    } else {
      clearInterval(fadeInterval);
      audio.src = playlists[currentPlaylist][index].file;
      tituloEl.textContent = playlists[currentPlaylist][index].title;
      audio.load();
      audio.volume = 0;
      audio.play().then(() => fadeInAudio()).catch(err => {
        // em celular pode ser bloqueado se não for interação do usuário
        console.warn('Playback bloqueado:', err);
      });
    }
  }, 50);
}

function fadeInAudio() {
  let vol = 0;
  fadeInterval = setInterval(() => {
    if (vol < 1) {
      vol = Math.min(1, vol + 0.05);
      audio.volume = vol;
    } else {
      clearInterval(fadeInterval);
    }
  }, 70);
}

audio.addEventListener('ended', () => {
  currentSongIndex++;
  if (currentSongIndex >= playlists[currentPlaylist].length) {
    currentSongIndex = 0;
  }
  playSong(currentSongIndex);
});

function cyclePhrases() {
  mensagemEl.style.opacity = 0;
  setTimeout(() => {
    mensagemEl.textContent = frases[currentPhraseIndex];
    mensagemEl.style.opacity = 1;
    currentPhraseIndex++;
    if (currentPhraseIndex >= frases.length) {
      currentPhraseIndex = 0;
    }
  }, 800);
}

function resetPhraseCycle() {
  if (phraseInterval) clearInterval(phraseInterval);
  currentPhraseIndex = 0;
  cyclePhrases();
  phraseInterval = setInterval(cyclePhrases, 7000);
}

// Eventos
themeToggle.addEventListener('click', toggleTheme);
playlistButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    setPlaylist(btn.dataset.playlist);
  });
});

// Inicialização
loadTheme();
setPlaylist(currentPlaylist); // NÃO toca música
resetPhraseCycle();
