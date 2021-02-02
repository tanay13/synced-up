var user = prompt("Enter your name");

var video = document.querySelector(".video");
var bar = document.querySelector(".orange-bar");
var juice = document.querySelector(".orange-juice");
var btn = document.getElementById("play");
let socket = io();


socket.on('connect',()=>{
    console.log("CONNECTED!!!!!")
})

socket.on('change',(param)=>{
    btn.className = param.className
    if(param.className === "pause")
    {
        video.play();
        alert(param.user+" played")
    }
    else
    {
        video.pause()
        alert(param.user+" paused")
    };
})

function togglePlay(){
    if(video.paused)
    {
        socket.emit('toggle',{
            nameofclass:"pause",
            user:user
        })
        btn.className = "pause";
        video.play()
    }
    else{
        socket.emit('toggle',{
            nameofclass:"play",
            user:user
        })
        btn.className = "play";
        video.pause();
    }

}

btn.onclick = function()
{
   togglePlay();
}
video.addEventListener('timeupdate', function(){
    var juicePos  = video.currentTime / video.duration ;
    juice.style.width = juicePos*100 + "%";
    if(video.ended)
    {
        btn.className = "play";
    }
})

// bar.addEventListener('click',function(e){
//     var position = e.clientX - this.getBoundingClientRect().left;
//     var juicePos  = position / video.duration ;
//     juice.style.width = juicePos*100 + "%";
// })