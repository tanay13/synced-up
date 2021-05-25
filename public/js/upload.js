const upload = document.getElementById('uploadForm');
const inpFile = document.getElementById('inputGroupFile02');
const bar = document.querySelector('#progress-bar > .bar');
const percent = bar.querySelector('.percent');
const fileName = document.getElementById('fileName');
let socket = io();

upload.addEventListener('submit', uploadFile);

function uploadFile(e) {
  e.preventDefault();

  const xhr = new XMLHttpRequest();

  xhr.open('POST', '/landing/' + window.location.pathname.substring(9));
  xhr.upload.addEventListener('progress', (e) => {
    const percent_upload = e.lengthComputable ? (e.loaded / e.total) * 100 : 0;

    bar.style.width = percent_upload.toFixed(2) + '%';
    percent.textContent = percent_upload.toFixed(2) + '%';
  });

  fileName.value = inpFile.value;

  // no need of setting content-type to multipart/form-data.
  xhr.send(new FormData(upload));
}
