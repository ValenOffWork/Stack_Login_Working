#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const {execSync} = require('child_process');
const chalk = require('chalk');
const semver = require('semver');

// Install required packages if not already installed
try {
  require.resolve('chalk');
  require.resolve('semver');
} catch (e) {
  console.log('Installing required packages...');
  execSync('npm install chalk semver', {stdio: 'inherit'});
  console.log('\nPlease run the script again.');
  process.exit(0);
}

// Get versions
function getVersions() {
  try {
    // Get Node version
    const nodeVersion = process.version;

    // Get npm version
    const npmVersion = execSync('npm --version').toString().trim();

    // Get React Native CLI version
    let rnCliVersion = 'Not installed globally';
    try {
      rnCliVersion = execSync('react-native --version').toString().trim();
    } catch (e) {
      // Try with npx if not installed globally
      try {
        rnCliVersion = execSync('npx react-native --version').toString().trim();
      } catch (e) {
        // Ignore if still not found
      }
    }

    // Get project React Native version from package.json
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    let projectRnVersion = 'Not found';
    let projectName = 'Unknown';
    let projectVersion = '0.0.0';
    let allDependencies = {};

    if (fs.existsSync(packageJsonPath)) {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      projectName = packageJson.name || 'Unknown';
      projectVersion = packageJson.version || '0.0.0';
      allDependencies = {
        ...packageJson.dependencies,
        ...packageJson.devDependencies,
        ...packageJson.peerDependencies,
      };
      projectRnVersion = allDependencies['react-native'] || 'Not specified';
    }

    return {
      nodeVersion,
      npmVersion,
      rnCliVersion,
      projectName,
      projectVersion,
      projectRnVersion,
      allDependencies,
    };
  } catch (error) {
    console.error(chalk.red('Error getting versions:'), error);
    process.exit(1);
  }
}

