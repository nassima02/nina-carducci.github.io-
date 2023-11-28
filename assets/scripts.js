const imagesGallery = document.querySelectorAll('.gallery-item');//sélectionner toutes les images de la gallery
const filterButtonList = document.querySelectorAll('.nav-link');// Sélectionner tous les boutons du filtre

let filteredModalImages = [];
let myModal = null;
let isModalInit = false;

/**
 * Initialise la galerie d'images pour la modal.
 */
function initializeGallery() {
	filteredModalImages = [];

	imagesGallery.forEach(function (image) {
		const nameCategoryImage = image.dataset.imageNameCategory;

		if (nameCategoryImage !== null) {
			image.closest('.item-column').style.display = 'block';
			filteredModalImages.push(image);
		}
	});
}

// Appel de la fonction au chargement de la page
window.addEventListener('load', function () {
	initializeGallery();
});

/**
 * Ajoute un écouteur d'événement pour fermer la modal en cliquant en dehors de celle-ci.
 */
function closeModal() {
	// l'ajout d'un écouteur d'événement pour fermer la modal en cliquant en dehors de celle-ci
	const exampleModal = document.getElementById("exampleModal");
	exampleModal.addEventListener('click', function (event) {
		if (event.target === exampleModal) {
			myModal.hide();
		}
	});
}

/**
 *  Initialise la navigation de la modal avec la carousel Bootstrap.
 */
function navigationModal() {
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
}

/**
 * Affiche la modal lorsqu'une image de la galerie est cliquée.
 */
function showImageModal() {
	imagesGallery.forEach(function (image, index) {
		image.addEventListener("click", function () {

			initializeModal()

			const carouselInner = document.querySelector('#carouselExampleControls .carousel-inner');
			carouselInner.innerHTML = "";

			filteredModalImages.forEach(function (img, index) {
				const carouselItem = document.createElement("div");
				carouselItem.className = `carousel-item ${img === image ? 'active' : ''}`;
				// carouselItem.className = "carousel-item active";
				carouselItem.innerHTML = '<img src="' + img.src + '" class="d-block w-100" alt="..." loading="lazy">';
				carouselInner.appendChild(carouselItem);
			});
			myModal.show();
		});
	});
}
showImageModal();

/**
 *Initialise la modal si elle n'a pas déjà été initialisée.
 */
function initializeModal() {
	if (!isModalInit) {
		isModalInit = true;
		navigationModal();
		myModal = new bootstrap.Modal(document.getElementById('exampleModal'));
		closeModal();
	}
}

/**
 * Ajoute un écouteur d'événement à chaque bouton de filtre du tableau filterButtonList.
 * Supprime les classes «active» et «active-tag» de tous les boutons de filtre.
 * Ajoute les classes «active» et «active-tag» au bouton de filtre cliqué.
 * Efface le tableau filteredModalImages.
 * Appelle la fonction imageModal avec le bouton de filtre cliqué comme argument.
 *
 * @return {void}
 */
function onClickButtonFilter() {
	filterButtonList.forEach(function (filterButton) {
		filterButton.addEventListener('click', function (event) {

			filterButtonList.forEach(function (button) {
				button.classList.remove('active');
				button.classList.remove('active-tag');
			});
			filterButton.classList.add('active');
			filterButton.classList.add('active-tag');

			filteredModalImages = [];
			imagesModal(filterButton);
		});
	});
}
onClickButtonFilter()

/**
 * filtre des images de la galerie en fonction du bouton de catégorie sélectionné.
 * Masque ou affiche les images en fonction de leur catégorie.
 *
 * @param {HTMLElement} filterButton - Le bouton de catégorie utilisé pour le filtrage.
 */
function imagesModal(filterButton) {
	imagesGallery.forEach(function (image) {

		const nameCategoryImage = image.dataset.imageNameCategory;
		const nameCategoryButton = filterButton.dataset.buttonNameCategory;
		if (nameCategoryImage !== null) {
			// Si la catégorie de l'image ne correspond pas à la catégorie du filtre sélectionné
			if (nameCategoryButton !== 'all' && !nameCategoryImage.includes(nameCategoryButton)) {
				// Masquer l'image (la div contenant l'image)
				image.closest('.item-column').style.display = 'none'; //item-column est le nom de la div contenant l'image
			} else {
				// Sinon, afficher l'image (la div contenant l'image)
				image.closest('.item-column').style.display = 'block';
				filteredModalImages.push(image);
			}
		}
	});
}