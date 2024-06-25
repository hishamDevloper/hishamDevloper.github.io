var uploadImages = document.getElementById("uploadImages"); //Button select file
var ViewerImages = document.getElementById("ViewerImages"); // Div Viewer Images

let listFiles = [];
uploadImages.addEventListener("change", (event) => {
    ViewerImages.innerHTML = "";
    for (var i = 0; i < event.target.files.length; i++) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            ViewerImages.appendChild(img);
            listFiles.push(img);
        };
        reader.readAsDataURL(event.target.files[i]);
    }
})

var ConvertToPDF = document.getElementById("ConvertToPDF");
ConvertToPDF.addEventListener("click", async () => {
    var doc = new jsPDF();
    for (var i = 0; i < listFiles.length; i++) {
        await new Promise(resolve => {
            var img = listFiles[i];

            const imgWidth = img.width;
            const imgHeight = img.height;

            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);
            const imgWidthScaled = imgWidth * ratio;
            const imgHeightScaled = imgHeight * ratio;

            if (i > 0) {
                doc.addPage();
            }
            doc.addImage(img, 'JPEG', 0, 0, imgWidthScaled, imgHeightScaled);
            resolve();
        });
    }
    doc.save('images.pdf');
})