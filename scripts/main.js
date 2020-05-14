class Video{
    constructor(selector){
        this.selector=selector;
        this.playerElement=document.querySelector(selector);

        this.videoElement = document.querySelector(selector+" video");

        this.bindEvents();

    }

    bindEvents(){
        this.playPauseBtn=document.querySelector(this.selector+" .play-pause");

        this.playPauseBtn.addEventListener("click",()=>this.playPause());
    }
    
    playPause(){

        if(this.videoElement.paused){

            this.playPauseBtn.innerHTML="pause";
            this.videoElement.play();
        }
        else{
            this.playPauseBtn.innerHTML = "play_arrow";
            this.videoElement.pause();
        }
    }
}