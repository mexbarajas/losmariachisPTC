import { useState } from "react";

/* ── CLOUDINARY IMAGE MAP ──────────────────────────────────────────
   All images from: res.cloudinary.com/dmktopcmj
   Folder: Restaurantes/outside_the-masa
   Cloudinary base URL supports transformations: w_600,f_auto,q_auto
────────────────────────────────────────────────────────────────── */
const CDN = "https://res.cloudinary.com/dmktopcmj/image/upload";
const T   = "w_800,f_auto,q_auto,c_fill";  // auto optimize
const Ts  = "w_400,h_300,f_auto,q_auto,c_fill"; // small card

const IMG = {
  logo:        `${CDN}/v1774295662/logo.jpg`,
  hero:        `${CDN}/${T},g_center/v1774296265/8e34ba_fed8eaa4e0394266a3e139f6fa63d73e_mv2.jpg`,
  birria:      `${CDN}/${Ts}/v1774295194/The_Birria_master.avif`,
  guacamole:   `${CDN}/${Ts}/v1774465006/Guacamole_con_Totopos.png`,
  calamari:    `${CDN}/${Ts}/v1774465004/Calamares_Fritos.png`,
  ceviche:     `${CDN}/${Ts}/v1774465001/Coctel_de_Camar%C3%B3n.png`,
  taquitos:    `${CDN}/${Ts}/v1774464999/Taquitos_Dorado.png`,
  taquitos2:   `${CDN}/${Ts}/v1774464995/Taquitos_Dorados.png`,
  mexicanFood: `${CDN}/w_600,f_auto,q_auto/v1774464994/mexican_food.png`,
  interior1:   `${CDN}/${Ts}/v1774296251/8e34ba_e3baee01b8e94027a7477d67b929f996_mv2.jpg`,
  interior2:   `${CDN}/${Ts}/v1774296248/IMG_7298.jpg`,
  food1:       `${CDN}/${Ts}/v1774296229/8e34ba_8d69d2baae3e497d993365fec10f7eb3_mv2.jpg`,
  food2:       `${CDN}/${Ts}/v1774296221/8e34ba_3595aff0a84b4a9c9340095a52eaae56_mv2.jpg`,
  food3:       `${CDN}/${Ts}/v1774296204/8e34ba_0698ee5e7ced4ca2a9c2a079e2b9e746_mv2.jpg`,
  food4:       `${CDN}/${Ts}/v1774296196/8e34ba_97fd39ced86341459aad3336080d649b_mv2.jpg`,
  mariachi:    `${CDN}/w_600,f_auto,q_auto/v1774464998/ChatGPT_Image_Mar_24_2026_11_25_20_AM.png`,
  gemini:      `${CDN}/w_500,f_auto,q_auto/v1774465003/Gemini_Generated_Image_e6uef4e6uef4e6ue.png`,
};

/* ── COLORS from logo ── */
const C = {
  red:"#b71c1c", redDark:"#7f0000",
  green:"#1b5e20", greenMid:"#2e7d32",
  gold:"#f9a825", goldLt:"#ffd54f",
  cream:"#fff8e1", creamDk:"#ffecb3",
  espresso:"#1a0800", brown:"#3e1a00",
};

