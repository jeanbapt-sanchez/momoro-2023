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

import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import ProjectDetails from './pages/ProjectDetails/ProjectDetails';
import { ProjectProvider } from './contexts/ProjectsContext';
import { AboutProvider } from './contexts/AboutContext';

// TODO: Add i18n for automatic translation
const App = () => {
  return (
    <ProjectProvider>
      <AboutProvider>
        <div className="App">
          <main>
            <HashRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/:projectId" element={<ProjectDetails />} />
                <Route path="*" element={<Home />} />
              </Routes>
            </HashRouter>
          </main>
        </div>
      </AboutProvider>
    </ProjectProvider>
  );
};

export default App;
