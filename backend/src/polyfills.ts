// setup general global polyfills that need to be applied everything that runs in node directly!
//require("source-map-support").install(); // enable sourcemap support for .ts files in node

/*

MANDADORY CLS CONTEXT PROMISE SETUP
What's that?
* http://fredkschott.com/post/2014/02/conquering-asynchronous-context-with-cls/
* https://github.com/othiym23/node-continuation-local-storage

TL;DR
This must be setuped for sequelize transactions to work properly
All used promise dependencies need to be monkey-patched (sequelize supports this by default) to properly preserve the transaction context
Whenever you add a promise implementation to a backend project, be sure to patch + check if nested transactions inside the new promise impl. still preserve the context!

Related errors:
* https://github.com/sequelize/sequelize/issues/3509

*/

// setup our own process specific CLS namespace.
//const cls = require("continuation-local-storage");
//const uuid = require("node-uuid");
//const processCLSNamespace = cls.createNamespace("NS_" + uuid.v4()); // uniquely set per process to prevent collisions betwenn our CLS namespaces.

// apply a context (namespace) in which our sequelize promises will run inside, mandadory to get transactions working properly!
//const Sequelize = require("sequelize");
//Sequelize.cls = processCLSNamespace; // set the promise execution namespace for sequelize.

// also patch the separate installed bluebird promise package to use the cls namespace
// see https://github.com/sequelize/sequelize/issues/3509
//const bluebirdPromise = require("bluebird");
//const patchBluebird = require("cls-bluebird");
//patchBluebird(processCLSNamespace); // patch...

// tell fetch to use our version of the cls patched bluebirdPromise
//const fetch = require("node-fetch");
//fetch.Promise = bluebirdPromise; // patch...

// ALWAYS log something out, this polyfill step is mandadory for all backend service processes running node!
//console.log(`Polyfills installed. CLS=${processCLSNamespace.name}`);
console.log("mandatory");