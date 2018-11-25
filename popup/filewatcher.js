"use strict";

ChromeUtils.import("resource://gre/modules/osfile.jsm", this);
ChromeUtils.import("resource://gre/modules/Promise.jsm", this);

/**
 * Error callback (pass to filewatcher).
 */
function reportError(error) {
	console.error(`Failed to watch resource: ${error.message}`);
}

/**
 * Change callback (pass to filewatcher).
 */
function reportChange(error) {
	// Do something.
}

function makeWatcher() {
   let watcher =
       Cc["@mozilla.org/toolkit/filewatcher/native-file-watcher;1"]
         .getService(Ci.nsINativeFileWatcherService);
	   return watcher;
}

function promiseAddPath(watcher, resource, onChange = null, onError = null) {
   return new Promise(resolve =>
       watcher.addPath(resource, onChange, onError, resolve)
   );
}

function promiseRemovePath(watcher, resource, onChange = null, onError = null) {
   return new Promise(resolve =>
       watcher.removePath(resource, onChange, onError, resolve)
   );
}

/**
 * Check for support of filewatcher API and set up the filewatcher here if so,
 * or report non-support and disable.
 */
let watcher = makeWatcher();
