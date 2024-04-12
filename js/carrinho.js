// Obtenha o ID do produto dos parâmetros da URL
var urlParams = new URLSearchParams(window.location.search);
var productId = urlParams.get('id');
console.log(productId)
// Use o ID do produto na chamada à API do carrinho
// Exemplo:
// fetchData("http://localhost:8080/Cart/" + productId, function(response) {
//   // Manipule a resposta da API do carrinho aqui
// });

// Função para fazer uma requisição HTTP GET
function fetchCartData(productId) {
    // URL da API do carrinho com o ID do produto como parâmetro
    var cartUrl = "http://localhost:8080/Products/" + productId;
  
    // Faz a requisição GET para a API do carrinho
    fetch(cartUrl)
      .then(function(response) {
        // Verifica se a resposta da requisição foi bem-sucedida (status 200)
        if (response.ok) {
          // Converte a resposta para JSON
          return response.json();
        } else {
          // Em caso de erro na resposta, lança uma exceção
          throw new Error('Erro ao obter dados do carrinho: ' + response.status);
        }
      })
      .then(function(data) {
        // Manipula os dados do carrinho
        console.log("Dados do carrinho:", data);
        displayCartInfo(data);
        // Adiciona o produto ao elemento pai

      })
      .catch(function(error) {
        // Captura qualquer erro que ocorra durante a requisição
        console.error('Erro na requisição:', error.message);
      });
  }

  var tipo_compra_valor
// Função para exibir os dados do carrinho no HTML
function displayCartInfo(cartData) {
    // Seleciona o elemento onde os dados do carrinho serão exibidos
    var cartInfoElement = document.getElementById("api-data-carrinho");
  
    // Limpa o conteúdo atual do elemento
    cartInfoElement.innerHTML = "";
  
    // Cria elementos HTML para exibir as informações do carrinho
    var productNameElement = document.createElement("p");
    productNameElement.textContent = "Produto: " + cartData.name;
  
    var quantityElement = document.createElement("p");
    quantityElement.textContent = "Descrição: " + cartData.description;
  
    var totalPriceElement = document.createElement("p");
    totalPriceElement.textContent = "Preço Total: R$ " + cartData.price.toFixed(2);

    var tipo_compra = document.createElement("p");
    tipo_compra.textContent =  "Tipo de venda: "+ cartData.tipo

    tipo_compra_valor = cartData.tipo
  
    // Adiciona os elementos ao elemento pai
    cartInfoElement.appendChild(productNameElement);
    cartInfoElement.appendChild(quantityElement);
    cartInfoElement.appendChild(totalPriceElement);
    cartInfoElement.appendChild(tipo_compra);
  }
  
  // Obtenha o ID do produto dos parâmetros da URL
  var urlParams = new URLSearchParams(window.location.search);
  var productId = urlParams.get('id');
  
  // Verifique se o ID do produto existe e é válido
  if (productId) {
    // Chame a função para obter os dados do carrinho com o ID do produto
    fetchCartData(productId);
  } else {
    console.log("Nenhum ID de produto encontrado na URL.");
  }



  function consultar_api_rua(event) {
    var valor_cep = document.getElementById("valor_cep").value;
  
    var url = 'http://dados.recife.pe.gov.br/api/3/action/datastore_search?resource_id=01187dc5-61d0-438b-b1bc-b1ec508a3e0f&q=' + valor_cep;
  
    $.ajax({
      url: url,
      dataType: 'json',
      success: function(data) {
        // Verifica se há resultados
        if (data.result && data.result.records && data.result.records.length > 0) {
          // Obtém o primeiro resultado
          var cep_api_resultado = data.result.records[0];

          document.getElementById("bairro").value = cep_api_resultado.nomebairro;
          document.getElementById("logradouro").value = cep_api_resultado.nome_oficial_logradouro;
          document.getElementById("municipio").value = cep_api_resultado.municipio;
          document.getElementById("uf").value = cep_api_resultado.uf;
  
        } else {
          alert("Nenhum resultado encontrado para o CEP fornecido.");
        }
      },
      error: function(xhr, status, error) {
        console.error('Erro ao consultar a API:', error);
      }
    });
  }




  var $status = document.getElementById('status');

  if ('Notification' in window) {
    $status.innerText = Notification.permission;
  }
  
  function requestPermissionAndNotify() {
    if (!('Notification' in window)) {
      alert('Notification API not supported!');
      return;
    }
    
    // Verifica se a permissão já foi concedida
    if (Notification.permission === 'granted') {
      // Se sim, mostra a notificação diretamente
      showNotification();
    } else {
      // Se não, solicita permissão ao usuário
      Notification.requestPermission(function (result) {
        $status.innerText = result;
        if (result === 'granted') {
          // Se o usuário concedeu a permissão, mostra a notificação
          showNotification();
        }
      });
    }
  }
  
  function showNotification() {
    if (!('Notification' in window)) {
      alert('Notification API not supported!');
      return;
    }
    
    try {
      var notification = new Notification("Compra realizada com sucesso! \nRedirecionando para a aba de "+ tipo_compra_valor);

      document.getElementById("botao_compra").innerHTML = "Aguarde..."
      
      // Adiciona um atraso de 3 segundos (3000 milissegundos) antes de redirecionar para outra página
      setTimeout(function() {
        // Redireciona para outra página
        window.location.href = tipo_compra_valor +".html";
      }, 3000);
    } catch (err) {
      alert('Notification API error: ' + err);
    }
  }
  
  
  
  