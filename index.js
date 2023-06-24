let todos = []

let num = document.querySelector(".number > span")
let list = document.getElementById("list")

function setItens() {
    localStorage.setItem('todooolist', JSON.stringify(todos))
}

getItens()

function getItens() {
    let arr = JSON.parse(localStorage.getItem('todooolist'))
    if(arr != null) {
        arr.forEach(element => {
            todos.push(element)
            let item = document.createElement("li")
            item.classList.add("item")
    
            let checkbox = document.createElement("input")
            checkbox.type = "checkbox"
            checkbox.id = "check"
            checkbox.name = "check"
            checkbox.classList.add("check")
            checkbox.setAttribute('onclick', 'check(this)')
    
            let text = document.createElement("div")
            text.classList.add("text")
            text.innerText = element.value
    
            let del = document.createElement("div")
            del.classList.add("delete")
            del.setAttribute('onclick', 'deletar(this)')
            del.innerHTML = '<i class="bi bi-trash3-fill">'
    
            if(element.check == true) {
                checkbox.checked = true
                text.style.textDecoration = "line-through"
                text.style.color = "gray"
            } else if(element.check == false) {
                checkbox.checked = false
                text.style.textDecoration = "none"
                text.style.color = "#fff"
            }

            item.append(checkbox, text, del)
            list.appendChild(item)
        })
        amountChilds()
    }
}

let btnAdd = document.getElementById("add")
btnAdd.addEventListener('click', () => {
    let itens = new Itens()
    itens.addItem()
})

class Itens {
    addItem() {
        let inputValue = document.getElementById("text").value

        let item = document.createElement("li")
        item.classList.add("item")

        let checkbox = document.createElement("input")
        checkbox.type = "checkbox"
        checkbox.id = "check"
        checkbox.name = "check"
        checkbox.classList.add("check")
        checkbox.setAttribute('onclick', 'check(this)')

        let text = document.createElement("div")
        text.classList.add("text")
        text.innerText = inputValue

        let del = document.createElement("div")
        del.classList.add("delete")
        del.setAttribute('onclick', 'deletar(this)')
        del.innerHTML = '<i class="bi bi-trash3-fill">'

        let repeat = todos.filter(element => {
            return element.value == inputValue
        })

        if (inputValue != "") {
            if (repeat == 0) {
                item.append(checkbox, text, del)
                list.appendChild(item)
                document.getElementById("text").value = ""
                let obj = {
                    value: inputValue,
                    check: false
                }
                todos.push(obj)
            } else {
                alert("Essa tarefa já existe")
            }
        } else {
            alert("Campo de texto vazio!")
        }

        setItens()
        amountChilds()
    }
}

function deletar(element) {
    let item = element.parentNode
    let inputValue = item.children[1].innerText
    console.log(inputValue)

    let repeat = todos.filter(element => {
        return element.value == inputValue
    })

    let indice = todos.indexOf(repeat[0])
    console.log(indice)

    todos.splice(indice, 1)

    list.removeChild(item)

    setItens()
    amountChilds()
}

function amountChilds() {
    let itensChecked = todos.filter(element => {
        return element.check == true
    })

    list.childElementCount < 1 ? num.innerText = "AGUARDANDO ITENS..." : num.innerText = itensChecked.length + " / " + list.childElementCount
}


function check(element) {
    let item = element.parentNode
    let inputValue = item.children[1].innerText

    let ex = todos.filter(element => {
        return element.value == inputValue
    })

    if (ex[0].check == false) {
        ex[0].check = true
        item.children[1].style.textDecoration = "line-through"
        item.children[1].style.color = "gray"
    } else {
        ex[0].check = false
        item.children[1].style.textDecoration = "none"
        item.children[1].style.color = "#fff"
    }

    setItens()
    amountChilds()
}


