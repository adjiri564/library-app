
const section = document.querySelector(".main-section");
const dialog = document.querySelector(".dialog");
const addBtn = document.querySelector(".add-btn")
const closeBtn = document.querySelector(".close-btn")

const myLibrary = []

function Book(id,title, author, pages, read){
    this.id= id;
    this.title= title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.readStatus = function(){
    this.read = !this.read 
}

addBtn.addEventListener("click", ()=>{
    dialog.showModal()
});
closeBtn.addEventListener("click",()=>{
    dialog.close()
})

function addBookToLibrary(){
    const author = document.querySelector(".input-author")
    const title = document.querySelector(".input-title")
    const pageNumb = document.querySelector(".input-page")
    const newId = myLibrary.length + 1
    const book = new  Book (newId,title.value , author.value , Number(pageNumb.value), false )
    const bbk = document.createElement('div')
    bbk.classList.add("book")
    bbk.dataset.id = newId
    
    section.appendChild(bbk)
    bbk.innerHTML = `
    <div class="title">${book.title}</div>
    <div class="line"></div>
    <p class="author">Author: ${book.author}</p>
    <p class="pages">Pages: ${book.pages}</p>`

    const btnContainer = document.createElement('div')
    bbk.appendChild(btnContainer)
    btnContainer.classList.add("btnContainer")

    const statusBtn = document.createElement('div')
    statusBtn.textContent = `Not Read`
    statusBtn.classList.add("status-btn")
    btnContainer.appendChild(statusBtn)

    const removeBtn = document.createElement('button');
    removeBtn.textContent ="Delete"
    removeBtn.classList.add("remove-btn");
    btnContainer.appendChild(removeBtn)

    let toggle = false;

    function toggleText() {
        toggle = !toggle
        statusBtn.textContent = toggle ? 'Not Read' : 'Read';
        console.log(toggle)
    }

    function handleButtonClick() {
        console.log('Updated read status:', book.read);
        book.readStatus()
        
    }
    
    statusBtn.addEventListener( 'click' ,()=>{
        toggleText();
        handleButtonClick();
    })
    
    removeBtn.addEventListener("click", function(){
        const id = bbk.dataset.id

        let index = myLibrary.findIndex(book => book.id == id)
        
        if (index !== -1) {
            myLibrary.splice(index, 1);
            
        }
        section.removeChild(bbk)
    })
    
    myLibrary.push(book)
    alert ("New book added!")
    dialog.close();
    console.log(myLibrary)
}

const add = document.querySelector(".add")
add.addEventListener( "click" , (e)=>{
    e.preventDefault();
    addBookToLibrary();
})






