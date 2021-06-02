// Variables
const input = document.querySelector('#add')
const btn = document.querySelector('#btn')
const list = document.querySelector('#list')
var el = document.getElementsByTagName('li')

// Event handlers
btn.addEventListener('click', (e) => {
	e.preventDefault()

	let txt = input.value

	if (txt == '') {
		alert('you must write somthing')
	} else {
		input.value = ''
		const itemToAdd = { title: txt, isDone: false }
		setItem(itemToAdd)
		loadToDo()
	}
})

list.addEventListener('click', (e) => {
	if (e.target.tagName == 'LI') {
		const title = e.target.innerText
		const isDone = e.target.classList.toggle('checked')
		updateItem({ title, isDone })
	} else if (e.target.name === 'deleteIcon') {
		deleteItem(e.target.parentNode.innerText)
	}
})

// Private functions
function setItem(itemToAdd) {
	const currentItems = localStorage.getItem('todoList')

	let updateItems = currentItems
		? [itemToAdd, ...JSON.parse(currentItems)]
		: [itemToAdd]

	localStorage.setItem('todoList', JSON.stringify(updateItems))
}

function updateItem(itemToUpdate) {
	const todoList = getItems()
	todoList.map((item) => {
		if (item.title === itemToUpdate.title) {
			item.isDone = itemToUpdate.isDone
		}

		return item
	})
	localStorage.setItem('todoList', JSON.stringify(todoList))
}

function getItems() {
	const items = localStorage.getItem('todoList')
	if (items) {
		return JSON.parse(items)
	} else {
		return []
	}
}

function deleteItem(itemTitle) {
	const todoList = getItems()
	const filteredList = todoList.filter((item) => item.title !== itemTitle)
	localStorage.setItem('todoList', JSON.stringify(filteredList))
	loadToDo()
}

function loadToDo() {
	list.replaceChildren()
	const todoListItems = getItems()
	todoListItems
		.slice()
		.reverse()
		.forEach((item) => {
			let li = document.createElement('li')
			li.innerHTML = item.title
			if (item.isDone) {
				li.classList.add('checked')
			}
			let i = document.createElement('i')
			i.className = 'fa fa-trash'
			i.name = 'deleteIcon'
			li.appendChild(i)
			list.insertBefore(li, list.childNodes[0])
		})
}

// Init
loadToDo()
