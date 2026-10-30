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
    { n: 'Gims', sp: '0GOx72r5AAEKRGQFn3xqXK', cat: 'urbain', d: 'Chanteur, rappeur, auteur-compositeur-interprète', img: I('6/67/NDLE2025Gims_1.jpg'), page: 'gims.html' },
    { n: 'Amel Bent', sp: '15jZ8OLtnGATWHlQkltG7f', cat: 'pop', d: 'Chanteuse et actrice', img: I('4/45/Amel_Bent%2C_2013_%28cropped%29.jpg') },
    { n: 'Kendji Girac', sp: '4IS4EyXNmiI2w5SRCjMtEF', cat: 'pop', d: 'Chanteur et guitariste', img: I('e/e2/Kendji_Girac_Belval_2016.jpg') },
    { n: 'Slimane', sp: '4OV6uYSnHxSYkjDYuBVBUz', cat: 'pop', d: 'Auteur-compositeur-interprète', img: I('1/1f/Slimane_Eurovision_Song_Contest_2024_semi_2_%28cropped%29.jpg') },
    { n: 'Dadju', sp: '4sbXXFzEWJY2zsZjelerjX', cat: 'urbain', d: 'Chanteur et rappeur', img: I('b/b7/Dadju_jpg.jpg') },
    { n: 'Jenifer', sp: '7p0bICJNx2HM4jS28qexvv', cat: 'pop', d: 'Chanteuse et actrice', img: I('b/b9/Jenifer_Reims_96534.jpg') },
    { n: 'Black M', sp: '7lMgpN1tEBQKpRoUMKB8iw', cat: 'urbain', d: 'Rappeur et chanteur', img: I('0/0a/Black_Mesrimes.jpg') },
    { n: 'Patrick Fiori', sp: '18PkzXDURSTyGZTg9w66qq', cat: 'pop', d: 'Auteur-compositeur-interprète', img: I('8/87/Patrick_Fiori_t%C3%A9l%C3%A9vie_2014.jpg') },
    { n: 'Camille Lellouche', sp: '6os4KQUfJoyJwjZ7y7Ec6Q', cat: 'show', d: 'Actrice, humoriste et chanteuse', img: I('5/57/Camille_LELLOUCHE_%28cropped%29.jpg') },
    { n: 'Claudio Capéo', sp: '5KBbs98MK59UNMF1VTwMmz', cat: 'pop', d: 'Chanteur et accordéoniste', img: I('8/89/Claudio_Capeo%2C_Saverne_2023_-_3.jpg') },
    { n: 'Jérémy Frerot', sp: '4lhtlpMg6j1absrQvXYlRK', cat: 'pop', d: 'Chanteur', img: I('5/57/Festival_de_Bugu%C3%A9l%C3%A8s_2016_-_Fr%C3%A9ro_Delavega_07.jpg') },
    { n: 'Camélia Jordana', sp: '2XkCa3HcntokIgOP5N3QO7', cat: 'pop', d: 'Auteure-compositrice-interprète et actrice', img: I('4/47/MKr384427_Cam%C3%A9lia_Jordana_%28Women_In_Motion%2C_Cannes_2025%29.jpg') },
    { n: 'Wejdene', sp: '1SxuyHZnLUFyFHGzdGaxZk', cat: 'urbain', d: 'Chanteuse de RnB', img: I('5/5e/Photo_de_la_chanteuse_Wejdene_en_festival.jpg') },
    { n: 'Hatik', sp: '05hirnMeVIzCrcUxbrysZU', cat: 'urbain', d: 'Rappeur, chanteur et acteur', img: I('1/18/Hatik%2C_Occit%C3%A0nia%2C_13_de_mai_de_2023.jpg') },
    { n: 'Magic System', sp: '6MvRVq0CtpQQlwnIiszV8F', cat: 'afro', d: 'Groupe ivoirien · zouglou, coupé-décalé, afropop', img: I('e/e8/Magic_System_1.jpg') },
    { n: 'Koba LaD', sp: '1q7T9rFQ2a2ukA1PU51fo3', cat: 'urbain', d: 'Rappeur', img: I('6/64/KobaLaD.jpg') },
    { n: 'Eva Queen', sp: '5nH2klYTzn8CNvUv1GOGQO', cat: 'urbain', d: 'Chanteuse', img: I('e/ed/EvaQueenNRJMusicAward_%28cropped%29.jpg') },
    { n: 'Kev Adams', sp: '28fTXEL90HZCAWinBeKF9m', cat: 'show', d: 'Humoriste et acteur', img: I('d/dd/Kev_Adams_Cannes_2016.jpg') },
    { n: 'Linh', sp: '15h1AB4jpLCdXLZNT7glWj', cat: 'pop', d: 'Chanteuse · pop, soul, variété', img: 'https://image-cdn-fa.spotifycdn.com/image/ab6761610000e5ebf439388185d0bf96c1f8d3c4' },
    { n: 'Jimmy Sax', sp: '3HUXmgW0AIko5psVtQmqWE', cat: 'instru', d: 'Saxophoniste · « No Man No Cry »', img: 'https://image-cdn-fa.spotifycdn.com/image/ab6761610000e5eb4ac861ab9e885ee5bf9ac937' },
    { n: 'Julien Lieb', sp: '0rQDrh9l7FTDm7cywWpW8i', cat: 'pop', d: 'Chanteur', img: 'https://image-cdn-fa.spotifycdn.com/image/ab6761610000e5eba3450e7d9ef5536aa3c16d01' }
  ],
  cats: { all: 'Tous', pop: 'Pop & Variété', urbain: 'Urbain & RnB', afro: 'Afro', show: 'Humour & Show', instru: 'Instrumental' },

  legends: [
    { n: 'Snoop Dogg', sp: '7hJcb9fa4alzcOq3EaNPoG', d: 'Long Beach · Rap West Coast', img: I('1/17/Snoop_Dogg_2019_by_Glenn_Francis.jpg'), page: 'snoop-dogg.html' },
    { n: 'Lil Wayne', sp: '55Aa2cqylxrFIXC767Z865', d: 'New Orleans · Rap', img: I('1/12/Lil_Wayne_Feb._2020.jpg'), page: 'lil-wayne.html' },
    { n: 'Gims', sp: '0GOx72r5AAEKRGQFn3xqXK', d: 'Chanteur, rappeur · artiste du booking KoL', img: I('6/67/NDLE2025Gims_1.jpg'), page: 'gims.html' },
    { n: 'Coolio', sp: '3y24n3XhZ96wgwRXjvS17T', d: '« Gangsta’s Paradise »', img: I('c/c8/Coolio.jpg') },
    { n: 'Tha Dogg Pound', sp: '60CFNa0ggWjV8OSDey8aGT', d: 'Groupe de rap · Californie', img: I('9/94/Tha_Dogg_Pound.jpg') },
    { n: 'OneRepublic', sp: '5Pwc4xIPtQLFEnJriah9YJ', d: 'Groupe pop-rock américain', img: I('7/73/OneRepublic2013.jpg') },
    { n: 'Ricky Martin', sp: '7slfeZO9LsJbWgpkIoXBUJ', d: 'Pop latine', img: I('d/df/Ricky_Martin-4262.jpg') }
  ],
  france: ['Amir', 'Tal', 'Larusso', 'Jimmy Sax', 'Gizo Evoracci', 'Besa', 'David Lempel', 'Yoni', 'Marvin', 'Siarah', 'L2K', 'Guy Mardel'],

  awards: [
    { n: 'NMA', img: 'https://kolrecords.com/wp-content/uploads/2023/01/NMA.webp' },
    { n: 'Chanson de l’Année', img: 'https://kolrecords.com/wp-content/uploads/2023/01/CDELANEE-2.png' },
    { n: 'W9 d’Or', img: 'https://kolrecords.com/wp-content/uploads/2023/01/w9dor.png' },
    { n: 'MTV EMA', img: 'https://kolrecords.com/wp-content/uploads/2023/01/MTV-EMA.jpg' },
    { n: 'Trophée YACAST', img: 'https://kolrecords.com/wp-content/uploads/2023/01/yacast.png' }
  ],

  /* logos clients : fichiers kolrecords.com recadrés et allégés (logo-XX.webp) */
  logos: [{"file":"logo-01.webp","cat":"corpo","name":"Airbus"},{"file":"logo-02.webp","cat":"corpo","name":"Dacia"},{"file":"logo-03.webp","cat":"corpo","name":"Novo Nordisk"},{"file":"logo-04.webp","cat":"corpo","name":"Bordeaux Lac"},{"file":"logo-05.webp","cat":"corpo","name":"Pasino Aix-en-Provence"},{"file":"logo-06.webp","cat":"corpo","name":"RATP"},{"file":"logo-07.webp","cat":"corpo","name":"TF1"},{"file":"logo-08.webp","cat":"corpo","name":"Grévin Paris"},{"file":"logo-09.webp","cat":"corpo","name":"Centre commercial Noyelles"},{"file":"logo-10.webp","cat":"corpo","name":"Renault"},{"file":"logo-11.webp","cat":"corpo","name":"FDJ"},{"file":"logo-12.webp","cat":"corpo","name":"Limoges Handball"},{"file":"logo-13.webp","cat":"corpo","name":"Groupe Cercle Vert"},{"file":"logo-14.webp","cat":"corpo","name":"Se Vince"},{"file":"logo-15.webp","cat":"corpo","name":"Métropole Lausanne"},{"file":"logo-16.webp","cat":"corpo","name":"Klépierre"},{"file":"logo-17.webp","cat":"corpo","name":"Ceetrus"},{"file":"logo-18.webp","cat":"corpo","name":"Pasino Saint-Amand-les-Eaux"},{"file":"logo-19.webp","cat":"communes","name":"Salon-de-Provence"},{"file":"logo-20.webp","cat":"communes","name":"Contes"},{"file":"logo-21.webp","cat":"communes","name":"Villebon-sur-Yvette"},{"file":"logo-22.webp","cat":"communes","name":"La Madeleine"},{"file":"logo-23.webp","cat":"communes","name":"Alizay"},{"file":"logo-24.webp","cat":"communes","name":"Hyères"},{"file":"logo-25.webp","cat":"communes","name":"Bruay-la-Buissière"},{"file":"logo-26.webp","cat":"communes","name":"Plaisir"},{"file":"logo-27.webp","cat":"communes","name":"Marignane"},{"file":"logo-28.webp","cat":"communes","name":"Aniche"},{"file":"logo-29.webp","cat":"communes","name":"Pélissanne"},{"file":"logo-30.webp","cat":"communes","name":"Sallaumines"},{"file":"logo-31.webp","cat":"communes","name":"Haubourdin"},{"file":"logo-32.webp","cat":"communes","name":"Verdun"},{"file":"logo-33.webp","cat":"communes","name":""},{"file":"logo-34.webp","cat":"communes","name":"Amnéville"},{"file":"logo-35.webp","cat":"communes","name":"Lille"},{"file":"logo-36.webp","cat":"communes","name":"Romans-sur-Isère"},{"file":"logo-37.webp","cat":"communes","name":"Liévin"},{"file":"logo-38.webp","cat":"communes","name":"Saint-Quentin"},{"file":"logo-39.webp","cat":"communes","name":"Saint-Affrique"},{"file":"logo-40.webp","cat":"communes","name":"Nantes"},{"file":"logo-41.webp","cat":"communes","name":"Aubagne"},{"file":"logo-42.webp","cat":"communes","name":"Dax"},{"file":"logo-43.webp","cat":"communes","name":"Cherbourg-en-Cotentin"},{"file":"logo-44.webp","cat":"communes","name":"Rognac"}],
};
