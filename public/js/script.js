var user = prompt('Enter your name');

var video = document.querySelector('.video');
var bar = document.querySelector('.orange-bar');
var juice = document.querySelector('.orange-juice');
var notifDiv = document.getElementById('notification');
var sync = document.getElementById('sync');
var btn = document.getElementById('play');
let socket = io();

function playVideo(url) {
  socket.emit('videoChange', {
    fileUrl: url,
  });
}

var currUrl = window.location.href;
var roomId = currUrl.split('/')[4];

socket.on('connect', () => {
  console.log('CONNECTED!!!!!');
  socket.emit('join room', {
    roomId: roomId,
  });
});

socket.on('changeVideo', (url) => {
  document.getElementById('videoC').src = url.fileurl;
});

socket.on('change', (param) => {
  btn.className = param.className;
  if (param.className === 'pause') {
    video.play();
    var s = param.user + ' played';
    var li = document.createElement('li');
    var textNode = document.createTextNode(s);
    li.appendChild(textNode);
    notifDiv.appendChild(li);
  } else {
    video.pause();
    var s = param.user + ' paused';
    var li = document.createElement('li');
    var textNode = document.createTextNode(s);
    li.appendChild(textNode);
    notifDiv.appendChild(li);
  }
});

// function togglePlay(){
//     if(video.paused)
//     {
//         socket.emit('toggle',{
//             nameofclass:"pause",
//             user:user
//         })
//         btn.className = "pause";
//         video.play()
//     }
//     else{
//         socket.emit('toggle',{
//             nameofclass:"play",
//             user:user
//         })
//         btn.className = "play";
//         video.pause();
//     }

// }

btn.addEventListener('click', () => {
  if (video.paused) {
    socket.emit('toggle', {
      nameofclass: 'pause',
      user: user,
    });
    // btn.className = "pause";
    // video.play()
  } else {
    socket.emit('toggle', {
      nameofclass: 'play',
      user: user,
    });
    // btn.className = "play";
    // video.pause();
  }
});

sync.addEventListener('click', () => {
  var currTime = video.currentTime;
  socket.emit('sync', {
    currTime: currTime,
  });
});

socket.on('synctime', (time) => {
  video.currentTime = time.syncTime;
});

video.addEventListener('timeupdate', function () {
  var juicePos = video.currentTime / video.duration;
  juice.style.width = juicePos * 100 + '%';
  if (video.ended) {
    btn.className = 'play';
  }
});

// bar.addEventListener('click',function(e){
//     var position = e.clientX - this.getBoundingClientRect().left;
//     var juicePos  = position / video.duration ;
//     juice.style.width = juicePos*100 + "%";
// })
