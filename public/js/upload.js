const upload = document.getElementById('uploadForm')
const inpFile = document.getElementById('inputGroupFile02')
const bar = document.querySelector('#progress-bar > .bar')
const percent = bar.querySelector('.percent')

upload.addEventListener('submit',uploadFile)

function uploadFile(e){
    e.preventDefault();

    const xhr = new XMLHttpRequest();

    xhr.open('POST',"/");
    xhr.upload.addEventListener('progress',e=>{
      const percent_upload = e.lengthComputable?(e.loaded/e.total)*100 : 0;
      
      bar.style.width = percent_upload.toFixed(2)+"%";
      percent.textContent = percent_upload.toFixed(2)+"%";


    })

    // no need of setting content-type to multipart/form-data.
    xhr.send(new FormData(upload))

}

