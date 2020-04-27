let myLibrary = [];
myLibrary.push(new Book("Slaughterhouse-Five", "Kurt Vonnegut", 275, true));
myLibrary.push(new Book("Hitchhiker's Guide to the Galaxy", "Douglas Adams", 208, true));
myLibrary.push(new Book("How to Win Friends and Influence People", "Dale Carnegie", 291, false));
render();

document.getElementById("addButton").addEventListener("click",showEntry);
document.getElementById("cancelButton").addEventListener("click",closeEntry);
document.getElementById("submitButton").addEventListener("click",addBook);

function Book(title, author, pages, read){
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
	this.info = function(){
		return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`; 
	}
}

function showEntry(){
	document.getElementById("cover").removeAttribute("hidden");
}

function closeEntry(){
	document.getElementById("cover").setAttribute("hidden", true);
	let fields = document.querySelectorAll("#bookEntry input[placeholder]");
	fields.forEach(f => f.value = "");
}

function addBook(){
	document.getElementById("cover").setAttribute("hidden", true);
	let fields = document.querySelectorAll("#bookEntry input[placeholder]");
	myLibrary.push(new Book(fields[0].value, fields[1].value, fields[2].value, false));
	fields.forEach(f => f.value = "");
	console.log(myLibrary);
	render();
}

function removeBook(i){
	myLibrary.splice(i,1);
	render();
}

function render(){
	let libraryDisplay = document.getElementById("library");
	libraryDisplay.innerHTML = "";
	myLibrary.forEach(function(value, i){
		let node = document.createElement("DIV");
		node.setAttribute("data-index",i);
		node.setAttribute("class", "bookCard");
		if(value.read) node.classList.add("read");
		node.innerHTML = `<button class="deleteButton">&#10060</button><button class="readButton">&#9989</button>${value.title} <p>by ${value.author}, ${value.pages} pgs.</p>`;
		libraryDisplay.appendChild(node);
	});

	document.querySelectorAll(".deleteButton").forEach(b => b.addEventListener("click", function(){
		removeBook(b.parentElement.getAttribute("data-index"));
	}));

	document.querySelectorAll(".readButton").forEach(b => b.addEventListener("click", function(){
		if(myLibrary[b.parentElement.getAttribute("data-index")].read)
			myLibrary[b.parentElement.getAttribute("data-index")].read = false;
		else{
			myLibrary[b.parentElement.getAttribute("data-index")].read = true;
		}
		
		render();
	}));
}