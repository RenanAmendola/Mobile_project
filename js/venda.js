

 
        // Carregar o JSON dos produtos
        fetch('../venda.json')
            .then(response => response.json())
            .then(produtos => {
                // Manipular os dados do JSON
                const produtosDiv = document.getElementById('produtos');
                for (let i = 0; i < produtos.produtos.length; i++) {
                    const produtoDiv = document.createElement('div');
                    produtoDiv.innerHTML = `
                    <div class="col-md-6 col-lg-4">
                        <div class="product-card">
                            <img src="${produtos.produtos[i].imagem}" class="card-img-top" alt="${produtos.produtos[i].nome}">
                            <h5 class="mt-3 text-capitalize" id="nome">Nome: ${produtos.produtos[i].nome}</h5>
                            <p class="text-break" id="descrição">Descrição: ${produtos.produtos[i].descricao}</p>
                            <p class="text-break" id="descrição">Tipo de compra: ${produtos.produtos[i].tipo}</p>
                            <div class="card-footer d-flex align-items-center justify-content-between">
                                <small class="text-white" id="preço">Preço: R$ ${produtos.produtos[i].preço.toFixed(2)}</small>
                                <button class="btn btn-success btn-sm" onclick="adicionarAoCarrinho('${produtos.produtos[i].id}', '${produtos.produtos[i].imagem}' , '${produtos.produtos[i].nome}','${produtos.produtos[i].descricao}' , '${produtos.produtos[i].tipo}', '${produtos.produtos[i].preço}')">Comprar</button>
                            </div>
                        </div>
                    </div>
                `;
                    produtosDiv.appendChild(produtoDiv);
                }
                
            })
            .catch(error => console.error('Erro ao carregar os produtos:', error));




    // Função para adicionar o produto ao carrinho
    function adicionarAoCarrinho(id, imagem, nome, descricao, tipo, preço) {
        localStorage.setItem('id_produto', id);
        localStorage.setItem('imagem_produto', imagem);
        localStorage.setItem('nome_produto', nome);
        localStorage.setItem('descricao', descricao);
        localStorage.setItem('tipo', tipo);
        localStorage.setItem('preço_produto', preço);
        window.location.href = "carrinho.html";
    }
    