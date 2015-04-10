/**
 * This scripts installs the nibble product globally
 */
require('package-script').spawn([
  {
    command: "npm",
    args: ["install", "-g", "npm-adaptiveme-nibble"]
  }
]);
