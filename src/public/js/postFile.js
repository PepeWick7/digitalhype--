const send = document.getElementById('send');

//Sending data to the server
send.onclick = async function() {
    const description = document.getElementById('description').value;
    const image = document.getElementById('file-upload');
    let random = (Math.random() + 1).toString(36).substring(2);

    let extension = image.files[0].name.split('.').pop();
    let fileName = random + '.' + extension;

    const formData = new FormData();
    formData.append('myFile', image.files[0], fileName);
    console.log(formData);

    if (description == '' || image == '') {
        alert('There cannot be empty fields');
    } else {
        console.log(fileName);
        imageUpload(formData);
        postData(description, fileName);
        window.location.href = 'index.html';
    }
}
