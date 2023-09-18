const path = require('path');

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`;

const depCheckCommand = 'bash -c "npx depcheck"';

module.exports = {
  '*.{js,jsx,ts,tsx}': [buildEslintCommand],
  'package.json': [depCheckCommand],
};
