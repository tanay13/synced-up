const search = document.getElementById('link')
const subBtn = document.getElementById('btn')
const sync = document.getElementById('sync')
var btn = document.getElementById('yt')
var state = document.getElementById('state')


let socket = io();
var player
var linkID


subBtn.addEventListener('click',(e)=>{
    e.preventDefault()
    var url = search.value;
    var linkID = url.slice(17)
    player.loadVideoById(linkID);
    socket.emit('vchange',{
        linkID:linkID
    })
    search.value = " ";
})


// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);



//listening to video change
socket.on('videoChange',(e)=>{
    console.log("event caught")
    player.loadVideoById(e.videoId);
})


function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: 'M7lc1UVf-VE' ,
    playerVars : {
        controls : 0,
        autoplay: 0
    },
    events: {
      'onReady': onPlayerReady,
    // 'onStateChange': onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
event.target.playVideo();
}
function stopVideo() {
    player.stopVideo();
}


done = false;

var dur = 0

socket.on('change',(event)=>{
    if(event.videoState === 'play')
    {
        state.innerHTML = "PAUSE"
        player.playVideo()
        done = true
    }
    else{
        state.innerHTML = "PLAY"
        player.pauseVideo()
        done = false
    }
    
})



btn.addEventListener('click',()=>{
    if(done){
        player.pauseVideo()
        state.innerHTML = "PLAY"
        socket.emit('yevent',{
            event : "pause"  
        })
        done = false
    }
    else{
        player.playVideo()
        state.innerHTML = "PAUSE"
        socket.emit('yevent',{
            event : "play"  
        })
        done = true
    }
})

//event for clicking on sync button
sync.addEventListener('click',()=>{
    socket.emit('sync',{
        videoDur:player.getDuration()
    })
})

//listening to time event from server side
socket.on('time',(event)=>{
    player.seekTo(event.time,false)
})
