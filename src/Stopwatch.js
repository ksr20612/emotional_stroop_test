const stopwatch = {
    memory : 0,
    isStarted : false,
    getTime : function(){
        return new Date().getTime();
    },
    start : function(){
        if(!this.isStarted){
            this.isStarted = true;
            return this.memory = this.getTime();
        }
    },
    end : function() {
        if(this.isStarted){
            this.isStarted = false;
            const interval = this.getTime()-this.memory;
            console.log((interval/1000).toFixed(2));
            return (interval/1000).toFixed(2);
        }
    }
}

export default stopwatch