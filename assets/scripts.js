const galleryItems = gallery.querySelectorAll(".gallery-item-clickable");
const galleryItemsfilter = document.querySelectorAll('.gallery-item');
// Sélectionnez tous les bouttons du filtre avec la classe "nav-link"
const tagsList = document.querySelectorAll('.nav-link');

let filteredGalleryImages = [];

let myModal = null;
let isModalInit = false;

galleryItems.forEach(function (item, index) {
    item.addEventListener("click", function () {

        if (!isModalInit) {
            isModalInit = true;
            /*********************************************
             *          INITIALISATION CARROUSEL
             ********************************************/

            const carousel = document.querySelector("#carouselExampleControls");
            const myCarousel = new bootstrap.Carousel(document.querySelector('#carouselExampleControls'), {
                interval: false // Désactive le défilement automatique
            });

            // Ajout d'écouteurs d'événements pour les boutons de contrôle dans la modal
            const nextButtonModal = document.querySelector("#carouselExampleControls .carousel-control-next");
            nextButtonModal.addEventListener("click", function () {
                myCarousel.next();
            });

            const prevButtonModal = document.querySelector("#carouselExampleControls .carousel-control-prev");
            prevButtonModal.addEventListener("click", function () {
                myCarousel.prev();
            });

            /*********************************************
             *        INITIALISATION DE LA MODAL
             ********************************************/

            myModal = new bootstrap.Modal(document.getElementById('exampleModal'));

            // l'ajout d'un écouteur d'événement pour fermer la modal en cliquant en dehors de celle-ci
            const exampleModal = document.getElementById("exampleModal");
            exampleModal.addEventListener('click', function (event) {
                if (event.target === exampleModal) {
                    myModal.hide();
                }
            });
        }

        const carouselInner = document.querySelector('#carouselExampleControls .carousel-inner')
        carouselInner.innerHTML = "";

        // l'ajout des images au carrousel
        filteredGalleryImages.forEach(function (img, index) {
            const carouselItem = document.createElement("div");
            carouselItem.className = `carousel-item ${img === item ? 'active' : ''}`;
            // carouselItem.className = "carousel-item active";
            carouselItem.innerHTML = '<img src="' + img.src + '" class="d-block w-100" alt="..." loading="lazy">';
            carouselInner.appendChild(carouselItem);
        });

        // Affiche la modal
        myModal.show();
    });
});

// Sélectionne toutes les images de la galerie
tagsList.forEach(function (tag) {
    tag.addEventListener('click', function (event) {
        // Récupère la valeur de l'attribut data-images-toggle (les noms des catégories du filtre)
        const toggleValue = tag.getAttribute('data-images-toggle');
        tagsList.forEach(function (t) {
            t.classList.remove('active');
            t.classList.remove('active-tag');
        });
        tag.classList.add('active');
        tag.classList.add('active-tag');
        // Parcourez toutes les images de la galerie
        filteredGalleryImages = [];

        galleryItemsfilter.forEach(function (item) {
            //  data-gallery-tag est le nom de la catégorie de l'image
            const galleryTag = item.getAttribute('data-gallery-tag');

            if (galleryTag !== null) {
                // Si la catégorie de l'image ne correspond pas à la catégorie sélectionnée
                if (toggleValue !== 'all' && !galleryTag.includes(toggleValue)) {
                    // Masquer l'image
                    item.closest('.item-column').style.display = 'none';
                } else {
                    // Sinon, afficher la div parente
                    item.closest('.item-column').style.display = 'block';
                    filteredGalleryImages.push (item);
                }
            }
        });

    });
});
