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

export const AboutContext = createContext();

export const AboutProvider = ({ children }) => {
  const aboutHeadline = `
  Je me présente, Morgane Rocheteau, je suis née à Bordeaux en 1997, artiste visuelle française prête à explorer les frontières entre la technologie et le réel : rendre tangible une innovation purement virtuelle.

  Originaire d’une famille à cent lieu de tout milieu artistique mais d’un père régisseur de spectacle et une mère dévouée, j’ai su faire preuve de ténacité et d’audace pour intégrer l’industrie du divertissement.
  
  Je vois le monde avec un regard neuf et ambitieux. Mon parcours sort des sentiers battus et le chemin pour arriver où je suis aujourd’hui n’a pas été simple. J’ai dû repousser de nombreuses limites tant du côté personnel que professionnel me fixant des objectifs qui pouvaient sembler irréalisables mais j’y suis arrivée.

  Jeune diplômée de l’académie des Gobelins l’école de l’image à Paris en 2023, passionnée pour les arts de la scène, j’ai travaillé sur des projets couvrant de nombreuses disciplines, notamment des interfaces physiques, des sites webs, du motion design pour les médias sociaux, des performances, des installations sonores, vidéo et lumineuses.
  
  Au cours de ces études, je me découvre un grand intérêt pour l’univers de l’installation, l'audiovisuel et l'art vivant.
  
  J’aimerais continuer à créer des récits audiovisuels, des paysages éthérés multisensoriels entre les notions de réel, d'irréel et de surréel, partager des expériences d'immersion en lien avec la technologie, ouvrant ainsi un espace de discussion dans la sphère analogique.
  Je travaille dans une variété de contextes et de formats impliquant les nouveaux médias et l'hybridité rendant les visiteurs acteurs et spectateurs de leur propre expérience.
  
  J’aime partager mon savoir, je suis intervenante à l’école des Gobelins pour des cours de Touchdesigner et design interactif.
  Récemment membre actif du collectif 36 degrés Paris et Cookie Collectif, vous pourrez également voir un côté plus performatif de mon travail lors de leurs événements.

  ***Je peux être contactée : rocheteaumn@gmail.com***
  `;

  const aboutContent = `
  # Formations

  Diplôme Bac+5 
  Expert en création numérique intéractif Académie des Gobelins de Paris
  Diplôme Bac+3
  Web design et communication graphique Académie Excelia de La Rochelle 
  BTS Bac+2
  Assistante manager Académie Jean Dautet de La Rochelle 

  # Résidences

  - 2023 - Tamanoir Immersif Studio - résidence de travail installation sensorielle, création lumière & vidéo mapping projet “Opéra”, soutenue par le CNC et Opéra Garnier, à Anis Gras à Arcueil
  - 2023 - Tamanoir Immersif Studio - résidence de travail installation immersive, création lumière & vidéo mapping projet “Unplug”, à Anis Gras à Arcueil
  - 2022 - Tamanoir Immersif Studio - résidence de travail installation sensorielle & création lumière projet “Glenfiddish”, à Anis Gras à Arcueil
  - 2022 - Tamanoir Immersif Studio - résidence de travail audiovisuel & création lumière projet “Les naufragés”, soutenue par le CNC, à Anis Gras à Arcueil

  # Parcours

  - 2023 - 2023 Intervenante Touch Designer Gobelins Paris 
  - 2022 - 2023 Direction Artistique Junior Alternance Tamanoir Immersif Studio Paris
  - 2020 - 2022 UI & UX Designer Junior Alternance Serious Frames La Rochelle
  - 2020 - 2020 Graphic Design Artist Stage Serious Frames La Rochelle
  - 2019 - 2019 Directrice Communication Association Babel Raid La Rochelle 
  - 2019 - 2019 Multimedia Graphic Designer Stage Keen Ltd Malte
  - 2018 - 2018 Digital Marketing Stage Groupe Rinos La Rochelle 
  - 2017 - 2017 Digital Marketing Stage Lydia Feral PA Miami 

  # Compétences
  
  Touch designer 
  Madmapper & Smode (notions) 
  Cinema 4D + Octane Render 
  Blender 
  Zbrush + Marvelous Designer (notions) 
  Suite Adobe (Ae, Ai, Pr, Ps, Id, xd)
  Figma 
  Abelton (notions)
  `;

  const about = {
    headline: aboutHeadline,
    content: aboutContent,
  };

  return <AboutContext.Provider value={about}>{children}</AboutContext.Provider>;
};
