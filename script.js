
const form = document.querySelector("form")

// Seleciona o elemento do formulário com o id
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

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

// Captura os dados do formulário ao enviar
form.onsubmit = (e) => {
    e.preventDefault();

    // Cria um novo obj de despesa com os dados do formulário
    const newExpense = {
        id: new Date().getTime(), // Gera um ID único com base no timestamp atual
        expense: expense.value, 
        category_id: category.value, 
        category_name: category.options[category.selectedIndex].text, // Obtém o nome da categoria selec
        amount: amount.value, 
        created_at: new Date(),
    }
}