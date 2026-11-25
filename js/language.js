(() => {
  const STORAGE_KEY = 'coffeeTrip_language';
  const supported = ['ro', 'en', 'fr', 'es'];
  const locales = {
    ro: { code: 'RO', name: 'Română', html: 'ro', number: 'ro-RO' },
    en: { code: 'EN', name: 'English', html: 'en', number: 'en-GB' },
    fr: { code: 'FR', name: 'Français', html: 'fr', number: 'fr-FR' },
    es: { code: 'ES', name: 'Español', html: 'es', number: 'es-ES' }
  };
  const phraseTranslations = {
    'Acasă': ['Home', 'Accueil', 'Inicio'],
    'Colecția': ['Collection', 'Collection', 'Colección'],
    'Cafea': ['Coffee', 'Café', 'Café'],
    'Cafea rară': ['Rare coffee', 'Café rare', 'Café raro'],
    'Blenduri': ['Blends', 'Assemblages', 'Mezclas'],
    'Atelier': ['Atelier', 'Atelier', 'Atelier'],
    'Jurnal': ['Journal', 'Journal', 'Diario'],
    'Magazin': ['Shop', 'Boutique', 'Tienda'],
    'Coffee': ['Cafea', 'Café', 'Café'],
    'Rare Coffee': ['Cafea rară', 'Café rare', 'Café raro'],
    'Espresso': ['Espresso', 'Espresso', 'Espresso'],
    'Signature Blends': ['Blenduri Signature', 'Assemblages Signature', 'Mezclas Signature'],
    'Collections': ['Colecții', 'Collections', 'Colecciones'],
    'Discover': ['Descoperă', 'Découvrir', 'Descubrir'],
    'Experience': ['Experiență', 'Expérience', 'Experiencia'],
    'Best Sellers': ['Cele mai vândute', 'Meilleures ventes', 'Más vendidos'],
    'New Arrivals': ['Noutăți', 'Nouveautés', 'Novedades'],
    'Budget Luxury': ['Lux accesibil', 'Luxe accessible', 'Lujo accesible'],
    'Premium Selection': ['Selecție premium', 'Sélection premium', 'Selección premium'],
    'Coffee Atelier': ['Atelierul de cafea', 'Atelier de café', 'Taller de café'],
    'Coffee Guide': ['Ghid de cafea', 'Guide du café', 'Guía del café'],
    'Search': ['Caută', 'Rechercher', 'Buscar'],
    'Wishlist': ['Favorite', 'Favoris', 'Favoritos'],
    'Favorite': ['Wishlist', 'Favoris', 'Favoritos'],
    'Cart': ['Coș', 'Panier', 'Carrito'],
    'Account': ['Cont', 'Compte', 'Cuenta'],
    'Home': ['Acasă', 'Accueil', 'Inicio'],
    'Shop': ['Magazin', 'Boutique', 'Tienda'],
    'Contact': ['Contact', 'Contact', 'Contacto'],
    'Story': ['Povestea noastră', 'Notre histoire', 'Nuestra historia'],
    'Guide': ['Ghid', 'Guide', 'Guía'],
    'Search collection': ['Caută în colecție', 'Rechercher dans la collection', 'Buscar en la colección'],
    'Type to explore the catalog.': ['Tastează pentru a explora catalogul.', 'Saisissez un terme pour explorer le catalogue.', 'Escribe para explorar el catálogo.'],
    'No results found.': ['Nu s-au găsit rezultate.', 'Aucun résultat trouvé.', 'No se encontraron resultados.'],
    'Try floral, espresso, Ethiopia, or premium.': ['Încearcă floral, espresso, Etiopia sau premium.', 'Essayez floral, espresso, Éthiopie ou premium.', 'Prueba floral, espresso, Etiopía o premium.'],
    'Search results': ['Rezultate căutare', 'Résultats de recherche', 'Resultados de búsqueda'],
    'Add to cart': ['Adaugă în coș', 'Ajouter au panier', 'Añadir al carrito'],
    'Added to cart': ['Adăugat în coș', 'Ajouté au panier', 'Añadido al carrito'],
    'Removed from wishlist': ['Eliminat din favorite', 'Retiré des favoris', 'Eliminado de favoritos'],
    'Added to wishlist': ['Adăugat la favorite', 'Ajouté aux favoris', 'Añadido a favoritos'],
    'Your basket': ['Coșul tău', 'Votre panier', 'Tu cesta'],
    'Subtotal': ['Subtotal', 'Sous-total', 'Subtotal'],
    'Shipping': ['Livrare', 'Livraison', 'Envío'],
    'Taxes': ['Taxe', 'Taxes', 'Impuestos'],
    'Total': ['Total', 'Total', 'Total'],
    'Proceed to checkout': ['Continuă la checkout', 'Passer à la commande', 'Ir a pagar'],
    'Continue to checkout': ['Continuă la checkout', 'Continuer vers le paiement', 'Continuar al pago'],
    'Back to shop': ['Înapoi la magazin', 'Retour à la boutique', 'Volver a la tienda'],
    'Buy now': ['Cumpără acum', 'Acheter maintenant', 'Comprar ahora'],
    'View product': ['Vezi produsul', 'Voir le produit', 'Ver producto'],
    'View product →': ['Vezi produsul →', 'Voir le produit →', 'Ver producto →'],
    'Product not found.': ['Produsul nu a fost găsit.', 'Produit introuvable.', 'Producto no encontrado.'],
    'Your favorites': ['Favoritele tale', 'Vos favoris', 'Tus favoritos'],
    'Nothing added yet.': ['Încă nu ai adăugat nimic.', 'Vous n’avez encore rien ajouté.', 'Aún no has añadido nada.'],
    'Your cart is empty.': ['Coșul este gol.', 'Votre panier est vide.', 'Tu carrito está vacío.'],
    'The barista has a recommendation for you.': ['Barista are o recomandare pentru tine.', 'Le barista a une recommandation pour vous.', 'El barista tiene una recomendación para ti.'],
    'Estimated price': ['Preț estimativ', 'Prix estimé', 'Precio estimado'],
    'Preț estimativ': ['Estimated price', 'Prix estimé', 'Precio estimado'],
    'Disponibil la confirmarea comenzii': ['Available at order confirmation', 'Disponible à la confirmation de la commande', 'Disponible al confirmar el pedido'],
    'Prețurile finale sunt disponibile la confirmarea comenzii.': ['Final prices are available when your order is confirmed.', 'Les prix définitifs seront confirmés avec votre commande.', 'Los precios finales se confirmarán al validar el pedido.'],
    'Products': ['Produse', 'Produits', 'Productos'],
    'produse': ['products', 'produits', 'productos'],
    'Curated collection': ['Selecție curatoriată', 'Collection sélectionnée', 'Selección cuidada'],
    'Filters': ['Filtre', 'Filtres', 'Filtros'],
    'Category': ['Categorie', 'Catégorie', 'Categoría'],
    'All products': ['Toate produsele', 'Tous les produits', 'Todos los productos'],
    'All': ['Toate', 'Tout', 'Todos'],
    'Selection': ['Selecție', 'Sélection', 'Selección'],
    'Origin': ['Origine', 'Origine', 'Origen'],
    'Flavor': ['Aromă', 'Saveur', 'Sabor'],
    'Sort': ['Sortare', 'Trier', 'Ordenar'],
    'Featured': ['Recomandate', 'À la une', 'Destacados'],
    'Price low to high': ['Preț crescător', 'Prix croissant', 'Precio ascendente'],
    'Price high to low': ['Preț descrescător', 'Prix décroissant', 'Precio descendente'],
    'Best rated': ['Cele mai apreciate', 'Mieux notés', 'Mejor valorados'],
    'Product detail': ['Detalii produs', 'Détails du produit', 'Detalles del producto'],
    'Reviews': ['recenzii', 'avis', 'reseñas'],
    'Weight': ['Gramaj', 'Poids', 'Peso'],
    'Grind': ['Măcinare', 'Mouture', 'Molienda'],
    'Whole Bean': ['Boabe întregi', 'Grains entiers', 'Grano entero'],
    'Filter': ['Filtru', 'Filtre', 'Filtro'],
    'French Press': ['French press', 'Presse française', 'Prensa francesa'],
    'Moka Pot': ['Moka', 'Cafetière moka', 'Cafetera moka'],
    'Taste profile': ['Profil aromatic', 'Profil aromatique', 'Perfil de sabor'],
    'Roast': ['Prăjire', 'Torréfaction', 'Tostado'],
    'Body': ['Corp', 'Corps', 'Cuerpo'],
    'Acidity': ['Aciditate', 'Acidité', 'Acidez'],
    'Sweetness': ['Dulceață', 'Douceur', 'Dulzor'],
    'Add to wishlist': ['Adaugă la favorite', 'Ajouter aux favoris', 'Añadir a favoritos'],
    'Saved': ['Salvat', 'Enregistré', 'Guardado'],
    'Adăugat în coș': ['Added to cart', 'Ajouté au panier', 'Añadido al carrito'],
    'Eliminat din favorite': ['Removed from wishlist', 'Retiré des favoris', 'Eliminado de favoritos'],
    'Adăugat la favorite': ['Added to wishlist', 'Ajouté aux favoris', 'Añadido a favoritos'],
    'Coșul este gol.': ['Your cart is empty.', 'Votre panier est vide.', 'Tu carrito está vacío.'],
    'Favoritele tale': ['Your favorites', 'Vos favoris', 'Tus favoritos'],
    'Vreau ceva dulce și ciocolatos': ['I want something sweet and chocolatey', 'Je veux quelque chose de doux et chocolaté', 'Quiero algo dulce y achocolatado'],
    'Îmi place cafeaua florală': ['I like floral coffee', 'J’aime le café floral', 'Me gusta el café floral'],
    'Vreau un espresso intens': ['I want an intense espresso', 'Je veux un espresso intense', 'Quiero un espresso intenso'],
    'Ce cafea recomanzi?': ['What coffee do you recommend?', 'Quel café recommandez-vous ?', '¿Qué café recomiendas?'],
    'Dulce & ciocolatos': ['Sweet & chocolatey', 'Doux & chocolaté', 'Dulce y achocolatado'],
    'Floral & elegant': ['Floral & elegant', 'Floral & élégant', 'Floral y elegante'],
    'Intens & puternic': ['Intense & bold', 'Intense & corsé', 'Intenso y fuerte'],
    'Surprinde-mă': ['Surprise me', 'Surprenez-moi', 'Sorpréndeme'],
    'Încă nu ai adăugat nimic.': ['Nothing added yet.', 'Vous n’avez encore rien ajouté.', 'Aún no has añadido nada.'],
    'Vezi produsul': ['View product', 'Voir le produit', 'Ver producto'],
    'Înapoi la magazin': ['Back to shop', 'Retour à la boutique', 'Volver a la tienda'],
    'Adaugă în coș': ['Add to cart', 'Ajouter au panier', 'Añadir al carrito'],
    'Caută în colecție': ['Search collection', 'Rechercher dans la collection', 'Buscar en la colección'],
    'Toate produsele': ['All products', 'Tous les produits', 'Todos los productos'],
    'Cafea de Origine': ['Single-origin coffee', 'Café de terroir', 'Café de origen'],
    'Cafea Rară': ['Rare coffee', 'Café rare', 'Café raro'],
    'Blenduri de Cafea': ['Coffee blends', 'Assemblages de café', 'Mezclas de café'],
    'Ceaiuri Premium': ['Premium teas', 'Thés premium', 'Tés premium'],
    'Mirodenii & Condimente': ['Spices & seasonings', 'Épices et assaisonnements', 'Especias y condimentos'],
    'Siropuri Artizanale': ['Artisan syrups', 'Sirops artisanaux', 'Sirope artesanal'],
    'Accesorii & Consumabile': ['Accessories & consumables', 'Accessoires et consommables', 'Accesorios y consumibles'],
    'Pungă': ['Bag', 'Sachet', 'Bolsa'],
    'Cutie': ['Tin', 'Boîte', 'Caja'],
    'Sticlă': ['Bottle', 'Bouteille', 'Botella'],
    'Flacon': ['Bottle', 'Flacon', 'Botella'],
    'Set': ['Set', 'Lot', 'Juego'],
    'Bucată': ['Piece', 'Pièce', 'Unidad'],
    'bucăți': ['pieces', 'pièces', 'unidades'],
    'Note': ['Notes', 'Notes', 'Notas'],
    'florale': ['floral', 'florales', 'florales'],
    'de ciocolată': ['of chocolate', 'de chocolat', 'a chocolate'],
    'Aciditate medie': ['Medium acidity', 'Acidité moyenne', 'Acidez media'],
    'Echilibrată': ['Balanced', 'Équilibré', 'Equilibrado'],
    'Corp plin': ['Full body', 'Corps généreux', 'Cuerpo intenso'],
    'pământiu': ['earthy', 'terreux', 'terroso'],
    'Prăjire medie': ['Medium roast', 'Torréfaction moyenne', 'Tueste medio'],
    'Prăjire intensă': ['Dark roast', 'Torréfaction intense', 'Tueste intenso'],
    'Măcinată ideal': ['Ground for moka', 'Mouture idéale', 'Molido ideal'],
    'Decafeinizată natural': ['Naturally decaffeinated', 'Décaféiné naturellement', 'Descafeinado natural'],
    'Pentru espresso robust': ['For a bold espresso', 'Pour un espresso corsé', 'Para un espresso intenso'],
    'Ceai negru': ['Black tea', 'Thé noir', 'Té negro'],
    'Ceai verde': ['Green tea', 'Thé vert', 'Té verde'],
    'Ceai alb': ['White tea', 'Thé blanc', 'Té blanco'],
    'Fără cofeină': ['Caffeine-free', 'Sans caféine', 'Sin cafeína'],
    'Răcoritor': ['Refreshing', 'Rafraîchissant', 'Refrescante'],
    'Ideal latte': ['Ideal for lattes', 'Idéal pour les latte', 'Ideal para latte'],
    'Origine Madagascar': ['Origin: Madagascar', 'Origine : Madagascar', 'Origen: Madagascar'],
    'mărimea': ['size', 'taille', 'tamaño'],
    'alb mat sau verde smarald': ['matte white or emerald green', 'blanc mat ou vert émeraude', 'blanco mate o verde esmeralda'],
    'corp inox, reglaj granulație': ['stainless steel body, adjustable grind', 'corps en acier inoxydable, mouture réglable', 'cuerpo de acero inoxidable, molienda regulable'],
    'Acuratețe': ['Accuracy', 'Précision', 'Precisión'],
    'Caramel sărat': ['Salted caramel', 'Caramel au beurre salé', 'Caramelo salado'],
    'Alune de Pădure': ['Hazelnut', 'Noisette', 'Avellana'],
    'Ciocolată neagră': ['Dark chocolate', 'Chocolat noir', 'Chocolate negro'],
    'Iasomie': ['Jasmine', 'Jasmin', 'Jazmín'],
    'Piersică': ['Peach', 'Pêche', 'Melocotón'],
    'Bergamotă': ['Bergamot', 'Bergamote', 'Bergamota'],
    'Vanilie': ['Vanilla', 'Vanille', 'Vainilla'],
    'Mentă': ['Mint', 'Menthe', 'Menta'],
    'Ghimbir': ['Ginger', 'Gingembre', 'Jengibre'],
    'Scorțișoară': ['Cinnamon', 'Cannelle', 'Canela'],
    'Coacăze roșii': ['Redcurrant', 'Groseille', 'Grosella'],
    'Fructe de pădure': ['Berries', 'Fruits rouges', 'Frutos del bosque'],
    'Zahăr ars': ['Burnt sugar', 'Sucre brûlé', 'Azúcar tostado'],
    'Pere': ['Pear', 'Poire', 'Pera'],
    'Cântar': ['Scale', 'Balance', 'Báscula'],
    'THE COFFEE COLLECTION': ['COLECȚIA DE CAFEA', 'LA COLLECTION DE CAFÉS', 'LA COLECCIÓN DE CAFÉ'],
    'Curated coffee for every ritual.': ['Cafea atent selecționată pentru fiecare ritual.', 'Des cafés sélectionnés pour chaque rituel.', 'Café seleccionado para cada ritual.'],
    'Explore all collections': ['Explorează toate colecțiile', 'Explorer toutes les collections', 'Explorar todas las colecciones'],
    'Coffee guide': ['Ghid de cafea', 'Guide du café', 'Guía del café'],
    'Curated by origin': ['Selecționate după origine', 'Sélectionnés par origine', 'Seleccionados por origen'],
    'Find the perfect': ['Găsește', 'Trouvez', 'Encuentra'],
    'coffee mood.': ['moodul perfect pentru cafea.', 'humeur café idéale.', 'ambiente de café perfecto.'],
    'Single origin lots, rare releases, signature blends and accessible daily favorites — all made for premium rituals.': ['Origini atent alese, cafele rare, blenduri Signature și favorite pentru fiecare zi, create pentru ritualuri speciale.', 'Des origines sélectionnées, des cafés rares, des assemblages Signature et des favoris du quotidien, pensés pour vos rituels.', 'Orígenes seleccionados, cafés excepcionales, mezclas Signature y favoritos diarios, pensados para tus rituales.'],
    'Selected for taste, character and mood.': ['Selectate pentru gust, caracter și stare.', 'Sélectionnés pour leur goût, leur caractère et leur humeur.', 'Seleccionados por su sabor, carácter y personalidad.'],
    'Single origin coffee': ['Cafea de origine', 'Café de terroir', 'Café de origen'],
    'Distinctive coffees, expressive profiles and stories from origin to cup.': ['Cafea cu personalitate, profiluri expresive și povești de la origine până în ceașcă.', 'Des cafés singuliers, des profils expressifs et des histoires de l’origine à la tasse.', 'Cafés distintivos, perfiles expresivos e historias desde el origen hasta la taza.'],
    'Rare coffee': ['Cafea rară', 'Café rare', 'Café excepcional'],
    'A boutique collection of exceptional lots selected for scarcity, structure and singular beauty.': ['O colecție exclusivă de loturi rare, alese pentru structură și caracter aparte.', 'Une collection exclusive de lots rares, choisis pour leur structure et leur beauté singulière.', 'Una colección exclusiva de lotes excepcionales, seleccionados por su rareza y carácter.'],
    'Balanced intensity, silky texture and a polished finish for short and expressive cups.': ['Intensitate echilibrată, textură catifelată și un final rafinat pentru espresso-uri expresive.', 'Une intensité équilibrée, une texture soyeuse et une finale élégante.', 'Intensidad equilibrada, textura sedosa y un final refinado para tazas expresivas.'],
    'High-minded espresso and filter blends crafted to be both versatile and deeply satisfying.': ['Blenduri pentru espresso și filtru, versatile și pline de savoare.', 'Des assemblages espresso et filtre polyvalents et généreux en saveurs.', 'Mezclas para espresso y filtro, versátiles y llenas de sabor.'],
    'Thoughtfully edited coffee journeys for mornings, gifting, espresso rituals and rare discoveries.': ['Selecții atent alcătuite pentru dimineți, cadouri, ritualuri espresso și descoperiri rare.', 'Des sélections soigneusement composées pour les matins, les cadeaux, les rituels espresso et les découvertes rares.', 'Selecciones cuidadas para mañanas, regalos, rituales espresso y hallazgos excepcionales.'],
    'We’re here to help with orders, sourcing questions, gifting and coffee recommendations.': ['Te ajutăm cu comenzile, proveniența cafelei, cadourile și recomandările.', 'Nous vous aidons pour vos commandes, l’origine des cafés, les cadeaux et les recommandations.', 'Te ayudamos con pedidos, origen del café, regalos y recomendaciones.'],
    'Answers to the most common questions about shipping, coffee profiles and order support.': ['Răspunsuri la întrebările despre livrare, profilurile cafelei și comenzile tale.', 'Réponses aux questions fréquentes sur la livraison, les profils de café et les commandes.', 'Respuestas a las preguntas frecuentes sobre envíos, perfiles de café y pedidos.'],
    'Complete your order with a simple, secure premium checkout experience.': ['Finalizează comanda simplu și în siguranță.', 'Finalisez votre commande simplement et en toute sécurité.', 'Completa tu pedido de forma sencilla y segura.'],
    'Review the coffees you’ve selected and continue to checkout when you’re ready.': ['Verifică produsele alese și continuă la finalizarea comenzii.', 'Vérifiez votre sélection et passez à la commande quand vous le souhaitez.', 'Revisa tu selección y continúa al pago cuando quieras.'],
    'Your saved coffees, ready whenever you are ready to brew or buy.': ['Cafelele tale favorite, gata pentru următoarea ceașcă.', 'Vos cafés favoris, prêts pour votre prochaine dégustation.', 'Tus cafés favoritos, listos para tu próxima taza.'],
    'Manage your preferences, saved coffee choices and order history.': ['Gestionează preferințele, produsele favorite și istoricul comenzilor.', 'Gérez vos préférences, vos cafés favoris et l’historique de vos commandes.', 'Gestiona tus preferencias, favoritos e historial de pedidos.'],
    'The place where provenance, roast profile and ritual are shaped into one coherent experience.': ['Locul în care originea, prăjirea și ritualul se întâlnesc într-o experiență unitară.', 'L’endroit où l’origine, la torréfaction et le rituel s’unissent en une expérience cohérente.', 'El lugar donde el origen, el tueste y el ritual se unen en una experiencia única.'],
    'A slow, thoughtful approach to coffee — where taste, origin and ritual are cherished together.': ['O abordare atentă a cafelei, în care gustul, originea și ritualul se întâlnesc.', 'Une approche réfléchie du café, où le goût, l’origine et le rituel se rencontrent.', 'Una forma pausada de disfrutar el café, uniendo sabor, origen y ritual.'],
    'Notes, stories and thoughtful reflections from our brewing desk and studio.': ['Note, povești și reflecții din atelierul nostru de cafea.', 'Notes, récits et réflexions depuis notre atelier de préparation.', 'Notas, historias y reflexiones desde nuestro espacio de café.'],
    'Find the coffee profile that fits your taste, your brew method and the kind of ritual you are after.': ['Descoperă cafeaua potrivită gustului, metodei de preparare și ritualului tău.', 'Trouvez le café adapté à vos goûts, à votre méthode de préparation et à votre rituel.', 'Encuentra el café ideal para tus gustos, tu método y tu ritual.'],
    'This page doesn’t exist in our current collection, but the coffee journey is still open.': ['Această pagină nu există, dar călătoria cafelei continuă.', 'Cette page n’existe pas, mais le voyage du café continue.', 'Esta página no existe, pero el viaje del café continúa.'],
    'We lost the trail.': ['Ne-am rătăcit.', 'Nous avons perdu notre chemin.', 'Nos hemos perdido.'],
    'Source': ['Origine', 'Origine', 'Origen'],
    'Review': ['Selecție', 'Sélection', 'Selección'],
    'Roasting': ['Prăjire', 'Torréfaction', 'Tueste'],
    'Service': ['Servire', 'Service', 'Servicio'],
    'We choose producers and lots with integrity, traceability and a memorable flavor profile.': ['Alegem producători și loturi cu integritate, trasabilitate și profiluri memorabile.', 'Nous choisissons des producteurs et des lots intègres, traçables et aux profils remarquables.', 'Elegimos productores y lotes íntegros, trazables y con perfiles memorables.'],
    'We cup every lot, refine our profile and make sure the final cup is worthy of serving.': ['Degustăm fiecare lot și rafinăm profilul pentru o ceașcă excepțională.', 'Nous dégustons chaque lot et affinons son profil pour offrir une tasse remarquable.', 'Catamos cada lote y refinamos su perfil para ofrecer una taza excepcional.'],
    'Each roast is calibrated around the coffee’s sweetness, body and aromatic timing.': ['Fiecare prăjire evidențiază dulceața, corpul și aromele cafelei.', 'Chaque torréfaction révèle la douceur, le corps et les arômes du café.', 'Cada tueste realza el dulzor, el cuerpo y los aromas del café.'],
    'Final delivery is about making the experience feel premium, easy and emotionally grounded.': ['Livrarea completează o experiență premium, simplă și atentă.', 'La livraison prolonge une expérience premium, simple et attentionnée.', 'La entrega completa una experiencia prémium, sencilla y cuidada.'],
    'Select language': ['Selectează limba', 'Choisir la langue', 'Elegir idioma'],
    'Add a coffee before checkout.': ['Adaugă un produs înainte de finalizarea comenzii.', 'Ajoutez un café avant de passer commande.', 'Añade un café antes de finalizar el pedido.'],
    'Thank you. You will receive exclusive selections in your inbox.': ['Mulțumim. Vei primi selecții exclusive pe email.', 'Merci. Vous recevrez nos sélections exclusives par e-mail.', 'Gracias. Recibirás selecciones exclusivas en tu correo.'],
    'Your order has been placed.': ['Comanda a fost înregistrată.', 'Votre commande a été enregistrée.', 'Tu pedido se ha registrado.'],
    'Cart is empty': ['Coșul este gol', 'Le panier est vide', 'El carrito está vacío'],
    'Back to the shop': ['Înapoi la magazin', 'Retour à la boutique', 'Volver a la tienda'],
    'Shipping details': ['Date de livrare', 'Informations de livraison', 'Datos de envío'],
    'First name': ['Prenume', 'Prénom', 'Nombre'],
    'Last name': ['Nume', 'Nom', 'Apellido'],
    'Email': ['E-mail', 'E-mail', 'Correo electrónico'],
    'Address': ['Adresă', 'Adresse', 'Dirección'],
    'City': ['Oraș', 'Ville', 'Ciudad'],
    'Postal code': ['Cod poștal', 'Code postal', 'Código postal'],
    'Order note': ['Note despre comandă', 'Note de commande', 'Nota del pedido'],
    'Payment': ['Plată', 'Paiement', 'Pago'],
    'Card payment': ['Plată cu cardul', 'Paiement par carte', 'Pago con tarjeta'],
    'Cash on delivery': ['Plată ramburs', 'Paiement à la livraison', 'Pago contra reembolso'],
    'Place order': ['Plasează comanda', 'Passer la commande', 'Realizar pedido'],
    'Your first name': ['Prenumele tău', 'Votre prénom', 'Tu nombre'],
    'Your last name': ['Numele tău', 'Votre nom', 'Tu apellido'],
    'Street, number, apartment': ['Stradă, număr, apartament', 'Rue, numéro, appartement', 'Calle, número, piso'],
    'Your name': ['Numele tău', 'Votre nom', 'Tu nombre'],
    'How can we help?': ['Cu ce te putem ajuta?', 'Comment pouvons-nous vous aider ?', '¿Cómo podemos ayudarte?'],
    'Tell us what you need...': ['Spune-ne cu ce te putem ajuta...', 'Dites-nous comment vous aider…', 'Cuéntanos qué necesitas…'],
    'Name': ['Nume', 'Nom', 'Nombre'],
    'Subject': ['Subiect', 'Objet', 'Asunto'],
    'Message': ['Mesaj', 'Message', 'Mensaje'],
    'COMPLIMENTARY DELIVERY': ['LIVRARE GRATUITĂ', 'LIVRAISON OFFERTE', 'ENVÍO GRATUITO'],
    'The art of': ['Arta', 'L’art de', 'El arte del'],
    'THE ART OF': ['ARTA', 'L’ART DE', 'EL ARTE DEL'],
    'THE PRIVATE COLLECTION': ['COLECȚIA PRIVATĂ', 'LA COLLECTION PRIVÉE', 'LA COLECCIÓN PRIVADA'],
    'A DIFFERENT KIND OF COFFEE HOUSE': ['UN ALT FEL DE CAFENEA', 'UN AUTRE GEN DE CAFÉ', 'OTRA FORMA DE CAFETERÍA'],
    'Exceptional coffee.': ['Cafea excepțională.', 'Un café d’exception.', 'Café excepcional.'],
    'Remarkable moments.': ['Momente memorabile.', 'Des moments inoubliables.', 'Momentos inolvidables.'],
    'From the first aroma': ['De la prima aromă', 'Du premier arôme', 'Desde el primer aroma'],
    'to the final sip,': ['până la ultima înghițitură,', 'à la dernière gorgée,', 'hasta el último sorbo,'],
    'nothing is accidental.': ['nimic nu este întâmplător.', 'rien n’est laissé au hasard.', 'nada es casual.'],
    'Loturi mici. Origini rare. Profile de gust memorabile.': ['Small lots. Rare origins. Memorable flavor profiles.', 'Petits lots. Origines rares. Profils aromatiques mémorables.', 'Lotes pequeños. Orígenes excepcionales. Perfiles memorables.'],
    'CITEȘTE MANIFESTUL': ['READ OUR MANIFESTO', 'LIRE NOTRE MANIFESTE', 'LEE NUESTRO MANIFIESTO'],
    'Descoperă fiecare origine.': ['Discover every origin.', 'Découvrez chaque origine.', 'Descubre cada origen.'],
    'Găsește-ți ritualul.': ['Find your ritual.', 'Trouvez votre rituel.', 'Encuentra tu ritual.'],
    'ORIGINI & SELECȚII': ['ORIGINS & SELECTIONS', 'ORIGINES & SÉLECTIONS', 'ORÍGENES Y SELECCIONES'],
    'O colecție atent curatoriată de cafele de specialitate, origini rare și profiluri create pentru cei care văd cafeaua ca pe o formă de artă.': ['A thoughtfully curated collection of specialty coffees, rare origins and profiles for those who see coffee as an art form.', 'Une collection soigneusement composée de cafés de spécialité, d’origines rares et de profils pour ceux qui voient le café comme un art.', 'Una colección cuidada de cafés de especialidad, orígenes excepcionales y perfiles para quienes consideran el café un arte.'],
    'Coffee Trip aduce împreună origini extraordinare, roasting de precizie și un ritual contemporan. Descoperă cafele create pentru dimineți lente, conversații memorabile și momente care merită savurate.': ['Coffee Trip brings together extraordinary origins, precise roasting and a contemporary ritual. Discover coffees for slow mornings, memorable conversations and moments worth savoring.', 'Coffee Trip réunit des origines remarquables, une torréfaction précise et un rituel contemporain. Découvrez des cafés pour les matins tranquilles et les instants précieux.', 'Coffee Trip reúne orígenes extraordinarios, tueste preciso y un ritual contemporáneo. Descubre cafés para mañanas pausadas y momentos memorables.'],
    'Origin-led.': ['Ghidată de origine.', 'Guidé par l’origine.', 'Guiado por el origen.'],
    'Character-rich.': ['Plină de caracter.', 'Riche en caractère.', 'Lleno de carácter.'],
    'Jasmine, tea notes and delicate fruit expression for light and elegant cups.': ['Iasomie, note de ceai și fructe delicate pentru cești ușoare și elegante.', 'Jasmin, notes de thé et fruits délicats pour des tasses légères et élégantes.', 'Jazmín, notas de té y fruta delicada para tazas ligeras y elegantes.'],
    'Bright, vivid acidity with red fruit, citrus and honeyed complexity.': ['Aciditate vibrantă, fructe roșii, citrice și note complexe de miere.', 'Une acidité vive, des fruits rouges, des agrumes et une touche miellée.', 'Acidez brillante, frutos rojos, cítricos y matices de miel.'],
    'Sweet, round profiles with caramel depth and a generous finish.': ['Profiluri dulci și rotunde, cu note profunde de caramel și un final bogat.', 'Des profils doux et ronds, aux notes profondes de caramel et à la finale généreuse.', 'Perfiles dulces y redondos, con caramelo profundo y un final generoso.'],
    'From Ethiopia’s floral brightness to Colombia’s balanced sweetness, every lot is selected to reveal clarity, structure and a memorable finish.': ['De la luminozitatea florală a Etiopiei la dulceața echilibrată a Columbiei, fiecare lot este ales pentru claritate și caracter.', 'De l’éclat floral de l’Éthiopie à la douceur équilibrée de la Colombie, chaque lot révèle clarté et caractère.', 'Del brillo floral de Etiopía al dulzor equilibrado de Colombia, cada lote revela claridad y carácter.'],
    'Every collection is designed around a different cup experience: luminous mornings, intimate espresso moments, rare discoveries and thoughtful gifting.': ['Fiecare colecție oferă o experiență aparte: dimineți luminoase, momente espresso, descoperiri rare și cadouri atent alese.', 'Chaque collection propose une expérience unique : matins lumineux, pauses espresso, découvertes rares et cadeaux choisis avec soin.', 'Cada colección ofrece una experiencia distinta: mañanas luminosas, momentos espresso, hallazgos excepcionales y regalos especiales.'],
    'Editors’ picks': ['Selecția editorilor', 'Les choix de la rédaction', 'Selección editorial'],
    'The coffees our community returns to again and again.': ['Cafelele la care comunitatea noastră revine mereu.', 'Les cafés auxquels notre communauté revient sans cesse.', 'Los cafés a los que nuestra comunidad siempre vuelve.'],
    'Small batch philosophy': ['Filosofia loturilor mici', 'La philosophie des petits lots', 'Filosofía de lotes pequeños'],
    'Every batch tells a specific story.': ['Fiecare lot spune o poveste aparte.', 'Chaque lot raconte une histoire singulière.', 'Cada lote cuenta una historia propia.'],
    'At our atelier, coffee is handled with care from sourcing to roast. We focus on clarity, balance and the cup’s final expression.': ['În atelierul nostru, cafeaua este tratată cu grijă, de la origine până la prăjire. Urmărim claritatea, echilibrul și expresia finală în ceașcă.', 'Dans notre atelier, chaque café est travaillé avec soin, de l’origine à la torréfaction, pour révéler clarté et équilibre.', 'En nuestro taller cuidamos cada café desde su origen hasta el tueste, buscando claridad y equilibrio en cada taza.'],
    'Every coffee is roasted to preserve sweetness, clarity and the nuances of origin.': ['Prăjim fiecare cafea pentru a-i păstra dulceața, claritatea și nuanțele originii.', 'Chaque café est torréfié pour préserver sa douceur, sa clarté et les nuances de son origine.', 'Tostamos cada café para conservar su dulzor, claridad y matices de origen.'],
    'What we care about': ['Ce contează pentru noi', 'Ce qui compte pour nous', 'Lo que nos importa'],
    'Member profile': ['Profil de membru', 'Profil membre', 'Perfil de miembro'],
    '18 saved coffees': ['18 cafele favorite', '18 cafés favoris', '18 cafés guardados'],
    'Curated for late-night tasting and slow weekend brewing.': ['Selecționate pentru degustări târzii și dimineți tihnite de weekend.', 'Sélectionnées pour les dégustations nocturnes et les préparations du week-end.', 'Seleccionados para degustaciones nocturnas y preparaciones pausadas de fin de semana.'],
    '4 recent orders': ['4 comenzi recente', '4 commandes récentes', '4 pedidos recientes'],
    'Last shipment delivered on 05 July 2026.': ['Ultima comandă a fost livrată pe 5 iulie 2026.', 'Dernière livraison effectuée le 5 juillet 2026.', 'Último envío entregado el 5 de julio de 2026.'],
    'Light roast / floral notes': ['Prăjire deschisă / note florale', 'Torréfaction claire / notes florales', 'Tueste claro / notas florales'],
    'Recommended selections are tuned to your taste profile.': ['Recomandările sunt adaptate profilului tău de gust.', 'Les recommandations sont adaptées à vos goûts.', 'Las recomendaciones se adaptan a tus gustos.'],
    'Visit or write': ['Vizitează-ne sau scrie-ne', 'Venez nous voir ou écrivez-nous', 'Visítanos o escríbenos'],
    '19 Atelier Street Old Town, Bucharest': ['Strada Atelier 19, Centrul Vechi, București', '19 rue Atelier, vieille ville, Bucarest', 'Calle Atelier 19, casco antiguo, Bucarest'],
    'hello@coffeetrip.ro +40 721 123 456': ['hello@coffeetrip.ro +40 721 123 456', 'hello@coffeetrip.ro +40 721 123 456', 'hello@coffeetrip.ro +40 721 123 456'],
    'Precision and texture': ['Precizie și textură', 'Précision et texture', 'Precisión y textura'],
    'Rich, warm,': ['Bogată și caldă,', 'Riche et chaleureuse,', 'Intensa y cálida,'],
    'unmistakably elegant.': ['ineconfundabil de elegantă.', 'résolument élégante.', 'inequívocamente elegante.'],
    'Espresso coffees at Coffee Trip are selected for crema, sweetness and body — built to deliver a complete, luxurious shot with a smooth and layered finish.': ['Selecționăm cafelele espresso pentru cremă, dulceață și corp, cu un final catifelat și complex.', 'Nos cafés espresso sont choisis pour leur crema, leur douceur et leur corps, avec une finale soyeuse et complexe.', 'Nuestros cafés espresso destacan por su crema, dulzor y cuerpo, con un final sedoso y complejo.'],
    'Dense, persistent crema that signals sweetness, body and balance in the cup.': ['Cremă densă și persistentă, semn de dulceață, corp și echilibru.', 'Une crema dense et persistante, signe de douceur, de corps et d’équilibre.', 'Crema densa y persistente, señal de dulzor, cuerpo y equilibrio.'],
    'Silky textures and a rich mouthfeel that make espresso feel complete and satisfying.': ['Textură catifelată și corp bogat pentru un espresso complet și savuros.', 'Une texture soyeuse et une belle rondeur pour un espresso généreux.', 'Textura sedosa y cuerpo envolvente para un espresso pleno y satisfactorio.'],
    'Long, polished aftertaste that lingers gently and keeps the profile memorable.': ['Un postgust lung și rafinat, care păstrează aromele memorabile.', 'Une finale longue et élégante qui prolonge les arômes.', 'Un final largo y refinado que prolonga sus aromas.'],
    'The espresso line': ['Selecția espresso', 'La sélection espresso', 'La selección espresso'],
    'How quickly do you ship?': ['În cât timp expediați comenzile?', 'Quels sont vos délais d’expédition ?', '¿Cuánto tardan los envíos?'],
    'Orders are packed within 24 hours and usually dispatched the next business day by courier.': ['Comenzile sunt pregătite în 24 de ore și expediate, de regulă, în următoarea zi lucrătoare.', 'Les commandes sont préparées sous 24 heures et généralement expédiées le jour ouvré suivant.', 'Los pedidos se preparan en 24 horas y suelen enviarse el siguiente día laborable.'],
    'Do you offer free delivery?': ['Oferiți livrare gratuită?', 'Proposez-vous la livraison gratuite ?', '¿Ofrecen envío gratuito?'],
    'Delivery details are confirmed with every order.': ['Detaliile livrării sunt confirmate pentru fiecare comandă.', 'Les modalités de livraison sont confirmées pour chaque commande.', 'Los detalles del envío se confirman con cada pedido.'],
    'Can I change or cancel an order?': ['Pot modifica sau anula o comandă?', 'Puis-je modifier ou annuler une commande ?', '¿Puedo modificar o cancelar un pedido?'],
    'Yes — if the order has not yet been dispatched, we can update or cancel it as long as the request is made promptly.': ['Da. Dacă nu a fost expediată, putem modifica sau anula comanda la timp.', 'Oui. Tant qu’elle n’est pas expédiée, nous pouvons la modifier ou l’annuler rapidement.', 'Sí. Si aún no se ha enviado, podemos modificar o cancelar el pedido a tiempo.'],
    'Find your fit': ['Găsește cafeaua potrivită', 'Trouvez votre café', 'Encuentra tu café ideal'],
    'Choose by flavor, roast and ritual.': ['Alege după aromă, prăjire și ritual.', 'Choisissez selon les arômes, la torréfaction et le rituel.', 'Elige según el sabor, el tueste y tu ritual.'],
    'Our guide helps narrow the field: if you love floral cups, seek lighter roasts; if you love comfort, reach for sweeter, full-bodied profiles.': ['Ghidul te ajută să alegi: pentru note florale caută prăjiri deschise, iar pentru o cafea reconfortantă alege profiluri dulci și corpolente.', 'Notre guide vous aide à choisir : torréfactions claires pour les notes florales, profils doux et corsés pour plus de réconfort.', 'Nuestra guía te ayuda a elegir: tuestes claros para notas florales y perfiles dulces y con cuerpo para disfrutar.'],
    'Floral & bright': ['Florală și luminoasă', 'Florale et vive', 'Floral y brillante'],
    'Look for light roasts, citrus acidity and floral aromatics with soft sweetness.': ['Alege prăjiri deschise, aciditate citrică și arome florale, cu dulceață delicată.', 'Choisissez une torréfaction claire, une acidité citronnée et des notes florales délicatement douces.', 'Busca tuestes claros, acidez cítrica y aromas florales con un dulzor suave.'],
    'Sweet & balanced': ['Dulce și echilibrată', 'Douce et équilibrée', 'Dulce y equilibrado'],
    'Choose medium roasts with caramel, cocoa and a rounded, easy-drinking finish.': ['Alege prăjiri medii, cu note de caramel și cacao și un final rotund.', 'Optez pour une torréfaction moyenne, des notes de caramel et de cacao et une finale ronde.', 'Elige tuestes medios, con caramelo, cacao y un final redondo y agradable.'],
    'Choose the coffee that matches your ritual.': ['Alege cafeaua potrivită ritualului tău.', 'Choisissez le café qui accompagne votre rituel.', 'Elige el café que acompaña tu ritual.'],
    'Each collection is designed around a different cup experience: luminous mornings, intimate espresso moments, rare discoveries and thoughtful gifting.': ['Fiecare colecție oferă o experiență aparte: dimineți luminoase, momente espresso, descoperiri rare și cadouri atent alese.', 'Chaque collection propose une expérience unique : matins lumineux, pauses espresso, découvertes rares et cadeaux choisis avec soin.', 'Cada colección ofrece una experiencia distinta: mañanas luminosas, momentos espresso, hallazgos excepcionales y regalos especiales.'],
    'Stories from the atelier.': ['Povești din atelier.', 'Histoires de l’atelier.', 'Historias del taller.'],
    'Insights on selected origins, roast clarity, brewing methods and the small details that make coffee feel extraordinary.': ['Perspective despre origini, prăjire, metode de preparare și detaliile care fac cafeaua specială.', 'Regards sur les origines, la torréfaction, les méthodes d’extraction et les détails qui rendent le café exceptionnel.', 'Ideas sobre orígenes, tueste, métodos de preparación y detalles que hacen especial cada café.'],
    'How to choose your daily coffee': ['Cum alegi cafeaua de zi cu zi', 'Comment choisir votre café quotidien', 'Cómo elegir tu café diario'],
    'Start with flavor, body and routine. Then let the origin handle the rest.': ['Pornește de la aromă, corp și rutină. Apoi descoperă originea potrivită.', 'Commencez par les arômes, le corps et vos habitudes. Laissez ensuite l’origine vous surprendre.', 'Empieza por el sabor, el cuerpo y tu rutina. Después, descubre el origen ideal.'],
    'Roast clarity and sweetness': ['Claritatea și dulceața prăjirii', 'La clarté et la douceur de la torréfaction', 'Claridad y dulzor del tueste'],
    'A well-tuned roast is what lets a coffee be expressive without becoming noisy.': ['O prăjire bine controlată lasă cafeaua să-și exprime caracterul cu echilibru.', 'Une torréfaction maîtrisée révèle le caractère du café sans masquer ses nuances.', 'Un tueste bien calibrado revela el carácter del café sin ocultar sus matices.'],
    'A private philosophy': ['O filosofie aparte', 'Une philosophie singulière', 'Una filosofía propia'],
    'We believe coffee should be memorable.': ['Credem că o cafea trebuie să fie memorabilă.', 'Nous pensons qu’un café doit être mémorable.', 'Creemos que el café debe dejar huella.'],
    'Coffee Trip was built around the idea that premium coffee should feel personal, serene and deeply pleasurable — like a ritual worth returning to each day.': ['Coffee Trip pornește de la convingerea că o cafea premium trebuie să fie personală, liniștită și plină de savoare — un ritual la care revii cu drag.', 'Coffee Trip est né de l’idée qu’un café premium doit être personnel, apaisant et profondément savoureux — un rituel auquel on revient.', 'Coffee Trip nació de la idea de que un café prémium debe ser personal, sereno y placentero: un ritual al que apetece volver.'],
    'Rooted in craft': ['Ancorată în măiestrie', 'Ancrée dans le savoir-faire', 'Arraigada en el oficio'],
    'We work with coffee as a craft, not a commodity — selecting lots with nuance, clarity and expressive flavor.': ['Tratăm cafeaua ca pe o măiestrie, nu ca pe o marfă, și alegem loturi cu nuanțe și gust expresiv.', 'Nous considérons le café comme un savoir-faire, pas comme une marchandise, et sélectionnons des lots nuancés et expressifs.', 'Entendemos el café como un oficio, no como una mercancía, y elegimos lotes expresivos y llenos de matices.'],
    'Designed for ritual': ['Creată pentru ritual', 'Pensée pour le rituel', 'Diseñada para el ritual'],
    'Every coffee is chosen to fit an intentional routine: a peaceful morning, an espresso pause, a shared moment.': ['Fiecare cafea se potrivește unui ritual: o dimineață liniștită, o pauză de espresso sau un moment împărtășit.', 'Chaque café accompagne un rituel choisi : un matin paisible, une pause espresso ou un moment partagé.', 'Cada café acompaña un ritual: una mañana tranquila, una pausa espresso o un momento compartido.'],
    'Wishlist still empty': ['Lista de favorite este goală', 'Votre liste de favoris est vide', 'Tu lista de favoritos está vacía'],
    'Save a few coffees and keep them close for later.': ['Adaugă câteva cafele pentru a le regăsi mai târziu.', 'Ajoutez quelques cafés pour les retrouver plus tard.', 'Guarda algunos cafés para volver a ellos más tarde.'],
    'Shipping is free.': ['Livrarea este gratuită.', 'La livraison est offerte.', 'El envío es gratuito.'],
    'Add {amount} for free shipping.': ['Mai adaugă {amount} pentru livrare gratuită.', 'Ajoutez {amount} pour bénéficier de la livraison offerte.', 'Añade {amount} para obtener envío gratuito.'],
    'No favorites yet.': ['Încă nu ai favorite.', 'Vous n’avez pas encore de favoris.', 'Aún no tienes favoritos.'],
    'Save the products you love here.': ['Salvează aici produsele care îți plac.', 'Enregistrez ici les produits qui vous plaisent.', 'Guarda aquí los productos que te gustan.'],
    'Remove from wishlist': ['Elimină din favorite', 'Retirer des favoris', 'Eliminar de favoritos'],
    'Demo order {code} placed successfully. In a real store, order processing and delivery notifications would start here.': ['Comanda demo {code} a fost înregistrată. Într-un magazin real, aici ar începe procesarea și notificările de livrare.', 'La commande de démonstration {code} est enregistrée. Dans une vraie boutique, le traitement et les notifications de livraison commenceraient ici.', 'El pedido de demostración {code} se ha registrado. En una tienda real, aquí comenzarían el procesamiento y las notificaciones de envío.'],
    'Thank you. In a real store, this address would be added to the newsletter.': ['Mulțumim. Într-un magazin real, adresa ar fi adăugată la newsletter.', 'Merci. Dans une vraie boutique, cette adresse serait ajoutée à la newsletter.', 'Gracias. En una tienda real, esta dirección se añadiría al boletín.'],
    'Easy to brew, easier to love.': ['Ușor de preparat, ușor de îndrăgit.', 'Facile à préparer, facile à aimer.', 'Fácil de preparar, fácil de disfrutar.'],
    'Curated for every ritual.': ['Selectată pentru fiecare ritual.', 'Sélectionnée pour chaque rituel.', 'Seleccionado para cada ritual.'],
    'All Coffee': ['Toată cafeaua', 'Tous les cafés', 'Todo el café'],
    'Coffee origins': ['Origini de cafea', 'Origines des cafés', 'Orígenes del café'],
    'For collectors, not just drinkers.': ['Pentru colecționari, nu doar pentru degustători.', 'Pour les collectionneurs, pas seulement les amateurs.', 'Para coleccionistas, no solo para amantes del café.'],
    'These coffees are chosen for micro-lot character, fragile aromatics and unforgettable tasting notes — best enjoyed slowly and thoughtfully.': ['Aceste cafele sunt alese pentru caracterul loturilor mici, aromele delicate și notele memorabile; savurează-le pe îndelete.', 'Ces cafés se distinguent par leurs micro-lots, leurs arômes délicats et leurs notes inoubliables ; dégustez-les lentement.', 'Estos cafés destacan por sus microlotes, aromas delicados y notas inolvidables; disfrútalos sin prisa.'],
    'Limited release': ['Ediție limitată', 'Édition limitée', 'Edición limitada'],
    'Extraordinary coffees from elite producers and extraordinary terroirs.': ['Cafele excepționale de la producători remarcabili și terroir-uri aparte.', 'Des cafés remarquables issus de producteurs d’exception et de terroirs uniques.', 'Cafés extraordinarios de productores excepcionales y terroirs singulares.'],
    'Each coffee is selected for provenance, precision and rarity to preserve its natural complexity.': ['Fiecare cafea este aleasă pentru origine, precizie și raritate, păstrându-și complexitatea naturală.', 'Chaque café est choisi pour son origine, sa précision et sa rareté, afin de préserver sa complexité naturelle.', 'Cada café se elige por su origen, precisión y rareza para preservar su complejidad natural.'],
    'Crafted for harmony': ['Creat pentru armonie', 'Créé pour l’harmonie', 'Creado para la armonía'],
    'Balanced blends. Instant comfort.': ['Blenduri echilibrate. Răsfăț instant.', 'Des assemblages équilibrés. Un réconfort immédiat.', 'Mezclas equilibradas. Placer inmediato.'],
    'Signature blends combine origin character with harmony in the cup. The result is a polished profile that feels approachable, layered and refined.': ['Blendurile Signature îmbină caracterul originii cu armonia din ceașcă, pentru un profil rafinat, accesibil și complex.', 'Les assemblages Signature allient le caractère des origines à l’harmonie en tasse, pour un profil accessible et raffiné.', 'Las mezclas Signature combinan el carácter del origen con la armonía en taza, en un perfil accesible y refinado.'],
    'Built around caramel, honey and cocoa for a warm, rewarding cup.': ['Cu note de caramel, miere și cacao, pentru o ceașcă reconfortantă.', 'Des notes de caramel, de miel et de cacao pour une tasse généreuse.', 'Con caramelo, miel y cacao para una taza reconfortante.'],
    'Origin pairings bring brightness, softness and texture in equal measure.': ['Asocierile de origini aduc prospețime, delicatețe și textură în echilibru.', 'Les assemblages d’origines apportent fraîcheur, douceur et texture en équilibre.', 'Las mezclas de orígenes aportan frescura, suavidad y textura en equilibrio.'],
    'Designed to excel in daily brewing, espresso service and slow weekend mornings.': ['Create pentru cafeaua de zi cu zi, espresso și dimineți tihnite de weekend.', 'Pensés pour le café quotidien, l’espresso et les matins tranquilles du week-end.', 'Ideales para el café diario, el espresso y las mañanas tranquilas del fin de semana.'],
    'Informații comerciale': ['Commercial information', 'Informations commerciales', 'Información comercial'],
    'Termeni clari pentru o experiență sigură și transparentă.': ['Clear terms for a safe and transparent experience.', 'Des conditions claires pour une expérience sûre et transparente.', 'Condiciones claras para una experiencia segura y transparente.'],
    'Termeni și condiții': ['Terms and conditions', 'Conditions générales', 'Términos y condiciones'],
    'F.E. Coffee Trip S.R.L. comercializează cafea de specialitate prin acest magazin demonstrativ. Comenzile sunt confirmate prin numărul generat la finalizare. Prețurile afișate includ TVA. Furnizarea este valabilă în limita stocului disponibil.': ['F.E. Coffee Trip S.R.L. sells specialty coffee through this demonstration store. Orders are confirmed with the number generated at checkout. Prices include VAT. Supply is subject to availability.', 'F.E. Coffee Trip S.R.L. vend du café de spécialité dans cette boutique de démonstration. Les commandes sont confirmées par le numéro généré lors du paiement. Les prix incluent la TVA. Dans la limite des stocks disponibles.', 'F.E. Coffee Trip S.R.L. comercializa café de especialidad en esta tienda de demostración. Los pedidos se confirman con el número generado al finalizar la compra. Los precios incluyen IVA. Sujeto a disponibilidad.'],
    'Plată și livrare': ['Payment and delivery', 'Paiement et livraison', 'Pago y envío'],
    'Acceptăm plata cu cardul simulată și plata ramburs. Livrarea este gratuită pentru comenzi de minim 150 LEI; în rest costul este de 15 LEI. Comanda este pregătită în maximum 24 de ore și expediată în 1–3 zile lucrătoare.': ['We accept simulated card payments and cash on delivery. Shipping is free for orders over 150 RON; otherwise, it costs 15 RON. Orders are prepared within 24 hours and shipped in 1–3 business days.', 'Nous acceptons les paiements par carte simulés et le paiement à la livraison. Livraison offerte dès 150 RON, sinon 15 RON. Les commandes sont préparées sous 24 heures et expédiées sous 1 à 3 jours ouvrés.', 'Aceptamos pagos simulados con tarjeta y contra reembolso. Envío gratuito en pedidos desde 150 RON; en caso contrario, cuesta 15 RON. Los pedidos se preparan en 24 horas y se envían en 1–3 días laborables.'],
    'Politica de retur': ['Return policy', 'Politique de retour', 'Política de devoluciones'],
    'Produsul alimentare sigilat poate fi returnat în maximum 14 zile de la livrare, cu factura și ambalajul intact. Pentru deteriorări la transport sau produs incompatibil, contactați-ne în 48 de ore la hello@coffeetrip.ro.': ['Sealed food products may be returned within 14 days of delivery with the receipt and intact packaging. Please contact hello@coffeetrip.ro within 48 hours for shipping damage or an unsuitable product.', 'Les produits alimentaires scellés peuvent être retournés sous 14 jours, avec facture et emballage intact. En cas de dommage ou de produit non conforme, contactez hello@coffeetrip.ro sous 48 heures.', 'Los productos alimentarios sellados pueden devolverse en un plazo de 14 días, con factura y embalaje intacto. Para daños o productos no conformes, contacta con hello@coffeetrip.ro en 48 horas.'],
    'Politica GDPR': ['Privacy policy', 'Politique de confidentialité', 'Política de privacidad'],
    'Procesăm datele de comandă și contact exclusiv pentru livrare și suport. Datele nu sunt vândute terților. Aveți dreptul de acces, rectificare și ștergere, scriind la privacy@coffeetrip.ro. Site-ul permite abonarea voluntară la newsletter.': ['We process order and contact details only for delivery and support. Data is never sold. You may request access, correction or deletion at privacy@coffeetrip.ro. Newsletter subscriptions are optional.', 'Nous traitons les données de commande et de contact uniquement pour la livraison et l’assistance. Elles ne sont jamais vendues. Vous pouvez demander leur accès, rectification ou suppression à privacy@coffeetrip.ro. L’inscription à la newsletter est facultative.', 'Tratamos los datos de pedidos y contacto únicamente para envíos y asistencia. No se venden a terceros. Puedes solicitar acceso, rectificación o eliminación en privacy@coffeetrip.ro. La suscripción al boletín es voluntaria.'],
    'Cafeaua ta. Ritualul tău.': ['Your coffee. Your ritual.', 'Votre café. Votre rituel.', 'Tu café. Tu ritual.'],
    'Your coffee. Your ritual.': ['Cafeaua ta. Ritualul tău.', 'Votre café. Votre rituel.', 'Tu café. Tu ritual.'],
    'Shipping & orders': ['Livrare și comenzi', 'Livraison et commandes', 'Envíos y pedidos'],
    'Legal': ['Legal', 'Mentions légales', 'Legal'],
    'Complimentary delivery': ['Livrare gratuită', 'Livraison offerte', 'Envío gratuito'],
    'Privacy': ['Confidențialitate', 'Confidentialité', 'Privacidad'],
    'Terms': ['Termeni', 'Conditions', 'Términos'],
    'Cookies': ['Cookie-uri', 'Cookies', 'Cookies'],
    'OPEN NAVIGATION': ['DESCHIDE MENIUL', 'OUVRIR LE MENU', 'ABRIR MENÚ'],
    'Close': ['Închide', 'Fermer', 'Cerrar'],
    'Acțiunea a fost finalizată.': ['Action completed.', 'Action terminée.', 'Acción completada.'],
    'Selectează limba': ['Select language', 'Choisir la langue', 'Elegir idioma'],
    'Coșul tău': ['Your cart', 'Votre panier', 'Tu carrito'],
    'Available at order confirmation': ['Disponibil la confirmarea comenzii', 'Disponible à la confirmation de la commande', 'Disponible al confirmar el pedido'],
    'reviews': ['recenzii', 'avis', 'reseñas'],
    'Open navigation': ['Deschide meniul', 'Ouvrir le menu', 'Abrir menú'],
    'Coffee finder': ['Ghid de cafea', 'Découverte du café', 'Buscador de café'],
    'Type to explore products.': ['Tastează pentru a explora produsele.', 'Saisissez un terme pour découvrir les produits.', 'Escribe para explorar los productos.'],
    'Find your coffee': ['Găsește cafeaua potrivită', 'Trouvez votre café', 'Encuentra tu café'],
    'Start shopping': ['Începe cumpărăturile', 'Commencer vos achats', 'Empezar a comprar'],
    'Newsletter': ['Buletin informativ', 'Newsletter', 'Boletín informativo'],
    'Subscribe': ['Abonează-te', 'S’abonner', 'Suscribirse'],
    'Subscribe to our newsletter': ['Abonează-te la newsletter', 'Inscrivez-vous à notre newsletter', 'Suscríbete al boletín'],
    'Explore collection →': ['Explorează colecția →', 'Découvrir la collection →', 'Explorar la colección →'],
    'Explore collection': ['Explorează colecția', 'Découvrir la collection', 'Explorar la colección'],
    'View all': ['Vezi toate', 'Tout voir', 'Ver todo'],
    'Checkout': ['Finalizare comandă', 'Paiement', 'Pagar'],
    'Review your order': ['Verifică comanda', 'Vérifier la commande', 'Revisar el pedido'],
    'Close search': ['Închide căutarea', 'Fermer la recherche', 'Cerrar la búsqueda'],
    'Close drawer': ['Închide panoul', 'Fermer le panneau', 'Cerrar el panel'],
    'My account': ['Contul meu', 'Mon compte', 'Mi cuenta'],
    'Product image': ['Imagine produs', 'Image du produit', 'Imagen del producto'],
    'Thumbnail': ['Miniatură', 'Vignette', 'Miniatura'],
    'Meniu': ['Menu', 'Menu', 'Menú'],
    'Caută': ['Search', 'Rechercher', 'Buscar'],
    'Coș': ['Cart', 'Panier', 'Carrito'],
    'Coffee concierge': ['Consultant de cafea', 'Conseiller café', 'Asesor de café'],
    'Cu ce cafea începem?': ['Where shall we start?', 'Par quel café commencer ?', '¿Con qué café empezamos?'],
    'Spune-mi ce gusturi îți plac și îți recomand ceva potrivit.': ['Tell me what flavors you enjoy and I’ll find a coffee for you.', 'Dites-moi quels goûts vous aimez et je vous conseillerai un café.', 'Cuéntame qué sabores te gustan y te recomendaré un café.'],
    'Scrie-i Baristei...': ['Message the barista...', 'Écrivez au barista...', 'Escribe al barista...'],
    'Fuzzy matching active • Client-side NLP': ['Smart matching active • Client-side NLP', 'Correspondance intelligente • NLP côté client', 'Coincidencia inteligente • PLN en el navegador'],
    'ONLINE • READY TO BREW': ['ONLINE • READY TO BREW', 'EN LIGNE • PRÊT À PRÉPARER', 'EN LÍNEA • LISTO PARA PREPARAR'],
    'Close chat': ['Închide conversația', 'Fermer la conversation', 'Cerrar conversación'],
    'DETAILS AT CONFIRMATION': ['DETALII LA CONFIRMARE', 'DÉTAILS À LA CONFIRMATION', 'DETALLES AL CONFIRMAR'],
    'ROASTED WITH INTENTION': ['PRĂJITĂ CU GRIJĂ', 'TORRÉFIÉ AVEC SOIN', 'TOSTADO CON INTENCIÓN'],
    'PRIVATE COFFEE ATELIER': ['ATELIER PRIVAT DE CAFEA', 'ATELIER DE CAFÉ PRIVÉ', 'ATELIER PRIVADO DE CAFÉ'],
    'EXPLOREAZĂ COLECȚIA': ['EXPLORE THE COLLECTION', 'DÉCOUVRIR LA COLLECTION', 'EXPLORAR LA COLECCIÓN'],
    'DESCOPERĂ POVESTEA': ['DISCOVER OUR STORY', 'DÉCOUVRIR NOTRE HISTOIRE', 'DESCUBRIR NUESTRA HISTORIA'],
    'FILTREAZĂ +': ['FILTER +', 'FILTRER +', 'FILTRAR +'],
    'TOATE': ['ALL', 'TOUT', 'TODOS'],
    'CURATED': ['SELECTAT', 'SÉLECTIONNÉ', 'SELECCIONADO'],
    'Selecții extraordinare': ['Exceptional selections', 'Sélections exceptionnelles', 'Selecciones excepcionales'],
    'DESCOPERĂ FIECARE ORIGINE.': ['DISCOVER EVERY ORIGIN.', 'DÉCOUVREZ CHAQUE ORIGINE.', 'DESCUBRE CADA ORIGEN.'],
    'GĂSEȘTE-ȚI RITUALUL.': ['FIND YOUR RITUAL.', 'TROUVEZ VOTRE RITUEL.', 'ENCUENTRA TU RITUAL.']
  };
  const pages = {
    'index.html': ['Coffee Trip — Arta cafelei excepționale', 'Coffee Trip — The Art of Exceptional Coffee', 'Coffee Trip — L’art du café d’exception', 'Coffee Trip — El arte del café excepcional'],
    'shop.html': ['Magazin | Coffee Trip', 'Shop | Coffee Trip', 'Boutique | Coffee Trip', 'Tienda | Coffee Trip'],
    'coffee.html': ['Cafea | Coffee Trip', 'Coffee | Coffee Trip', 'Café | Coffee Trip', 'Café | Coffee Trip'],
    'rare-coffee.html': ['Cafea rară | Coffee Trip', 'Rare Coffee | Coffee Trip', 'Café rare | Coffee Trip', 'Café raro | Coffee Trip'],
    'espresso.html': ['Espresso | Coffee Trip', 'Espresso | Coffee Trip', 'Espresso | Coffee Trip', 'Espresso | Coffee Trip'],
    'signature-blends.html': ['Blenduri Signature | Coffee Trip', 'Signature Blends | Coffee Trip', 'Assemblages Signature | Coffee Trip', 'Mezclas Signature | Coffee Trip'],
    'collections.html': ['Colecții | Coffee Trip', 'Collections | Coffee Trip', 'Collections | Coffee Trip', 'Colecciones | Coffee Trip'],
    'atelier.html': ['Atelier | Coffee Trip', 'Atelier | Coffee Trip', 'Atelier | Coffee Trip', 'Atelier | Coffee Trip'],
    'journal.html': ['Jurnal | Coffee Trip', 'Journal | Coffee Trip', 'Journal | Coffee Trip', 'Diario | Coffee Trip'],
    'guide.html': ['Ghid | Coffee Trip', 'Guide | Coffee Trip', 'Guide | Coffee Trip', 'Guía | Coffee Trip'],
    'story.html': ['Povestea noastră | Coffee Trip', 'Story | Coffee Trip', 'Notre histoire | Coffee Trip', 'Nuestra historia | Coffee Trip'],
    'contact.html': ['Contact | Coffee Trip', 'Contact | Coffee Trip', 'Contact | Coffee Trip', 'Contacto | Coffee Trip'],
    'faq.html': ['Întrebări frecvente | Coffee Trip', 'FAQ | Coffee Trip', 'FAQ | Coffee Trip', 'Preguntas frecuentes | Coffee Trip'],
    'account.html': ['Cont | Coffee Trip', 'Account | Coffee Trip', 'Compte | Coffee Trip', 'Cuenta | Coffee Trip'],
    'cart.html': ['Coș | Coffee Trip', 'Cart | Coffee Trip', 'Panier | Coffee Trip', 'Carrito | Coffee Trip'],
    'checkout.html': ['Finalizare comandă | Coffee Trip', 'Checkout | Coffee Trip', 'Paiement | Coffee Trip', 'Pago | Coffee Trip'],
    'wishlist.html': ['Favorite | Coffee Trip', 'Wishlist | Coffee Trip', 'Favoris | Coffee Trip', 'Favoritos | Coffee Trip'],
    'product.html': ['Produs | Coffee Trip', 'Product | Coffee Trip', 'Produit | Coffee Trip', 'Producto | Coffee Trip'],
    '404.html': ['Pagina nu a fost găsită | Coffee Trip', 'Page Not Found | Coffee Trip', 'Page introuvable | Coffee Trip', 'Página no encontrada | Coffee Trip'],
    'policies.html': ['Termeni și politici | Coffee Trip', 'Terms & policies | Coffee Trip', 'Conditions et politiques | Coffee Trip', 'Términos y políticas | Coffee Trip']
  };
  const categoryTranslations = {
    'Cafea de Origine': ['Cafea de Origine', 'Single-origin coffee', 'Café de terroir', 'Café de origen'],
    'Cafea Rară': ['Cafea Rară', 'Rare coffee', 'Café rare', 'Café raro'],
    'Blenduri de Cafea': ['Blenduri de Cafea', 'Coffee blends', 'Assemblages de café', 'Mezclas de café'],
    'Ceaiuri Premium': ['Ceaiuri Premium', 'Premium teas', 'Thés premium', 'Tés premium'],
    'Mirodenii & Condimente': ['Mirodenii & Condimente', 'Spices & seasonings', 'Épices et assaisonnements', 'Especias y condimentos'],
    'Siropuri Artizanale': ['Siropuri Artizanale', 'Artisan syrups', 'Sirops artisanaux', 'Sirope artesanal'],
    'Accesorii & Consumabile': ['Accesorii & Consumabile', 'Accessories & consumables', 'Accessoires et consommables', 'Accesorios y consumibles']
  };
  const countryTranslations = {
    'Etiopia': ['Etiopia', 'Ethiopia', 'Éthiopie', 'Etiopía'],
    'Brazilia': ['Brazilia', 'Brazil', 'Brésil', 'Brasil'],
    'Columbia': ['Columbia', 'Colombia', 'Colombie', 'Colombia'],
    'Costa Rica': ['Costa Rica', 'Costa Rica', 'Costa Rica', 'Costa Rica'],
    'Sumatra': ['Sumatra', 'Sumatra', 'Sumatra', 'Sumatra'],
    'Kenya': ['Kenya', 'Kenya', 'Kenya', 'Kenia'],
    'Guatemala': ['Guatemala', 'Guatemala', 'Guatemala', 'Guatemala'],
    'Panama': ['Panama', 'Panama', 'Panama', 'Panamá'],
    'Jamaica': ['Jamaica', 'Jamaica', 'Jamaïque', 'Jamaica'],
    'Hawaii': ['Hawaii', 'Hawaii', 'Hawaï', 'Hawái'],
    'Honduras': ['Honduras', 'Honduras', 'Honduras', 'Honduras'],
    'Burundi': ['Burundi', 'Burundi', 'Burundi', 'Burundi'],
    'Tanzania': ['Tanzania', 'Tanzania', 'Tanzanie', 'Tanzania'],
    'Peru': ['Peru', 'Peru', 'Pérou', 'Perú'],
    'India': ['India', 'India', 'Inde', 'India'],
    'Ceaiuri Premium': ['Ceaiuri Premium', 'Premium teas', 'Thés premium', 'Tés premium'],
    'Mirodenii & Condimente': ['Mirodenii & Condimente', 'Spices & seasonings', 'Épices et assaisonnements', 'Especias y condimentos'],
    'Siropuri Artizanale': ['Siropuri Artizanale', 'Artisan syrups', 'Sirops artisanaux', 'Sirope artesanal'],
    'Accesorii & Consumabile': ['Accesorii & Consumabile', 'Accessories & consumables', 'Accessoires et consommables', 'Accesorios y consumibles']
  };
  const romanianSources = new Set([
    'Acasă', 'Colecția', 'Cafea', 'Cafea rară', 'Blenduri', 'Jurnal', 'Cafea de Origine',
    'Cafea Rară', 'Blenduri de Cafea', 'Ceaiuri Premium', 'Mirodenii & Condimente',
    'Siropuri Artizanale', 'Accesorii & Consumabile', 'Adăugat în coș',
    'Eliminat din favorite', 'Adăugat la favorite', 'Coșul este gol.',
    'Favoritele tale', 'Favorite', 'Încă nu ai adăugat nimic.', 'Vezi produsul',
    'Înapoi la magazin', 'Adaugă în coș', 'Caută în colecție', 'Favorite', 'Meniu', 'Caută', 'Coș',
    'Toate produsele', 'Preț estimativ', 'produse', 'TOATE',
    'Favorite', 'Loturi mici. Origini rare. Profile de gust memorabile.'
  ]);
  const translations = { ro: {}, en: {}, fr: {}, es: {} };
  Object.entries(phraseTranslations).forEach(([source, values]) => {
    const sourceIsRomanian = romanianSources.has(source) || /[ăâîșțĂÂÎȘȚ]/.test(source);
    if (sourceIsRomanian) {
      translations.ro[source] = source;
      translations.en[source] = values[0];
      translations.fr[source] = values[1];
      translations.es[source] = values[2];
    } else {
      translations.ro[source] = values[0];
      translations.en[source] = source;
      translations.fr[source] = values[1];
      translations.es[source] = values[2];
    }
  });
  const phraseKeys = Object.keys(phraseTranslations)
    .filter((source) => source.length >= 14 && source.includes(' '))
    .sort((a, b) => b.length - a.length);
  let current = supported.includes(localStorage.getItem(STORAGE_KEY))
    ? localStorage.getItem(STORAGE_KEY)
    : 'ro';
  const originalText = new WeakMap();
  const originalAttributes = new WeakMap();
  const listeners = new Set();
  const localeIndex = () => supported.indexOf(current);
  const legacyDecoder = new TextDecoder('windows-1250');
  const utf8Decoder = new TextDecoder('utf-8');
  const legacyBytes = new Map();
  for (let byte = 0; byte < 256; byte += 1) {
    legacyBytes.set(legacyDecoder.decode(new Uint8Array([byte])), byte);
  }

  function repairLegacyMojibake(value) {
    return value.replace(/[^\x00-\x7F]+/g, (run) => {
      const bytes = [];
      for (const character of run) {
        const byte = legacyBytes.get(character);
        if (byte === undefined) {
          if (character.charCodeAt(0) > 255) return run;
          bytes.push(character.charCodeAt(0));
        } else {
          bytes.push(byte);
        }
      }
      const repaired = utf8Decoder.decode(new Uint8Array(bytes));
      return repaired === run || repaired.includes('\uFFFD') ? run : repaired;
    });
  }

  function translate(value) {
    value = repairLegacyMojibake(value);
    const normalized = value.replace(/\s+/g, ' ').trim();
    const direct = translations[current][normalized] || translations[current][value];
    if (direct) return direct;
    return phraseKeys.reduce((result, source) => {
      const localized = translations[current][source];
      if (!localized || localized === source) return result;
      return result.replace(new RegExp(source.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'), localized);
    }, normalized);
  }

  function translateTextNode(node) {
    if (!originalText.has(node)) originalText.set(node, repairLegacyMojibake(node.nodeValue));
    const source = originalText.get(node);
    const trimmed = source.trim();
    if (!trimmed) return;
    const leading = source.match(/^\s*/)[0];
    const trailing = source.match(/\s*$/)[0];
    node.nodeValue = `${leading}${translate(trimmed)}${trailing}`;
  }

  function translateElement(element) {
    if (element.matches('script, style, noscript, .language-switcher')) return;
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        return node.parentElement.closest('script, style, noscript, .language-switcher')
          ? NodeFilter.FILTER_REJECT
          : NodeFilter.FILTER_ACCEPT;
      }
    });
    let node;
    while ((node = walker.nextNode())) translateTextNode(node);

    const attributeTargets = [element, ...element.querySelectorAll('[placeholder], [aria-label], [title], [alt], [data-chat-suggestion]')];
    attributeTargets.forEach((target) => {
      if (target.closest('script, style, noscript, .language-switcher')) return;
      ['placeholder', 'aria-label', 'title', 'alt', 'data-chat-suggestion'].forEach((attribute) => {
        if (!target.hasAttribute(attribute)) return;
        if (!originalAttributes.has(target)) originalAttributes.set(target, {});
        const saved = originalAttributes.get(target);
        if (!(attribute in saved)) saved[attribute] = repairLegacyMojibake(target.getAttribute(attribute));
        target.setAttribute(attribute, translate(saved[attribute]));
      });
    });
  }

  function localizedProduct(product) {
    const result = { ...product };
    const index = localeIndex();
    result.name = result.name.replace(/\(([^()]*)\)/g, (match, packaging) => `(${translateProductText(packaging)})`);
    if (categoryTranslations[result.category]) result.category = categoryTranslations[result.category][index];
    if (countryTranslations[result.origin]) result.origin = countryTranslations[result.origin][index];
    const labels = {
      Light: ['Light', 'Light', 'Légère', 'Ligero'],
      Medium: ['Medium', 'Medium', 'Moyenne', 'Medio'],
      'Medium-Light': ['Medium-Light', 'Medium-Light', 'Moyenne légère', 'Medio ligero'],
      'Medium-Dark': ['Medium-Dark', 'Medium-Dark', 'Moyenne foncée', 'Medio oscuro'],
      Dark: ['Dark', 'Dark', 'Foncée', 'Oscuro'],
      Silky: ['Mătăsos', 'Silky', 'Soyeux', 'Sedoso'],
      Round: ['Rotund', 'Round', 'Rond', 'Redondo'],
      Full: ['Plin', 'Full', 'Corsé', 'Intenso'],
      Balanced: ['Echilibrat', 'Balanced', 'Équilibré', 'Equilibrado'],
      Smooth: ['Catifelat', 'Smooth', 'Velouté', 'Sedoso'],
      Dense: ['Dens', 'Dense', 'Dense', 'Denso'],
      Crisp: ['Vibrant', 'Crisp', 'Vif', 'Vivo'],
      'High': ['Ridicată', 'High', 'Élevée', 'Alta'],
      'Low': ['Scăzută', 'Low', 'Faible', 'Baja'],
      'N/A': ['N/A', 'N/A', 'N/A', 'N/A']
    };
    ['roast', 'body', 'acidity', 'sweetness'].forEach((key) => {
      if (labels[result[key]]) result[key] = labels[result[key]][index];
    });
    result.specifications = translateProductText(result.specifications || '');
    result.description = translateProductText(result.description || '');
    result.weight = translateProductText(result.weight || '');
    result.notes = (result.notes || []).map(translateProductText);
    result.flavor = translateProductText(result.flavor || '');
    result.badge = translateProductText(result.badge || '');
    return result;
  }

  function translateProductText(source) {
    const terms = {
      'Boabe întregi': ['Boabe întregi', 'Whole beans', 'Grains entiers', 'Granos enteros'],
      'Boabe': ['Boabe', 'Whole beans', 'Grains entiers', 'Granos enteros'],
      'Pungă': ['Pungă', 'Bag', 'Sachet', 'Bolsa'],
      'Cutie': ['Cutie', 'Tin', 'Boîte', 'Caja'],
      'Sticlă': ['Sticlă', 'Bottle', 'Bouteille', 'Botella'],
      'Flacon': ['Flacon', 'Bottle', 'Flacon', 'Botella'],
      'Set': ['Set', 'Set', 'Lot', 'Juego'],
      'Tub': ['Tub', 'Tube', 'Tube', 'Tubo'],
      'Bucată': ['Bucată', 'Piece', 'Pièce', 'Unidad'],
      'bucăți': ['bucăți', 'pieces', 'pièces', 'unidades'],
      'păstăi': ['păstăi', 'pods', 'gousses', 'vainas'],
      'Note florale': ['Note florale', 'Floral notes', 'Notes florales', 'Notas florales'],
      'Note de ciocolată': ['Note de ciocolată', 'Chocolate notes', 'Notes chocolatées', 'Notas de chocolate'],
      'Note de fructe de pădure': ['Note de fructe de pădure', 'Berry notes', 'Notes de fruits rouges', 'Notas de frutos del bosque'],
      'Note de cacao': ['Note de cacao', 'Cocoa notes', 'Notes de cacao', 'Notas de cacao'],
      'Note de caramel și prune': ['Note de caramel și prune', 'Caramel and plum notes', 'Notes de caramel et de prune', 'Notas de caramelo y ciruela'],
      'Note de coacăze roșii': ['Note de coacăze roșii', 'Redcurrant notes', 'Notes de groseille', 'Notas de grosella'],
      'Note de nuci și miere': ['Note de nuci și miere', 'Nut and honey notes', 'Notes de noix et de miel', 'Notas de nueces y miel'],
      'note florale ușor acrișor': ['note florale ușor acrișor', 'lightly tart floral notes', 'notes florales légèrement acidulées', 'notas florales ligeramente ácidas'],
      'Aciditate medie': ['Aciditate medie', 'Medium acidity', 'Acidité moyenne', 'Acidez media'],
      'Note de fructe': ['Note de fructe', 'Fruity notes', 'Notes fruitées', 'Notas afrutadas'],
      'Corp plin': ['Corp plin', 'Full body', 'Corps généreux', 'Cuerpo intenso'],
      'pământiu': ['pământiu', 'earthy', 'terreux', 'terroso'],
      'Echilibrată': ['Echilibrată', 'Balanced', 'Équilibré', 'Equilibrado'],
      'Prăjire intensă': ['Prăjire intensă', 'Dark roast', 'Torréfaction intense', 'Tueste intenso'],
      'Prăjire medie': ['Prăjire medie', 'Medium roast', 'Torréfaction moyenne', 'Tueste medio'],
      'Măcinată ideal': ['Măcinată ideal', 'Ground for moka', 'Mouture idéale', 'Molido ideal'],
      'Decafeinizată natural': ['Decafeinizată natural', 'Naturally decaffeinated', 'Décaféiné naturellement', 'Descafeinado natural'],
      'Pentru espresso robust': ['Pentru espresso robust', 'For a bold espresso', 'Pour un espresso corsé', 'Para un espresso intenso'],
      'Ceai negru': ['Ceai negru', 'Black tea', 'Thé noir', 'Té negro'],
      'Ceai verde': ['Ceai verde', 'Green tea', 'Thé vert', 'Té verde'],
      'Ceai alb': ['Ceai alb', 'White tea', 'Thé blanc', 'Té blanco'],
      'Ceai verde japonez': ['Ceai verde japonez', 'Japanese green tea', 'Thé vert japonais', 'Té verde japonés'],
      'Ceai negru cu': ['Ceai negru cu', 'Black tea with', 'Thé noir à la', 'Té negro con'],
      'Ceai negru robust': ['Ceai negru robust', 'Bold black tea', 'Thé noir corsé', 'Té negro intenso'],
      'Ceai negru afumat': ['Ceai negru afumat', 'Smoked black tea', 'Thé noir fumé', 'Té negro ahumado'],
      'Ceai fermentat': ['Ceai fermentat', 'Fermented tea', 'Thé fermenté', 'Té fermentado'],
      'Pudră de matcha': ['Pudră de matcha', 'Matcha powder', 'Poudre de matcha', 'Polvo de matcha'],
      'Amestec fructat': ['Amestec fructat', 'Fruity blend', 'Mélange fruité', 'Mezcla afrutada'],
      'Fără cofeină': ['Fără cofeină', 'Caffeine-free', 'Sans caféine', 'Sin cafeína'],
      'Corp plin, aciditate medie': ['Corp plin, aciditate medie', 'Full body, medium acidity', 'Corps généreux, acidité moyenne', 'Cuerpo intenso, acidez media'],
      'Răcoritor': ['Răcoritor', 'Refreshing', 'Rafraîchissant', 'Refrescante'],
      'Măcinătură grosieră': ['Măcinătură grosieră', 'Coarse grind', 'Mouture grossière', 'Molienda gruesa'],
      'Prăjire medie-deschisă': ['Prăjire medie-deschisă', 'Medium-light roast', 'Torréfaction moyennement claire', 'Tueste medio claro'],
      'Ideal latte': ['Ideal latte', 'Ideal for lattes', 'Idéal pour les latte', 'Ideal para latte'],
      'Retetă tradițională': ['Retetă tradițională', 'Traditional recipe', 'Recette traditionnelle', 'Receta tradicional'],
      'kraft mat': ['kraft mat', 'matte kraft', 'kraft mat', 'kraft mate'],
      'carton bio': ['carton bio', 'biodegradable cardboard', 'carton biodégradable', 'cartón biodegradable'],
      'Catifelată': ['Catifelată', 'Velvety', 'Veloutée', 'Sedosa'],
      'note de alune': ['note de alune', 'hazelnut notes', 'notes de noisette', 'notas de avellana'],
      'mărimea': ['mărimea', 'size', 'taille', 'tamaño'],
      'Origine Madagascar': ['Origine Madagascar', 'Origin: Madagascar', 'Origine : Madagascar', 'Origen: Madagascar'],
      'alb mat sau verde smarald': ['alb mat sau verde smarald', 'matte white or emerald green', 'blanc mat ou vert émeraude', 'blanco mate o verde esmeralda'],
      'corp inox, reglaj granulație': ['corp inox, reglaj granulație', 'stainless steel body, adjustable grind', 'corps en acier inoxydable, mouture réglable', 'cuerpo de acero inoxidable, molienda regulable'],
      'Acuratețe': ['Acuratețe', 'Accuracy', 'Précision', 'Precisión'],
      '0.1g': ['0.1g', '0.1g', '0,1 g', '0,1 g'],
      '80% Arabica / 20% Robusta': ['80% Arabica / 20% Robusta', '80% Arabica / 20% Robusta', '80 % Arabica / 20 % Robusta', '80 % arábica / 20 % robusta'],
      'Caramel sărat': ['Caramel sărat', 'Salted caramel', 'Caramel au beurre salé', 'Caramelo salado'],
      'Alune de Pădure': ['Alune de Pădure', 'Hazelnut', 'Noisette', 'Avellana'],
      'Ciocolată neagră': ['Ciocolată neagră', 'Dark chocolate', 'Chocolat noir', 'Chocolate negro'],
      'Ciocolată': ['Ciocolată', 'Chocolate', 'Chocolat', 'Chocolate'],
      'Cacao': ['Cacao', 'Cocoa', 'Cacao', 'Cacao'],
      'Fructe de pădure': ['Fructe de pădure', 'Berries', 'Fruits rouges', 'Frutos del bosque'],
      'Fructe': ['Fructe', 'Fruit', 'Fruits', 'Fruta'],
      'Pământiu': ['Pământiu', 'Earthy', 'Terreux', 'Terroso'],
      'Lăptoase': ['Lăptoase', 'Milky', 'Lactées', 'Lácteas'],
      'Nuci': ['Nuci', 'Nuts', 'Noix', 'Nueces'],
      'Miere': ['Miere', 'Honey', 'Miel', 'Miel'],
      'Caramel': ['Caramel', 'Caramel', 'Caramel', 'Caramelo'],
      'Prune': ['Prune', 'Plum', 'Prune', 'Ciruela'],
      'Acrișor': ['Acrișor', 'Tart', 'Acidulé', 'Ácido'],
      'Afumat': ['Afumat', 'Smoked', 'Fumé', 'Ahumado'],
      'Anason': ['Anason', 'Anise', 'Anis', 'Anís'],
      'Nucșoară': ['Nucșoară', 'Nutmeg', 'Noix de muscade', 'Nuez moscada'],
      'Cuișoare': ['Cuișoare', 'Cloves', 'Clous de girofle', 'Clavo'],
      'Cardamom': ['Cardamom', 'Cardamom', 'Cardamome', 'Cardamomo'],
      'Pumpkin Spice': ['Pumpkin Spice', 'Pumpkin spice', 'Épices pumpkin', 'Especias pumpkin'],
      'Masala Chai': ['Masala Chai', 'Masala chai', 'Masala chai', 'Masala chai'],
      'Filtre': ['Filtre', 'Filters', 'Filtres', 'Filtros'],
      'Biodegradabile': ['Biodegradabile', 'Biodegradable', 'Biodégradable', 'Biodegradable'],
      'Ambalare': ['Ambalare', 'Packaging', 'Emballage', 'Embalaje'],
      'Peaberry': ['Peaberry', 'Peaberry', 'Peaberry', 'Peaberry'],
      'Cold Brew': ['Cold Brew', 'Cold brew', 'Cold brew', 'Cold brew'],
      'Batch Brew': ['Batch Brew', 'Batch brew', 'Batch brew', 'Batch brew'],
      'Turmeric Latte': ['Turmeric Latte', 'Turmeric latte', 'Lait doré au curcuma', 'Latte de cúrcuma'],
      'Lavandă': ['Lavandă', 'Lavender', 'Lavande', 'Lavanda'],
      'Lavantă': ['Lavandă', 'Lavender', 'Lavande', 'Lavanda'],
      'Dripper': ['Dripper', 'Dripper', 'Verseur filtre', 'Dripper'],
      'Râșniță': ['Râșniță', 'Grinder', 'Moulin', 'Molinillo'],
      'Cântar': ['Cântar', 'Scale', 'Balance', 'Báscula'],
      'Iasomie': ['Iasomie', 'Jasmine', 'Jasmin', 'Jazmín'],
      'Piersică': ['Piersică', 'Peach', 'Pêche', 'Melocotón'],
      'Bergamotă': ['Bergamotă', 'Bergamot', 'Bergamote', 'Bergamota'],
      'Vanilie': ['Vanilie', 'Vanilla', 'Vanille', 'Vainilla'],
      'Mentă': ['Mentă', 'Mint', 'Menthe', 'Menta'],
      'Scorțișoară': ['Scorțișoară', 'Cinnamon', 'Cannelle', 'Canela'],
      'Ghimbir': ['Ghimbir', 'Ginger', 'Gingembre', 'Jengibre'],
      'Fructe de pădure': ['Fructe de pădure', 'Berries', 'Fruits rouges', 'Frutos del bosque'],
      'Coacăze roșii': ['Coacăze roșii', 'Redcurrant', 'Groseille', 'Grosella'],
      'Zahăr ars': ['Zahăr ars', 'Burnt sugar', 'Sucre brûlé', 'Azúcar tostado'],
      'Pere': ['Pere', 'Pear', 'Poire', 'Pera'],
      'Cafea de origine': ['Cafea de origine', 'Single-origin coffee', 'Café de terroir', 'Café de origen'],
      'Cafea rară': ['Cafea rară', 'Rare coffee', 'Café rare', 'Café raro'],
      'Ceai premium': ['Ceai premium', 'Premium tea', 'Thé premium', 'Té premium'],
      'Condiment': ['Condiment', 'Spice', 'Épice', 'Especia'],
      'Sirop artizanal': ['Sirop artizanal', 'Artisan syrup', 'Sirop artisanal', 'Sirope artesanal'],
      'Accesorii': ['Accesorii', 'Accessories', 'Accessoires', 'Accesorios'],
      'Blend': ['Blend', 'Blend', 'Assemblage', 'Mezcla']
    };
    let text = source;
    Object.keys(terms).sort((a, b) => b.length - a.length).forEach((term) => {
      text = text.replace(new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), terms[term][localeIndex()]);
    });
    return text;
  }

  function updateTitle() {
    const page = location.pathname.split('/').pop() || 'index.html';
    const options = pages[page];
    if (options) document.title = options[supported.indexOf(current)] || options[0];
    document.documentElement.lang = locales[current].html;
  }

  function updateSwitcher() {
    document.querySelectorAll('.language-switcher').forEach((root) => {
      const button = root.querySelector('.language-button');
      if (!button) return;
      button.querySelector('.language-code').textContent = locales[current].code;
      button.setAttribute('aria-label', translate('Select language'));
      root.querySelectorAll('[data-language]').forEach((option) => {
        const active = option.dataset.language === current;
        option.classList.toggle('active', active);
        option.setAttribute('aria-checked', String(active));
      });
    });
  }

  function applyLanguage(language, persist = true) {
    if (!supported.includes(language)) return;
    current = language;
    if (persist) localStorage.setItem(STORAGE_KEY, current);
    updateTitle();
    translateElement(document.body);
    updateSwitcher();
    listeners.forEach((listener) => listener(current));
    window.dispatchEvent(new CustomEvent('coffeeTrip:languageChanged', { detail: { language: current } }));
  }

  function createSwitcher() {
    const globe = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"></path></svg>';
    document.querySelectorAll('.header-actions').forEach((actions) => {
      if (actions.querySelector('.language-switcher')) return;
      const menu = document.createElement('div');
      menu.className = 'language-switcher';
      menu.innerHTML = `
        <button class="language-button" type="button" aria-label="Select language" aria-haspopup="true" aria-expanded="false">
          ${globe}<span class="language-code"></span>
        </button>
        <div class="language-options" role="group" aria-label="Select language">
          ${supported.map((code) => `<button type="button" role="radio" aria-checked="false" data-language="${code}"><span>${locales[code].code}</span><span>${locales[code].name}</span></button>`).join('')}
        </div>`;
      const trigger = menu.querySelector('.language-button');
      menu.querySelector('.language-options').setAttribute('aria-label', translate('Select language'));
      const options = [...menu.querySelectorAll('[data-language]')];
      const close = () => {
        menu.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
      };
      trigger.addEventListener('click', () => {
        const open = menu.classList.toggle('open');
        trigger.setAttribute('aria-expanded', String(open));
        if (open) menu.querySelector(`[data-language="${current}"]`).focus();
      });
      menu.addEventListener('keydown', (event) => {
        const currentIndex = options.indexOf(document.activeElement);
        let nextIndex = currentIndex;
        if (event.key === 'ArrowDown' || event.key === 'ArrowRight') nextIndex = (currentIndex + 1 + options.length) % options.length;
        if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + options.length) % options.length;
        if (event.key === 'Home') nextIndex = 0;
        if (event.key === 'End') nextIndex = options.length - 1;
        if (event.key === 'Escape') {
          close();
          trigger.focus();
          return;
        }
        if (nextIndex !== currentIndex) {
          event.preventDefault();
          options[nextIndex].focus();
        }
      });
      options.forEach((option) => option.addEventListener('click', () => {
        applyLanguage(option.dataset.language);
        close();
        trigger.focus();
      }));
      actions.insertBefore(menu, actions.firstChild);
    });
    updateSwitcher();
  }

  function observeNewContent() {
    const observer = new MutationObserver((records) => {
      records.forEach((record) => record.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) translateElement(node);
        else if (node.nodeType === Node.TEXT_NODE) translateTextNode(node);
      }));
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  window.CoffeeTripI18n = {
    t: translate,
    locale: () => current,
    formatPrice(value) {
      return `${new Intl.NumberFormat(locales[current].number, { maximumFractionDigits: 0 }).format(Number(value))} RON`;
    },
    priceLabel(product) {
      const value = this.formatPrice(product.price);
      return product.isEstimatedPrice ? `${value} · ${translate('Estimated price')}` : value;
    },
    product: localizedProduct,
    onChange(listener) {
      listeners.add(listener);
    },
    setLanguage: applyLanguage
  };

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.language-switcher')) {
      document.querySelectorAll('.language-switcher.open').forEach((menu) => {
        menu.classList.remove('open');
        menu.querySelector('.language-button').setAttribute('aria-expanded', 'false');
      });
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      document.querySelectorAll('.language-switcher.open').forEach((menu) => {
        menu.classList.remove('open');
        menu.querySelector('.language-button').setAttribute('aria-expanded', 'false');
      });
    }
  });
  document.addEventListener('DOMContentLoaded', () => {
    createSwitcher();
    applyLanguage(current, false);
    observeNewContent();
  });
})();
