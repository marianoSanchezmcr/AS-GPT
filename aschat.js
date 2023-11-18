


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
const chatHistorialContainer = document.getElementById("chatHistorial");
const API_KEY = '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'
//const asData = "MUCHO MÁS QUE EDUCACIÓNEstimulamos al niño desde la primera infancia para formar ciudadanos responsables y socialmente comprometidos, a través de propuestas motivadoras y desafiantes y con el apoyo de un cuerpo docente innovador y motivador que inspira al alumno a “aprender a aprender”, a convivir, a hacer y a ser: hoy, mañana y siempre.Nuestro equipo realiza un seguimiento detallado de los procesos cognitivos y emocionales de cada alumno. Apostamos a la constante comunicación favoreciendo la comprensión entre padres, docentes y alumnos. La familia juega un rol fundamental para acompañar el objetivo en común de cuidar el rendimiento y el bienestar del niño.Todo el trayecto educativo y formativo de tus hijos en una misma institución, con los mismos objetivos. Maternal, primaria, secundaria, inglés como segunda lengua y deportes.F. Fondar 843 Trinidad, FloresAsistimos a un acuerdo unánime en relación a la relevancia de la Educación Inicial, es una realidad por nuestros niños/as, por su educación, por su crecimiento y desarrollo en una visión de país que brega por una formación humana de las nuevas generaciones.El requerimiento de la Educación Inicial está sustentado en los principios de que el tramo etario (0 a 6 años) “es una etapa crucial en la vida de las personas, en la que se producen los procesos más importantes del desarrollo y requieren de ambientes enriquecidos afectiva y culturalmente para favorecer aprendizajes oportunos en situaciones motivantes”(del Marco Curricular…Dic2014"

let input = ""

initUi()
main();

function initUi(){
    initSendButton();
}

function initSendButton(){
    document.body.addEventListener("keypress", (e)=>{
        if(e.key == "Enter"){
            showMessage();
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
        item.classList.add("outgoing")
    }else{
        item.classList.add("incoming")
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
            callGPT(input)
        }
}
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

async function callGPT(inputText){
    await delay(1000)
    let writingItem = document.createElement("P");
        writingItem.textContent = "escribiendo"
        writingItem.classList.add("writing__item")
        chatHistorialContainer.appendChild(writingItem);
    

    try{const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            'Authorization': 'Bearer '+ API_KEY
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{
                'role': 'user',
                'content': /*asData +"eres un asistente virtual de un colegio. responde todas las dudas y se muy amable" +*/ inputText,
            }]
        })
    })} catch(error){
        console.error('Error en la llamada a la API:', error);
    }finally{
        chatHistorial.lastChild.remove();
    }
    

    

    const data = await res.json();
    console.log(data);
    
    addMessageItem(data.choices[0].message.content.toString(), 'gpt');
    
}






