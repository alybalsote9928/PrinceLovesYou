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