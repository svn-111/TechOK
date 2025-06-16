// products-data.js
const products = [
    // Mobile Phones
    {
        id: 1,
        title: "iPhone 13 Pro",
        price: 999,
        category: "mobile",
        subcategory: "iphone",
        brand: "apple",
        image: "images/image1.jpg",
        rating: 4.8,
        description: "The iPhone 13 Pro features a 6.1-inch Super Retina XDR display, A15 Bionic chip, and a triple-camera system with advanced computational photography. Enjoy 5G connectivity, all-day battery life, and iOS 15."
    },
    {
        id: 2,
        title: "Samsung Galaxy S22",
        price: 799,
        category: "mobile",
        subcategory: "samsung",
        brand: "samsung",
        image: "images/image2.jpg",
        rating: 4.7,
        description: "Samsung Galaxy S22 offers a 6.1-inch Dynamic AMOLED 2X display, Exynos 2200/Snapdragon 8 Gen 1 processor, and a versatile triple-camera setup. Supports 5G and fast charging."
    },
    {
        id: 3,
        title: "OnePlus 10 Pro",
        price: 699,
        category: "mobile",
        subcategory: "oneplus",
        brand: "oneplus",
        image: "images/image3.jpg",
        rating: 4.6,
        description: "OnePlus 10 Pro boasts a 6.7-inch Fluid AMOLED display with 120Hz refresh rate, Snapdragon 8 Gen 1, and Hasselblad-tuned cameras. Fast charging and OxygenOS included."
    },
    {
        id: 4,
        title: "Xiaomi 12 Pro",
        price: 599,
        category: "mobile",
        subcategory: "xiaomi",
        brand: "xiaomi",
        image: "images/image4.jpg",
        rating: 4.5,
        description: "Xiaomi 12 Pro features a 6.73-inch AMOLED display, Snapdragon 8 Gen 1, and a 50MP triple-camera system. Offers 120W hyper-fast charging and MIUI 13."
    },
    // Laptops
    {
        id: 5,
        title: "MacBook Pro 14\"",
        price: 1999,
        category: "laptop",
        subcategory: "apple",
        brand: "apple",
        image: "images/image5.png",
        rating: 4.9,
        description: "The MacBook Pro 14\" is powered by the M1 Pro chip, featuring a 14.2-inch Liquid Retina XDR display, up to 32GB RAM, and all-day battery life. Perfect for professionals."
    },
    {
        id: 6,
        title: "Dell XPS 15",
        price: 1499,
        category: "laptop",
        subcategory: "dell",
        brand: "dell",
        image: "images/image6.jpg",
        rating: 4.7,
        description: "Dell XPS 15 offers a 15.6-inch 4K UHD+ display, Intel Core i7, and NVIDIA GeForce RTX graphics. Ideal for creators with its sleek design and powerful performance."
    },
    {
        id: 7,
        title: "HP Spectre x360",
        price: 1299,
        category: "laptop",
        subcategory: "hp",
        brand: "hp",
        image: "images/image7.jpg",
        rating: 4.6,
        description: "HP Spectre x360 is a 2-in-1 convertible with a 13.3-inch OLED display, Intel Core i5/i7 processors, and up to 16GB RAM. Features a premium design and long battery life."
    },
    {
        id: 8,
        title: "Lenovo ThinkPad X1",
        price: 1599,
        category: "laptop",
        subcategory: "lenovo",
        brand: "lenovo",
        image: "images/image8.jpg",
        rating: 4.8,
        description: "Lenovo ThinkPad X1 Carbon Gen 9 features a 14-inch 4K display, Intel Core i7, and robust security features. Built for business professionals with exceptional durability."
    },
    // Headphones
    {
        id: 9,
        title: "Sony WH-1000XM4",
        price: 349,
        category: "headphone",
        subcategory: "sony",
        brand: "sony",
        image: "images/image9.jpg",
        rating: 4.6,
        description: "Sony WH-1000XM4 offers industry-leading noise cancellation, 30-hour battery life, and superior sound quality. Supports Bluetooth 5.0 and touch controls."
    },
    {
        id: 10,
        title: "Bose QuietComfort 45",
        price: 329,
        category: "headphone",
        subcategory: "bose",
        brand: "bose",
        image: "images/image10.jpg",
        rating: 4.5,
        description: "Bose QuietComfort 45 provides world-class noise cancellation, balanced audio, and up to 24 hours of battery life. Comfortable for all-day wear."
    },
    {
        id: 11,
        title: "AirPods Max",
        price: 549,
        category: "headphone",
        subcategory: "apple",
        brand: "apple",
        image: "images/image11.jpg",
        rating: 4.7,
        description: "AirPods Max feature active noise cancellation, spatial audio, and a premium design. Offers 20 hours of battery life and seamless Apple ecosystem integration."
    },
    {
        id: 12,
        title: "Sennheiser Momentum 3",
        price: 399,
        category: "headphone",
        subcategory: "sennheiser",
        brand: "sennheiser",
        image: "images/image12.jpg",
        rating: 4.4,
        description: "Sennheiser Momentum 3 delivers rich audio, active noise cancellation, and a 17-hour battery life. Stylish design with intuitive controls."
    },
    // Smart Watches
    {
        id: 13,
        title: "Apple Watch Series 7",
        price: 399,
        category: "smartwatch",
        subcategory: "apple",
        brand: "apple",
        image: "images/image13.jpg",
        rating: 4.8,
        description: "Apple Watch Series 7 features a larger Retina display, advanced health tracking (ECG, SpO2), and fitness features. Water-resistant and durable."
    },
    {
        id: 14,
        title: "Samsung Galaxy Watch 4",
        price: 249,
        category: "smartwatch",
        subcategory: "samsung",
        brand: "samsung",
        image: "images/image14.jpg",
        rating: 4.5,
        description: "Samsung Galaxy Watch 4 offers Wear OS, body composition analysis, and heart rate monitoring. Sleek design with up to 40 hours of battery life."
    },
    {
        id: 15,
        title: "Fitbit Sense",
        price: 299,
        category: "smartwatch",
        subcategory: "fitbit",
        brand: "fitbit",
        image: "images/image15.jpg",
        rating: 4.3,
        description: "Fitbit Sense includes stress management, EDA sensor, and advanced heart rate tracking. Supports 6+ days of battery life and fitness tracking."
    },
    {
        id: 16,
        title: "Garmin Venu 2",
        price: 399,
        category: "smartwatch",
        subcategory: "garmin",
        brand: "garmin",
        image: "images/image16.jpg",
        rating: 4.6,
        description: "Garmin Venu 2 features AMOLED display, advanced fitness tracking, and up to 11 days of battery life. Ideal for athletes and fitness enthusiasts."
    },
    {
        id: 49,
        title: "Apple 20W USB-C Power Adapter",
        price: 19,
        category: "accessories",
        subcategory: "mobile-accessories",
        brand: "apple",
        image: "images/image17.jpg",
        rating: 4.7,
        description: "Apple 20W USB-C Power Adapter offers fast charging for iPhone, iPad, and other USB-C devices. Compact design with reliable performance."
    },
    {
        id: 50,
        title: "Anker USB-C Cable 6ft",
        price: 12,
        category: "accessories",
        subcategory: "mobile-accessories",
        brand: "anker",
        image: "images/image18.jpg",
        rating: 4.6,
        description: "Anker USB-C Cable is a durable 6ft cable supporting fast charging and data transfer. Compatible with most USB-C devices."
    },
    {
        id: 51,
        title: "Samsung 25W Fast Charger",
        price: 24,
        category: "accessories",
        subcategory: "mobile-accessories",
        brand: "samsung",
        image: "images/image19.jpg",
        rating: 4.5,
        description: "Samsung 25W Fast Charger provides super-fast charging for Galaxy devices. Includes USB-C port and compact design."
    },
    {
        id: 52,
        title: "Belkin Lightning Cable 3ft",
        price: 15,
        category: "accessories",
        subcategory: "mobile-accessories",
        brand: "belkin",
        image: "images/image20.jpg",
        rating: 4.4,
        description: "Belkin 3ft Lightning Cable is MFi-certified for Apple devices, offering fast charging and data syncing. Durable and reliable."
    },
    {
        id: 53,
        title: "Logitech MX Master 3S Mouse",
        price: 99,
        category: "accessories",
        subcategory: "laptop-accessories",
        brand: "logitech",
        image: "images/image21.jpg",
        rating: 4.8,
        description: "Logitech MX Master 3S is an advanced wireless mouse with customizable buttons, fast scrolling, and USB-C charging. Ideal for productivity."
    },
    {
        id: 54,
        title: "Dell Wireless Keyboard and Mouse Combo",
        price: 59,
        category: "accessories",
        subcategory: "laptop-accessories",
        brand: "dell",
        image: "images/image22.jpg",
        rating: 4.5,
        description: "Dell Wireless Keyboard and Mouse Combo offers reliable wireless connectivity, ergonomic design, and long battery life."
    },
    {
        id: 55,
        title: "HP USB-C Universal Docking Station",
        price: 129,
        category: "accessories",
        subcategory: "laptop-accessories",
        brand: "hp",
        image: "images/image23.jpg",
        rating: 4.6,
        description: "HP USB-C Universal Docking Station supports multiple displays and peripherals. Compact design for easy laptop connectivity."
    },
    {
        id: 56,
        title: "Logitech K380 Bluetooth Keyboard",
        price: 39,
        category: "accessories",
        subcategory: "laptop-accessories",
        brand: "logitech",
        image: "images/image24.jpg",
        rating: 4.7,
        description: "Logitech K380 Bluetooth Keyboard is compact, lightweight, and connects to multiple devices. Perfect for laptops and tablets."
    }
];