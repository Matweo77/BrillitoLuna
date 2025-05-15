    document.addEventListener('DOMContentLoaded', function() {
            // Filtros de categoría
            const filterButtons = document.querySelectorAll('.filter-btn');
            const productItems = document.querySelectorAll('.product-item');
            const sectionTitle = document.querySelector('.section-title');

            filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Remover clase active de todos los botones
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    // Añadir clase active al botón clickeado
                    this.classList.add('active');

                    const filterValue = this.getAttribute('data-filter');

                    // Actualizar título de la sección
                    if (filterValue === 'all') {
                        sectionTitle.textContent = 'Todos los productos';
                    } else {
                        sectionTitle.textContent = this.textContent;
                    }

                    // Mostrar/ocultar productos según el filtro
                    productItems.forEach(item => {
                        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    });
                });
            });

            // Filtro de búsqueda
            const searchInput = document.querySelector('.search-container input');
            searchInput.addEventListener('keyup', function() {
                const searchValue = this.value.toLowerCase();

                productItems.forEach(item => {
                    const title = item.querySelector('.product-title').textContent.toLowerCase();
                    if (title.includes(searchValue)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });

            // Funcionalidad para mostrar imágenes en pantalla completa
            const productImages = document.querySelectorAll('.product-image');
            const fullScreenImage = document.getElementById('fullScreenImage');
            const imageModal = new bootstrap.Modal(document.getElementById('imageModal'));

            productImages.forEach(image => {
                image.addEventListener('click', function() {
                    fullScreenImage.src = this.src;
                    fullScreenImage.alt = this.alt;
                    imageModal.show();
                });
            });
        });