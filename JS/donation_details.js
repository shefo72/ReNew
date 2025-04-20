    // upload image and display it 
    const uploadInput = document.getElementById('imageUpload');
    const preview = document.getElementById('preview');
    uploadInput.addEventListener('change', () => {
    const files = Array.from(uploadInput.files);
    files.forEach(file => {
        if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.style.cssText = 'width: 100px; margin: 5px; object-fit: cover; border-radius: 5px;';
            preview.appendChild(img);
        };
        reader.readAsDataURL(file);
        }
    });
    uploadInput.value = "";
    });


    // to select one condition for furniture 
    function selectCondition(button) {
        const buttons = document.querySelectorAll('.condition-btn');
        buttons.forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
    }