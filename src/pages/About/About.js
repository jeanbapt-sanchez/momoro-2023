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

import React, { memo, useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import { useHideScrollbar } from '../../hooks';
import { Layout } from '../../components';
import { AboutContext } from '../../contexts';
import './About.css';

const About = () => {
  const aboutData = useContext(AboutContext);

  useHideScrollbar();

  return (
    <Layout isAboutPage={true}>
      <div className="about">
        <div className="about__profile-background" />
        <ReactMarkdown className="about__headline about__scroll-item ">
          {aboutData.headline}
        </ReactMarkdown>
        <ReactMarkdown className="about__content about__scroll-item ">
          {aboutData.content}
        </ReactMarkdown>
      </div>
    </Layout>
  );
};

export default memo(About);
