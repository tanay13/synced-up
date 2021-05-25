const search = document.getElementById('link');
const subBtn = document.getElementById('btn');
const sync = document.getElementById('sync');
var btn = document.getElementById('yt');
var btnState = document.getElementById('state');

let socket = io();
var player;
var linkID;

var currUrl = window.location.href;
var roomId = currUrl.split('/')[4];

socket.on('connect', () => {
  console.log('CONNECTED!!!!!');
  socket.emit('join room', {
    roomId: roomId,
  });
});

subBtn.addEventListener('click', (e) => {
  e.preventDefault();
  var url = search.value;
  var linkID = url.slice(17);
  player.loadVideoById(linkID);
  socket.emit('vchange', {
    linkID: linkID,
  });
  search.value = ' ';
});

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//listening to video change
socket.on('videoChange', (e) => {
  console.log('event caught');
  player.loadVideoById(e.videoId);
});

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: 'M7lc1UVf-VE',
    playerVars: {
      controls: 0,
      autoplay: 0,
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
}

var VideoState;

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  console.log('LOADED');
  //event.target.playVideo();
}
var playerStatus = -1;
// // var done = false;
function onPlayerStateChange(event) {
  playerStatus = event.data;
  console.log(playerStatus);
  switch (playerStatus) {
    case 1:
      socket.emit('play other');
      break;
    case 2:
      socket.emit('pause other');

      break;
  }
}

function Yplay() {
  if (playerStatus == -1 || playerStatus == 2) {
    player.playVideo();
    btnState.innerHTML = 'PAUSE';
  } else {
    player.pauseVideo();
    btnState.innerHTML = 'PLAY';
  }
}

socket.on('just play', () => {
  if (playerStatus == -1 || playerStatus == 2) {
    player.playVideo();
    btnState.innerHTML = 'PAUSE';
  }
});

socket.on('just pause', () => {
  player.pauseVideo();
  btnState.innerHTML = 'PLAY';
});

var dur = 0;

//event for clicking on sync button
sync.addEventListener('click', () => {
  socket.emit('sync', {
    videoDur: player.getDuration(),
  });
});

//listening to time event from server side
socket.on('time', (event) => {
  player.seekTo(event.time, false);
});
