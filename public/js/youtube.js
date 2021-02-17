// const form = document.getElementById('search-box')
        // const myIframe = document.getElementById('iframe')
        // form.addEventListener('submit',(e)=>{
        //     e.preventDefault()
        //     var url = form.search.value;
        //     console.log(url)
        //     var linkID = url.slice(17)
        //     document.getElementById("iframe").src = "https://www.youtube.com/embed/"+linkID
        //     const frameDoc = myIframe.contentWindow
        //     console.log(frameDoc)
        //     form.search.value = " ";
        // })

        // 2. This code loads the IFrame Player API code asynchronously.
        var tag = document.createElement('script');
        let socket = io();
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        var player;
        function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
            height: '390',
            width: '640',
            videoId: 'M7lc1UVf-VE',
            playerVars : {
                controls : 0
            },
            events: {
            // 'onReady': onPlayerReady,
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

        var btn = document.getElementById('yt')
        var state = document.getElementById('state')
        done = false;
        
        var dur = 0

        socket.on('change',(event)=>{
            if(event.e === 'play')
            {
                state.innerHTML = "PAUSE"
                player.playVideo()
            }
            else{
                state.innerHTML = "PLAY"
                player.pauseVideo()
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
        
