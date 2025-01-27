// Seleciona o elemento do formulário com o id "amount"
const amount = document.getElementById("amount")

// Adiciona um evento de input ao elemento "amount"
amount.oninput = () => {
    // Remove todos os caracteres que não são dígitos
    let value = amount.value.replace(/\D/g, "")

    //transforma o valor em centavos (ex: 150/100 = 1.5 que é equivalente a R$1,50)
    value = Number(value)/100
    
    // Atualiza o valor do elemento "amount" com os dígitos restantes
    amount.value = formatCurrencyBRL(value)
}

function formatCurrencyBRL(value){
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })
    return value
}