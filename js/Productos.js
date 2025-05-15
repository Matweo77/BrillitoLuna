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

            // Funcionalidad para mostrar imágenes en pantalla completa (mejorada)
            const productImages = document.querySelectorAll('.product-image');
            const expandButtons = document.querySelectorAll('.expand-btn');
            const fullScreenImage = document.getElementById('fullScreenImage');
            const imageInfo = document.getElementById('imageInfo');
            const imageModal = new bootstrap.Modal(document.getElementById('imageModal'));

            // Función para abrir el modal con la imagen
            function openImageModal(imgElement) {
                fullScreenImage.src = imgElement.src;
                fullScreenImage.alt = imgElement.alt;
                
                // Obtener el título del producto para mostrarlo en el modal
                const productCard = imgElement.closest('.product-card');
                const productTitle = productCard.querySelector('.product-title').textContent;
                imageInfo.textContent = productTitle;
                
                imageModal.show();
            }

            // Evento para las imágenes
            productImages.forEach(image => {
                image.addEventListener('click', function() {
                    openImageModal(this);
                });
            });

            // Evento para los botones de expandir
            expandButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.stopPropagation(); // Evitar que el evento se propague a la imagen
                    const imgElement = this.closest('.product-img').querySelector('.product-image');
                    openImageModal(imgElement);
                });
            });

            // Añadir evento de teclado para cerrar el modal con la tecla ESC
            document.addEventListener('keydown', function(event) {
                if (event.key === 'Escape') {
                    imageModal.hide();
                }
            });

            // Permitir cerrar el modal haciendo clic fuera de la imagen
            document.getElementById('imageModal').addEventListener('click', function(event) {
                if (event.target === this) {
                    imageModal.hide();
                }
            });

            // Funcionalidad de pantalla completa
            const fullscreenBtn = document.getElementById('fullscreenBtn');
            
            fullscreenBtn.addEventListener('click', function(e) {
                e.preventDefault();
                
                const docElement = document.documentElement;
                
                if (!document.fullscreenElement && !document.mozFullScreenElement &&
                    !document.webkitFullscreenElement && !document.msFullscreenElement) {
                    // Entrar en modo pantalla completa
                    if (docElement.requestFullscreen) {
                        docElement.requestFullscreen();
                    } else if (docElement.msRequestFullscreen) {
                        docElement.msRequestFullscreen();
                    } else if (docElement.mozRequestFullScreen) {
                        docElement.mozRequestFullScreen();
                    } else if (docElement.webkitRequestFullscreen) {
                        docElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
                    }
                    this.innerHTML = '<i class="fas fa-compress"></i> Salir de pantalla completa';
                } else {
                    // Salir del modo pantalla completa
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.webkitExitFullscreen) {
                        document.webkitExitFullscreen();
                    }
                    this.innerHTML = '<i class="fas fa-expand"></i> Pantalla completa';
                }
            });

            // Detectar cambios en el estado de pantalla completa
            document.addEventListener('fullscreenchange', updateFullscreenButton);
            document.addEventListener('webkitfullscreenchange', updateFullscreenButton);
            document.addEventListener('mozfullscreenchange', updateFullscreenButton);
            document.addEventListener('MSFullscreenChange', updateFullscreenButton);

            function updateFullscreenButton() {
                if (document.fullscreenElement || document.webkitFullscreenElement || 
                    document.mozFullScreenElement || document.msFullscreenElement) {
                    fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i> Salir de pantalla completa';
                } else {
                    fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i> Pantalla completa';
                }
            }
        });