// Check for common conflicts
function checkForConflicts(versions) {
  const issues = [];
  const {nodeVersion, projectRnVersion, allDependencies} = versions;

  // Check Node version compatibility with React Native
  if (projectRnVersion !== 'Not specified') {
    // React Native 0.70+ requires Node 16+
    if (semver.satisfies(projectRnVersion, '>=0.70.0')) {
      if (!semver.satisfies(nodeVersion, '>=16.0.0')) {
        issues.push({
          type: 'incompatibility',
          package: 'Node.js',
          message: `React Native ${projectRnVersion} requires Node 16+ but you're using ${nodeVersion}`,
          solution: 'Upgrade Node.js to version 16 or higher',
        });
      }
    }
    // React Native 0.68+ requires Node 14+
    else if (semver.satisfies(projectRnVersion, '>=0.68.0')) {
      if (!semver.satisfies(nodeVersion, '>=14.0.0')) {
        issues.push({
          type: 'incompatibility',
          package: 'Node.js',
          message: `React Native ${projectRnVersion} requires Node 14+ but you're using ${nodeVersion}`,
          solution: 'Upgrade Node.js to version 14 or higher',
        });
      }
    }
  }

  // Check for duplicate React installations
  if (allDependencies.react && allDependencies['react-native']) {
    const reactVersion = allDependencies.react;
    const reactNativeVersion = allDependencies['react-native'];

    // React and React Native version compatibility
    // Generally, React Native versions have specific React version requirements
    if (semver.satisfies(reactNativeVersion, '>=0.72.0')) {
      if (!semver.satisfies(reactVersion, '^18.2.0')) {
        issues.push({
          type: 'incompatibility',
          package: 'react',
          message: `React Native ${reactNativeVersion} typically requires React ^18.2.0 but you have ${reactVersion}`,
          solution: 'Run: npm install react@^18.2.0',
        });
      }
    } else if (semver.satisfies(reactNativeVersion, '>=0.70.0')) {
      if (!semver.satisfies(reactVersion, '^18.1.0')) {
        issues.push({
          type: 'incompatibility',
          package: 'react',
          message: `React Native ${reactNativeVersion} typically requires React ^18.1.0 but you have ${reactVersion}`,
          solution: 'Run: npm install react@^18.1.0',
        });
      }
    } else if (semver.satisfies(reactNativeVersion, '>=0.64.0')) {
      if (!semver.satisfies(reactVersion, '^17.0.2')) {
        issues.push({
          type: 'incompatibility',
          package: 'react',
          message: `React Native ${reactNativeVersion} typically requires React ^17.0.2 but you have ${reactVersion}`,
          solution: 'Run: npm install react@^17.0.2',
        });
      }
    }
  }

  // Check for common conflicting packages
  const conflictingPackages = [
    {
      name: 'react-native-gesture-handler',
      conflictWith: 'react-navigation',
      minVersion: '2.0.0',
      message:
        'react-native-gesture-handler needs to be imported at the top of your entry file',
    },
    {
      name: '@react-navigation/native',
      conflictWith: 'react-navigation',
      message:
        'React Navigation v5+ should use @react-navigation packages instead of react-navigation',
    },
    {
      name: 'react-native-reanimated',
      conflictWithOldVersions: true,
      minVersion: '2.0.0',
      message:
        'react-native-reanimated v2+ requires additional babel plugin configuration',
    },
  ];

  conflictingPackages.forEach(pkg => {
    if (allDependencies[pkg.name]) {
      // Check for conflicts with other packages
      if (pkg.conflictWith && allDependencies[pkg.conflictWith]) {
        issues.push({
          type: 'package conflict',
          package: pkg.name,
          message: `${pkg.name} may conflict with ${pkg.conflictWith}. ${pkg.message}`,
          solution: `Consider removing ${pkg.conflictWith} or follow migration guides`,
        });
      }

      // Check for old versions
      if (pkg.conflictWithOldVersions && pkg.minVersion) {
        const currentVersion = allDependencies[pkg.name].replace(/^[\^~]/, '');
        if (semver.lt(currentVersion, pkg.minVersion)) {
          issues.push({
            type: 'outdated package',
            package: pkg.name,
            message: `${pkg.name} version ${currentVersion} is outdated. ${pkg.message}`,
            solution: `Run: npm install ${pkg.name}@latest`,
          });
        }
      }
    }
  });

  return issues;
}

// Display results
function displayResults(versions, issues) {
  console.log(chalk.bold.blue('\nReact Native Environment Check\n'));
  console.log(
    chalk.bold('Project:'),
    `${versions.projectName} v${versions.projectVersion}`,
  );
  console.log(chalk.bold('Node.js:'), versions.nodeVersion);
  console.log(chalk.bold('npm:'), versions.npmVersion);
  console.log(chalk.bold('React Native CLI:'), versions.rnCliVersion);
  console.log(chalk.bold('Project React Native:'), versions.projectRnVersion);

  if (issues.length === 0) {
    console.log(chalk.bold.green('\nNo issues detected!'));
    console.log(chalk.green('Your environment seems properly configured.'));
  } else {
    console.log(chalk.bold.red(`\nFound ${issues.length} potential issue(s):`));
    issues.forEach((issue, index) => {
      console.log(
        chalk.bold(`\n${index + 1}. [${issue.type}] ${issue.package}`),
      );
      console.log(chalk.yellow('Message:'), issue.message);
      console.log(chalk.green('Solution:'), issue.solution);
    });

    console.log(chalk.bold.yellow('\nRecommendation:'));
    console.log(
      'Address these issues to prevent potential build/runtime errors.',
    );
    console.log(
      'Always check the official documentation for your React Native version.',
    );
  }

  console.log(chalk.blue('\nCheck completed.\n'));
}

// Main function
function main() {
  const versions = getVersions();
  const issues = checkForConflicts(versions);
  displayResults(versions, issues);
}

main();
