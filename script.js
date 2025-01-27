
const form = document.querySelector("form")

// Seleciona o elemento do formulário com o id
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

//seleciona os elementos da lista.
const expenseList = document.querySelector("ul")

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

    expenseAdd(newExpense)
}

// Função para adicionar uma nova despesa à lista
function expenseAdd(newExpense) {
    try {
        // Cria um novo elemento de lista para a despesa
        const expenseItem = document.createElement("li")
        expenseItem.classList.add("expense")

        // Cria um novo ícone da categoria
        const expenseIcon = document.createElement("img")

        expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
        expenseIcon.setAttribute("alt", newExpense.category_name)

        //cria a info da despesa.
        const expenseInfo = document.createElement("div")
        expenseInfo.classList.add("expense-info")

        //cria o nome da despesa
        const expenseName =  document.createElement("strong")
        expenseName.textContent = newExpense.expense

        //Cria a categoria da despesa.
        const expenseCategory =  document.createElement("span")
        expenseCategory.textContent = newExpense.category_name

        //Adiciona name e category na div=expense-info
        expenseInfo.append(expenseName, expenseCategory)

        // Adiciona o ícone ao item de despesa e a info
        expenseItem.append(expenseIcon, expenseInfo)
        
        // Adiciona o item de despesa à lista de despesas
        expenseList.append(expenseItem)

    } catch (error) {
        // Exibe um alerta em caso de erro
        alert("Erro")
        console.log(error)
    }
}