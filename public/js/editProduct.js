const base_url = `http://localhost:3000`;

let slides = document.getElementsByClassName("upload-img-basic");
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("upload-img-basic");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}

let menuItems = document.getElementById("MenuItems");

MenuItems.style.maxHeight = "0px";
function menutoggle() {
    if (MenuItems.style.maxHeight == "0px") {
        MenuItems.style.maxHeight = "200px";
    }
    else {
        MenuItems.style.maxHeight = "0px";
    }
}

let uploadPart = [];
let hiddenPart = [];
for (let i = 0; i < 4; i++) {
    uploadPart[i] = document.getElementById(`custom_upload${i + 1}`);
    hiddenPart[i] = document.getElementById(`file_input${i + 1}`)

    uploadPart[i].addEventListener('click', function () {
        hiddenPart[i].click();
    })

    uploadPart[i].addEventListener('change', function (e) {
        let img = document.getElementById(`img${i + 1}`);
        if (e.target.files && e.target.files[0]) {
            img.onload = () => {
                URL.revokeObjectURL(img.src);  // no longer needed, free memory
            }

            slides[i].src = URL.createObjectURL(e.target.files[0]);
            img.src = URL.createObjectURL(e.target.files[0]); // set src to blob url
        } else {
            img.src = '/images/default.jpg';
        }
    })
}

let form = document.getElementById('form');
let productsPart = document.getElementById('products');

form.addEventListener('submit', submitForm);

async function submitForm(e) {
    e.preventDefault();
    const id = document.getElementById('product_id').value;
    const title = document.getElementById('title').value;
    const cost = document.getElementById('cost').value;
    const category = document.getElementById('category').value;
    const detail = document.getElementById('detail').value;
    const image1 = document.getElementById('img1');


    if (
        image1.src == `${base_url}/images/default.jpg` ||
        !title ||
        !cost ||
        !category ||
        !detail
    ) {
        alert('Fill all the fields!');
        return;
    } else {
        let image = [];
        let imageTemp = [];
        let formData = new FormData();
        let newImage = [];
        for (let i = 0; i < 4; i ++) {
            const file = document.getElementById(`file_input${i + 1}`);
            const img = document.getElementById(`img${i + 1}`);
            if (file.files[0]) {
                newImage.push(i);
                formData.append('files', file.files[0])
            } else if (img.src !== `${base_url}/images/default.jpg`) {
                imageTemp[i] = img.src.split("/")[5];
            }
        }


        if (newImage.length) {
            await axios.post('/dashboard/admin/upload_files', formData)
            .then((res) => {
                for(let j = 0; j < newImage.length; j ++) {
                    imageTemp[newImage[j]] = res.data[j];
                }
            })
        }


        for (const item of imageTemp) {
            if (item) {
                image.push(item);
            }
        }

        const productData = {
            id: id,
            title: title,
            cost: cost,
            category: category,
            detail: detail,
            image: image
        }

        axios.post('/dashboard/admin/products/updateProduct', productData)
            .then((res) => {
                window.location.href = '/dashboard/admin/products/1'
            })
        

        // axios.post('/dashboard/admin/addProduct', productData)
        //     .then((res) => {
        //         const productId = res.data[0]._id;
        //         let formData = new FormData();
        //         for (let i = 0; i < 4; i++) {
        //             const file = document.getElementById(`file_input${i + 1}`);
        //             if (file.files[0]) {
        //                 formData.append('files', file.files[0]);
        //             }
        //         }

        //         formData.append('id', productId);

        //         axios.post('/dashboard/admin/upload_files', formData)
        //             .then((res) => {
        //                 window.location.href = '/dashboard/admin/products/1'
        //             })
        //     })
    }
}