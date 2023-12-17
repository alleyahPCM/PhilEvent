-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 17, 2023 at 12:57 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `philevent`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `id` int(11) NOT NULL,
  `firstname` varchar(500) NOT NULL,
  `lastname` varchar(500) NOT NULL,
  `email` varchar(500) NOT NULL,
  `username` varchar(500) NOT NULL,
  `password` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`id`, `firstname`, `lastname`, `email`, `username`, `password`) VALUES
(18, 'Rieze', 'Maxia', 'riezemaxia@gmail.com', 'riezemaxia', '$2a$10$ru6nQW/dCt.aNcHydROZAuO8MLEjzkksWrON6rL8/Wq/2.JvSQVX6');

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `title` varchar(500) NOT NULL,
  `city` varchar(500) NOT NULL,
  `address` varchar(500) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `ticket_price` varchar(500) NOT NULL,
  `description` varchar(500) NOT NULL,
  `link` varchar(500) NOT NULL,
  `image` varchar(500) NOT NULL,
  `hash` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `title`, `city`, `address`, `date`, `time`, `ticket_price`, `description`, `link`, `image`, `hash`) VALUES
(216, 'Christmas Party Night', 'cebu', 'Philippines', '2023-12-25', '20:00:00', 'PHP 3.6k', '- 🍹 Unlimited Alcohol: Enjoy a night of boundless merriment with bottomless glasses and festive concoctions that keep the spirits high!- 🍔 Free Food Galore: Indulge in a feast of delectable delights! Our Christmas Night Party offers complimentary mouthwatering bites to satisfy every craving.- 🎧 DJ and Music Extravaganza: Groove to the beats of the season as our DJ spins a mix of holiday classics and chart-toppers creating an atmosphere that\'ll keep you dancing all night long.- 🚹 Stag and Couple ', 'https://allevents.in/cebu/christmas-party-night/80006036182938?ref=eventlist-new', 'https://cdn2.allevents.in/thumbs/thumb6578943769bda.jpg', 'ceecac21513705988fc5019c86735d713d91626cb63ed725828b629197a6badc'),
(217, 'Burnout Car Drag Race', 'cebu', 'Gabi, Cordova, Cebu', '2024-01-13', '08:00:00', 'Free', 'Here\'s what you need to know about Burnout Drag Race:\nDESCRIPTION OF THE EVENT:  \n   Burnout will be a series of car & motorcycle drag races and car shows beginning December 8, 2023 until December 8, 2024.  Part of the proceeds will go to less fortunate families in Cordova, Cebu.\n\nWHERE:  \n   Experience for the first time the newest and the best race track in the Visayas located at Cordova, Cebu. Not only that, our venue will have its very own unique lighted food park with nightly entertainment ', 'https://allevents.in/cebu/burnout-car-drag-race/200025850365725?ref=eventlist-new', 'https://cdn-az.allevents.in/events1/banners/d5769ccdee3ba1983403b8e04c3cd3b96b37bc2bc42e48d4d1a28bc1766bd987-rimg-w960-h747-gmir.jpg?v=1702806874', '217c816f0d2e8bb14d8e707001acaab273ac2bb9036aa3a64344d8dce9136965'),
(218, 'PAROL MAKING CONTEST', 'cebu', 'Brgy. San Francisco East, Alangalang, Leyte', '2023-12-23', '17:00:00', 'Free', '� Inviting all the residents of Brgy. San Francisco East, Alangalang, Leyte �\n\nWhat: PAROL MAKING CONTEST � 10 limited entries only! \n\nRegistration: December 4 til Dec. 15, 2023\n\nPlease approach any SK Official for the registration. Thanks!', 'https://allevents.in/cebu/parol-making-contest/200025906261432?ref=eventlist-new', 'https://cdn-az.allevents.in/events8/banners/05bad64de97adeeac6d739e78add6bea07fdde90f8376dfd59fdc797d9ac04ae-rimg-w619-h928-gmir.jpg?v=1702796267', '853ffcffa116fb7959d5ce137f803b6af11b358afbe4a3fe819e878533e83f7b'),
(219, 'Christmas Raffle 🎫🎄✨🎁', 'cebu', 'HanIca\'s PreLoved and New Fashion', '2023-12-24', '16:30:00', 'Free', '1 Ticket in every P200 worth of purchase.\nStart collecting of Tickets from November 24 2023 till December 24 2023. 🎫 Drawing @ 6:30pm on December 24 2023 @HanIca Shop.', 'https://allevents.in/cebu/christmas-raffle-🎫🎄✨🎁/200025863724514?ref=eventlist-new', 'https://cdn-az.allevents.in/events7/banners/935a008d28c1dbb297c803b1c886a723a7102b66051392e205b407142e26f1e9-rimg-w960-h429-gmir.jpg?v=1702806878', '5273f6b457c4823cba67d05802f1475aff01ccf8ad3a3ac1666128d82c329a78'),
(220, 'Aquaman 2 Screening for a Cause', 'cebu', 'Robinsons Galleria, Cebu City', '2023-12-23', '14:00:00', 'Free', '🎬 \"One King will lead Us All\"\n\nLooking to add a meaningful touch to your holiday season? Join us for a movie with a cause! 🍿\n\n📅 Date: December 23, 2023, Saturday\n🕔 Time: 2:00 PM\n📍 Venue: Robinson’s Movieworld Galleria - Cebu Cinema 6\n\nTicket Price: Php 600 (Includes snacks, drinks, and a raffle entry for cool prizes!)\n\nThe proceeds will support JCI-Cebu Sinulog in their community projects and advocacies. Be a part of this good cause!\n\n👉 Reserve your seat now! Scan the QR code or register through', 'https://allevents.in/cebu/aquaman-2-screening-for-a-cause/200025850379312?ref=eventlist-new', 'https://cdn-az.allevents.in/events10/banners/d685326cd5e21e36a141229bf86b86545b64ffa5c0087d465214b4bac56c02bc-rimg-w960-h768-gmir.jpg?v=1702783640', 'a8828bc5a7f2099c90c0f45a9d5fdd35077f987daa8f8e13301e10ebc3adbe8e'),
(221, 'Automoto Show', 'cebu', 'GT Mall Ungka II Pavia Iloilo', '2023-12-24', '02:00:00', 'Free', '� BATTLE OF THE LEGENDS �\n\n� Car and Mototrike Show �\n\n� DECEMBER 23,2023 SATURDAY \n\n� GT MALL Pavia\n(Pavia, ilo-ilo)\n\nTHAI PRO - THAI NONPRO - STANCE - MALAYSIAN - MODIFIED - PANTRA - TRICYCLE - BIGBIKE - CLASSIC - AUTO - OTJ - 4X4\n\n� Overall Thai-Pro With Cash And Big Trophy\n� Overall Thai-Non pro With Cash And Big Trophy\n� Overall Stance With Cash And Big Trophy\n� Overall Modified With Cash And Big Trophy\n� Overall Malaysian With Cash And Big Trophy\n� Overall Pantra With Cash And Big Trophy\n�', 'https://allevents.in/cebu/automoto-show/200025894570431?ref=eventlist-new', 'https://cdn-az.allevents.in/events9/banners/cc960d654c1e7c566a02b3a054ccb5d3d791867bf638c5e46617d6b172ff5de3-rimg-w960-h480-gmir.jpg?v=1702796285', '1071d9f7a0b937d416b044a078fe453fd417f3109a997a19fd5c47cd914539ac'),
(222, 'Just Dance: Prosperity to 2024', 'cebu', 'SM Seaside City Cebu (Official)', '2023-12-31', '19:00:00', 'Free', 'Celebrate New Year In SM Seaside\n\n🎉 Exciting news, dancers! Just Dance: Prosperity is here to take us on a groovy ride all the way to 2024! 🌟✨ Get ready to bust some moves and have a blast with the newest edition of this beloved game. 💃🕺\n\nJust Dance: Prosperity is not just a game; it\'s a dance revolution that brings joy, happiness, and tons of fun into our lives. Whether you\'re a skilled dancer or a total beginner, this game has something for everyone. 🎶🤩 With over 40 tracks featuring the hottes', 'https://allevents.in/cebu/just-dance-prosperity-to-2024/200025850377104?ref=eventlist-new', 'https://cdn-az.allevents.in/events1/banners/07551c987f4d24e20d691b7fb2eb00a5afdf64665f94fc2db6aac5ed41422237-rimg-w960-h540-gmir.jpg?v=1702204433', '6e4c7be71eb5196943787df0074ca5f055e66cb69bedfe907bf2cec62ba23023'),
(223, 'SOUL Sessions 2023 | WE SING OF HIS LOVE', 'cebu', 'Sky Hall Seaside SM Cebu', '2023-12-30', '15:00:00', 'Free', 'We are thrilled to announce to you that the Living Word Global Ministries, Inc. – Morning Service’s benefit concert, “S.O.U.L Sessions (Songs Of Unfailing Love)” will be making its return after a three-year hiatus due to the global pandemic! 😊\n\n📌 The event will happen on December 30th, 2023, Saturday, at 3:00 pm, and will once again be held at the SM Seaside Sky Hall. \n\nAs in the past, this benefit concert serves primarily as a fundraiser for the completion of our church building project, the LW', 'https://allevents.in/cebu/soul-sessions-2023-|-we-sing-of-his-love/200025422207631?ref=eventlist-new', 'https://cdn-az.allevents.in/events9/banners/6ab6ae607e1865744987e86502d54336dd5c6a5774663c799c9ed47b4d67b349-rimg-w960-h540-gmir.jpg?v=1702584803', '0721863a02ac0794e2dca6515898adb734976a15f119c5cb57c6afcf97c4d2d1'),
(224, 'CHRISTMAS CUPCAKES FOR A CAUSE', 'cebu', 'Cess Cakes', '2023-12-23', '15:00:00', 'Free', '[MAY CUPCAKES KA NA, NAKABULIG KA PA!]\n\"It\'s not always about what we gain but what we can give to the community.\" In partnership with SPAG-Asa Family [SPAG-Asa Farmers and Workers Association - SAFWA] \n》We present to you our \"Christmas cupcakes for a cause\" for only P850.00 a dozen 20% of the total sale will be use to buy goods [spaghetti] to be donated on the said CHARITY. \"Wala ka lang nag bakal sang pang noche buena ninyo but nag hatag kaman para sa imu isigkataho...\"\n\n||PRE-ORDER NOW! Pick ', 'https://allevents.in/cebu/christmas-cupcakes-for-a-cause/200025894569321?ref=eventlist-new', 'https://cdn-az.allevents.in/events8/banners/3ed5af5f4a969a496fad5f5f3273f5920e8c9267cfb034c567da6612bfc02930-rimg-w960-h960-gmir.jpg?v=1702553352', '8bc20aff60faf2798566bf3d5caab563eb443913bac56654442105255327b72c'),
(225, 'CHRISTMAS SUNDAY BRUNCH BUFFET IN BAYSIDE BANATE', 'cebu', 'Bayside Banate', '2023-12-24', '11:00:00', 'Free', 'Join us for a festive Christmas Sunday Brunch Buffet at Bayside Banate on December 24, 2023 from 12nn to 2pm!\n\nIndulge in a delightful spread for only Php 349!\n\nSPECIAL TREATS 🍽️🎁\n🎄 20% Anniversary Promo Discount on your Total Bill\n🎄 50% Discount to kids 7 years old and below\n🎄 Early Bird Promo plus 5% Discount if booked before December 18, 2023\n\nCelebrate with your loved ones and savor the flavors of the season. Reserve your table now for a joyous feast! 🌟🥂 \n\nMessage us directly or call Ms. Jos', 'https://allevents.in/cebu/christmas-sunday-brunch-buffet-in-bayside-banate/200025905051707?ref=eventlist-new', 'https://cdn-az.allevents.in/events8/banners/9f340d7a6e6aba43e4cb677a60c5e61021243580d980358a194f7e715b571bb0-rimg-w805-h960-gmir.jpg?v=1702796309', 'a2b02eff037db6c74419f307fa26eb533deff117b271b295281e57d5778af110'),
(226, 'Cebu Basic Pointed Pen Calligraphy Workshop', 'cebu', 'enspace Cebu', '2024-01-06', '09:00:00', 'Free', 'CEBU BASIC POINTED PEN CALLIGRAPHY WORKSHOP\nfor Beginners\n\n👉 WORKSHOP DETAILS:\n- Date: JANUARY 6, 2024 (Saturday)\n- Time: 9:00am to 12:00nn\n- Venue:  Unit 1102 11th Floor Park Centrale Building, Jose Maria Del Mar St., IT Park, Lahug, Cebu City\n- No. of participants: 10\n\n👉 WORKSHOP FEE:\n- Regular Rate:  P2500\n- Inclusions: Calligraphy starter kit to use & take home, 3 hours workshop, certificate \n- Participants may bring their own snack/drink\n- Payment Method: BPI or GCash\n\n🔥🔥🔥\n🐦 EARLY BIRD PROM', 'https://allevents.in/cebu/cebu-basic-pointed-pen-calligraphy-workshop/200025850377004?ref=eventlist-new', 'https://cdn-az.allevents.in/events5/banners/f21c4ed5927334aea03d29c96bb669ce2be8ac751a830bd32e0c8b89774bde1e-rimg-w960-h720-gmir.jpg?v=1702628236', '60169d997ef1e82df74bea0cbe4b59b3bf19282a139f189dd90d8e06d74a2fa5'),
(227, 'Brgy. Christmas Part 2k23', 'cebu', 'Nagbangi, Leon, Iloilo', '2023-12-23', '07:00:00', 'Free', 'Together with the Sangguniang Kabataan and Barangay Officials of Nagbangi, we are going to held a one day event entitled “Barangay Christmas Party “ with a theme “ Paskwa : Tion sang Pagsinadya, Pagbinuligay, kag Paghangpanay  “ on December 23, 2023. We would like to encourage the residents of Nagbangi to participate and attend on the said event. Let’s make our Christmas happier and feel the presence of each other in the community as one.\n\n#Unity, Love, and Enjoy \n\n(Ps. these are the list of act', 'https://allevents.in/cebu/brgy-christmas-part-2k23/200025894570224?ref=eventlist-new', 'https://cdn-az.allevents.in/events3/banners/a3738ff36f3dfe044c390d4902353666a4e76427727a0d4067f83a03cbf4c7ff-rimg-w960-h720-gmir.jpg?v=1702806880', '3e850ce91fcaf7a0a3944b47e00828631172cb1713ecb3dba298065fe4e39e01'),
(229, 'Whale sharks & Waterfalls 3N/4D', 'cebu', 'Oslob, Cebu, Philippines', '2024-03-09', '11:00:00', 'Free', 'This is the ultimate 4-day adventure tour in Cebu, the Philippines. Daytimes will see you swimming with whale sharks at Oslob and sardines at Moalboal, as well as snorkelling with turtles at Colasse Marine Protected Area. Land activities include hiking to waterfalls to swim in their turquoise waters, ziplining across the jungle, and going canyoneering through Badian to Kawasan Falls. Evenings include a traditional Kawa wok spa, eating the finest food in the country, and staying at an absolute be', 'https://allevents.in/cebu/whale-sharks-and-waterfalls-3n-4d/200025422201844?ref=eventlist-new', 'https://cdn-az.allevents.in/events1/banners/729234150ea642f3b4c28faa0e0c7ef77cde365282287dddfa4fd52f76dd4710-rimg-w640-h479-gmir.jpg?v=1702806881', 'f794b971fc3648caa6d480bcbb8bf4ff4aaf93cbd2fed7b275584367a32ad968'),
(230, 'Reverberate: Music Camp 2023', 'cebu', 'Destiny City Church', '2023-12-18', '09:00:00', 'Free', '\"Unleash your musical potential at Reverberate: Music Camp! 🎶 Join us from December 18-20 at Destiny City Church, Roxas City, Capiz, for an immersive experience in the world of sound. 🌟 With a registration fee of 500php, secure your spot and dive into our exclusive electives/streams:\n\n🎤 Live Audio\n🎵 Music Production\n🎙️ Vocals\n📚 Music Theory\n🎹 Basic Zero\nLimited slots include accommodation on a first-come, first-served basis. Let your passion resonate at Reverberate!\n\nPre-registration Link :  htt', 'https://allevents.in/cebu/reverberate-music-camp-2023/200025854298222?ref=eventlist-new', 'https://cdn-az.allevents.in/events7/banners/d56800383eab393aaf4dbeb71a26f4dde584dd2baf385d9e8a260f7c154f8218-rimg-w960-h540-gmir.jpg?v=1702806882', '43ab09d052a8750d18e511525d293d87f6a34e3fcfbf303c7b2b06459e68c156'),
(231, 'Tour PHILIPPINES: It\'s More Fun!', 'manila', 'Philippines', '2024-06-22', '00:00:00', 'USD 500', 'Seven thousand and hundred plus islands - shimmering white golden brown and pink beaches powders on your feet! Hidden lagoons mangrove forests stunning landscapes and one of the most hospitable people.Highly Rated Hotel Accommodation (13 days 12 nights) ​Daily Breakfast Lunches Dinner including dining with families as stated in the itinerary ​Tours including tickets Cultural Performances etc. as stated​Airport to Hotel vv Transfers Tour Transfers ​Yoga Hikes and Other Hotel Beach Facilities or A', 'https://allevents.in/manila/tour-philippines-its-more-fun/80001131324187?ref=eventlist-new', 'https://cdn2.allevents.in/thumbs/thumb6500b8d78fd25.jpg', '6a15b6c82abf7c5fd30066e45dd1a05fe4942d190daf8f740ef1d354f34046be'),
(232, 'It\'s More Fun In The PHILIPPINES 2024 June-July', 'manila', 'Philippines', '2024-06-22', '18:00:00', 'USD 500', 'Soak in its world class beaches and Island hop in its 7,100+ islands! You will be welcomed by one of the most hospitable people on earth.\nShared Room (2 max) or Solo in highly rated hotels. More inclusions, exclusions, flight details, booking visit www.culturalwanderer.com Email aGVubmEgfCBjdWx0dXJhbHdhbmRlcmVyICEgY29t or message here (legitimate questions only pls).', 'https://allevents.in/manila/its-more-fun-in-the-philippines-2024-june-july/200025250028610?ref=eventlist-new', 'https://cdn-az.allevents.in/events8/banners/96c1c01a021c2c72d77bd4904d86ed01cea6c09a6deba16c4bc06b7c28a90d20-rimg-w940-h788-gmir.jpg?v=1699471686', '01086f952dcfcc7b2e5bc74a46728706d4f1b0376ed052625d5b70892572a5c3'),
(233, 'Christmas eve dinner - Aqua Dining', 'manila', 'Manila Ocean Park', '2023-12-24', '17:00:00', 'Free', 'Step into a world of enchantment and wonder this Christmas Eve at Aqua Dining\'s \"Christmas Eve Dinner Under the Sea,\" where culinary delights and oceanic magic unite. 🎄✨ Immerse yourself in the mesmerizing world of Manila Ocean Park\'s Oceanarium, an experience like no other.\n\nOn December 24, 2023, from 5PM to 9PM, you\'ll have the chance to:\n\n🍴 Indulge in a sumptuous dinner buffet that will tantalize your taste buds.\n🐠 Enjoy an exclusive after-hours visit to the Oceanarium, where aquatic wonders ', 'https://allevents.in/manila/christmas-eve-dinner-aqua-dining/200025838860351?ref=eventlist-new', 'https://cdn-az.allevents.in/events8/banners/f9b0571a49a1dabf0c6cc6281cca41e6853c3d6b25a94dfb65404349be6b55ae-rimg-w960-h608-gmir.jpg?v=1702676018', 'cb175522564e213cb5ac9c935120b98120ba1a237738fa4a1131c57778dd514c'),
(234, 'Liberland Meetup @ Manila', 'manila', 'Lost Spirit Rooftop Lounge', '2023-12-29', '17:00:00', 'Free', 'We are organizing a meet-up in Manila, Philippines\nJoin us! Let\'s connect.About this EventWe are organizing a meet-up in Manila, PhilippinesJoin us! Let\'s connect.President will be there himself, as part of the Gusi Prize ceremonyDate: 29 NovemberTime: 9 PMLocation: Lost Spirit Rooftop Lounge, Hereos Hotel Roofdeck, 1260 Florentino Torres, San Andres Bukid, Manila, 1017 Metro Manila, Philippines.To participate, please message us at: cnN2cCB8IGxpYmVybGFuZCAhIG9yZw==', 'https://allevents.in/manila/liberland-meetup-manila/10000756734221427?ref=eventlist-new', 'https://cdn-az.allevents.in/events5/banners/1f441be12f03538b06f06c29594fba424c59cbca494ff1f2835450dc542b15d4-rimg-w1200-h628-gmir.jpg?v=1699854727', '0d592e720ca3d04abdbda12a28de1ce666ba90757f2849276ebc26d0c49e783e'),
(235, 'Cybersecurity Philippine Conference 2024', 'manila', 'Manila, Phillipine Islands', '2024-01-24', '08:00:00', 'Free', 'Escom\'s Cyber Security Philippines (CSP) is aligned with the vision of \"Cyber Security in the Age of Digital Transformation\", it\'s designed for security professionals across various sectors in the Philippines to discuss and debate on the challenges and solutions of its digitalization.\n\nThe CSP will gather 150 senior security experts such as CIOs, CSOs, Compliance Officers, Security Architects, IT managers, Cloud architects, and Digital Transformation Directors, from government, education, indust', 'https://allevents.in/manila/cybersecurity-philippine-conference-2024/200025729408139?ref=eventlist-new', 'https://cdn-az.allevents.in/events7/banners/52523cb1057ec0252f2853aaaaef0853a42007a839c81c58e90c4ac529173adb-rimg-w960-h503-gmir.jpg?v=1702803448', '390b7c736e90425c22ba763106b3ff4c1506759afb8c8d73cec681545baad33b'),
(236, 'GMA Network 2024 New Offerings', 'manila', 'GMA Network', '2024-01-01', '00:00:00', 'Free', 'A Perfect Year Is Coming, As The Biggest Stars Come Together For The Grandest And Biggest Television Shows And Films this 2024 on GMA', 'https://allevents.in/manila/gma-network-2024-new-offerings/200024826869352?ref=eventlist-new', 'https://cdn-az.allevents.in/events8/banners/5e8b07b4cab22011554c32196c9f7bb89d13c04d2fbec1468bea0ecebe93acd2-rimg-w960-h540-gmir.jpg?v=1702572046', '12f0cabe944fd96e52a964c4323bf47cd0aac1ab69ccae7f60610afce7282d46'),
(237, 'RETRO DISCO (Christmas Party!)', 'manila', 'Universidad de Manila', '2023-12-25', '00:00:00', 'Free', 'Merli christmas, ABM C!\n\nJoin us for the most unforgettable Christmas party of the year! Get ready to experience a night filled with joy, laughter, and wonderful memories. Our ABM C Christmas Party promises to be an extraordinary event that will leave you feeling uplifted and inspired.\n\nWe have planned a series of exciting activities that will keep you entertained throughout the event. We\'ve prepared fun games and heartwarming surprises, there\'s something for everyone to enjoy. Our aim is to cre', 'https://allevents.in/manila/retro-disco-christmas-party/200025914560932?ref=eventlist-new', 'https://cdn-az.allevents.in/events1/banners/b457e7e3bcc4c3cfeb25d923dba6eb36389b62cd29953a1c3ef1fe4de6ff36b9-rimg-w960-h541-gmir.jpg?v=1702676106', '39f9744c2cad4e5ed53ffff4e34a94dd0e4e69e996a99bf50d4c466feedbb9a6'),
(238, 'New Location Opening', 'manila', '1006 M Dela Fuente St. corner P. florentino Sampaloc Manila', '2023-12-18', '08:00:00', 'Free', '�NEW SHOP LOCATION�\n\nWe are relocating our Shop at\n�1006 M.Delafuente St. corner P.Florentino St. Brgy.476 Sampaloc Manila (Beside Mightee Mart)\n\nOpens December 18, 2023 (Monday)\n8:00AM to 8:00PM\n\nSee you all on our Opening. Exciting Freebies, Discounts and Promos awaits you!\n\nMore details on our opening will be posted today. \n�Like and Follow our Page for the updates.\n\n�Note: We are still Operating at Laong-Laan Road corner Kundiman St. until further notice.\n\n#ficleaningbymotovapehub', 'https://allevents.in/manila/new-location-opening/200025914551154?ref=eventlist-new', 'https://cdn-az.allevents.in/events4/banners/e5373c669c72f17f22cf6e96261f31a2e062b57c31714a05f484b5c11a776f84-rimg-w443-h960-gmir.jpg?v=1702676017', 'a0f417ef5ca7527cbe22d4da2dd0268d1b7b8304fe348056b4f781eb8d4fc646'),
(240, 'NAUGHTY BABE 1ST FAN MEETING IN MANILA 2024', 'manila', 'SM North EDSA Skydome', '2024-01-20', '17:00:00', 'Free', 'Manila, the naughty babes are coming to your area!\n\nGet ready to have a blast as Max and Nat bring their most playful fan meeting to you this Naughty Babe 1st Fan Meeting in Manila 2024! Save yourselves a seat this January 20, 2024, 5:00 PM, at the SM Skydome.\n\n🎫 Ticket selling starts on October 24, 2023, 12:00 NN via events.wishusluck.site\n\nLet’s check in, Naughty Babes! 😉🧡\n\n#NaughtyBabe1stFMinMNL #MaxNat #mmaxmax #natasitt #ฮาร์ทดิสของแม้กณฐ #ขวดนมของเบบี้ณฐ #ไดโนกรธัสส์', 'https://allevents.in/manila/naughty-babe-1st-fan-meeting-in-manila-2024/200025749243604?ref=eventlist-new', 'https://cdn-az.allevents.in/events8/banners/11ee2faa728cbf2fb81a3ee4430c3cfcbfaab7d5c29e48f3509dfbdcb18e61f7-rimg-w960-h503-gmir.jpg?v=1702676045', 'da379b9e0d29bc706f07fb30cc185a0c09e4ade1ebeec1fc4d0527970f4bc669'),
(243, 'Don Macchiatos Manila - Legarda Grand Opening', 'manila', '2225 Legarda St cor Gastambide St, Sampaloc, Manila 1008', '2023-12-21', '10:00:00', 'Free', 'Early Birds (first 39 customers) will get free iced coffee\n\n3 for 100 promo\n\nSinulog Festival parade\n\nFreebies until supplies lasts', 'https://allevents.in/manila/don-macchiatos-manila-legarda-grand-opening/200025923489817?ref=eventlist-new', 'https://cdn-az.allevents.in/events10/banners/4019bdd9515b719f7c020284d16ae1d8b8acfe3a3a0dc955aadaf73c115f7aae-rimg-w750-h750-gmir.jpg?v=1702676116', 'c1ecdeca689b48731005027703d1e37e399bcbd672144360f105a0d74cc46049'),
(245, 'PESAA Christmas Party', 'manila', 'City Garden Suites', '2023-12-22', '22:30:00', 'Free', 'Let\'s get together in Manila!\n\nThe Pangpang Elementary School Alumni Association (PESAA) is hosting a Christmas party for the Waray-Waray community in Manila. PESAA cordially invites you, your family, and friends to take part in the rich cultural traditions of the Waraynon people.\n\nIndulge in an evening of festive cheer and nostalgia as we celebrate the Christmas season with the upbeat rhythms of classic Waray-Waray music. Immerse yourself in a vibrant atmosphere filled with joy and merriment, c', 'https://allevents.in/manila/pesaa-christmas-party/200025729415522?ref=eventlist-new', 'https://cdn-az.allevents.in/events4/banners/52bff47baf7c2a5f3b2d101d5af01155db77e8e5435251a4b4b03b571a870deb-rimg-w960-h540-gmir.jpg?v=1702539029', '5fbe5a011cdcc77d75aa0bcb437cac4bf68fc1392c148ffc888e953c20bdff3e'),
(246, 'Christmas Giveaway!!', 'davao', 'Barangay 3 Malaybalay Bukidnon', '2023-12-18', '17:00:00', 'Free', '�Christmas GIVEAWAY�\n\nIt\'s been an awesome year of growth here at BCC. And as we move forward and embrace the exciting things of yhe coming year, we have some good stuffs to share with you this Christmas Season. This time, is in partnership with 3js MiniMart\n\n�Get a Chance to win Christmas packs all for our loyal clients.  3  LUCKY customers will get the chance to win Christmas packages. Simply follow the mechanics below�\n\nMechanics\n� LIKE both of our FB PAGE Blytz Customized Clothing & 3J\'s Min', 'https://allevents.in/davao/christmas-giveaway/200025906268830?ref=eventlist-new', 'https://cdn-az.allevents.in/events2/banners/88edb1aa32f03b8fd5e9c891023eec4361e108d05edd7dd54e7a531ae796fda6-rimg-w850-h314-gmir.jpg?v=1702796302', '22fd3c061353430f0c64193eee97fc1151944ed30e936996b36b5acac4e935cb'),
(247, 'KesCon 2023: Devoted to God\'s Church', 'davao', 'Bethel Baptist Church, Malaybalay City', '2023-12-26', '09:00:00', 'Free', 'Objectives:\n1. To discuss headline issues that are theological and ethical in nature  Which requires every member to be equipped with biblical understanding in addressing these issues;\n2. To develop an appreciation of biblical views as the guiding principle in addressing church and practical issues and in kindling members towards a commitment to a local gathering; and\n3. To design a practical method of dealing with these challenges, geared towards the developing of real skills and talents that a', 'https://allevents.in/davao/kescon-2023-devoted-to-gods-church/200025670024832?ref=eventlist-new', 'https://cdn-az.allevents.in/events3/banners/d8c751b252437f30e4656b3a29dc95ebd26724dd292ec57ec71f8552ce6dda32-rimg-w679-h960-gmir.jpg?v=1702796281', '860fadd0936f5377df06a9dca24f75b516954706ca8ee7471739997f5ee68a86'),
(248, 'HS Alumni Homecoming 2023', 'davao', 'San Isidro College', '2023-12-28', '06:00:00', 'Free', 'High School Isidrans!!!!!!!!!!!!!!!!!\n\nGet ready to relive the good old days! \nOur alumni homecoming event is just around the corner and it\'s going to be bigger and better than ever before. Come back to your alma mater and reconnect with old friends, reminisce about your beloved memories and make new ones that will last a lifetime. \n\nBe sure to mark your calendars, December 28-29, 2023 and join us for a weekend of fun, laughter, and nostalgia!\n\nSee you everyone!!!!!', 'https://allevents.in/davao/hs-alumni-homecoming-2023/200025423332405?ref=eventlist-new', 'https://cdn-az.allevents.in/events10/banners/7e00b609a18cee54abe0f154c68e4ea03954481fdbc94f78d84ef4a44bb0160b-rimg-w960-h542-gmir.jpg?v=1702796295', 'fb3ce2a9caee1578f4ee90f2d0e99bff58c2d9b657c620929d2e3ef24d968580'),
(250, 'Davao Educational Roadshow', 'davao', 'Cafe Demitasse', '2024-01-04', '13:00:00', 'Free', 'Save the date! � Join us on January 4-5, 2024, from 1:00 PM to 4:00 PM at Cafe Demitasse, F. Torres Mabini Street, Davao City, for an enlightening Education Roadshow. ��Secure your spot by registering at  https://bit.ly/3uKAMOc \n\n#EducationRoadshow #StudyInAustralia #ChooseSECA #CafeDemitasse', 'https://allevents.in/davao/davao-educational-roadshow/200025905089049?ref=eventlist-new', 'https://cdn-az.allevents.in/events1/banners/d990727d0e32e9263dbcc6ba485bb05ba2752a4a9eb04e69d5e6a83c59f2138c-rimg-w960-h960-gmir.jpg?v=1702806890', '59be4c5bf8c892842422f7c68f65123603cefeacc5c54f3838de5408ad8f7147'),
(251, 'Access Bars ®️ Practitioner Course', 'davao', 'Angels and Crystals', '2023-12-21', '10:00:00', 'Free', 'Do you have a capacity for healing that you haven\'t yet tapped into?\nAre you a body worker, massage therapist, chiropractor, practitioner, medical doctor or nurse looking for a way to enhance the healing you can do for your clients?\n\nWould you like to expand a health wellness or beauty business you already own, or are you looking to start a new health wellness or beauty business?\n\nWould you like to differentiate your business and increase business revenue by offering unique holistic services tha', 'https://allevents.in/davao/access-bars-®️-practitioner-course/200025905092003?ref=eventlist-new', 'https://cdn-az.allevents.in/events6/banners/35aa66bb2aa86826fe7ba87787740f3ac2930ba3fa4b8aca219fdd395faf9718-rimg-w960-h960-gmir.jpg?v=1702796281', 'e93d0647042940152fe8d58c1e6d3686355c047b810055941fc23b0ba381def4'),
(252, 'christmas for a cause', 'davao', 'People\'s Park, Davao City', '2023-12-18', '01:00:00', 'Free', 'We invite you to join our \"Christmas Raffle for a Cause!\"\n�All proceeds will be donated to 26 beneficiaries that has special need warriors of  DAVAO WARRIOR ANGEL CHARITY ORGANIZATION INC All funds will support warriors\' daily needs, such as medicines, milk, diapers, oatmeal,wipes,underpads.\n\n�20 pesos only per slot!\n\n�Our grand prize will be worth 5,000.00 in cash.\nPrizes:\n(1) winner of: 3,000\n(1) Winner of: 1,000\n(10) Winners of: 300.00 \n(20) winners of: 100.00\n(20) winners of: 50.00\n\nRaffle D', 'https://allevents.in/davao/christmas-for-a-cause/200025854167140?ref=eventlist-new', 'https://cdn-az.allevents.in/events2/banners/0ac6e9a8b1bff25f4d5d0fd460e6ef3bddab06cc36fc5dee8f9e0eec1689466a-rimg-w960-h540-gmir.jpg?v=1702796356', '1d0a0c8c4a99813c432af95c604ee428d6d5488b80f266f3b027ee90b0273321'),
(253, 'SECA Davao Roadshow', 'davao', 'Cafe Demitasse - Torres St. Davao City', '2024-01-04', '12:00:00', 'Free', 'Heads up, future international students!\n\nWe are excited to announce our first roadshow in Davao on January 4-5, 2024, from 1 - 5 pm. This roadshow is for those who are interested in studying in Australia. \n\nDon\'t miss out on our perks when you attend our roadshow:\n\n✔️Free processing fee\n✔Free education counselling\n✔Free assessment\n\nGet exclusive deals, vouchers, freebies, snacks, and raffle prizes. You\'ll get complete information when you attend our FREE roadshows from 1 pm to 5 pm.\n\nSo what ar', 'https://allevents.in/davao/seca-davao-roadshow/200025854169807?ref=eventlist-new', 'https://cdn-az.allevents.in/events6/banners/f76df8038c6d5c5097127a845d1c149bc9d08c56345d3acc5e5e6f3b57afad3a-rimg-w679-h960-gmir.jpg?v=1702806894', '357a16fdb0bebdffd628e9abb28f78ad00bcc367f6c7af253bb99343cd7cf1e3'),
(256, 'Christmas Celebration and Thanksgiving', 'davao', 'Lozano St.,Catalunan GrandE, Davao City', '2023-12-24', '09:00:00', 'Free', 'First Church of God Catalunan Grande will be having their Christmas celebration and Thanksgiving this coming December 24, 2023. We are inviting you to join us as we celebrate these events.', 'https://allevents.in/davao/christmas-celebration-and-thanksgiving/200025854169054?ref=eventlist-new', 'https://cdn-az.allevents.in/events1/banners/f8e7215694c25059126cf1ac864fec1c4bebc5040f338f4c844c4e59bcaf92a5-rimg-w960-h541-gmir.jpg?v=1702806893', '63c230ea27243f04dd496e66c27e0619ca49a6a3ca83ffa2b0d27814fe7dd243'),
(257, 'FREE Laundry Business & Supply Corp - Davao', 'davao', 'SEB Equipment & Supply Corp - Davao', '2024-01-20', '09:00:00', 'Free', 'Are you considering launching your own laundry business? Would you like to acquire comprehensive knowledge about the intricacies of this lucrative industry? If your answer is YES, seize this opportunity now. We extend an invitation to our FREE Laundry Business Seminar in Davao\n\nParticipation in the seminar is absolutely FREE. However, we encourage you to register as soon as possible, as slots are limited.\nSign in here:\nhttps://forms.gle/PeqLz6dLn3RZwiDX9\n\nReady to start your laundry business?\n\n📌', 'https://allevents.in/davao/free-laundry-business-and-supply-corp-davao/200025854166133?ref=eventlist-new', 'https://cdn-az.allevents.in/events9/banners/f48b76350fa53e34dbf4dc4343516c34c60572dafb036ca457b0d94fbd86e4e2-rimg-w960-h960-gmir.jpg?v=1702688767', '1d8273a1351fecf07a2da386fad809dcf804ec32c80333880d624c1539d9dcbd'),
(258, 'Bukidnon Tour x Mt.Kulago', 'davao', 'Impasug-ong, Bukidnon', '2024-01-26', '19:00:00', 'Free', 'BUKIDNON TOUR and CLIMB\n\n📍Open Joiners from Manila based \n(IOPEN FOR INSTALLMENT BASIS)\nDP: 2000-3000\nMonthly: 1500-2000\n\n2024 SCHEDULES🗓️\n\n✅January 26-28, 2024 (7SLOTS)\n✅February 23-25, 2024 (9SLOTS)\n✅March 21-23, 2024 (7SLOTS)\n✅March 29-31, 2024 (12SLOTS)\n✅April 26-28, 2024 (12SLOTS)\n✅May 26-28, 2024 (12SLOTS)\n\nBukidnon Tour x Mt.Kulago\nBukidnon Tour x Mt.Kulago\n\n🌏TOP DESTINATIONS TO VISIT IN BUKIDNON🫰\n\n📍Mt.Kulago (Humming Bird Mountain)\n📍Communal Ranch\n📍RotyPeaks and Ridge Camp\n📍Pine Ridge \n🌊', 'https://allevents.in/davao/bukidnon-tour-x-mtkulago/200025858745123?ref=eventlist-new', 'https://cdn-az.allevents.in/events6/banners/5eb5b1d03978c8f8d6f27fad4415073f9dc8d010364ff5204665189d30b4c70b-rimg-w960-h640-gmir.jpg?v=1702806893', '802b8142cb88bd1881f7772692aebd15e91d9d9118b494bb1321af0f25da2306'),
(259, 'KNHS Alumni\'s event: Grand Alumni Homecoming', 'davao', 'DepEd Tayo Kimagango High School', '2023-12-28', '07:00:00', 'Free', 'We\'re finally back to normal.😊 \nPlease mark your calendar ⏰for our 2023 Grand Alumni Homecoming.\nSee you school mates / batch mates👍🙌.', 'https://allevents.in/davao/knhs-alumnis-event-grand-alumni-homecoming/200025854157453?ref=eventlist-new', 'https://cdn-az.allevents.in/events1/banners/7f85716f5d1a89789753067b5f104f60a21d3cb1c1e04eeaad05084789002e82-rimg-w679-h960-gmir.jpg?v=1702796265', 'ef0888ca2dcc383d6b360ca6887caa001ae52e5d9889d226aba34d68b52e97fa'),
(318, 'Bark’n Stroll', 'cebu', 'Albuera Municipal Gym', '2023-12-17', '15:00:00', 'Free', '“Bark’n Stroll” \nA Fun Celebration of Furry Friends\n\nJoin us for a PAW-some celebration of Albuera Leyte’s 106th Founding Anniversary with your beloved furry companions!\n	Activities:\n	•	Dog Stroll Parade\n	•	Dog Contests\n	•	Obedience Training Demos\n	•	Pet Care Workshops\n       •    FREE Pet Consultation \n       •    FREE Anti Rabies Vaccine\n	•	And More!\n\n	Registration Fee: PHP 350\n(Includes a Shirt for the owner and a Scarf for the dog)\n\n	•	Registration starts on November 6, 2023 at Paws & Claws,', 'https://allevents.in/cebu/bark’n-stroll/200025850377707?ref=eventlist-new', 'https://cdn-az.allevents.in/events4/banners/c607add23366b5ffa49c9205252102ae40b3f5712124fb6a1ff806ee9f9386c6-rimg-w749-h367-gmir.jpg?v=1702082836', '3b4eefd0d68dde1623ea2a47a260b0c2567ac0d64968db1cf3bc34d2c989abc2'),
(329, 'Marvel snap Philippines Community  Tournament Vol. 6', 'manila', 'Heyday Cafe', '2023-12-17', '11:00:00', 'Free', 'Tournament Alert: Marvel Snap Philippines Community Tournament Volume 6\nWhen: December 17, 2023\nTime: 11 AM - 4PM\nWhere: Heyday Cafe\nPrize Pool (Tentative): 5500 PHP plus physical prizes from sponsors\nWhere to Register:\n\nhttps://www.communitygaming.io/tournament/marvel-snap-ph-community-tournament-volume-6-xmas-party?fbclid=IwAR2HvRiUcWGFELBihPC-OvRJoVpuMstZhfLQeO1pUX0WRdUdRHa4DZg4bbo\n\nHosted by:\n\nExcelSor PH\nSnap Esports Gaming Society\nSnaPH', 'https://allevents.in/manila/marvel-snap-philippines-community-tournament-vol-6/200025906272901?ref=eventlist-new', 'https://cdn-az.allevents.in/events10/banners/42df13af3a647ccde970d724dab8b9eaff231cf4e8d359d9efe5e2c23216e6cb-rimg-w679-h960-gmir.jpg?v=1702676072', '87a145f04383d714bd09407f7e622f57f07fe8a8023ba8ac56b27ba3060b341b'),
(331, 'Harmony of Hope', 'manila', 'Greenhills Mall', '2023-12-17', '15:00:00', 'Free', 'Have a holly, jolly Christmas only in Greenhills Mall! 🎄🎉\n\nHave an afternoon filled with happy Christmas songs as you\'re invited to watch \"HARMONY OF HOPE\" chorale performance 🎶🎵 on December 17, 3PM, GF East Wing Atrium Greenhills Mall.\n\nSee you there! 👍', 'https://allevents.in/manila/harmony-of-hope/200025914556716?ref=eventlist-new', 'https://cdn-az.allevents.in/events8/banners/9f87579d41cff5bd97f6bc541234c0fa0d1d4ad342d3d5dde9f3d9c7c5a67b83-rimg-w960-h960-gmir.jpg?v=1702676022', 'a4a205607c1b333e1ffad4c554b06ede29c8f5a028e81f7a6eed14b6e3a57020'),
(332, 'Adarna Grande Pedro Gil Manila Branch Grand Opening', 'manila', 'Pedro Gil, Manila', '2023-12-17', '09:00:00', 'Free', 'Keracollagen is the real magic ��\n\n�Save the date 12.17.2023 for our Grand Opening! �\n#grandopening #adarnagrandesalon\n #manilasalon #fypシ゚viralシ #hairtransformation #hairgoals', 'https://allevents.in/manila/adarna-grande-pedro-gil-manila-branch-grand-opening/200025914546024?ref=eventlist-new', 'https://cdn-az.allevents.in/events5/banners/d222f4ffcb7d56b829dbb59544ef3348ed7a497984a68d84493c9bd210f89d2d-rimg-w960-h382-gmir.jpg?v=1702676014', '62be84b3fd6194aa0404570cad21350d2cdefbc82534a7ee8e720c3fbc0f5c70'),
(334, 'SHORT TRAINING PROGRAM', 'manila', 'Sureshot Sportsville', '2023-12-17', '11:00:00', 'Free', 'Come Join the PR badminton Academy for Short Trainings Program\n\n4 slots Available \n\nDM/PM if interested', 'https://allevents.in/manila/short-training-program/200025923484350?ref=eventlist-new', 'https://cdn-az.allevents.in/events5/banners/3c3f3013785957155bbb97a09dab262cd1d682ac47b7f6bfa303ead440409700-rimg-w960-h540-gmir.jpg?v=1702676090', '52c530c7d3ec67c09bcf969fb79d35c3b9add11ca0aa49b13888a8e1ea6407c8'),
(339, 'Christmas Bazaar', 'davao', 'NCCC MALL Victoria Plaza', '2023-12-17', '15:00:00', 'Free', '✨ Experience the magic of the season at the Christmas Bazaar in NCCC Mall VP! 🎄✨ \n\nJoin us from December 17-22, 2023, for festive fun, delightful treats, and holiday cheer! 🛍️🎁', 'https://allevents.in/davao/christmas-bazaar/200025905089149?ref=eventlist-new', 'https://cdn-az.allevents.in/events9/banners/81e0459d5ee51259f0bd148313c820fcbea171d61c30cf15dbe5bf476c830d54-rimg-w960-h805-gmir.jpg?v=1702796281', '68e2db88f20e629809c62dac354f025a4efddc9c8dd63270320061f707bcffea'),
(344, 'Thanksgiving Celebration 2023', 'davao', 'Joyful AG Church', '2023-12-17', '08:30:00', 'Free', 'Grateful hearts gather around the table, rejoicing in the warmth of love and the abundance of blessings. Join us in this Thanksgiving celebration, as we give thanks for God’s abundant grace and blessings that overflow in our lives. 🍂🙏 \n\n#ThanksgivingJoy #GratefulHeart #GodsBlessings', 'https://allevents.in/davao/thanksgiving-celebration-2023/200025905092103?ref=eventlist-new', 'https://cdn-az.allevents.in/events3/banners/af7ebc6efdeeb4c4a98910018f27beced7501deece1ead326839a4b8fc1782f7-rimg-w960-h805-gmir.jpg?v=1702773176', 'f6072ab4a0944adb8ea28ff0bd76c6e3050f760b868ddbaeb08a63a053735e2e'),
(345, 'Sulfate-free Solid Shampoo & Conditioner Making F2F Workshop DAVAO', 'davao', '21 Studio', '2023-12-17', '14:00:00', 'Free', '𝗦𝗨𝗟𝗙𝗔𝗧𝗘-𝗙𝗥𝗘𝗘 𝗦𝗢𝗟𝗜𝗗 𝗦𝗛𝗔𝗠𝗣𝗢𝗢 & 𝗖𝗢𝗡𝗗𝗜𝗧𝗜𝗢𝗡𝗘𝗥 𝗠𝗔𝗞𝗜𝗡𝗚 𝗪𝗢𝗥𝗞𝗦𝗛𝗢𝗣\nWhen: December 16, 2023 | 2pm - 6pm\nWhere: 21 Studio, Tupperware Brands Bldg., Obrero, Davao City\nGoogle map link:  https://goo.gl/maps/yxX5Sm9pJ4K78vXs5\n\n✅ Actual making of:\n   ⭐ charcoal shampoo bar\n   ⭐ rich coco conditioner bar \n   ⭐ and many more!\n✅ EVERYTHING will be provided\n✅ Module Formulary & Procedures\n✅ Training Certificate\n✅ Free Snacks and drinks\n\n📍𝟭𝟲 𝗣𝗿𝗲𝗺𝗶𝘂𝗺 𝗙𝗼𝗿𝗺𝘂𝗹𝗮𝘁𝗶𝗼𝗻n: bit.ly/formularylist\n1.) Charcoal Shampoo Bar\n2.) Ric', 'https://allevents.in/davao/sulfate-free-solid-shampoo-and-conditioner-making-f2f-workshop-davao/200025854168044?ref=eventlist-new', 'https://cdn-az.allevents.in/events3/banners/b53dd839d20836b35de05873a64a828af5467413534dffd92f32f1693304bdaf-rimg-w960-h960-gmir.jpg?v=1702806892', '8b93e303f2c33b767155fffd6118554861feb657b404305c92dfccc30e095237');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `hash` (`hash`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=346;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;