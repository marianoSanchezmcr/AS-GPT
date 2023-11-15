
class Message{
    constructor(content, from){
        this.content = content;
        this.from = from
    }
    
    
    getMessage() {
        return this.content
    }

    getOrigin(){
        return this.from
    }
}


const sendButton = document.getElementById("sendButton");
const inputArea = document.getElementById("input");
let chatHistorial = [];
const chatFragment = document.createDocumentFragment();
const chatHistorialContainer = document.getElementById("chatHistorial")

let input = ""

initUi();
main();

document.body.addEventListener("keypress", (e)=>{
    console.log(e)
})




function initUi(){
    initSendButton()
}

function initSendButton(){
    document.body.addEventListener("keypress", (e)=>{
        if(e.key == "Enter"){
            showMessage()
        }
    })
    sendButton.addEventListener("click", ()=>{
        showMessage()
        
    })
}

function addMessageItem(message, from){
    let item = document.createElement("P");
    item.textContent = message;
    if(from == "user"){
        item.classList.add("user__chat__item")
    }else{
        item.style.backgroundColor = "blue"
    }
    chatHistorialContainer.appendChild(item);
}

function showMessage(){
    input = inputArea.value.toString();
        inputArea.value = ""
        if(input.length != 0){
            let message = new Message(input, "user")
            chatHistorial.push(message)
            addMessageItem(message.content, message.from)
            console.log(chatHistorial)
            callGPT()
        }
}

function callGPT(){
    setTimeout(()=>{

        

        addMessageItem("hola soy gpt", "gpt")
    }, 1000)
    
}




