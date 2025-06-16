// Salvar usuário completo
function salvarUsuario(usuario) {
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

  if (usuarios.find(u => u.email === usuario.email)) {
    alert('Este email já está cadastrado.');
    return false;
  }

  usuarios.push(usuario);
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  return true;
}

// Cadastro
const cadastroForm = document.getElementById('registerForm');
if (cadastroForm) {
  cadastroForm.addEventListener('submit', e => {
    e.preventDefault();

    const email = document.getElementById('registerEmail').value;
    const senha = document.getElementById('registerPassword').value;
    const nome = document.getElementById('nomeCompleto').value;
    const dia = document.getElementById('diaNascimento').value.padStart(2, '0');
    const mes = document.getElementById('mesNascimento').value.padStart(2, '0');
    const ano = document.getElementById('anoNascimento').value;
    const telefone = document.getElementById('telefone').value;
    const endereco = document.getElementById('endereco').value;

    if (senha.length < 6) {
      alert('A senha deve ter no mínimo 6 caracteres.');
      return;
    }

    const usuario = {
      email,
      senha,
      nome,
      data: `${dia}/${mes}/${ano}`,
      telefone,
      endereco
    };

    if (salvarUsuario(usuario)) {
      alert('Cadastro realizado com sucesso!');
      window.location.href = 'index.html';
    }
  });
}

// Login
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', e => {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const senha = document.getElementById('loginPassword').value;

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const user = usuarios.find(u => u.email === email && u.senha === senha);

    if (user) {
      localStorage.setItem('loggedUser', email);
      window.location.href = 'dashboard.html';
    } else {
      alert('Email ou senha inválidos.');
    }
  });
}
