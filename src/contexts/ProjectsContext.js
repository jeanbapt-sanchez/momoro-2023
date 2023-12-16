/*
 * Copyright © 2023 Jean-Baptiste Sanchez
 *
 * This file is part of Momoro Portfolio 2023.
 *
 * For more information, the source code is available at:
 * https://github.com/jeanbapt-sanchez/momoro-portfolio-2023
 *
 * Momoro Portfolio 2023 is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

import React, { createContext } from 'react';
import images from '../assets/images';

export const ProjectContext = createContext();

const descriptionFovea = `
# *Installation Immersive*

*En collaboration avec Leith Ben Abdessalem, Julie Pereira et Pierre Pinto de Oliveira - Sound design Adrien Melchior*

***Gobelins Paris, Juin 2023***

Fovea est une installation immersive interactive qui a été spécialement créée pour être présentée en juin 2023 lors notre projet de fin d'études de Master aux Gobelins Paris.

Pendant dix semaines, j'ai collaboré avec Leith Ben Abdessalem, Julie Pereira et Pierre Pinto de Olivera pour créer une preuve de concept unique et technologiquement ambitieuse pour une installation.

Nous voulions réaliser une expérience qui utilise l'espace dans lequel se trouve l'utilisateur, la surface sur laquelle il marche mais aussi le volume dans lequel il se déplace. Nous avons décidé de concevoir notre propre système **CAVE** avec une touche d'originalité.

L'idée principale était d'avoir un pilier central autour duquel l'utilisateur se promènerait. Le pilier servirait à cacher la ligne de séparation entre deux environnements différents.

Partant avec un faible budget, nous devions trouver des solutions créatives pour réduire nos coûts financiers. Pour construire la structure CAVE, nous avons utilisé un barnum de jardin auquel nous avons ajouté des murs en tissu blanc.

Ce projet est en cours de discussion pour participer à d'éventuels festivals interactifs et ou collaborations avec des agences de publicité.

***ⓒ Leith Ben Abdessalem***
`;

const descriptionUnplug = `
# *Immersive bar experience*

*Direction artistique Morgane Rocheteau - Sound design Jean LeBellego - Scénographie & création lumière Paolo Morvan - Producteur Rémy Large*

*Production Tamanoir & Unplug*

***Paris, Octobre 2023***

Unplug est un bar immersif situé à Paris dans le 8e arrondissement. Il ouvrira le 1er Octobre 2023. L'objectif est ici de proposer une expérience hors du commun basée sur de véritables expérimentations visuelles immersives. Le challenge est de faire de ce bar l'un des premiers moteurs français du réenchantement des sorties nocturnes.

Directrice artistique du projet pendant six mois, mon rôle fut d'harmoniser et homogénéiser l'atmosphère physique, le design d'espace, et virtuel. Le travail s'est fait en collaboration avec les architectes et le scénographe évoluant sous la thématique d'un voyage sur trois continents : Asie, Afrique et Amérique du sud. Il a fallu passer par la conception de moodboard, à la production et post-production d'éléments 3D, au montage vidéo, au brainding, et à la scénographie lumineuse.

Mon but est de donner la sensation aux visiteurs d'entrer dans un autre univers pendant le temps d'un verre.

***ⓒ [En attente des photos du photographe]***
`;

const descriptionHkgFirststeps = `
# Dance & Vidéo mapping immersif

*Direction artistique Morgane Rocheteau - Écriture & mise en scène Böme - Sound design Jean LeBellego - Chorégraphie Sudhee Liao - Accueil création lumière Mak Kwok-fai - création lumière et vidéo Paolo Morvan*

*Production Tamanoir Immersive Studio / Hk Art Festival*

***Freespace, Hong Kong Mars 2023***

First Steps initie à la beauté fragile des premiers pas sur scène, être danseurs ou acteurs. Des non performeurs, guidés par des instructions transmises par un casque audio, s'aventurent à la recherche de leur danse intérieure. Au fil de leur voyage, ils vont apprivoiser la lumière, l'espace et le regard du public. Chaque soir est unique, chaque soir est différent, First Step est une épopée humaine qui sublime la beauté des foules et le courage des premières fois.

L'expérience s'adresse autant aux participants sur scène qu'aux spectateurs. 

Cette création est une commande spéciale du festival HKAS. Tamanoir a bénéficié d'une subvention du **Centre national du cinéma et de l'image animée (CNC)**, je suis pour ma part intervenue dans la conception du dossier qui a découlé sur l'obtention du financement permettant ainsi sa conception. Ce travail représente en amont les caractères artistique et poétique de cette expérience lumineuse avec pour soutien les textes d'écriture de Böme. Pour ce projet j'avais un double rôle, j'ai aussi fait des recherches afin de développer le travail de scénographie et de trouver le bon outil et la bonne technologie à utiliser pour la projection video-mapping. Ma mission était de jumeler une seule caméra (trackeur, HTC vive, kinet) pour tracker plusieurs participants en même temps.


***ⓒ Luster Angle Limited ⓒ Hong Kong Art Festival***
`;

const descriptionAQuelquespas = `
# *Dance & immersif audio*

*Direction artistique Morgane Rocheteau - Écriture & mise en scène Sam Lecoeur - Compositions Jean LeBellego - Conception sonore Anysé Amestoy - Scénographie & création lumière Paolo Morvan - Violoncelle Ariane Issartelle - Gestion de projet Manon Paret - Production Rémi Large - Captations & photos Jordan Anefalos*

*Production et conception Tamanoir Immersive Studio*

*Coproduction l'Opéra de Paris*

*Soutien CNC*

***Palais Garnier de Paris, Mars 2023***

“À Quelques Pas du Monde”, est exposé au Palais Garnier à Paris, c'est une expérience musicale collective guidée par la voix d'une danseuse sur la présence de 6 à 10 participant·es. Elle utilise une scénographie lumineuse intéractive évoluant grâce à un dispositif audio immersif. Les spectateurs sont invités à se mettre en mouvement et à voyager dans l'univers de l'Opéra ou la danse règne. Les participant·es sont invité·es à une réflexion sur leur présence scénique et à faire leurs premiers pas sur scène faisant d'eux les acteurs de leur propre spectacle.

Cette création est réalisée dans le cadre de l'appel à projet 15-25 ans du **Centre national du cinéma et de l'image animée (CNC)**, je suis pour ma part intervenue dans la conception du dossier qui a découlé sur l'obtention du financement permettant ainsi sa conception. Ce travail représente en amont les caractères artistiques et poétiques de cette expérience audio lumineuse avec pour soutien les textes d'écriture de l'artiste Sam Lecoeur visant à donner une autre perspective du spectacle vivant à travers les nouvelles technologies.

***ⓒ Jordan Anefalos***
`;

const descriptionGlenfiddich = `
# Installation immersif sensorielle

*Direction artistique Morgane Rocheteau - Compositions Jean LeBellego - Scénographie & création lumière Paolo Morvan*

*Production Tamanoir Immersive Studio*

***Paris, Octobre 2022***

Glenfiddich est une distillerie de whisky située à Dufftown, suite à un appel à projet concernant l'exposition de leur stand au Salon du Whiskey à Paris, ils ont contacté l'agence Tamanoir. Leur stand a pour objectif de présenter leur trois nouvelles gammes de whisky avec l'appui d'une expérience immersive sonore et lumineuse.

Mon rôle fut d'assister Paolo sur la conception scénique des lumières et sur la scénographie technique de l'installation au cours de deux résidences en collaboration avec l'agence Halloween coordinateurs du projet. Je devais rechercher les bons matériaux et les bons luminaires pour l'univers artistique de la marque Glenfiddich et réfléchir à l'aspect scénographique de l'installation.

J'ai également participé au démontage du stand et à la récupération de notre matériel le dernier jour du salon en coopération avec les techniciens sur place profitant ainsi pour noter les points à améliorer sur ce type d'installation à l'avenir. J'ai aussi rédigé le compte rendu des différents retours des clients et de l'agence Halloween sur les éléments à améliorer et j'ai établi un document logistique attestant que tout le matériel était complet et livré à l'entrepôt en bon état à mes responsables.

***ⓒ Paolo Morvan***
`;

const descriptionImaginarium = `
# Jeux narratif Game Jam

*En collaboration avec Jean-Baptiste Sanchez - Vanina Idiart - Robinson Pelladeau - Sound design Adrien Melchior*

***Gobelins Paris, Décembre 2021***

Imaginarium est un jeu vidéo français narratif permettant aux utilisateurs de composer leurs propres petites histoires sous la forme d'un cadavre exquis. Il a été présenté en décembre 2021 comme mon projet de semestre de Master aux Gobelins Paris.

Avec mon coéquipier Robinson nous avons inventé l'identité visuelle et l'univers de Imaginarium en passant par la conception de moodboard et des esquisses des personnages, la rédaction de l'histoire et des paroles des personnages, la production et post-production d'éléments 3D et 2D, la création des éléments UI/UX, du montage vidéo du teaser et des scènes cinématiques.

Dans cette expérience narrative, on suit les folles histoires du petit Louis, alors que Louis et sa petite soeur passent la nuit dans l'inquiétant grenier de leur vieille maison, vous allez l'aider à imaginer une histoire pour sa petite sœur en vous inspirant des curiosités de ce capharnaüm.
Chaque objet que le protagoniste choisit déterminera le paragraphe suivant et influe sur le reste de l'histoire.

***ⓒ Jean-Baptiste Sanchez***
`;

const descriptionLoree = `
# Installation sensorielle

*En collaboration avec Dorian Thénot - Axel Risseur - Guénolé Moreau - Pierre Pinto de Oliveira - Sound design Adrien Melchior*

***Gobelins Paris, Juin 2022***

L'Orée est un dispositif physique interactif, venant parler directement aux sens et à l'interprétation de l'utilisateur afin de présenter le monde technologique de manière plus réelle, plus palpable. Il a été présenté en juin 2022 comme mon projet de fin d'études de Master à l'école des Gobelins à Paris.
Pendant dix semaines, j'ai collaboré avec Dorian Thénot, Axel Risseur, Guénolé Moreau et Pierre Pinto de Oliveira pour créer une installation sensorielle réintroduisant le spectateur dans un contexte physique pour parler d'un sujet technologique, en impactant ses sens et ses émotions.

J'avais plusieurs fonctions: en tant que lead créatif et chef de projet, ma tâche a été de manager l'équipe sound design (quatre personnes), de cadrer l'univers artistique des sons, de choisir et de réceptionner le matériel complet et de l'installer, de participer à la création des scripts de la voix off, de contacter des doubleurs, d'enregistrer la voix et de la modifier. J'ai aussi retouché et composé des sons, j'étais en charge des tests et de la finalisation de l'univers sonore. J'étais enfin l'intermédiaire entre le service administratif de l'école et les prestataires, je me suis occupée des demandes de devis, du choix de ces prestataires, de la demande de subvention,de la recherche du matériel et de la conception scénique lumineuse.

Aujourd'hui, nous possédons tous une empreinte numérique. Ces données, qui nous concernent, sont actuellement au cœur de nombreux débats. Dans cette expérience sensorielle et émotionnelle, l'utilisateur est amené à se poser les choix cruciaux qui vont structurer nos sociétés dans les années à venir. Une installation dotée d'une projection évoluant selon la position de l'utilisateur dans la salle grâce à une Kinect. L'objectif est de répondre à des questions autour de la surveillance de masse en se déplaçant dans la pièce, faisant ainsi évoluer le visuel et le son de l'expérience.

***ⓒ Axel Risseur***
`;

const descriptionLesNaufrages = `
# Installation sensorielle & Immersif audio

*Direction artistique Morgane Rocheteau - Écriture & mise en scène Sam Lecoeur - Compositions Jean LeBellego - Scénographie & création lumière Paolo Morvan - Production Rémi Large*

*Production et conception Tamanoir Immersive Studio*

*Soutien CNC*

***Paris, Septembre 2022***

Les Naufragé·es est une auto-performance de 40 minutes pour 30 participant·es qui conjugue son immersif et scénographie lumineuse pour proposer un voyage dans un pays des ombres inspiré du Butoh. Ici les participants sont guidé.es par une voix intérieure et grâce à un casque audio spatialisé ils sont invités à entrer dans la peau des fantômes qui vivent sous la scène leur donnant, l'espace de quelque instant, une identité différente.

L'expérience s'adresse autant aux participants sur scène qu'aux spectateurs.

Directrice artistique chez Tamanoir, mon rôle fut d'alimenter et d'influencer la communication autour de ce spectacle vivant sur les réseaux sociaux français et canadiens et sur le site de Tamanoir. Il a été exposé au Canada et en France où j'ai participé au montage scénique sur trois sites différents entre mai 2022 et septembre 2023 et aux tests utilisateurs. J'ai rédigé le compte rendu des différents retours des participants afin d'apporter les modifications nécessaires à l'enrichissement des futures versions exposées.

***ⓒ Paolo Morvan ⓒ Tamanoir Immersif Studio  ⓒ Morgane Rocheteau***
`;

const photosFovea = Object.values(images.projectsPhotos.fovea);
const photosUnplug = Object.values(images.projectsPhotos.unplug);
const photosHkgFirstSteps = Object.values(images.projectsPhotos.hkgFirstSteps);
const photosAQuelquePasDuMonde = Object.values(images.projectsPhotos.aQuelquesPasDuMonde);
const photosGlenfiddich = Object.values(images.projectsPhotos.glenfiddich);
const photosImaginarium = Object.values(images.projectsPhotos.imaginarium);
const photosLoree = Object.values(images.projectsPhotos.loree);
const photosLesNaufrages = Object.values(images.projectsPhotos.lesNaufrages);

export const ProjectProvider = ({ children }) => {
  // TODO: Get data from Notion with use effect

  const projects = [
    {
      id: 'fovea',
      title: 'Fovea',
      bigTitle: 'Fovea',
      description: descriptionFovea,
      thumbnail: images.projectsThumbnails.thumbnailFovea, // TODO: url from Notion to get thumbnail same for others objects
      photos: photosFovea, // TODO: url from Notion to get images same for others objects
    },
    {
      id: 'unplug',
      title: 'Unplug',
      bigTitle: 'Unplug',
      description: descriptionUnplug,
      thumbnail: images.projectsThumbnails.thumbnailUnplug,
      photos: photosUnplug,
    },
    {
      id: 'first-steps-hkg',
      title: 'First Steps HKG',
      bigTitle: 'First Steps HKG',
      description: descriptionHkgFirststeps,
      thumbnail: images.projectsThumbnails.thumbnailHkgFirstSteps,
      photos: photosHkgFirstSteps,
    },
    {
      id: 'a-quelques-pas-du-monde',
      title: 'À quelques pas du monde',
      bigTitle: 'À quelques pas du monde',
      description: descriptionAQuelquespas,
      thumbnail: images.projectsThumbnails.thumbnailAQuelquesPasDuMonde,
      photos: photosAQuelquePasDuMonde,
    },
    {
      id: 'glenfiddich',
      title: 'Glenfiddich',
      bigTitle: 'Glenfiddich',
      description: descriptionGlenfiddich,
      thumbnail: images.projectsThumbnails.thumbnailGlenfiddich,
      photos: photosGlenfiddich,
    },
    {
      id: 'imaginarium',
      title: 'Imaginarium',
      bigTitle: 'Imaginarium les folles histoires du petit Louis',
      description: descriptionImaginarium,
      thumbnail: images.projectsThumbnails.thumbnailImaginarium,
      photos: photosImaginarium,
    },
    {
      id: 'l-oree',
      title: "L'Orée",
      bigTitle: "L'Orée l'impact de nos choix à l'ère numérique",
      description: descriptionLoree,
      thumbnail: images.projectsThumbnails.thumbnailLoree,
      photos: photosLoree,
    },
    {
      id: 'les-naufrages',
      title: 'Les naufragés',
      bigTitle: 'Les naufragés',
      description: descriptionLesNaufrages,
      thumbnail: images.projectsThumbnails.thumbnailLesNaufrages,
      photos: photosLesNaufrages,
    },
  ];

  return <ProjectContext.Provider value={projects}>{children}</ProjectContext.Provider>;
};
