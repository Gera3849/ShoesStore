        let menuItems = document.getElementById("MenuItems");
        let slides = document.getElementsByClassName("upload-img-basic");
        let uploadPart = [];
        let hiddenPart = [];
        for (let i = 0; i < 4; i++) {
            uploadPart[i] = document.getElementById(`custom_upload${i + 1}`);
            hiddenPart[i] = document.getElementById(`file_input${i + 1}`)

            uploadPart[i].addEventListener('click', function () {
                hiddenPart[i].click();
            })

            uploadPart[i].addEventListener('change', function (e) {
                if (e.target.files && e.target.files[0]) {
                    let img = document.getElementById(`img${i + 1}`);
                    img.onload = () => {
                        URL.revokeObjectURL(img.src);  // no longer needed, free memory
                    }

                    slides[i].src = URL.createObjectURL(e.target.files[0]);
                    img.src = URL.createObjectURL(e.target.files[0]); // set src to blob url
                }
            })
        }

        const form = document.getElementById('form');

        form.addEventListener('submit', submitForm);

        function submitForm(e) {
            e.preventDefault();
            const title = document.getElementById('title').value;
            const cost = document.getElementById('cost').value;
            const category = document.getElementById('category').value;
            const detail = document.getElementById('detail').value;

            let formData = new FormData();
            for (let i = 0; i < 4; i++) {
                const file = document.getElementById(`file_input${i + 1}`);
                console.log(i, file.files[0])
                formData.append('files', file.files[0]);
            }

            console.log('form', formData)

            axios.post('/admin/upload_files', formData)
                .then((res) => {
                    console.log('res', res.data);
                })
            
            const productData = {
                title: title,
                cost: cost,
                category: category,
                detail: detail
            }

            axios.post('/admin/addProduct', productData)
                .then((res) => {
                    console.log('product', res.data)
                })
        }

        MenuItems.style.maxHeight = "0px";
        function menutoggle() {
            if (MenuItems.style.maxHeight == "0px") {
                MenuItems.style.maxHeight = "200px";
            }
            else {
                MenuItems.style.maxHeight = "0px";
            }
        }

        let modal = document.getElementById("item-modal");

        // Get the button that opens the modal
        let btn = document.getElementById("modal-btn");

        // Get the <span> element that closes the modal
        let span = document.getElementsByClassName("close")[0];

        // When the user clicks the button, open the modal 
        btn.onclick = function () {
            modal.style.display = "flex";
            modal.style.justifyContent = "center";
            modal.style.alignItems = "center";
        }

        let tbRow = document.getElementsByClassName('tb_row');
        let detail = document.getElementsByClassName("detail_icon");
        let row_detail = document.getElementsByClassName("row_detail");

        for (let i = 0; i < detail.length; i ++) {
            tbRow[i].addEventListener('click', function() {
                if (row_detail[i].style.display === 'table-row') {
                row_detail[i].style.display = 'none';
                detail[i].innerHTML = '&#xf107;';
            } else {
                row_detail[i].style.display = 'table-row';
                detail[i].innerHTML = '&#xf106;';
            }
            })
        }

        // When the user clicks on <span> (x), close the modal
        span.onclick = function () {
            modal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }

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