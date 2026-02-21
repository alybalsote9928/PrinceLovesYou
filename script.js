const openModal = document.getElementById("openModal");
const closeModal = document.getElementById("closeModal");
const overlay = document.getElementById("overlay");
const imageUpload = document.getElementById("imageUpload");
const princeImage = document.getElementById("princeImage");
const shareBtn = document.querySelector(".share-btn");

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
  const storageRef = firebase.storage().ref("images/prince.jpg");
  storageRef.put(file).then(() => {
    storageRef.getDownloadURL().then((url) => {
      princeImage.src = url;
      firebase.database().ref("message").update({ imageUrl: url });
    });
  });
});

shareBtn.addEventListener("click", () => {
  const modal = overlay.querySelector(".modal");

  const hideElements = document.querySelectorAll(
    'button, input[type="file"], label[for="imageUpload"]',
  );
  hideElements.forEach((el) => el.classList.add("screenshot-hide-all"));

  html2canvas(modal).then((canvas) => {
    canvas.toBlob((blob) => {
      const file = new File([blob], "screenshot.png", { type: "image/png" });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        navigator
          .share({
            files: [file],
            title: "Check this out!",
            text: "Look at this cool overlay!",
          })
          .catch((err) => console.log(err));
      } else {
        const link = document.createElement("a");
        link.href = canvas.toDataURL();
        link.download = "screenshot.png";
        link.click();
      }

      hideElements.forEach((el) => el.classList.remove("screenshot-hide-all"));
    });
  });
});
