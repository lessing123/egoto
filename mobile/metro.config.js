const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

// Trouver la racine du monorepo
const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "..");

const config = getDefaultConfig(projectRoot);

// 1. Surveiller la racine du monorepo (pour pouvoir importer de @egoto/shared)
config.watchFolders = [workspaceRoot];

// 2. Chercher les dépendances dans les node_modules de l'app et du monorepo racine
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(workspaceRoot, "node_modules"),
];

// 3. Forcer Metro à résoudre les dépendances partagées localement
config.resolver.disableHierarchicalLookup = true;

module.exports = config;
