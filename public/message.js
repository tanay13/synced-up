
socket.emit('newUser',{
    user:user
})

socket.on('newMsg',(msg)=>{
    console.log("new message",msg);
    let li = document.createElement('li');
    li.innerText = `${msg.from}: ${msg.text}`
    document.getElementById('container1').appendChild(li);
})



document.querySelector('#submit-btn').addEventListener('click',(e)=>{
    e.preventDefault();
    console.log(user)
    socket.emit("createmsg",{
        from:user,
        text:document.querySelector('input[name="message"]').value
    })
    document.querySelector('input[name="message"]').value = " "
})
