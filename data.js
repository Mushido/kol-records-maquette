/* KoL Records — données de la maquette
   Sources : kolrecords.com (listes artistes, clients, prix, contacts),
   fr.wikipedia.org (descriptions courtes + photos Wikimedia Commons sous licence libre). */
const W = 'https://upload.wikimedia.org/wikipedia/commons/';
const T = 'https://upload.wikimedia.org/wikipedia/commons/thumb/';
/* vignettes Wikimedia légères (tailles autorisées : 330 / 500 / 960) */
const I = (p, w = 500) => T + p + '/' + w + 'px-' + p.split('/').pop();
window.KOL_small = u => u ? u.replace('/500px-', '/330px-') : u;

window.KOL = {
  roster: [
    { n: 'Gims', cat: 'urbain', d: 'Chanteur, rappeur, auteur-compositeur-interprète', img: I('6/67/NDLE2025Gims_1.jpg') },
    { n: 'Amel Bent', cat: 'pop', d: 'Chanteuse et actrice', img: I('4/45/Amel_Bent%2C_2013_%28cropped%29.jpg') },
    { n: 'Kendji Girac', cat: 'pop', d: 'Chanteur et guitariste', img: I('e/e2/Kendji_Girac_Belval_2016.jpg') },
    { n: 'Slimane', cat: 'pop', d: 'Auteur-compositeur-interprète', img: I('1/1f/Slimane_Eurovision_Song_Contest_2024_semi_2_%28cropped%29.jpg') },
    { n: 'Dadju', cat: 'urbain', d: 'Chanteur et rappeur', img: I('b/b7/Dadju_jpg.jpg') },
    { n: 'Jenifer', cat: 'pop', d: 'Chanteuse et actrice', img: I('b/b9/Jenifer_Reims_96534.jpg') },
    { n: 'Black M', cat: 'urbain', d: 'Rappeur et chanteur', img: I('0/0a/Black_Mesrimes.jpg') },
    { n: 'Patrick Fiori', cat: 'pop', d: 'Auteur-compositeur-interprète', img: I('8/87/Patrick_Fiori_t%C3%A9l%C3%A9vie_2014.jpg') },
    { n: 'Camille Lellouche', cat: 'show', d: 'Actrice, humoriste et chanteuse', img: I('5/57/Camille_LELLOUCHE_%28cropped%29.jpg') },
    { n: 'Claudio Capéo', cat: 'pop', d: 'Chanteur et accordéoniste', img: I('8/89/Claudio_Capeo%2C_Saverne_2023_-_3.jpg') },
    { n: 'Jérémy Frerot', cat: 'pop', d: 'Chanteur', img: I('5/57/Festival_de_Bugu%C3%A9l%C3%A8s_2016_-_Fr%C3%A9ro_Delavega_07.jpg') },
    { n: 'Camélia Jordana', cat: 'pop', d: 'Auteure-compositrice-interprète et actrice', img: I('4/47/MKr384427_Cam%C3%A9lia_Jordana_%28Women_In_Motion%2C_Cannes_2025%29.jpg') },
    { n: 'Wejdene', cat: 'urbain', d: 'Chanteuse de RnB', img: I('5/5e/Photo_de_la_chanteuse_Wejdene_en_festival.jpg') },
    { n: 'Hatik', cat: 'urbain', d: 'Rappeur, chanteur et acteur', img: I('1/18/Hatik%2C_Occit%C3%A0nia%2C_13_de_mai_de_2023.jpg') },
    { n: 'Magic System', cat: 'afro', d: 'Groupe ivoirien · zouglou, coupé-décalé, afropop', img: I('e/e8/Magic_System_1.jpg') },
    { n: 'Koba LaD', cat: 'urbain', d: 'Rappeur', img: I('6/64/KobaLaD.jpg') },
    { n: 'Eva Queen', cat: 'urbain', d: 'Chanteuse', img: I('e/ed/EvaQueenNRJMusicAward_%28cropped%29.jpg') },
    { n: 'Kev Adams', cat: 'show', d: 'Humoriste et acteur', img: I('d/dd/Kev_Adams_Cannes_2016.jpg') },
    { n: 'Linh', cat: 'pop', d: 'Chanteuse · pop, soul, variété', img: null },
    { n: 'Jimmy Sax', cat: 'instru', d: 'Saxophoniste · « No Man No Cry »', img: null },
    { n: 'Julien Lieb', cat: 'pop', d: 'Chanteur', img: null }
  ],
  cats: { all: 'Tous', pop: 'Pop & Variété', urbain: 'Urbain & RnB', afro: 'Afro', show: 'Humour & Show', instru: 'Instrumental' },

  legends: [
    { n: 'Snoop Dogg', d: 'Long Beach · Rap West Coast', img: I('1/17/Snoop_Dogg_2019_by_Glenn_Francis.jpg'), page: 'snoop-dogg.html' },
    { n: 'Coolio', d: '« Gangsta’s Paradise »', img: I('c/c8/Coolio.jpg') },
    { n: 'Lil Wayne', d: 'New Orleans · Rap', img: I('1/12/Lil_Wayne_Feb._2020.jpg') },
    { n: 'Tha Dogg Pound', d: 'Groupe de rap · Californie', img: I('9/94/Tha_Dogg_Pound.jpg') },
    { n: 'OneRepublic', d: 'Groupe pop-rock américain', img: I('7/73/OneRepublic2013.jpg') },
    { n: 'Ricky Martin', d: 'Pop latine', img: I('d/df/Ricky_Martin-4262.jpg') }
  ],
  france: ['Amir', 'Tal', 'Larusso', 'Jimmy Sax', 'Gizo Evoracci', 'Besa', 'David Lempel', 'Yoni', 'Marvin', 'Siarah', 'L2K', 'Guy Mardel'],

  awards: [
    { n: 'NMA', img: 'https://kolrecords.com/wp-content/uploads/2023/01/NMA.webp' },
    { n: 'Chanson de l’Année', img: 'https://kolrecords.com/wp-content/uploads/2023/01/CDELANEE-2.png' },
    { n: 'W9 d’Or', img: 'https://kolrecords.com/wp-content/uploads/2023/01/w9dor.png' },
    { n: 'MTV EMA', img: 'https://kolrecords.com/wp-content/uploads/2023/01/MTV-EMA.jpg' },
    { n: 'Trophée YACAST', img: 'https://kolrecords.com/wp-content/uploads/2023/01/yacast.png' }
  ],

  clients: {
    corpo: ['Airbus-Logo.png', 'Dacia_logo_2021.svg_.png', 'NVO_BIG-f838aae1.png', 'Bordeaux-Lac-Logo.png', 'logo-pasino.jpg', 'Logo-RATP.png', 'TF1_2013.svg_.png', 'Grevin_Paris_logo.png', 'Auchan_Noyelles.png', 'Logo-Renault.jpg', '1280px-Logo_de_la_Francaise_des_jeux.svg_.png', 'Logo_Limoges_Handball.png', '57a8c3d6938f6_GroupeCercleVert-950x633-1.jpg', 'Sevince.jpg', 'logo_metropole_lausanne-800x800-1.webp', 'klepierre.png', '1200px-Logo_Ceetrus_2018.svg_.png', '9df7ba5.png'],
    communes: ['Logo-Ville-de-Salon-HD.png', 'Contes.jpg', 'Villebon_sur_Yvette_logo.png', 'logo-La-madeleine.png', 'logo-Alizay.png', '1200px-Logo_ville-hyeres.jpg', 'Bruay-Logo.jpg', 'plaisir.png', 'Marignane.webp', 'logo_aniche.jpg', 'logo_pelissanne.png', 'Logo_sallaumines.png', 'Logo-MAIRIE-HAUBOURDIN.png', 'Verdun_2014_logo.png', 'N-en-F-Logo.png', '832b47_85a9f0115f2b46ea94ade9abb2011d43mv2.webp', '915px-Logo_ville_de_Lille.svg_.png', '1024px-Logo_Romans-sur-Isere.svg_.png', 'Lievin_logo.png', 'Logo-Saint-Quentin.jpg', 'St-Affrique.png', 'Nantes.jpg', '2560px-Logo_Aubagne.svg_.png', 'Dax.png', 'LOGO_Cherbourg-en-Cotentin_COULEURS_imprimerie-scaled.jpg', 'Rognac.png', '24:MAIRIE-DE-WOUSTVILLER.jpg', '24:Logo_Sedan.png']
  },
  logoBase: 'https://kolrecords.com/wp-content/uploads/2023/01/',
  logoBase24: 'https://kolrecords.com/wp-content/uploads/2024/10/'
};
