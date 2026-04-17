const mongoose = require('mongoose');
require('dotenv').config();

const Product = require('./models/Product');

const products = [
    {
        name: 'The Classic Biker',
        price: 20000,
        image: 'https://images.unsplash.com/photo-1551028919-ac6635f0e5c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        description: 'A timeless biker jacket crafted from premium full-grain leather. Built for the road.',
        category: 'Jacket',
        inStock: true
    },
    {
        name: 'Vintage Bomber',
        price: 15000,
        image: 'https://images.unsplash.com/photo-1520975661595-6453be3f7070?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        description: 'Inspired by classic aviation, this bomber combines style with rugged durability.',
        category: 'Jacket',
        inStock: true
    },
    {
        name: 'The Cafe Racer',
        price: 12000,
        image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        description: 'Sleek, minimal, and built for speed. The perfect riding companion.',
        category: 'Jacket',
        inStock: true
    },
    {
        name: 'The Aviator',
        price: 5000,
        image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        description: 'Lightweight leather jacket with a classic aviator cut. Great for everyday wear.',
        category: 'Jacket',
        inStock: true
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB for seeding...');

        // Clear existing products
        await Product.deleteMany({});
        console.log('🗑️  Cleared existing products');

        // Insert new products
        const inserted = await Product.insertMany(products);
        console.log(`🌱 Seeded ${inserted.length} products:`);
        inserted.forEach((p, i) => {
            console.log(`   ${i + 1}. ${p.name} — ${p.price.toLocaleString()} PKR`);
        });

        console.log('\n✅ Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding error:', error.message);
        process.exit(1);
    }
};

seedDB();
