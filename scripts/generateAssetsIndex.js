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

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src');

function toCamelCase(str) {
  return str.replace(/([-_][a-z0-9])/gi, (group) =>
    group.toUpperCase().replace('-', '').replace('_', ''),
  );
}

function formatFile(filePath) {
  try {
    execSync(`npx prettier --write "${filePath}"`);
    execSync(`npx eslint --fix "${filePath}"`);
    console.log(`File formatted and linted: ${filePath}`);
  } catch (error) {
    console.error(`Failed to format or lint file: ${filePath}`, error);
  }
}

function getFiles(dirPath, prefix = '') {
  const items = fs.readdirSync(dirPath, { withFileTypes: true });

  // Custom sorting to handle numbers in file names
  items.sort((a, b) => {
    return naturalSort(a.name, b.name);
  });

  let exports = {
    individual: [],
    nested: {},
    flat: {},
  };

  for (const item of items) {
    if (item.isFile() && !item.name.startsWith('.') && item.name !== 'index.js') {
      const baseName = path.basename(item.name, path.extname(item.name));
      const importName = toCamelCase(baseName);
      const filePath = path.join(prefix, item.name);
      exports.individual.push({ importName, filePath });
      exports.nested[importName] = importName;
      exports.flat[importName] = importName;
    } else if (item.isDirectory()) {
      const subdirExports = getFiles(path.join(dirPath, item.name), path.join(prefix, item.name));
      const dirName = toCamelCase(item.name);
      exports.individual.push(...subdirExports.individual);
      exports.nested[dirName] = subdirExports.nested;
      Object.assign(exports.flat, subdirExports.flat);
    }
  }

  return exports;
}

function naturalSort(a, b) {
  return a.localeCompare(b, undefined, {
    numeric: true,
    sensitivity: 'base',
  });
}

function generateNestedExport(obj, level = 0) {
  const indent = '  '.repeat(level);
  const entries = Object.entries(obj)
    .map(([key, value]) => {
      if (typeof value === 'string') {
        return `${indent}${key}: ${value}`;
      } else if (typeof value === 'object') {
        return `${indent}${key}: {\n${generateNestedExport(value, level + 1)}\n${indent}}`;
      }
    })
    .join(',\n');
  return entries;
}

function generateIndexFile(dirPath) {
  const { individual, nested, flat } = getFiles(dirPath);
  if (individual.length > 0) {
    const individualImports = individual
      .map(
        ({ importName, filePath }) =>
          `import ${importName} from './${filePath.replace(/\\/g, '/')}';`,
      )
      .join('\n');

    const flatExports = `export { ${Object.keys(flat).join(', ')} };`;

    const nestedExport = `export default {\n${generateNestedExport(nested, 1)}\n};`;

    const content = `${individualImports}\n\n${nestedExport}\n\n${flatExports}`;

    const indexPath = path.join(dirPath, 'index.js');
    fs.writeFileSync(indexPath, content + '\n');
    console.log(`Index file created at ${indexPath}`);

    formatFile(indexPath);
  }
}

const directoriesToIndex = ['assets/images'];

directoriesToIndex.forEach((dir) => {
  generateIndexFile(path.join(srcDir, dir));
});
