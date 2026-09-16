const products = [
  { id: 1, name: 'Ethiopian Yirgacheffe', origin: 'Ethiopia', category: 'Single Origin', price: 89, priceLabel: 'PREȚ NECUNOSCUT', oldPrice: 109, roast: 'Light', notes: ['Jasmine', 'Bergamot', 'Blueberry'], description: 'A refined floral coffee with bright citrus clarity and a lingering delicate finish.', image: 'assets/img/img1.jpg', badge: 'NEW', featured: true, rating: 4.9, reviews: 126, weight: '250g', body: 'Silky', acidity: 'High', sweetness: 'Medium', flavor: 'Floral', collection: 'Morning Collection' },
  { id: 2, name: 'Colombian Supremo', origin: 'Colombia', category: 'Single Origin', price: 79, oldPrice: 96, roast: 'Medium', notes: ['Caramel', 'Red Apple', 'Chocolate'], description: 'Balanced and comforting with caramel sweetness and a deep cocoa structure.', image: 'assets/img/img2.jpg', badge: 'BEST SELLER', featured: true, rating: 4.8, reviews: 118, weight: '250g', body: 'Round', acidity: 'Medium', sweetness: 'High', flavor: 'Caramel', collection: 'Morning Collection' },
  { id: 3, name: 'Jamaican Blue Mountain', origin: 'Jamaica', category: 'Rare Coffee', price: 199, oldPrice: 239, roast: 'Medium-Light', notes: ['Hazelnut', 'Cocoa', 'Cedar'], description: 'An iconic rare coffee with exceptional balance, smooth texture, and an elegant finish.', image: 'assets/img/img3.jpg', badge: 'LIMITED', featured: true, rating: 5, reviews: 94, weight: '250g', body: 'Velvety', acidity: 'Low', sweetness: 'High', flavor: 'Nutty', collection: 'Rare Collection' },
  { id: 4, name: 'Panama Geisha', origin: 'Panama', category: 'Rare Coffee', price: 249, oldPrice: 299, roast: 'Light', notes: ['Peach', 'Tea Rose', 'Tangerine'], description: 'A rare micro-lot with floral aromatics, peach sweetness, and luminous citrus acidity.', image: 'assets/img/img4.jpg', badge: 'LIMITED', featured: true, rating: 4.9, reviews: 83, weight: '100g', body: 'Delicate', acidity: 'High', sweetness: 'Medium', flavor: 'Fruity', collection: 'Rare Collection' },
  { id: 5, name: 'Brazilian Bourbon', origin: 'Brazil', category: 'Espresso', price: 69, oldPrice: 83, roast: 'Medium-Dark', notes: ['Hazelnut', 'Toffee', 'Milk Chocolate'], description: 'Smooth and decadent, ideal for espresso lovers seeking deep sweetness and texture.', image: 'assets/img/img5.jpg', badge: 'BUDGET LUXURY', featured: false, rating: 4.7, reviews: 109, weight: '250g', body: 'Full', acidity: 'Low', sweetness: 'High', flavor: 'Chocolate', collection: 'Espresso Collection' },
  { id: 6, name: 'Guatemala Antigua', origin: 'Guatemala', category: 'Single Origin', price: 74, oldPrice: 92, roast: 'Medium', notes: ['Cocoa', 'Orange', 'Brown Sugar'], description: 'Vibrant and expressive with volcanic notes, orange brightness, and cocoa depth.', image: 'assets/img/img6.jpg', badge: 'EDITOR\'S CHOICE', featured: false, rating: 4.8, reviews: 101, weight: '250g', body: 'Medium', acidity: 'Medium', sweetness: 'High', flavor: 'Citrus', collection: 'Discover Collection' },
  { id: 7, name: 'Kenya AA', origin: 'Kenya', category: 'Single Origin', price: 84, oldPrice: 106, roast: 'Light', notes: ['Blackcurrant', 'Grapefruit', 'Honey'], description: 'A lively Kenyan lot with vivid fruit, lively acidity, and a honeyed finish.', image: 'assets/img/img7.jpg', badge: 'PREMIUM', featured: false, rating: 4.8, reviews: 88, weight: '250g', body: 'Crisp', acidity: 'High', sweetness: 'Medium', flavor: 'Fruity', collection: 'Morning Collection' },
  { id: 8, name: 'House Noir', origin: 'Coffee Trip Atelier', category: 'Signature Blend', price: 64, oldPrice: 79, roast: 'Dark', notes: ['Dark Chocolate', 'Walnut', 'Molasses'], description: 'Our signature dark blend built for intensity, depth, and a luxe finish.', image: 'assets/img/img8.jpg', badge: 'BEST SELLER', featured: false, rating: 4.7, reviews: 134, weight: '250g', body: 'Dense', acidity: 'Low', sweetness: 'Medium', flavor: 'Chocolate', collection: 'Signature Collection' },
  { id: 9, name: 'Velvet Reserve', origin: 'Brazil + Colombia', category: 'Signature Blend', price: 59, oldPrice: 72, roast: 'Medium', notes: ['Caramel', 'Milk Chocolate', 'Hazelnut'], description: 'An easy-drinking, elegant profile made for slow mornings and aromatic cups.', image: 'assets/img/img9.jpg', badge: 'NEW', featured: false, rating: 4.7, reviews: 91, weight: '250g', body: 'Smooth', acidity: 'Low', sweetness: 'High', flavor: 'Caramel', collection: 'Signature Collection' },
  { id: 10, name: 'Maison Noire', origin: 'Brazil + Guatemala', category: 'Signature Blend', price: 64, oldPrice: 80, roast: 'Medium-Dark', notes: ['Dark Chocolate', 'Walnut', 'Toffee'], description: 'A rich and polished blend with depth, body, and a dark cocoa signature.', image: 'assets/img/img10.jpg', badge: 'PREMIUM', featured: false, rating: 4.8, reviews: 76, weight: '250g', body: 'Full', acidity: 'Low', sweetness: 'Medium', flavor: 'Chocolate', collection: 'Signature Collection' },
  { id: 11, name: 'Golden Estate', origin: 'Colombia + Brazil', category: 'Signature Blend', price: 69, oldPrice: 85, roast: 'Medium', notes: ['Honey', 'Caramel', 'Cocoa'], description: 'A polished daily blend with balanced sweetness and gentle structure.', image: 'assets/img/img11.jpg', badge: 'EDITORS\' CHOICE', featured: false, rating: 4.8, reviews: 120, weight: '250g', body: 'Balanced', acidity: 'Medium', sweetness: 'High', flavor: 'Sweet', collection: 'Signature Collection' },
  { id: 12, name: 'Noir Élégance', origin: 'Brazil + India', category: 'Espresso', price: 72, oldPrice: 92, roast: 'Dark', notes: ['Dark Chocolate', 'Molasses', 'Roasted Almond'], description: 'A dark espresso profile with full body, luxurious sweetness, and sharp crema.', image: 'assets/img/img12.jpg', badge: 'BEST SELLER', featured: false, rating: 4.9, reviews: 111, weight: '250g', body: 'Dense', acidity: 'Low', sweetness: 'High', flavor: 'Chocolate', collection: 'Espresso Collection' },
  { id: 13, name: 'Velours d\'Or', origin: 'Colombia + Ethiopia', category: 'Signature Blend', price: 76, oldPrice: 96, roast: 'Medium', notes: ['Red Berries', 'Caramel', 'Cocoa'], description: 'A complex blend with red fruit brightness softened by layered caramel sweetness.', image: 'assets/img/img13.jpg', badge: 'NEW', featured: false, rating: 4.8, reviews: 69, weight: '250g', body: 'Round', acidity: 'Medium', sweetness: 'High', flavor: 'Fruity', collection: 'Rare Collection' },
  { id: 14, name: 'Royal Morning', origin: 'Brazil + Colombia', category: 'House Blend', price: 54, oldPrice: 65, roast: 'Medium', notes: ['Biscuit', 'Caramel', 'Milk Chocolate'], description: 'A comforting, accessible blend created for calm, beautiful mornings.', image: 'assets/img/img14.jpg', badge: 'BUDGET LUXURY', featured: false, rating: 4.6, reviews: 148, weight: '250g', body: 'Soft', acidity: 'Low', sweetness: 'Medium', flavor: 'Sweet', collection: 'Beginner Collection' },
  { id: 15, name: 'Imperial Amber', origin: 'Brazil + Colombia + India', category: 'Espresso', price: 79, oldPrice: 99, roast: 'Medium-Dark', notes: ['Brown Sugar', 'Cocoa', 'Hazelnut'], description: 'A balanced espresso with warm sugar sweetness, cocoa richness, and velvet texture.', image: 'assets/img/img15.jpg', badge: 'PREMIUM', featured: false, rating: 4.7, reviews: 98, weight: '250g', body: 'Velvety', acidity: 'Low', sweetness: 'High', flavor: 'Sweet', collection: 'Espresso Collection' },
  { id: 16, name: 'Atelier Privé', origin: 'Ethiopia + Colombia', category: 'Signature Blend', price: 84, oldPrice: 105, roast: 'Medium-Light', notes: ['Jasmine', 'Apricot', 'Honey'], description: 'An elegant signature blend with floral lift, apricot sweetness, and silky structure.', image: 'assets/img/img16.jpg', badge: 'BEST SELLER', featured: false, rating: 4.9, reviews: 137, weight: '250g', body: 'Silky', acidity: 'Medium', sweetness: 'High', flavor: 'Floral', collection: 'Signature Collection' }
];

