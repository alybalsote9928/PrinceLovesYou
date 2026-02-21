const openModal = document.getElementById ("openModal");
const closeModal = document.getElementById ("closeModal");
const overlay = document.getElementById ("overlay");
const imageUpload = document.getElementById("imageUpload");
const princeImage = document.getElementById("princeImage");

openModal.onclick = () => {
    overlay.style.display = "flex";
};

closeModal.onclick = () => {
    overlay.style.display = "none";
};

imageUpload.addEventListener("change", function () {
    const file = this.files[0];

    if (file) {
        const reader = new FileReader();

        reader.addEventListener("load", function () {
            princeImage.src = this.result;
        });

        reader.readAsDataURL(file);
    }
});

imageUpload.addEventListener("change", function () {
    const file = this.files[0];
    const storageRef = firebase.storage().ref('images/prince.jpg');
    storageRef.put(file).then(() => {
        storageRef.getDownloadURL().then(url => {
            princeImage.src = url;
            firebase.database().ref('message').update({ imageUrl: url });
        });
    });
});

const messageText = document.getElementById('messageText');
messageText.addEventListener('input', () => {
    firebase.database().ref('message').update({ text: messageText.value });
});

firebase.database().ref('message').on('value', snapshot => {
    const data = snapshot.val();
    if(data){
        princeImage.src = data.imageUrl || princeImage.src;
        messageText.value = data.text || '';
    }
});