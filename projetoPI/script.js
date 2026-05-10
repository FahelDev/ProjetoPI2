let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
let total = parseFloat(localStorage.getItem("total")) || 0;

// Adiciona produto ao carrinho
function adicionarCarrinho(nome, preco) {
  const produtoExistente = carrinho.find(item => item.nome === nome);
  if (produtoExistente) {
    produtoExistente.quantidade += 1;
  } else {
    carrinho.push({ nome, preco, quantidade: 1 });
  }
  calcularTotal();
  salvarCarrinho();
  alert(`${nome} foi adicionado ao carrinho!`);
}

// Remove produto do carrinho
function removerCarrinho(index) {
  carrinho.splice(index, 1);
  calcularTotal();
  salvarCarrinho();
  atualizarCarrinho();
}

// Aumenta a quantidade de um produto
function aumentarQuantidade(index) {
  carrinho[index].quantidade += 1;
  calcularTotal();
  salvarCarrinho();
  atualizarCarrinho();
}

// Diminui a quantidade de um produto
function diminuirQuantidade(index) {
  carrinho[index].quantidade -= 1;
  if (carrinho[index].quantidade <= 0) {
    removerCarrinho(index);
  } else {
    calcularTotal();
    salvarCarrinho();
    atualizarCarrinho();
  }
}

// Calcula total do carrinho
function calcularTotal() {
  total = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
}

// Atualiza a lista do carrinho na página
function atualizarCarrinho() {
  const lista = document.getElementById("lista-carrinho");
  if (!lista) return;

  lista.innerHTML = "";

  carrinho.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${item.nome} - R$ ${item.preco.toFixed(2)}</span>
      <div class="quantidade-controles">
        <button onclick="diminuirQuantidade(${index})">-</button>
        <span>${item.quantidade}</span>
        <button onclick="aumentarQuantidade(${index})">+</button>
      </div>
      <button class="btn-remover" onclick="removerCarrinho(${index})">Remover</button>
    `;
    lista.appendChild(li);
  });

  document.getElementById("total").textContent = total.toFixed(2);
}

// Salva carrinho no LocalStorage
function salvarCarrinho() {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  localStorage.setItem("total", total);
}

document.addEventListener("DOMContentLoaded", atualizarCarrinho);

function direcionarCheck(){

window.location.href = "checkout.html";

}


// CHECKOUT


    // Atualiza resumo do carrinho ao carregar a página
    atualizarResumoCarrinho();

    // Event listener para opções de pagamento
    document.querySelectorAll('input[name="pagamento"]').forEach(radio => {
      radio.addEventListener('change', function() {
        const camposCartao = document.getElementById('campos-cartao');
        if (this.value === 'cartao') {
          camposCartao.style.display = 'block';
        } else {
          camposCartao.style.display = 'none';
        }
      });
    });

    // Event listener para botão finalizar compra
    document.getElementById('btn-finalizar-checkout').addEventListener('click', function() {
      const formEndereco = document.getElementById('form-endereco');
      const pagamento = document.querySelector('input[name="pagamento"]:checked').value;
      let isValid = true;

      // Valida formulário de endereço
      if (!formEndereco.checkValidity()) {
        isValid = false;
        alert('Por favor, preencha todos os campos do endereço corretamente.');
      }

      // Valida campos de cartão se selecionado
      if (pagamento === 'cartao') {
        const numeroCartao = document.getElementById('numero-cartao').value.trim();
        const validade = document.getElementById('validade').value.trim();
        const cvv = document.getElementById('cvv').value.trim();
        const nomeCartao = document.getElementById('nome-cartao').value.trim();
        if (!numeroCartao || !validade || !cvv || !nomeCartao) {
          isValid = false;
          alert('Por favor, preencha todos os campos do cartão de crédito.');
        }
      }

      if (isValid) {
        // Simula finalização: limpa carrinho e mostra mensagem
        limparCarrinho(); // Assumindo que script.js tem essa função
        document.querySelector('.checkout').style.display = 'none';
        document.getElementById('mensagem-sucesso').style.display = 'block';
      }
    });

    // Função para atualizar resumo do carrinho (similar a atualizarCarrinho no carrinho.html)
    function atualizarResumoCarrinho() {
      const carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]');
      const listaResumo = document.getElementById('lista-resumo');
      const totalResumo = document.getElementById('total-resumo');
      let total = 0;

      listaResumo.innerHTML = '';
      carrinho.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.nome} - ${item.quantidade}x R$ ${item.preco.toFixed(2)}`;
        listaResumo.appendChild(li);
        total += item.preco * item.quantidade;
      });

      totalResumo.textContent = total.toFixed(2);
    }

    // Função para limpar carrinho (adicione ao script.js se não existir)
    function limparCarrinho() {
      localStorage.removeItem('carrinho');
    }

    function direcionarCompraFinalizada(){

      window.location.href = "compraFinalizada.html";

    }