const socket = io('http://localhost:3000');

const chat = document.getElementById('chat');
const inputMensagem = document.getElementById('mensagem');
const alerta = document.getElementById('alerta');

socket.on('connect', () => {
  console.log('Conectado ao servidor');
  esconderAlerta();
});

socket.on('mensagem', msg => {
  const li = document.createElement('li');
  li.innerText = msg;
  chat.appendChild(li);
});

socket.on('connect_error', () => {
  mostrarAlerta('Erro: servidor WebSocket desconectado.');
});

function enviar() {
  const msg = inputMensagem.value.trim();
  if (msg) {
    socket.emit('mensagem', msg);
    inputMensagem.value = '';
  }
}

function mostrarAlerta(mensagem) {
  alerta.innerText = mensagem;
  alerta.style.display = 'block';

  // setTimeout(() => {
  //   esconderAlerta();
  // }, 2000);
}

function esconderAlerta() {
  alerta.style.display = 'none';
}
