function login() {
  let user = document.getElementById("username").value;
  let pass = document.getElementById("password").value;

  if (user === "cliente" && pass === "123") {

    alert("Login Cliente bem-sucedido!");
    window.location.href = "cliente.html";

  } else if (user === "admin" && pass === "admin123") {

    alert("Login Administrador bem-sucedido!");
    window.location.href = "manutencao_produtos.html";

  } else {

    alert("Usuário ou senha incorretos!");
    
  }
}