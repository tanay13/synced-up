socket.emit('newUser', {
  user: user,
});

socket.on('newMsg', (msg) => {
  console.log('new message', msg);
  let div = document.createElement('div');
  let p = document.createElement('p');
  p.innerText = `${msg.from}: ${msg.text}`;
  div.appendChild(p);
  div.classList.add('chats');
  document.getElementById('container1').appendChild(div);
});

document.querySelector('#submit-btn').addEventListener('click', (e) => {
  e.preventDefault();
  console.log(user);
  socket.emit('createmsg', {
    from: user,
    text: document.querySelector('input[name="message"]').value,
  });
  document.querySelector('input[name="message"]').value = ' ';
});