/* ── MENU DATA (real from official PDF) ── */
const MENU = {
  appetizers:{label:"🌶 Appetizers",items:[
    {name:"Cheese Dip",                desc:"Our signature creamy house cheese dip. The fan favorite starter.",                             price:"Reg $6.49 / Grande $10.49", pop:true,  img:IMG.guacamole},
    {name:"Roasted Guacamole",         desc:"Homemade fresh guacamole mixed with roasted chipotle corn. Served with warm tortilla chips.",  price:"Reg $7.49 / Grande $10.49", pop:true,  img:IMG.guacamole},
    {name:"Los Mariachis Dip",         desc:"Large bowl of cheese dip with grilled shrimp, steak & chicken. Served with pico & tortillas.", price:"$11.49",                    pop:true,  img:IMG.food3},
    {name:"Queso Fundido",             desc:"Mexican melted cheese with sausage, mushrooms, peppers & onions. With flour tortillas.",        price:"$10.49",                               img:IMG.food4},
    {name:"Choriqueso",                desc:"Mexican cheeses, crumbled chorizo, cherry tomatoes, roasted poblano & jalapeño mayo.",          price:"$11.49",                               img:IMG.food1},
    {name:"Nachos Tejano Style",       desc:"Grilled chicken, steak & shrimp on chips topped with cheese dip, lettuce & guacamole.",         price:"$14.99",                    pop:true,  img:IMG.food2},
    {name:"Lime Ceviche",              desc:"Shrimp, salmon & tilapia in lime juice, tomatoes, red onions, mango & cilantro with avocado.", price:"$11.49",                               img:IMG.ceviche},
    {name:"Lime Fried Calamari",       desc:"Battered in herbs & spices with a hint of lime. Served with citrus jalapeño salsa.",            price:"$11.49",                               img:IMG.calamari},
    {name:"Los Mariachis Sampler",     desc:"Steak quesadilla, chicken chimichanga, brisket flautas & two tostones. The ultimate starter.", price:"$15.49",                    pop:true,  img:IMG.food3},
  ]},
  tacos:{label:"🌮 Tacos",items:[
    {name:"Los Mariachis Tacos",  desc:"Four tacos: steak, chicken, shrimp & brisket with cheese, Mexi-mango dip, cilantro & salsa verde.", price:"$15.29", pop:true, img:IMG.food1},
    {name:"Al Pastor",            desc:"Three tacos with grilled steak, marinated chicken or pork, pineapple & cilantro with salsa verde.",  price:"$12.29", pop:true, img:IMG.taquitos},
    {name:"Three Amigos",         desc:"Three grilled steak, chicken & shrimp pinchos with grilled onions & peppers.",                       price:"$13.29",           img:IMG.taquitos2},
    {name:"De Asada",             desc:"Three grilled steak tacos with fresh onions & cilantro. Served with beans.",                         price:"$13.59",           img:IMG.food2},
    {name:"De Brisket",           desc:"Three tender brisket tacos with rice, beans, lettuce, tomatoes, guacamole & sour cream.",            price:"$12.09",           img:IMG.birria},
    {name:"De Carnitas",          desc:"Three sautéed pork tacos topped with cilantro & onions. Served with salsa verde.",                   price:"$12.19",           img:IMG.taquitos},
    {name:"Shrimp Tacos",         desc:"Three lightly-breaded shrimp tacos with chipotle coleslaw & jalapeños.",                             price:"$13.59",           img:IMG.ceviche},
    {name:"Mahi Mahi Tacos",      desc:"Three grilled or fried tacos with cilantro, onions, avocado & salsa verde. Black beans.",            price:"$14.99", pop:true, img:IMG.food4},
    {name:"Baja Fish",            desc:"Three fried fish tacos topped with homemade Mexican coleslaw. Rice or beans.",                        price:"$13.59",           img:IMG.taquitos2},
    {name:"Birria Tacos",         desc:"Braised beef birria in consommé-dipped tortillas with melted cheese & dipping broth.",               price:"$14.99", pop:true, img:IMG.birria},
    {name:"Veggie Tacos",         desc:"Three tacos with sautéed onions, peppers, spinach, mushrooms & asparagus. Wheat tortillas.",         price:"$11.09",           img:IMG.guacamole, veg:true},
  ]},
  fajitas:{label:"🔥 Fajitas",items:[
    {name:"Texas Fajitas",             desc:"Steak, chicken & shrimp grilled steaming hot on peppers & onions. Rice, beans, lettuce, pico, guacamole & sour cream.",    price:"1 $18.74 / 2 $29.84", pop:true, img:IMG.food3},
    {name:"Los Mariachis Fajitas",     desc:"Six meats: steak, chicken, shrimp, pork, Mexican sausage & tilapia — cooked with onions, peppers, mozzarella & pineapple.", price:"1 $19.99 / 2 $29.99", pop:true, img:IMG.mexicanFood},
    {name:"Chicken or Shrimp Fajitas", desc:"Grilled chicken or shrimp steaming hot on a bed of bell peppers & onions. All the fixings.",                                price:"1 $15.04 / 2 $25.05",           img:IMG.food2},
    {name:"Steak Fajitas",             desc:"Grilled steak steaming hot on a bed of bell peppers & onions. Rice, beans, lettuce, pico, guacamole & sour cream.",         price:"1 $16.04 / 2 $26.04",           img:IMG.food1},
    {name:"Fajitas de Carnitas",       desc:"Juicy pork tips fajitas with mushrooms & Chihuahua cheese. A delicious twist on the classic.",                               price:"1 $14.34 / 2 $24.34",           img:IMG.taquitos},
  ]},
  enchiladas:{label:"🫔 Enchiladas",items:[
    {name:"Enchiladas Verdes",    desc:"Three shredded chicken enchiladas with green tomatillo salsa & Chihuahua cheese. Rice, beans & sour cream.", price:"$14.29", pop:true, img:IMG.food4},
    {name:"Enchiladas Rancheras", desc:"Three brisket enchiladas with zesty salsa ranchera, lettuce, shredded cheese & sour cream.",                 price:"$12.29",           img:IMG.food2},
    {name:"Enchiladas Supremas",  desc:"One ground beef, one shredded chicken & one Mexi-bean enchilada with enchilada sauce, cheese & sour cream.", price:"$12.29",           img:IMG.food3},
    {name:"Enchiladas de Cerdo",  desc:"Three pork enchiladas with pico de gallo, topped with cheese dip, sour cream & guacamole.",                  price:"$12.29",           img:IMG.food1},
    {name:"Enchiladas Marineras", desc:"Three tilapia & shrimp enchiladas in chipotle sauce, smothered with salsa ranchera & cheese dip.",            price:"$14.49",           img:IMG.ceviche},
    {name:"Enchilada Sampler",    desc:"A great combination: beef, chicken & queso fresco enchiladas topped with salsa ranchera.",                    price:"$12.99",           img:IMG.food4},
  ]},
  burritos:{label:"🌯 Burritos",items:[
    {name:"Ranchero Burrito",          desc:"Grilled chicken or steak with onions, peppers & rice. Topped with salsa ranchera, cheese & avocado.",       price:"$14.79", pop:true, img:IMG.taquitos2},
    {name:"Los Mariachis Grilled",     desc:"Grilled steak, chicken or shrimp rolled in a tortilla. Covered with cheese dip. Rice & Mexi-beans.",         price:"$14.79",           img:IMG.food3},
    {name:"Burrito Gordo",             desc:"Beef, chicken, shrimp, Mexican sausage, rice, beans, pico de gallo — topped with cheese dip.",               price:"$16.99", pop:true, img:IMG.mexicanFood},
    {name:"Burrito Marinero",          desc:"Shrimp, flame-grilled tilapia & pico de gallo. Smothered with cheese dip & salsa ranchera.",                 price:"$15.99",           img:IMG.ceviche},
    {name:"California Burrito",        desc:"Grilled steak or chicken with onions, cilantro, rice & beans. Topped with sour cream & avocado.",            price:"$11.99",           img:IMG.food2},
    {name:"Burrito Verde",             desc:"Shredded chicken or ground beef topped with salsa verde & cheese dip. Rice & Mexi-beans.",                   price:"$12.29",           img:IMG.food1},
  ]},
  specialties:{label:"⭐ Specialties",items:[
    {name:"Molcajete Mariachis",     desc:"Shrimp, chicken, skirt steak & Mexican chorizo in a sizzling stone molcajete with Chihuahua cheese.", price:"1 $20.49 / 2 $30.49", pop:true, img:IMG.food3},
    {name:"Molcajete Mexicano",      desc:"Chicken, skirt steak & Mexican chorizo in a traditional stone molcajete with onions & cheese.",       price:"1 $17.49 / 2 $29.49", pop:true, img:IMG.mexicanFood},
    {name:"Chimichanga",             desc:"Lightly-fried flour tortilla with chicken, brisket or pork, rice — topped with cheese dip.",         price:"$12.49",                         img:IMG.taquitos},
    {name:"Chiles Poblanos Rellenos",desc:"Two poblano peppers stuffed with Chihuahua cheese & choice of chicken, brisket or cheese.",          price:"$12.04",                         img:IMG.food4},
    {name:"Chile Colorado",          desc:"Steak, chorizo, queso fresco, onion, salsa ranchera, tortillas, rice, beans, guacamole & pico.",     price:"$17.99",              pop:true, img:IMG.food1},
    {name:"Carnitas",                desc:"Deep-fried juicy pork tips in our secret juices. Rice, charro beans, lettuce, pico & salsa tomatillo.",price:"$12.54",                        img:IMG.taquitos2},
    {name:"Flautas",                 desc:"Brisket or shredded chicken in three crispy corn tortillas. Rice, beans, lettuce, guacamole & sour cream.", price:"$10.74",                   img:IMG.taquitos},
    {name:"Sopes",                   desc:"Two homemade corn tortillas with rice, lettuce, sour cream, queso fresco, salsa verde & choice of protein.", price:"$12.09",                  img:IMG.food2},
  ]},
  quesadillas:{label:"🧀 Quesadillas",items:[
    {name:"Traditional Quesadilla", desc:"Choice of cheese, beef, brisket, chicken, mushroom, spinach, potato or veggie. With coleslaw or rice.", price:"From $7.99",           img:IMG.food4},
    {name:"Fajita Quesadilla",      desc:"Chicken, steak or shrimp grilled with onions and peppers inside a flour tortilla with melted cheese.", price:"$13.49", pop:true,      img:IMG.food3},
    {name:"Triple Quesadilla",      desc:"Three layers of shrimp, chicken & steak with cheese, topped with roasted sauce.",                      price:"$15.99", pop:true,      img:IMG.food1},
    {name:"Marinera Quesadilla",    desc:"Tilapia & shrimp with pico de gallo & chipotle sauce inside a flour tortilla with melted cheese.",     price:"$13.49",               img:IMG.ceviche},
  ]},
};

