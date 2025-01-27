
const form = document.querySelector("form")

// Seleciona o elemento do formulário com o id
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

//seleciona os elementos da lista.
const expenseList = document.querySelector("ul")
const expensesQuantity = document.querySelector("aside header p  span")
const expenseTotal = document.querySelector("aside header h2")

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

        //Cria o valor da despesa.
        const expenseAmount = document.createElement("span")
        expenseAmount.classList.add("expense-amount")
        expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$", "")}`

        //cria o ícone de remover
        const removeIcon = document.createElement("img")
        removeIcon.classList.add("remove-icon")
        removeIcon.setAttribute("src","img/remove.svg")
        removeIcon.setAttribute("alt","remover")

        // Adiciona o ícone,info e o valor
        expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)
        
        // Adiciona o item de despesa à lista de despesas
        expenseList.append(expenseItem)

        //Atualiza o valor total das despesas
        updateTotals()

    } catch (error) {
        // Exibe um alerta em caso de erro
        alert("Erro")
        console.log(error)
    }
}

// Função para atualizar o total das despesas
function updateTotals() {
    try {
        // Obtém todos os itens da lista de despesas
        const items = expenseList.children

        // Atualiza a quantidade de despesas
        expensesQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`

        let total = 0

        // Itera sobre cada item da lista de despesas
        for (let i = 0; i < items.length; i++) {
            // Seleciona o valor da despesa
            const itemAmount = items[i].querySelector(".expense-amount");

            // Remove caracteres não numéricos e converte para número
            let value = itemAmount.textContent.replace(
                /[^\d,]/g, ""
            ).replace(",", ".")

            value = parseFloat(value)

            // Verifica se o valor é um número válido
            if (isNaN(value)) {
                return alert("Erro ao somar o total")
            }

            // Adiciona o valor ao total
            total += Number(value)
        }

        //Cria a span R$ formatada
        const symbolBRL = document.createElement("small")
        symbolBRL.textContent = "R$"

        //Formata o valor e remove o R$, para ser exibido pela tag small
        total = formatCurrencyBRL(total).toUpperCase().replace("R$", "")

        //Limpa o conteudo do elemento
        expenseTotal.innerHTML = ""
        expenseTotal.append(symbolBRL, total)

    } catch (error) {
        // Exibe um alerta em caso de erro
        console.log(error)
        alert("Erro ao somar o total")
    }
}