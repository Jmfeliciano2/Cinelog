
var filmes = [
  "Interestelar (2014)",
  "Clube da Luta (1999)",
  "Parasita (2019)"
];

function fazerLogin() {
  var usuario = document.getElementById("input-user").value;
  var senha   = document.getElementById("input-pass").value;
  var erro    = document.getElementById("login-error");

  if (usuario === "" || senha === "") {
    mostrarErroLogin("Preencha o usuário e a senha para continuar.");
    return;
  }

  if (usuario === "aluno" && senha === "fiap123") {
    erro.classList.add("hidden");
    document.getElementById("login-page").classList.add("hidden");
    document.getElementById("list-page").classList.remove("hidden");
    renderizarLista();
  } else {
    mostrarErroLogin("Usuário ou senha incorretos. Tente novamente.");
  }
}

function mostrarErroLogin(mensagem) {
  var erro = document.getElementById("login-error");
  erro.textContent = mensagem;
  erro.classList.remove("hidden");
}

function fazerLogout() {
  document.getElementById("list-page").classList.add("hidden");
  document.getElementById("login-page").classList.remove("hidden");
  document.getElementById("input-user").value = "";
  document.getElementById("input-pass").value = "";
  document.getElementById("login-error").classList.add("hidden");
}

/* ─────────────────────────────────────────────
   RENDERIZAÇÃO
───────────────────────────────────────────── */
function renderizarLista() {
  var lista = document.getElementById("movie-list");
  var stats = document.getElementById("stats-count");

  stats.innerHTML = "<strong>" + filmes.length + "</strong> filme" + (filmes.length !== 1 ? "s" : "") + " na lista";

  if (filmes.length === 0) {
    lista.innerHTML =
      '<div class="empty-state">' +
        '<div class="empty-icon">🎞️</div>' +
        '<p>Nenhum filme na lista ainda.<br>Adicione o primeiro acima!</p>' +
      '</div>';
    return;
  }

  var html = "";
  for (var i = 0; i < filmes.length; i++) {
    html +=
      '<div class="movie-item" id="item-' + i + '">' +
        '<span class="item-index">' + String(i + 1).padStart(2, "0") + '</span>' +
        '<span class="item-dot"></span>' +
        '<span class="item-title" id="titulo-' + i + '">' + escaparHtml(filmes[i]) + '</span>' +
        '<div class="item-actions">' +
          '<button class="btn-icon btn-edit" onclick="iniciarEdicao(' + i + ')">Editar</button>' +
          '<button class="btn-icon btn-remove" onclick="removerItem(' + i + ')">Remover</button>' +
        '</div>' +
      '</div>';
  }
  lista.innerHTML = html;
}

function escaparHtml(texto) {
  var div = document.createElement("div");
  div.appendChild(document.createTextNode(texto));
  return div.innerHTML;
}

/* ─────────────────────────────────────────────
   ADICIONAR
───────────────────────────────────────────── */
function obterNovoFilme() {
  var input   = document.getElementById("input-novo-filme");
  var valor   = input.value.trim();
  var erroDiv = document.getElementById("add-error");

  if (valor === "") {
    erroDiv.textContent = "O nome do filme não pode ficar em branco.";
    erroDiv.classList.remove("hidden");
    input.focus();
    return null;
  }

  erroDiv.classList.add("hidden");
  input.value = "";
  return valor;
}

function adicionarFinal() {
  var titulo = obterNovoFilme();
  if (titulo === null) return;
  filmes.push(titulo);
  renderizarLista();
}

function adicionarInicio() {
  var titulo = obterNovoFilme();
  if (titulo === null) return;
  filmes.unshift(titulo);
  renderizarLista();
}
function iniciarEdicao(indice) {
  var item       = document.getElementById("item-" + indice);
  var valorAtual = filmes[indice];

  item.innerHTML =
    '<span class="item-index">' + String(indice + 1).padStart(2, "0") + '</span>' +
    '<span class="item-dot"></span>' +
    '<input class="item-edit-input" type="text" id="edit-input-' + indice + '" value="' + escaparHtml(valorAtual) + '" />' +
    '<div class="item-actions">' +
      '<button class="btn-icon btn-save"   onclick="salvarEdicao(' + indice + ')">Salvar</button>' +
      '<button class="btn-icon btn-cancel" onclick="cancelarEdicao(' + indice + ')">Cancelar</button>' +
    '</div>';

  var editInput = document.getElementById("edit-input-" + indice);
  editInput.focus();
  editInput.select();
}

function salvarEdicao(indice) {
  var editInput = document.getElementById("edit-input-" + indice);
  var novoValor = editInput.value.trim();

  if (novoValor !== "") {
    filmes[indice] = novoValor;
  }

  renderizarLista();
}

function cancelarEdicao(indice) {
  renderizarLista();
}

function removerItem(indice) {
  filmes.splice(indice, 1);
  renderizarLista();
}
document.getElementById("input-pass").addEventListener("keydown", function(e) {
  if (e.key === "Enter") fazerLogin();
});

document.getElementById("input-user").addEventListener("keydown", function(e) {
  if (e.key === "Enter") fazerLogin();
});

document.addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    var activeId = document.activeElement && document.activeElement.id;
    if (activeId === "input-novo-filme") adicionarFinal();
  }
});