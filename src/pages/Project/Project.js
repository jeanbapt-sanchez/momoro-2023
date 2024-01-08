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

import React, { memo, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useContext, useRef } from 'react';
import { useHideScrollbar, useOnlyHorizontalScroll } from '../../hooks';
import ReactMarkdown from 'react-markdown';
import { ProjectContext } from '../../contexts';
import { Layout, ProjectTile } from '../../components';
import { placeholder } from '../../assets/images';
import './Project.css';

const Project = () => {
  const { projectId } = useParams();

  const projectsData = useContext(ProjectContext);

  const project = useMemo(
    () => projectsData.find((project) => project.id === projectId),
    [projectsData, projectId],
  );

  const containerRef = useRef(null);

  useOnlyHorizontalScroll(containerRef);
  useHideScrollbar();

  if (!project) {
    return <div>Projet introuvable</div>;
  } else {
    return (
      <Layout>
        <div className="project-details" ref={containerRef}>
          <div className="cover">
            <div className="cover__content">
              <h1 className="cover__title">{project.title}</h1>
              <ReactMarkdown className="main__description">{project.description}</ReactMarkdown>
            </div>
            {project.photos && project.photos.length > 0 ? (
              <img
                className="cover__photo"
                src={project.photos[0]}
                alt={`${project.title} - photo 1`}
              />
            ) : (
              <img className="cover__photo" src={placeholder} alt={`${project.title} - photo 1`} />
            )}
          </div>
          <div className="exhibition">
            {project.photos &&
              project.photos
                .slice(1)
                .map((image, index) => (
                  <ProjectTile
                    key={index}
                    src={image}
                    alt={`${project.title} - photo ${index + 2}`}
                    index={index}
                  />
                ))}
          </div>
        </div>
      </Layout>
    );
  }
};

export default memo(Project);
