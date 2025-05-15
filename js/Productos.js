 document.addEventListener('DOMContentLoaded', function() {
            // Elementos DOM
            const filterButtons = document.querySelectorAll('.filter-btn');
            const productItems = document.querySelectorAll('.product-item');
            const sectionTitle = document.querySelector('.section-title');
            const searchInput = document.querySelector('.search-container input');
            const productImages = document.querySelectorAll('.product-image');
            const expandButtons = document.querySelectorAll('.expand-btn');
            const whatsappButtons = document.querySelectorAll('.whatsapp-btn');
            const fullScreenImage = document.getElementById('fullScreenImage');
            const imageInfo = document.getElementById('imageInfo');
            const imageModal = new bootstrap.Modal(document.getElementById('imageModal'));
            const modalWhatsappBtn = document.getElementById('modalWhatsappBtn');
            const sharePage = document.getElementById('sharePage');
            const shareImage = document.getElementById('shareImage');
            const shareProductName = document.getElementById('shareProductName');
            const shareProductPrice = document.getElementById('shareProductPrice');
            const shareWhatsappBtn = document.getElementById('shareWhatsappBtn');
            const shareDownloadBtn = document.getElementById('shareDownloadBtn');
            const shareClose = document.getElementById('shareClose');
            const fullscreenBtn = document.getElementById('fullscreenBtn');
            const captureContainer = document.getElementById('captureContainer');
            const captureImage = document.getElementById('captureImage');
            const captureProductName = document.getElementById('captureProductName');
            const captureProductPrice = document.getElementById('captureProductPrice');

            // Número de WhatsApp
            const whatsappNumber = "573008650664";

            // Variable para almacenar la información del producto actual
            let currentProduct = {
                name: '',
                imageSrc: '',
                imageAlt: '',
                price: ''
            };

            // Función para filtrar productos por categoría
            function filterProducts(filterValue) {
                // Actualizar título de la sección
                sectionTitle.textContent = filterValue === 'all' ? 'Todos los productos' : 
                    filterButtons.forEach(btn => {
                        if (btn.getAttribute('data-filter') === filterValue) {
                            sectionTitle.textContent = btn.textContent;
                        }
                    });

                // Mostrar/ocultar productos según el filtro
                productItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            }

            // Función para buscar productos
            function searchProducts(searchValue) {
                productItems.forEach(item => {
                    const title = item.querySelector('.product-title').textContent.toLowerCase();
                    if (title.includes(searchValue.toLowerCase())) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            }

            // Función para abrir el modal con la imagen
            function openImageModal(imgElement, productName) {
                fullScreenImage.src = imgElement.src;
                fullScreenImage.alt = imgElement.alt;
                
                // Guardar información del producto actual
                currentProduct.name = productName;
                currentProduct.imageSrc = imgElement.src;
                currentProduct.imageAlt = imgElement.alt;
                
                // Mostrar el título del producto en el modal
                imageInfo.textContent = productName;
                
                imageModal.show();
            }

            // Función para abrir la página de compartir
            function openSharePage(productName, imageSrc, imageAlt, productPrice) {
                // Configurar la página de compartir
                shareImage.src = imageSrc;
                shareImage.alt = imageAlt;
                shareProductName.textContent = productName;
                
                // Mostrar el precio si está disponible
                if (productPrice) {
                    shareProductPrice.textContent = `$${productPrice}`;
                    shareProductPrice.style.display = 'block';
                } else {
                    shareProductPrice.style.display = 'none';
                }
                
                // Guardar información del producto actual
                currentProduct.name = productName;
                currentProduct.imageSrc = imageSrc;
                currentProduct.imageAlt = imageAlt;
                currentProduct.price = productPrice;
                
                // Mostrar la página de compartir
                sharePage.classList.add('active');
                
                // Evitar el desplazamiento de la página
                document.body.style.overflow = 'hidden';
            }

            // Función para cerrar la página de compartir
            function closeSharePage() {
                sharePage.classList.remove('active');
                document.body.style.overflow = '';
            }

function shareOnWhatsApp(productName, productPrice) {
  

    // Construcción del mensaje con formato WhatsApp y emojis
    let message = `
    ¡Hola, Brilitos De Luna! 👋🏽

    Estoy *muy interesado* en el producto: *${productName}* ✨

    ¡Me encantaría saber más! 💥 

    ¿Me puedes ayudar con más detalles? ☺`;

    // Construye la URL para abrir WhatsApp con el mensaje codificado
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    // Abre una nueva ventana/pestaña con WhatsApp Web para enviar el mensaje
    window.open(whatsappUrl, '_blank');
}




            // Función para descargar la tarjeta de producto como imagen
            async function downloadProductCard() {
                try {
                    // Configurar el contenedor para la captura
                    captureImage.src = currentProduct.imageSrc;
                    captureImage.alt = currentProduct.imageAlt;
                    captureProductName.textContent = currentProduct.name;
                    
                    if (currentProduct.price) {
                        captureProductPrice.textContent = `$${currentProduct.price}`;
                        captureProductPrice.style.display = 'block';
                    } else {
                        captureProductPrice.style.display = 'none';
                    }
                    
                    // Hacer visible el contenedor temporalmente para la captura
                    captureContainer.style.position = 'fixed';
                    captureContainer.style.left = '50%';
                    captureContainer.style.top = '50%';
                    captureContainer.style.transform = 'translate(-50%, -50%)';
                    captureContainer.style.zIndex = '-1';
                    captureContainer.style.opacity = '1';
                    
                    // Esperar a que se cargue la imagen
                    await new Promise(resolve => {
                        if (captureImage.complete) {
                            resolve();
                        } else {
                            captureImage.onload = resolve;
                        }
                    });
                    
                    // Usar html2canvas para capturar el contenedor
                    const canvas = await html2canvas(captureContainer, {
                        backgroundColor: null,
                        scale: 2, // Mayor calidad
                        logging: false,
                        useCORS: true
                    });
                    
                    // Ocultar el contenedor después de la captura
                    captureContainer.style.position = 'absolute';
                    captureContainer.style.left = '-9999px';
                    captureContainer.style.top = 'auto';
                    captureContainer.style.transform = 'none';
                    captureContainer.style.zIndex = '-1';
                    captureContainer.style.opacity = '0';
                    
                    // Crear un enlace para descargar la imagen
                    const link = document.createElement('a');
                    link.download = `${currentProduct.name.replace(/\s+/g, '-').toLowerCase()}.png`;
                    link.href = canvas.toDataURL('image/png');
                    link.click();
                    
                } catch (error) {
                    console.error('Error al generar la imagen:', error);
                    alert('Hubo un error al generar la imagen. Por favor, intenta de nuevo.');
                }
            }

            // Función para alternar pantalla completa
            function toggleFullscreen() {
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
                }
            }

            // Función para actualizar el botón de pantalla completa
            function updateFullscreenButton() {
                if (document.fullscreenElement || document.webkitFullscreenElement || 
                    document.mozFullScreenElement || document.msFullscreenElement) {
                    fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i> Salir';
                } else {
                    fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
                }
            }

            // Event Listeners
            
            // Filtros de categoría
            filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Remover clase active de todos los botones
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    // Añadir clase active al botón clickeado
                    this.classList.add('active');
                    
                    filterProducts(this.getAttribute('data-filter'));
                });
            });

            // Filtro de búsqueda
            searchInput.addEventListener('keyup', function() {
                searchProducts(this.value);
            });

            // Evento para las imágenes
            productImages.forEach(image => {
                image.addEventListener('click', function() {
                    const productCard = this.closest('.product-card');
                    const productName = productCard.querySelector('.product-title').textContent;
                    openImageModal(this, productName);
                });
            });

            // Evento para los botones de expandir
            expandButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.stopPropagation(); // Evitar que el evento se propague a la imagen
                    const productCard = this.closest('.product-card');
                    const imgElement = productCard.querySelector('.product-image');
                    const productName = productCard.querySelector('.product-title').textContent;
                    openImageModal(imgElement, productName);
                });
            });

            // Evento para los botones de WhatsApp en las tarjetas
            whatsappButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.stopPropagation(); // Evitar que el evento se propague
                    const productCard = this.closest('.product-card');
                    const imgElement = productCard.querySelector('.product-image');
                    const productName = this.getAttribute('data-product-name');
                    const productPrice = this.getAttribute('data-product-price');
                    
                    // Abrir la página de compartir
                    openSharePage(productName, imgElement.src, imgElement.alt, productPrice);
                });
            });

            // Evento para el botón de WhatsApp en el modal
            modalWhatsappBtn.addEventListener('click', function() {
                // Abrir la página de compartir
                openSharePage(currentProduct.name, currentProduct.imageSrc, currentProduct.imageAlt);
                
                // Cerrar el modal
                imageModal.hide();
            });

            // Evento para el botón de WhatsApp en la página de compartir
            shareWhatsappBtn.addEventListener('click', function() {
              shareOnWhatsApp(currentProduct.name, currentProduct.imageSrc, currentProduct.price);
            });


            // Evento para el botón de descarga en la página de compartir
            shareDownloadBtn.addEventListener('click', function() {
                downloadProductCard();
            });

            // Evento para cerrar la página de compartir
            shareClose.addEventListener('click', closeSharePage);

            // Cerrar la página de compartir al presionar ESC
            document.addEventListener('keydown', function(event) {
                if (event.key === 'Escape' && sharePage.classList.contains('active')) {
                    closeSharePage();
                }
            });

            // Cerrar la página de compartir al hacer clic fuera del contenedor
            sharePage.addEventListener('click', function(event) {
                if (event.target === this) {
                    closeSharePage();
                }
            });

            // Funcionalidad de pantalla completa
            fullscreenBtn.addEventListener('click', function(e) {
                e.preventDefault();
                toggleFullscreen();
            });

            // Detectar cambios en el estado de pantalla completa
            document.addEventListener('fullscreenchange', updateFullscreenButton);
            document.addEventListener('webkitfullscreenchange', updateFullscreenButton);
            document.addEventListener('mozfullscreenchange', updateFullscreenButton);
            document.addEventListener('MSFullscreenChange', updateFullscreenButton);
        });