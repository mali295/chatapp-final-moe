const data = [
    {
      id: 1,
      title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      price: 109.95,
      description:
        "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      category: "men clothing",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/81QXWsW-VPL._SX679_.jpg",
    },
    {
      id: 2,
      title: "Mens Casual Premium Slim Fit Shirt",
      price: 22.33,
      description:
        "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
      category: "men clothing",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/91xDqPWyhsL._UX342_.jpg",
    },
    {
      id: 3,
      title: "Mens Cotton Jacket",
      price: 55.99,
      description:
        "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
      category: "men clothing",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/51%2BuK8oPfyL._SY679_.jpg",
    },
    {
      id: 4,
      title: "Mens Casual Slim Fit",
      price: 15.99,
      description:
        "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
      category: "men clothing",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/71NcFEriB3L._UX385_.jpg",
    },
    {
      id: 5,
      title: "Men's Solid Cardigan",
      price: 9.79,
      description: "PAUSE Men's Solid Cardigan",
      category: "men clothing",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/71ZmeNYVQSL._UX569_.jpg",
    },
    {
      id: 6,
      title: "Raymond Unstitched Trouser",
      price: 11.99,
      description:
        "Raymond's Men's Poly Viscose 1.25 Meter Unstitched Trouser Fabric (Black, Free Size)",
      category: "men clothing",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/51ZPhFjA9RL._UY606_.jpg",
    },
    {
      id: 7,
      title: "Men's Regular Fit Shirt",
      price: 25.33,
      description: "Diverse Men's Regular Fit Formal Shirt",
      category: "men clothing",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/81qlnA0rJEL._UY606_.jpg",
    },
    {
      id: 8,
      title: "Men's Coats Jackets",
      price: 44.39,
      description:
        "Nilesh Men's Coats Jackets,Winter Casual Fashion Pure Color Patchwork Jacket Zipper Outwear Coat (Nilesh JK67)",
      category: "men clothing",
      image: "https://images-na.ssl-images-amazon.com/images/I/41kpS4bT4vL.jpg",
    },
    {
      id: 9,
      title:
        "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
      price: 695,
      description:
        "Balika Vadhu Jewellery Designer Jwellery Set for Women & Girls (Mehandi/Haldi /Bridal/Baby Shower/Marriage)",
      category: "jewelry",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/81sseeRgRkL._UX679_.jpg",
    },
    {
      id: 10,
      title: "Sukkhi Glamorous LCT Gold Plated Wedding Jewellery",
      price: 168,
      description:
        "Sukkhi Glamorous LCT Gold Plated Wedding Jewellery Pearl Choker Necklace Set Combo For Women (CB73381)",
      category: "jewelry",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/912iX-Sve0L._UY575_.jpg",
    },
    {
      id: 11,
      title: "White Gold Plated Princess",
      price: 9.99,
      description:
        "Sukkhi Adorable Gold Plated Pearl Choker Necklace Set for Women",
      category: "jewelry",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/81UaMFQR6kL._UY575_.jpg",
    },
    {
      id: 12,
      title: "Pierced Owl Rose Gold Plated Stainless Steel Double",
      price: 101.99,
      category: "jewelry",
      description:
        "Sapphire Blue Silver 18K White Gold Plated Austrian Crystal Kate Middleton's Princess Diana Inspired Stud Earrings Romantic Love Party Wear Jewellery for Women by Caratcube (CTC - 107)",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/51p86z3P2GL._UY575_.jpg",
    },
    {
      id: 13,
      title: "Shining Diva Fashion Jewellery Set",
      price: 199.99,
      description:
        "Shining Diva Fashion Latest Choker Design Antique Kundan Traditional Necklace Jewellery Set for Women",
      category: "jewelry",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/81vLw-6u5NL._UY575_.jpg",
    },
    {
      id: 14,
      title: "American Diamond Set",
      price: 129.99,
      description:
        "Zeneme Jewellery Set American Diamond Stylish Peacock Style Gold Plated Necklace Set Jewellery With Earring For Women & Girls",
      category: "jewelry",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/617iS0yg5UL._UX679_.jpg",
    },
    {
      id: 15,
      title: "Rose Gold Jewellery Combo of 2 Adjustable Link Bracelets",
      price: 79.33,
      description:
        "Om Jewells Valentine Gift Rose Gold Jewellery Combo of 2 Adjustable Link Bracelets, 2 Crystal Pendant Necklace with Infinity Dangling Earrings and Adjustable Ring for Girls and Women CO1000343",
      category: "jewelry",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/81LLYLMitIL._UX695_.jpg",
    },
    {
      id: 16,
      title: "Gold Plated Wedding Jewellery",
      price: 99.99,
      description:
        "Sukkhi Dazzling Gold Plated Wedding Jewellery Austrian Diamond Choker Necklace Set Combo For  Women (413CB1900)",
      category: "jewelry",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/71koEgPDDdL._UY575_.jpg",
    },
  
    {
      id: 17,
      title: "New Apple iPad (10.2-inch, Wi-Fi, 32GB)",
      price: 64,
      description:
        "New Apple iPad (10.2-inch, Wi-Fi, 32GB) - Silver (Latest Model, 8th Generation)",
      category: "electronics",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/7100EIwVWvL._SX679_.jpg",
    },
    {
      id: 18,
      title: "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
      price: 109,
      description:
        "Easy upgrade for faster boot up, shutdown, application load and response (As compared to 5400 RPM SATA 2.5” hard drive; Based on published specifications and internal benchmarking tests using PCMark vantage scores) Boosts burst write performance, making it ideal for typical PC workloads The perfect balance of performance and reliability Read/write speeds of up to 535MB/s/450MB/s (Based on internal testing; Performance may vary depending upon drive capacity, host device, OS and application.)",
      category: "electronics",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/61GJ9fJnZhL._SX679_.jpg",
    },
    {
      id: 19,
      title:
        "Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5",
      price: 109,
      description:
        "3D NAND flash are applied to deliver high transfer speeds Remarkable transfer speeds that enable faster bootup and improved overall system performance. The advanced SLC Cache Technology allows performance boost and longer lifespan 7mm slim design suitable for Ultrabooks and Ultra-slim notebooks. Supports TRIM command, Garbage Collection technology, RAID, and ECC (Error Checking & Correction) to provide the optimized performance and enhanced reliability.",
      category: "electronics",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/71X0gCT-RHL._SX522_.jpg",
    },
    {
      id: 20,
      title:
        "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive",
      price: 114,
      description:
        "Expand your PS4 gaming experience, Play anywhere Fast and easy, setup Sleek design with high capacity, 3-year manufacturer's limited warranty",
      category: "electronics",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/71XtQxMbPpL._SX679_.jpg",
    },
    {
      id: 21,
      title: "Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin",
      price: 599,
      description:
        "21. 5 inches Full HD (1920 x 1080) widescreen IPS display And Radeon free Sync technology. No compatibility for VESA Mount Refresh Rate: 75Hz - Using HDMI port Zero-frame design | ultra-thin | 4ms response time | IPS panel Aspect ratio - 16: 9. Color Supported - 16. 7 million colors. Brightness - 250 nit Tilt angle -5 degree to 15 degree. Horizontal viewing angle-178 degree. Vertical viewing angle-178 degree 75 hertz",
      category: "electronics",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/71wRe7xkcSL._SX425_.jpg",
    },
    {
      id: 22,
      title:
        "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED ",
      price: 999.99,
      description:
        "49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side by side QUANTUM DOT (QLED) TECHNOLOGY, HDR support and factory calibration provides stunningly realistic and accurate color and contrast 144HZ HIGH REFRESH RATE and 1ms ultra fast response time work to eliminate motion blur, ghosting, and reduce input lag",
      category: "electronics",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/71nplbAMwzL._SX679_.jpg",
    },
    {
      id: 23,
      title: "Wacom One by CTL-472/K0-CX Small ",
      price: 39.99,
      description:
        "Wacom One by CTL-472/K0-CX Small 6-inch x 3.5-inch Graphic Tablet (Red/Black)",
      category: "electronics",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/61gGegpTCLL._SX679_.jpg",
    },
    {
      id: 24,
      title:
        "ASUS 24.5-inch Full HD (1920x1080), Nvidia G-SYNC Compatible Esports Gaming Monitor",
      price: 199.99,
      description:
        "ASUS 24.5-inch Full HD (1920x1080), Nvidia G-SYNC Compatible Esports Gaming Monitor, 0.5ms, Up to 165 Hz, DP, HDMI, DVI-D, Super Narrow Bezel, FreeSync, Low Blue Light, Flicker Free - VG258QR (Black)",
      category: "electronics",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/81r1F7TxBZL._SX679_.jpg",
    },
    {
      id: 25,
      title: "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
      price: 56.99,
      description:
        "Note:The Jackets is US standard size, Please choose size as your usual wear Material: 100% Polyester; Detachable Liner Fabric: Warm Fleece. Detachable Functional Liner: Skin Friendly, Lightweigt and Warm.Stand Collar Liner jacket, keep you warm in cold weather. Zippered Pockets: 2 Zippered Hand Pockets, 2 Zippered Pockets on Chest (enough to keep cards or keys)and 1 Hidden Pocket Inside.Zippered Hand Pockets and Hidden Pocket keep your things secure. Humanized Design: Adjustable and Detachable Hood and Adjustable cuff to prevent the wind and water,for a comfortable fit. 3 in 1 Detachable Design provide more convenience, you can separate the coat and inner as needed, or wear it together. It is suitable for different season and help you adapt to different climates",
      category: "women clothing",
      image: "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg",
    },
    {
      id: 26,
      title:
        "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket",
      price: 29.95,
      description:
        "100% POLYURETHANE(shell) 100% POLYESTER(lining) 75% POLYESTER 25% COTTON (SWEATER), Faux leather material for style and comfort / 2 pockets of front, 2-For-One Hooded denim style faux leather jacket, Button detail on waist / Detail stitching at sides, HAND WASH ONLY / DO NOT BLEACH / LINE DRY / DO NOT IRON",
      category: "women clothing",
      image: "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg",
    },
    {
      id: 27,
      title: "Rain Jacket Women Windbreaker Striped Climbing Raincoats",
      price: 39.99,
      description:
        "Lightweight perfet for trip or casual wear---Long sleeve with hooded, adjustable drawstring waist design. Button and zipper front closure raincoat, fully stripes Lined and The Raincoat has 2 side pockets are a good size to hold all kinds of things, it covers the hips, and the hood is generous but doesn't overdo it.Attached Cotton Lined Hood with Adjustable Drawstrings give it a real styled look.",
      category: "women clothing",
      image: "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg",
    },
    {
      id: 28,
      title: "MBJ Women's Solid Short Sleeve Boat Neck V ",
      price: 9.85,
      description:
        "95% RAYON 5% SPANDEX, Made in USA or Imported, Do Not Bleach, Lightweight fabric with great stretch for comfort, Ribbed on sleeves and neckline / Double stitching on bottom hem",
      category: "women clothing",
      image: "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg",
    },
    {
      id: 29,
      title: "Opna Women's Short Sleeve Moisture",
      price: 7.95,
      description:
        "100% Polyester, Machine wash, 100% cationic polyester interlock, Machine Wash & Pre Shrunk for a Great Fit, Lightweight, roomy and highly breathable with moisture wicking fabric which helps to keep moisture away, Soft Lightweight Fabric with comfortable V-neck collar and a slimmer fit, delivers a sleek, more feminine silhouette and Added Comfort",
      category: "women clothing",
      image: "https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg",
    },
    {
      id: 30,
      title: "DANVOUY Womens T Shirt Casual Cotton Short",
      price: 12.99,
      description:
        "95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch., Occasion: Casual/Office/Beach/School/Home/Street. Season: Spring,Summer,Autumn,Winter.",
      category: "women clothing",
      image: "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg",
    },
    {
      id: 31,
      title: "Floral Blouse",
      price: 20,
      description:
        "B Slim Beige Soft Sleek Under Clothing Seamless High Waist Women Body Shapewear Shorts",
      category: "women clothing",
      image: "https://images-na.ssl-images-amazon.com/images/I/31WrGdqfijL.jpg",
    },
    {
      id: 32,
      title: "Women Cotton Suite",
      price: 17.85,
      description:
        "Shree Villa Women's Banarasi Jakad & Santoon & Chanderi Unstitched Salwar Suit",
      category: "women clothing",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/815g4bvGchL._UX569_.jpg",
    },
  ];
  
  export default data;