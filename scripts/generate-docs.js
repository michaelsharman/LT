/**
 * Runs JSDoc against a copy of jsdoc.json with build-time placeholders resolved.
 *
 * Any `{{version}}` token in jsdoc.json is replaced with the `version` from
 * package.json, so the docs can display the released version without it being
 * hardcoded in two places. The generated config is written next to jsdoc.json
 * (JSDoc resolves relative paths against the working directory) and removed
 * again once the run finishes.
 */

import { execFileSync } from 'node:child_process';
import { readFileSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const configPath = path.join(root, 'jsdoc.build.json');
const jsdocBin = path.join(root, 'node_modules', 'jsdoc', 'jsdoc.js');

const pkg = JSON.parse(readFileSync(path.join(root, 'package.json'), 'utf8'));
const template = readFileSync(path.join(root, 'jsdoc.json'), 'utf8');

writeFileSync(configPath, template.replaceAll('{{version}}', pkg.version));

try {
    execFileSync(process.execPath, [jsdocBin, '-c', configPath, '-R', 'README.md', ...process.argv.slice(2)], { cwd: root, stdio: 'inherit' });
} catch {
    // JSDoc has already written its own diagnostics to stderr.
    process.exitCode = 1;
} finally {
    rmSync(configPath, { force: true });
}
