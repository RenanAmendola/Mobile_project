// script.js

var id_carrinho

// Função para fazer uma requisição HTTP GET
function fetchData(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        callback(JSON.parse(xhr.responseText));
      }
    };
    xhr.open("GET", url, true);
    xhr.send();
  }
  
  // URL da API que você quer consumir
  var apiUrl = "http://localhost:8080/Products/";
  
  // Função para manipular os dados recebidos da API
  function handleData(data) {
    // Se a API retornar uma lista de produtos
    if (Array.isArray(data)) {
      // Seleciona o elemento onde os produtos serão exibidos
      var productListElement = document.getElementById("api-data-venda");
  
      // Limpa o conteúdo atual do elemento
      productListElement.innerHTML = "";
  
      // Itera sobre a lista de produtos e cria elementos HTML para cada produto
      data.forEach(function(product) {
        // Cria os elementos HTML para o produto
        if(product.tipo == "venda"){

          var productCard = document.createElement("div");
          productCard.className = "col-md-6 col-lg-4";
          productCard.innerHTML = `
            <div class="product-card">
              <img src="${product.imagem}" class="card-img-top product-image" alt="${product.name}">
              <h5 class="mt-3 text-capitalize product-name">${product.name}</h5>
              <p class="text-break product-description">Descrição: ${product.description}</p>
              <p class="text-break product-description">Tipo de Produto: ${product.tipo}</p>
              <div class="card-footer d-flex align-items-center justify-content-between">
              <small class="text-white product-price">Preço: R$ ${product.price.toFixed(2)}</small>
              <input type="hidden" value="${product.id}">
              <button class="btn btn-success btn-sm" onclick="redirecionar_carrinho(event)">Comprar</button>
              </div>
            </div>
          `;

          // Adiciona o produto ao elemento pai
          productListElement.appendChild(productCard);

        };

  

      });
    }

    
  }
  
  // Faz a requisição para a API
  fetchData(apiUrl, handleData);



  function redirecionar_carrinho(event) {
    // Obtenha o ID do produto clicado
    var productId = event.target.parentNode.querySelector("input[type=hidden]").value;

  
    // Defina o ID do produto como parâmetro na URL da próxima página
    window.location.href = "carrinho.html?id=" + productId;
  }
  