const GALLERY_IMAGES = [
  {url:IMG.food1,       label:"Fresh from the Kitchen"},
  {url:IMG.birria,      label:"Birria Tacos"},
  {url:IMG.food2,       label:"House Specialties"},
  {url:IMG.guacamole,   label:"Guacamole Fresco"},
  {url:IMG.calamari,    label:"Lime Fried Calamari"},
  {url:IMG.ceviche,     label:"Shrimp Cocktail"},
  {url:IMG.taquitos,    label:"Taquitos Dorados"},
  {url:IMG.food3,       label:"Sizzling Fajitas"},
  {url:IMG.food4,       label:"Enchiladas"},
  {url:IMG.interior1,   label:"Inside Los Mariachis"},
  {url:IMG.interior2,   label:"Our Restaurant"},
  {url:IMG.mariachi,    label:"Fiesta Every Night"},
];

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700;900&family=Playfair+Display:ital,wght@0,700;1,400&family=Lora:ital,wght@0,400;1,400&family=Special+Elite&display=swap');
  *{margin:0;padding:0;box-sizing:border-box;}
  html{scroll-behavior:smooth;}
  body{font-family:'Lora',Georgia,serif;background:#fff8e1;color:#1a0800;overflow-x:hidden;}

  .tile-border{height:12px;background:repeating-linear-gradient(90deg,#b71c1c 0,#b71c1c 12px,#f9a825 12px,#f9a825 24px,#1b5e20 24px,#1b5e20 36px,#f9a825 36px,#f9a825 48px,#b71c1c 48px,#b71c1c 60px,#fff8e1 60px,#fff8e1 72px);}
  .diamond-border{height:10px;background:linear-gradient(135deg,#f9a825 25%,transparent 25%) -10px 0,linear-gradient(225deg,#f9a825 25%,transparent 25%) -10px 0,linear-gradient(315deg,#f9a825 25%,transparent 25%),linear-gradient(45deg,#f9a825 25%,transparent 25%);background-size:20px 10px;background-color:#b71c1c;}

  /* NAV */
  .nav{background:#1a0800;border-bottom:4px solid #f9a825;display:flex;align-items:center;justify-content:space-between;padding:0 2.5rem;height:66px;position:sticky;top:0;z-index:200;box-shadow:0 4px 20px rgba(0,0,0,0.6);}
  .nav-logo{font-family:'Cinzel Decorative',serif;color:#f9a825;font-size:1.05rem;letter-spacing:2px;}
  .nav-links{display:flex;gap:1.8rem;list-style:none;}
  .nav-link{font-family:'Special Elite',serif;color:#fff8e1;text-decoration:none;font-size:0.75rem;letter-spacing:2px;text-transform:uppercase;cursor:pointer;border-bottom:2px solid transparent;transition:all 0.2s;}
  .nav-link:hover,.nav-link:focus{color:#f9a825;border-bottom-color:#f9a825;}
  .nav-order{background:#b71c1c !important;color:#fff8e1 !important;padding:0.4rem 1rem;border:2px solid #f9a825 !important;border-bottom:2px solid #f9a825 !important;}
  .nav-order:hover{background:#7f0000 !important;}

  /* HERO */
  .hero{min-height:100vh;position:relative;display:flex;align-items:center;justify-content:center;overflow:hidden;text-align:center;padding:5rem 2rem 4rem;}
  .hero-bg-img{position:absolute;inset:0;background-size:cover;background-position:center;filter:brightness(0.18) saturate(1.3);}
  .hero-overlay{position:absolute;inset:0;background:radial-gradient(ellipse at 30% 60%,rgba(183,28,28,0.45) 0%,transparent 55%),radial-gradient(ellipse at 70% 40%,rgba(27,94,32,0.4) 0%,transparent 55%),radial-gradient(ellipse at 50% 50%,rgba(249,168,37,0.1) 0%,transparent 60%);}
  .hero-pattern{position:absolute;inset:0;opacity:0.06;background-image:repeating-linear-gradient(45deg,#f9a825 0,#f9a825 1px,transparent 1px,transparent 36px),repeating-linear-gradient(-45deg,#f9a825 0,#f9a825 1px,transparent 1px,transparent 36px);pointer-events:none;}
  .hero-content{position:relative;z-index:2;max-width:780px;}
  .hero-eyebrow{display:inline-flex;align-items:center;gap:1rem;font-family:'Special Elite',serif;color:#f9a825;font-size:0.66rem;letter-spacing:6px;text-transform:uppercase;margin-bottom:1.8rem;}
  .hero-eyebrow::before,.hero-eyebrow::after{content:'✦';font-size:0.6rem;}
  .hero-logo-ring{width:160px;height:160px;border-radius:50%;border:4px solid #f9a825;margin:0 auto 1.8rem;background:white;display:flex;align-items:center;justify-content:center;box-shadow:0 0 0 8px rgba(249,168,37,0.1),0 0 0 16px rgba(249,168,37,0.05),0 0 50px rgba(249,168,37,0.35);animation:float 4s ease-in-out infinite;}
  @keyframes float{0%,100%{transform:translateY(0) rotate(-1deg);}50%{transform:translateY(-10px) rotate(1deg);}}
  .hero-logo-ring img{width:88%;height:88%;object-fit:contain;}
  .hero-title{font-family:'Cinzel Decorative',serif;font-size:clamp(2rem,5.5vw,4.2rem);color:#fff8e1;line-height:1.05;margin-bottom:0.3rem;text-shadow:2px 2px 0 rgba(0,0,0,0.5),0 0 40px rgba(249,168,37,0.2);}
  .hero-title-gold{color:#f9a825;}
  .hero-sub{font-family:'Special Elite',serif;color:#ffd54f;font-size:0.85rem;letter-spacing:5px;text-transform:uppercase;margin-bottom:1rem;}
  .hero-divider{display:flex;align-items:center;justify-content:center;gap:1rem;margin:1rem 0;}
  .hero-div-line{width:80px;height:1px;background:rgba(249,168,37,0.4);}
  .hero-tagline{font-style:italic;color:rgba(255,248,225,0.65);font-size:1rem;font-family:'Playfair Display',serif;margin-bottom:0.5rem;}
  .hero-est{font-family:'Special Elite',serif;color:rgba(249,168,37,0.5);font-size:0.65rem;letter-spacing:4px;text-transform:uppercase;margin-bottom:2.5rem;}
  .hero-btns{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;}

  /* BUTTONS */
  .btn-r{background:#b71c1c;color:#fff8e1;font-family:'Special Elite',serif;font-size:0.78rem;letter-spacing:2px;text-transform:uppercase;padding:0.82rem 2rem;border:2px solid #7f0000;cursor:pointer;text-decoration:none;display:inline-block;transition:all 0.25s;clip-path:polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%);}
  .btn-r:hover{background:#7f0000;transform:translateY(-2px);box-shadow:0 8px 20px rgba(183,28,28,0.4);}
  .btn-o{background:transparent;color:#f9a825;font-family:'Special Elite',serif;font-size:0.78rem;letter-spacing:2px;text-transform:uppercase;padding:0.82rem 2rem;border:2px solid #f9a825;cursor:pointer;text-decoration:none;display:inline-block;transition:all 0.25s;clip-path:polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%);}
  .btn-o:hover{background:#f9a825;color:#1a0800;transform:translateY(-2px);}
  .btn-sm{font-size:0.68rem;padding:0.48rem 1.1rem;clip-path:polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%);}

  /* SECTION HEADERS */
  .sec{text-align:center;margin-bottom:2.5rem;}
  .sec-eye{display:inline-flex;align-items:center;gap:0.75rem;font-family:'Special Elite',serif;font-size:0.66rem;letter-spacing:5px;text-transform:uppercase;margin-bottom:0.6rem;}
  .sec-eye::before,.sec-eye::after{content:'';display:block;width:35px;height:1.5px;background:currentColor;opacity:0.7;}
  .sec-h{font-family:'Cinzel Decorative',serif;font-size:clamp(1.6rem,3.5vw,2.5rem);line-height:1.15;}
  .sec-deco{display:flex;align-items:center;justify-content:center;gap:0.8rem;margin-top:0.7rem;}
  .sec-deco-line{width:65px;height:2px;background:#f9a825;}

  /* ABOUT */
  .about{background:#1a0800;padding:5rem 2rem;position:relative;overflow:hidden;}
  .about::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 0% 100%,rgba(27,94,32,0.12) 0%,transparent 50%),radial-gradient(ellipse at 100% 0%,rgba(183,28,28,0.12) 0%,transparent 50%);pointer-events:none;}
  .about-grid{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center;position:relative;z-index:1;}
  .about-p{color:rgba(255,248,225,0.8);font-size:0.92rem;line-height:1.95;margin-bottom:1rem;}
  .about-quote{border-left:3px solid #f9a825;padding:1rem 1.5rem;margin:1.5rem 0;background:rgba(249,168,37,0.05);font-style:italic;color:#ffd54f;font-family:'Playfair Display',serif;font-size:1rem;}
  .about-img-grid{display:grid;grid-template-columns:1fr 1fr;gap:0.8rem;margin-bottom:1.5rem;}
  .about-img{width:100%;aspect-ratio:1;object-fit:cover;border:2px solid rgba(249,168,37,0.25);}
  .about-img-wide{grid-column:1/-1;width:100%;height:120px;object-fit:cover;border:2px solid rgba(249,168,37,0.25);}
  .owners{display:flex;gap:1.5rem;justify-content:center;margin-bottom:1.5rem;}
  .ow{text-align:center;flex:1;}
  .ow-av{width:80px;height:80px;border-radius:50%;border:2.5px solid #f9a825;margin:0 auto 0.6rem;overflow:hidden;background:#3e1a00;display:flex;align-items:center;justify-content:center;font-size:2.2rem;}
  .ow-av img{width:100%;height:100%;object-fit:cover;}
  .ow-name{font-family:'Cinzel Decorative',serif;color:#f9a825;font-size:0.72rem;}
  .ow-title{font-family:'Special Elite',serif;color:rgba(255,248,225,0.45);font-size:0.6rem;letter-spacing:2px;text-transform:uppercase;}
  .stats-grid{display:grid;grid-template-columns:1fr 1fr;gap:1rem;}
  .stat{border:1px solid rgba(249,168,37,0.2);padding:1.2rem;text-align:center;background:rgba(249,168,37,0.04);position:relative;overflow:hidden;}
  .stat::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,#b71c1c,#f9a825,#1b5e20);}
  .stat-n{font-family:'Cinzel Decorative',serif;color:#f9a825;font-size:2rem;}
  .stat-l{font-family:'Special Elite',serif;color:rgba(255,248,225,0.45);font-size:0.58rem;letter-spacing:2px;text-transform:uppercase;}

  /* GALLERY */
  .gallery{background:#fff8e1;padding:5rem 2rem;position:relative;}
  .gallery-inner{max-width:1100px;margin:0 auto;}
  .gallery-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:0.8rem;}
  .g-item{position:relative;overflow:hidden;aspect-ratio:1;cursor:pointer;}
  .g-item img{width:100%;height:100%;object-fit:cover;transition:transform 0.4s;}
  .g-item:hover img{transform:scale(1.07);}
  .g-label{position:absolute;inset:0;background:rgba(26,8,0,0.55);display:flex;align-items:flex-end;padding:0.8rem;opacity:0;transition:opacity 0.3s;}
  .g-item:hover .g-label{opacity:1;}
  .g-label-text{font-family:'Special Elite',serif;color:#f9a825;font-size:0.7rem;letter-spacing:1px;}
  /* Featured wide items */
  .g-item.wide{grid-column:span 2;}

  /* SPECIALS */
  .specials{background:#b71c1c;padding:3.5rem 2rem;text-align:center;position:relative;}
  .specials::before,.specials::after{content:'';position:absolute;left:0;right:0;height:10px;background:repeating-linear-gradient(90deg,#1a0800 0,#1a0800 10px,#f9a825 10px,#f9a825 20px);}
  .specials::before{top:0;} .specials::after{bottom:0;}
  .specs-grid{max-width:880px;margin:2rem auto 0;display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;}
  .spec-card{border:1.5px solid rgba(255,248,225,0.22);padding:2rem 1.2rem;background:rgba(0,0,0,0.12);}
  .spec-icon{font-size:2.5rem;margin-bottom:0.7rem;}
  .spec-title{font-family:'Cinzel Decorative',serif;color:#f9a825;font-size:0.82rem;margin-bottom:0.4rem;}
  .spec-desc{color:rgba(255,248,225,0.78);font-size:0.8rem;line-height:1.7;}

  /* MENU */
  .menu-sec{background:#fff8e1;padding:5rem 2rem;position:relative;}
  .menu-sec::before{content:'MENÚ';position:absolute;font-family:'Cinzel Decorative',serif;font-size:11rem;font-weight:900;color:rgba(183,28,28,0.04);top:50%;left:50%;transform:translate(-50%,-50%);pointer-events:none;white-space:nowrap;letter-spacing:2rem;z-index:0;}
  .menu-inner{max-width:1100px;margin:0 auto;position:relative;z-index:1;}
  .menu-tabs{display:flex;flex-wrap:wrap;gap:0.4rem;justify-content:center;margin-bottom:2.5rem;}
  .tab{font-family:'Special Elite',serif;font-size:0.68rem;letter-spacing:2px;text-transform:uppercase;padding:0.52rem 1.1rem;border:1.5px solid #3e1a00;background:transparent;color:#3e1a00;cursor:pointer;transition:all 0.2s;}
  .tab.active{background:#b71c1c;border-color:#7f0000;color:#fff8e1;}
  .tab:hover:not(.active){background:#ffecb3;}
  .menu-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.2rem;}
  .mcard{background:white;border:1px solid rgba(61,26,0,0.1);border-top:4px solid #b71c1c;position:relative;transition:all 0.25s;box-shadow:2px 4px 14px rgba(0,0,0,0.06);overflow:hidden;}
  .mcard:hover{transform:translateY(-4px);box-shadow:4px 14px 30px rgba(0,0,0,0.13);}
  .mcard.is-pop{border-top-color:#f9a825;}
  .mcard.is-veg{border-top-color:#1b5e20;}
  .mcard-img{width:100%;height:160px;object-fit:cover;display:block;}
  .mcard-img-placeholder{width:100%;height:160px;background:linear-gradient(135deg,#ffecb3,#fff8e1);display:flex;align-items:center;justify-content:center;font-size:3rem;}
  .mcard-body{padding:1.2rem;}
  .mbadge{position:absolute;top:0;right:0.8rem;font-family:'Special Elite',serif;font-size:0.53rem;letter-spacing:1px;text-transform:uppercase;padding:0.15rem 0.5rem;}
  .mbadge-pop{background:#f9a825;color:#1a0800;}
  .mbadge-veg{background:#1b5e20;color:white;}
  .mname{font-family:'Playfair Display',serif;font-size:0.98rem;color:#1a0800;margin-bottom:0.32rem;font-weight:700;line-height:1.3;}
  .mdesc{font-size:0.75rem;color:rgba(26,8,0,0.58);line-height:1.62;margin-bottom:0.8rem;}
  .mfoot{display:flex;align-items:center;justify-content:space-between;gap:0.5rem;}
  .mprice{font-family:'Special Elite',serif;color:#b71c1c;font-size:0.78rem;line-height:1.4;}
  .morder{background:#1b5e20;color:white;border:none;font-family:'Special Elite',serif;font-size:0.58rem;letter-spacing:1px;text-transform:uppercase;padding:0.3rem 0.75rem;cursor:pointer;transition:background 0.2s;white-space:nowrap;text-decoration:none;display:inline-block;}
  .morder:hover{background:#2e7d32;}

  /* FEATURE STRIP */
  .feature-strip{background:#1a0800;padding:4rem 2rem;position:relative;overflow:hidden;}
  .feature-strip-inner{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:center;}
  .feature-img{width:100%;height:380px;object-fit:cover;border:3px solid rgba(249,168,37,0.3);}
  .feature-text{color:rgba(255,248,225,0.85);}
  .feature-text h3{font-family:'Cinzel Decorative',serif;color:#f9a825;font-size:1.5rem;margin-bottom:1rem;line-height:1.3;}
  .feature-text p{font-size:0.92rem;line-height:1.9;margin-bottom:1.2rem;}

  /* COCKTAILS */
  .cock{background:#1a0800;padding:5rem 2rem;position:relative;overflow:hidden;}
  .cock::before{content:'';position:absolute;inset:0;background:repeating-linear-gradient(60deg,rgba(183,28,28,0.04) 0,rgba(183,28,28,0.04) 1px,transparent 1px,transparent 40px),repeating-linear-gradient(-60deg,rgba(27,94,32,0.04) 0,rgba(27,94,32,0.04) 1px,transparent 1px,transparent 40px);pointer-events:none;}
  .cock-grid{max-width:1000px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:1.2rem;position:relative;z-index:1;}
  .ccard{background:rgba(255,255,255,0.03);border:1px solid rgba(249,168,37,0.15);padding:1.6rem 1rem;text-align:center;position:relative;overflow:hidden;transition:all 0.25s;}
  .ccard::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,#b71c1c,#f9a825,#1b5e20,#f9a825,#b71c1c);}
  .ccard:hover{background:rgba(255,255,255,0.06);transform:translateY(-4px);border-color:rgba(249,168,37,0.4);box-shadow:0 12px 30px rgba(0,0,0,0.3);}
  .cemoji{font-size:2.4rem;margin-bottom:0.7rem;display:block;}
  .cname{font-family:'Playfair Display',serif;color:#f9a825;font-size:0.92rem;margin-bottom:0.35rem;}
  .cdesc{font-size:0.7rem;color:rgba(255,248,225,0.5);line-height:1.65;margin-bottom:0.7rem;}
  .cprice{font-family:'Special Elite',serif;color:#ffd54f;font-size:0.75rem;letter-spacing:1px;}

  /* LOCATIONS */
  .locs{background:#ffecb3;padding:5rem 2rem;}
  .locs-grid{max-width:840px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:2.5rem;}
  .lcard{background:#1a0800;padding:2.5rem 1.8rem;text-align:center;border:2px solid #f9a825;position:relative;overflow:hidden;}
  .lcard::before{content:'';position:absolute;top:6px;left:6px;right:6px;bottom:6px;border:1px solid rgba(249,168,37,0.18);pointer-events:none;}
  .lcard-icon{font-size:2.5rem;margin-bottom:0.7rem;}
  .lcard-name{font-family:'Cinzel Decorative',serif;color:#f9a825;font-size:1.1rem;margin-bottom:1.1rem;}
  .lcard-addr{font-family:'Special Elite',serif;color:rgba(255,248,225,0.65);font-size:0.75rem;letter-spacing:1px;margin-bottom:0.3rem;}
  .lcard-phone{font-family:'Playfair Display',serif;color:#ffd54f;font-size:1.25rem;margin:1.1rem 0;display:block;text-decoration:none;}
  .lcard-phone:hover{color:#f9a825;}
  .lcard-btns{display:flex;gap:0.7rem;justify-content:center;flex-wrap:wrap;margin-bottom:1.3rem;}
  .hrs-box{border-top:1px solid rgba(249,168,37,0.18);padding-top:1.1rem;margin-top:1.1rem;}
  .hrs-title{font-family:'Special Elite',serif;color:#f9a825;font-size:0.6rem;letter-spacing:3px;text-transform:uppercase;margin-bottom:0.6rem;}
  .hrs-row{display:flex;justify-content:space-between;color:rgba(255,248,225,0.55);font-size:0.72rem;margin-bottom:0.25rem;}

  /* FOOTER */
  footer{background:#0d0400;border-top:3px solid #f9a825;padding:3rem 2rem;text-align:center;}
  .flogo{font-family:'Cinzel Decorative',serif;color:#f9a825;font-size:1.4rem;margin-bottom:0.3rem;}
  .ftag{font-style:italic;color:rgba(255,248,225,0.3);font-size:0.85rem;margin-bottom:2rem;}
  .flinks{display:flex;justify-content:center;gap:1.8rem;list-style:none;margin-bottom:1.5rem;flex-wrap:wrap;}
  .flink{font-family:'Special Elite',serif;color:rgba(255,248,225,0.4);text-decoration:none;font-size:0.7rem;letter-spacing:1.5px;text-transform:uppercase;cursor:pointer;transition:color 0.2s;}
  .flink:hover{color:#f9a825;}
  .fcopy{color:rgba(255,248,225,0.18);font-size:0.68rem;font-family:'Special Elite',serif;letter-spacing:2px;}

  @media(max-width:780px){
    .about-grid,.locs-grid,.feature-strip-inner{grid-template-columns:1fr;}
    .menu-grid{grid-template-columns:1fr 1fr;}
    .cock-grid{grid-template-columns:1fr 1fr;}
    .specs-grid{grid-template-columns:1fr;}
    .gallery-grid{grid-template-columns:repeat(2,1fr);}
    .g-item.wide{grid-column:span 1;}
    .nav-links{display:none;}
    .hero-title{font-size:2rem;}
  }
`;

/* ── SHARED HEADER ── */
function SH({eye,title,accent,icon,ec,tc,ac}){
  return(
    <div className="sec">
      <div className="sec-eye" style={{color:ec||C.red}}>{eye}</div>
      <div className="sec-h" style={{color:tc||C.espresso}}>
        {title} <span style={{color:ac||C.red}}>{accent}</span>
      </div>
      <div className="sec-deco">
        <div className="sec-deco-line"/><span style={{color:C.gold,fontSize:"1rem"}}>{icon}</span><div className="sec-deco-line"/>
      </div>
    </div>
  );
}

/* ── NAV ── */
function Nav({onNav}){
  return(
    <nav className="nav">
      <div className="nav-logo">Los Mariachis</div>
      <ul className="nav-links">
        {[["Our Story","about"],["Gallery","gallery"],["Menu","menu"],["Cocktails","cocktails"],["Locations","locations"]].map(([l,id])=>(
          <li key={id}><span className="nav-link" onClick={()=>onNav(id)}>{l}</span></li>
        ))}
        <li><a href="https://www.grubhub.com/restaurant/los-mariachis-mexican-restaurant-7794-ella-ln-ste-a-fairburn/1089157" target="_blank" rel="noopener noreferrer" className="nav-link nav-order">Order Now</a></li>
      </ul>
    </nav>
  );
}

/* ── HERO ── */
function Hero({onNav}){
  return(
    <section className="hero">
      <div className="hero-bg-img" style={{backgroundImage:`url(${IMG.hero})`}}/>
      <div className="hero-overlay"/>
      <div className="hero-pattern"/>
      <div className="hero-content">
        <div className="hero-eyebrow">Authentic Mexican Cuisine</div>
        <div className="hero-logo-ring">
          <img src={IMG.logo} alt="Los Mariachis" onError={e=>{e.target.style.display="none";e.target.parentNode.innerHTML="<span style='font-size:3rem'>🎺</span>";}}/>
        </div>
        <h1 className="hero-title">Los <span className="hero-title-gold">Mariachis</span></h1>
        <div className="hero-sub">Mexican Restaurant</div>
        <div className="hero-divider">
          <div className="hero-div-line"/><span style={{color:C.gold,fontSize:"1.2rem"}}>🌮</span><div className="hero-div-line"/>
        </div>
        <p className="hero-tagline">"Come as a stranger, leave as a friend."</p>
        <p className="hero-est">Est. 2010 · Peachtree City & Fairburn, Georgia</p>
        <div className="hero-btns">
          <span className="btn-r" onClick={()=>onNav("menu")}>View Our Menu</span>
          <a href="https://www.grubhub.com/restaurant/los-mariachis-mexican-restaurant-7794-ella-ln-ste-a-fairburn/1089157" target="_blank" rel="noopener noreferrer" className="btn-o">Order Online</a>
        </div>
      </div>
    </section>
  );
}

/* ── ABOUT ── */
function About(){
  return(
    <section className="about" id="about">
      <div className="about-grid">
        <div>
          <SH eye="Our Story" title="A Family" accent="Tradition" icon="🎺" ec={C.gold} tc={C.cream} ac={C.gold}/>
          <p className="about-p">Los Mariachis isn't just a restaurant — it's a journey that started over 12 years ago when two brothers, Mario and Jose Garcia, fueled by a passion for authentic Mexican cuisine, embarked on a mission to bring the best flavors to the Atlanta area.</p>
          <div className="about-quote">"Simply the best Mexican food. Two brothers from humble beginnings set out to give Atlanta something real."</div>
          <p className="about-p">As a family, we pour our hearts into every dish and cocktail we create. We take immense pride in what we serve our guests, and our love for the communities we're part of knows no bounds.</p>
        </div>
        <div>
          <div className="about-img-grid">
            <img src={IMG.food1}    className="about-img" alt="Food" onError={e=>e.target.style.display="none"}/>
            <img src={IMG.food2}    className="about-img" alt="Food" onError={e=>e.target.style.display="none"}/>
            <img src={IMG.interior1} className="about-img-wide" alt="Restaurant" onError={e=>e.target.style.display="none"}/>
          </div>
          <div className="owners">
            {[["Mario Garcia","Co-Owner"],["Jose Garcia","Co-Owner"]].map(([n,t])=>(
              <div key={n} className="ow">
                <div className="ow-av">👨‍🍳</div>
                <div className="ow-name">{n}</div>
                <div className="ow-title">{t}</div>
              </div>
            ))}
          </div>
          <div className="stats-grid">
            {[["12+","Years Serving"],["2","Locations"],["100%","Family Owned"],["∞","Made with Love"]].map(([n,l])=>(
              <div key={l} className="stat"><div className="stat-n">{n}</div><div className="stat-l">{l}</div></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── GALLERY ── */
function Gallery(){
  return(
    <section className="gallery" id="gallery">
      <div className="gallery-inner">
        <SH eye="From Our Kitchen" title="Photo" accent="Gallery" icon="📸"/>
        <div className="gallery-grid">
          {GALLERY_IMAGES.map((img,i)=>(
            <div key={i} className={`g-item${i===0||i===4?"  wide":""}`}>
              <img src={img.url} alt={img.label} onError={e=>e.target.style.opacity="0"}/>
              <div className="g-label"><span className="g-label-text">{img.label}</span></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── SPECIALS ── */
function Specials(){
  return(
    <section className="specials">
      <SH eye="This Week" title="Daily" accent="Specials" icon="🎊" ec={C.goldLt} tc={C.cream} ac={C.gold}/>
      <div className="specs-grid">
        {[
          {i:"🌮",t:"Taco Tuesday",d:"$3 street tacos all day long. Dine-in only. Your choice of protein. Limit 6 per person."},
          {i:"🍹",t:"Happy Hour",d:"Mon–Fri 3–6 PM. Half-price margaritas & $2 off all draft Mexican beers. Dine-in only."},
          {i:"🎸",t:"Live Mariachi",d:"Fridays & Saturdays 6–9 PM at both locations. Tip your musicians — they play con alma!"},
        ].map(s=>(
          <div key={s.t} className="spec-card">
            <div className="spec-icon">{s.i}</div>
            <div className="spec-title">{s.t}</div>
            <div className="spec-desc">{s.d}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── MENU ── */
function Menu(){
  const [tab,setTab]=useState("tacos");
  const cat=MENU[tab];
  return(
    <section className="menu-sec" id="menu">
      <div className="menu-inner">
        <SH eye="Authentic Flavors" title="Our" accent="Menu" icon="🌶"/>
        <p style={{textAlign:"center",fontStyle:"italic",color:"rgba(26,8,0,0.5)",fontSize:"0.8rem",marginBottom:"2rem",marginTop:"-1rem"}}>
          Made fresh daily · Real ingredients · Family recipes since 2010
        </p>
        <div className="menu-tabs">
          {Object.entries(MENU).map(([k,v])=>(
            <button key={k} className={`tab${tab===k?" active":""}`} onClick={()=>setTab(k)}>{v.label}</button>
          ))}
        </div>
        <div className="menu-grid">
          {cat.items.map(item=>(
            <div key={item.name} className={`mcard${item.pop?" is-pop":item.veg?" is-veg":""}`}>
              {item.pop&&<div className="mbadge mbadge-pop">⭐ Must Try</div>}
              {item.veg&&<div className="mbadge mbadge-veg">🌿 Veggie</div>}
              {item.img
                ? <img src={item.img} alt={item.name} className="mcard-img" onError={e=>{e.target.style.display="none";e.target.nextSibling&&(e.target.nextSibling.style.display="flex");}}/>
                : <div className="mcard-img-placeholder">🌮</div>
              }
              <div className="mcard-body">
                <div className="mname">{item.name}</div>
                <div className="mdesc">{item.desc}</div>
                <div className="mfoot">
                  <div className="mprice">{item.price}</div>
                  <a href="https://www.grubhub.com/restaurant/los-mariachis-mexican-restaurant-7794-ella-ln-ste-a-fairburn/1089157" target="_blank" rel="noopener noreferrer" className="morder">Order →</a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{textAlign:"center",marginTop:"2.5rem"}}>
          <a href="https://www.grubhub.com/restaurant/los-mariachis-mexican-restaurant-7794-ella-ln-ste-a-fairburn/1089157" target="_blank" rel="noopener noreferrer" className="btn-r">Order Full Menu Online</a>
        </div>
      </div>
    </section>
  );
}

/* ── FEATURE STRIP ── */
function FeatureStrip(){
  return(
    <section className="feature-strip">
      <div className="feature-strip-inner">
        <img src={IMG.mariachi} alt="Mariachi night" className="feature-img" onError={e=>e.target.style.display="none"}/>
        <div className="feature-text">
          <h3>Live Mariachi Music Every Weekend</h3>
          <p>Every Friday and Saturday evening from 6–9 PM, our mariachi band fills both locations with the sounds of Mexico. Enjoy traditional corridos, rancheras, and boleros while you dine.</p>
          <p>Come for the food, stay for the música. Whether you're celebrating a birthday, anniversary, or just another Tuesday — Los Mariachis makes every night a fiesta.</p>
          <span className="btn-o">Visit Us Tonight</span>
        </div>
      </div>
    </section>
  );
}

/* ── COCKTAILS ── */
function Cocktails(){
  const COCKTAILS=[
    {e:"🍹",n:"House Margarita",d:"Classic margarita with premium tequila, fresh lime & triple sec. On the rocks or frozen.",p:"Ask your server"},
    {e:"🥭",n:"Mango Margarita",d:"Blended mango with silver tequila & lime. Available frozen or on the rocks.",p:"Ask your server"},
    {e:"🍓",n:"Strawberry Margarita",d:"Fresh strawberry blended with tequila & lime. The most popular frozen drink.",p:"Ask your server"},
    {e:"🍺",n:"Mexican Beer",d:"Modelo, Corona, Dos Equis & more. Ask your server for selections & specials.",p:"Ask your server"},
    {e:"🥂",n:"Sangria",d:"House red wine sangria with seasonal fruit. Refreshing & perfect for the table.",p:"Ask your server"},
    {e:"🌶",n:"Spicy Margarita",d:"Jalapeño-infused tequila, fresh lime & Tajín rim. Sweet heat in every sip.",p:"Ask your server"},
    {e:"🧊",n:"Paloma",d:"Tequila with fresh grapefruit & a squeeze of lime. Light, bright & refreshing.",p:"Ask your server"},
    {e:"🫧",n:"Frozen Specialty",d:"Ask about our rotating frozen specialty drinks — they change with the season!",p:"Ask your server"},
  ];
  return(
    <section className="cock" id="cocktails">
      <SH eye="Handcrafted" title="Margaritas &" accent="Cocktails" icon="🍹" ec={C.gold} tc={C.cream} ac={C.gold}/>
      <div className="cock-grid">
        {COCKTAILS.map(c=>(
          <div key={c.n} className="ccard">
            <span className="cemoji">{c.e}</span>
            <div className="cname">{c.n}</div>
            <div className="cdesc">{c.d}</div>
            <div className="cprice">{c.p}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── LOCATIONS ── */
function Locations(){
  const LOCS=[
    {name:"Peachtree City",addr:["2860 GA-54","Peachtree City, GA 30269"],phone:"(770) 629-4218",tel:"7706294218",maps:"https://maps.google.com/?q=2860+GA-54+Peachtree+City+GA"},
    {name:"Fairburn",addr:["7794 Ella Ln, Ste A","Fairburn, GA 30213"],phone:"(770) 703-8376",tel:"7707038376",maps:"https://maps.google.com/?q=7794+Ella+Ln+Fairburn+GA"},
  ];
  const hrs=[["Mon – Thu","11am – 10pm"],["Fri – Sat","11am – 11pm"],["Sunday","11am – 10pm"]];
  return(
    <section className="locs" id="locations">
      <SH eye="Find Us" title="Our" accent="Locations" icon="📍"/>
      <div className="locs-grid">
        {LOCS.map(loc=>(
          <div key={loc.name} className="lcard">
            <div className="lcard-icon">🏡</div>
            <div className="lcard-name">{loc.name}</div>
            {loc.addr.map(l=><div key={l} className="lcard-addr">{l}</div>)}
            <a href={`tel:${loc.tel}`} className="lcard-phone">{loc.phone}</a>
            <div className="lcard-btns">
              <a href={loc.maps} target="_blank" rel="noopener noreferrer" className="btn-o btn-sm">Directions</a>
              <a href="https://www.grubhub.com/restaurant/los-mariachis-mexican-restaurant-7794-ella-ln-ste-a-fairburn/1089157" target="_blank" rel="noopener noreferrer" className="btn-r btn-sm">Order Online</a>
            </div>
            <div className="hrs-box">
              <div className="hrs-title">Hours</div>
              {hrs.map(([d,t])=><div key={d} className="hrs-row"><span>{d}</span><span>{t}</span></div>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── FOOTER ── */
function Footer({onNav}){
  return(
    <footer>
      <div className="flogo">Los Mariachis</div>
      <div className="ftag">"Come as a stranger, leave as a friend."</div>
      <ul className="flinks">
        {[["Our Story","about"],["Gallery","gallery"],["Menu","menu"],["Cocktails","cocktails"],["Locations","locations"]].map(([l,id])=>(
          <li key={l}><span className="flink" onClick={()=>onNav(id)}>{l}</span></li>
        ))}
        <li><a href="https://www.grubhub.com/restaurant/los-mariachis-mexican-restaurant-7794-ella-ln-ste-a-fairburn/1089157" target="_blank" rel="noopener noreferrer" className="flink">Order Online</a></li>
      </ul>
      <div className="fcopy">© {new Date().getFullYear()} Los Mariachis · Family Owned & Operated · Peachtree City & Fairburn, GA</div>
    </footer>
  );
}

/* ── APP ── */
export default function App(){
  const scrollTo=(id)=>{const el=document.getElementById(id);if(el)el.scrollIntoView({behavior:"smooth"});};
  return(
    <>
      <style>{css}</style>
      <Nav onNav={scrollTo}/>
      <Hero onNav={scrollTo}/>
      <div className="tile-border"/>
      <About/>
      <div className="diamond-border"/>
      <Gallery/>
      <div className="diamond-border" style={{transform:"scaleY(-1)"}}/>
      <Specials/>
      <div className="diamond-border" style={{transform:"scaleY(-1)"}}/>
      <Menu/>
      <div className="tile-border"/>
      <FeatureStrip/>
      <div className="tile-border"/>
      <Cocktails/>
      <div className="tile-border"/>
      <Locations/>
      <div className="diamond-border"/>
      <Footer onNav={scrollTo}/>
    </>
  );
}
