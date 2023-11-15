
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