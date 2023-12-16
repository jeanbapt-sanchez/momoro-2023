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

import React, { useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import { useHideScrollbar } from '../../hooks';
import { Layout } from '../../components';
import { AboutContext } from '../../contexts';

const About = () => {
  const aboutData = useContext(AboutContext);
  useHideScrollbar();

  // TODO: Replace text from context
  return (
    <Layout isAboutPage={true}>
      <div className="About">
        <ReactMarkdown className="About-child About-headline">{aboutData.headline}</ReactMarkdown>
        <div className="About-child About-cv">
          <div className="About-experience-container">
            <h1>Experience</h1>
            <div className="About-experience">
              <div>
                <h2>Junior UI/UX designer (2019-2022)</h2>
                <p>
                  Art direction, 3D, illustration, motion design, AR/VR/Serious Game, web design,
                  photo editing, shooting setup and moodboards
                </p>
              </div>
              <div>
                <h2>Multimedia Graphic Designer (2019) Malta</h2>
                <p>
                  Art direction, UI design, data visualization, web design, grid layout, mobile
                  design, UX, motion design, illustration
                </p>
              </div>
              <div>
                <h2>Digital Marketing Intern (2018)</h2>
                <p>
                  Complete marketing analysis, coordination of promotional and communication
                  actions, after sales follow through.
                </p>
              </div>
              <div>
                <h2>Digital Marketing Intern (2017) Miami</h2>
                <p>
                  UI design, web design, mobile design, budgeting, management of social networks,
                  agenda, complete marketing analysis, coordination of promotional and communication
                  actions.
                </p>
              </div>
            </div>
          </div>
          <div className="About-education-container">
            <h1>Education</h1>
            <div className="About-education">
              <div>
                <h2>Gobelins, Paris</h2>
                <p>
                  Master 1 (M1), Design and management of interactive innovation, creative lead
                  option
                </p>
                <p>2021-2023</p>
              </div>
              <div>
                <h2>Excelia, La Rochelle</h2>
                <p>Bachelor's degree, Web design and graphic communication</p>
                <p>2018 - 2021 Major of promotion</p>
              </div>
              <div>
                <h2>Dautet, La Rochelle</h2>
                <p>Executive Assistant/Executive Secretary</p>
                <p>2017 - 2028</p>
              </div>
              <div>
                <h2>Doriol, La Rochelle</h2>
                <p>Business Administration and Management, General</p>
                <p>2013 - 2016</p>
              </div>
            </div>
          </div>
          <div className="About-skills-container">
            <h1>Skills</h1>
            <div className="About-skills">
              <h2>Web Design</h2>
              <h2>Art Direction</h2>
              <h2>Interactive Art Installation</h2>
              <h2>Editorial Design</h2>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