const demoReviews = {
  1: [
    { user: 'Ariana', stars: 5, text: 'One of the most elegant coffees I have tried.', rating: 5 },
    { user: 'Sorin', stars: 5, text: 'Perfectly floral, bright and refined.', rating: 5 },
    { user: 'Mara', stars: 4, text: 'Very balanced and clean.', rating: 4 },
    { user: 'Radu', stars: 5, text: 'A beautiful morning cup.', rating: 5 },
    { user: 'Elena', stars: 5, text: 'Great body and aroma.', rating: 5 },
    { user: 'Ionut', stars: 4, text: 'Beautiful acidity and lingering finish.', rating: 4 }
  ],
  2: [
    { user: 'Mihai', stars: 5, text: 'Smooth, caramel-led and reliable every day.', rating: 5 },
    { user: 'Ana', stars: 4, text: 'Everything I look for in a daily brew.', rating: 4 },
    { user: 'Diana', stars: 5, text: 'Excellent cup with a strong chocolate finish.', rating: 5 },
    { user: 'Miruna', stars: 5, text: 'The best balance in this range.', rating: 5 },
    { user: 'Bogdan', stars: 4, text: 'A perfect all-rounder.', rating: 4 },
    { user: 'Luca', stars: 5, text: 'Clean, sweet and always fresh.', rating: 5 }
  ],
  3: [
    { user: 'Vlad', stars: 5, text: 'Luxury profile in a rare, memorable cup.', rating: 5 },
    { user: 'Andreea', stars: 5, text: 'This is the definition of a premium lot.', rating: 5 },
    { user: 'Carmen', stars: 4, text: 'Smooth, elegant and very refined.', rating: 4 },
    { user: 'Marius', stars: 5, text: 'I loved the cedar finish.', rating: 5 },
    { user: 'Ioana', stars: 5, text: 'A beautiful rare coffee.', rating: 5 },
    { user: 'Andrei', stars: 5, text: 'One of the most polished coffees I have had.', rating: 5 }
  ],
  4: [
    { user: 'Raul', stars: 5, text: 'Flowers, peach, and incredible clarity.', rating: 5 },
    { user: 'Nicoleta', stars: 4, text: 'Fruity and elegant.', rating: 4 },
    { user: 'George', stars: 5, text: 'A spectacular cup from start to finish.', rating: 5 },
    { user: 'Alice', stars: 5, text: 'Light, but deeply expressive.', rating: 5 },
    { user: 'Denis', stars: 4, text: 'A premium coffee with a clean finish.', rating: 4 },
    { user: 'Iulia', stars: 5, text: 'Beautiful rose aroma and balanced acidity.', rating: 5 }
  ]
};

window.COFFEE_TRIP_PRODUCTS = products;
window.COFFEE_TRIP_REVIEWS = demoReviews;
