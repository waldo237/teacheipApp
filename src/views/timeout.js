
// ===========================================================================================================
// Global variables
var cacheOutputs = 'InventoryScript_outputs';
var cacheKillFlag = 'InventoryScript_killFlag';


// ===========================================================================================================
// Reset the script cache if it is required to run from the beginning
function reset() {
  SpreadsheetApp.getActiveSpreadsheet().toast('Reseting script...', 'Status', -1);
  
  // reset triggers and delete cache variables
  setKillFlag_(true, this.cacheTimeout);
  deleteTriggers_(this.loopResetGapTime);
  deleteCache_();
  
  SpreadsheetApp.getActiveSpreadsheet().toast('Reset is complete!', 'Status', -1);
}


// ===========================================================================================================
// List all folders and files, then write into the current spreadsheet.
function run() {
  SpreadsheetApp.getActiveSpreadsheet().toast('Executing script...', 'Status', -1);
  // load cache
  setKillFlag_(false, this.cacheTimeout);
  var outputRows = getCache_(this.lockWaitTime);
  // get list
  if (outputRows === undefined || outputRows === null ||
      outputRows[0] === undefined || outputRows[0] === null) {
    outputRows = [];
    // HEREREEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
    
  }
  SpreadsheetApp.getActiveSpreadsheet().toast('Execution is complete!', 'Status', -1);
}

// ===========================================================================================================
// Get the list of folders and files and their metadata using a recursive loop
function getChildFolders_( cacheTimeout, lockWaitTime, outputRows) {
  try{
      setCache_(outputRows, lockWaitTime, cacheTimeout);
    
  } catch (e) {
    Logger.log('Timed out: Restarting! ' + e.toString());
    SpreadsheetApp.getActiveSpreadsheet().toast( 'Timed out!', 'Status', -1);
  }
  
  // cache outputs
  setCache_(outputRows, lockWaitTime, cacheTimeout);
  
  return outputRows;
}


// ===========================================================================================================
// Get the values from cache
function setCache_(outputRows, lockWaitTime, cacheTimeout) {
  try{
    var cache = CacheService.getScriptCache();
    var lock = LockService.getScriptLock();
    
    lock.waitLock(lockWaitTime);
    cache.put(cacheOutputs, JSON.stringify(outputRows), cacheTimeout);
    lock.releaseLock();
  } catch (e) {
    Logger.log('Timed out: Restarting! ' + e.toString());
    SpreadsheetApp.getActiveSpreadsheet().toast('Timed out!', 'Status', -1);
  }
}


// ===========================================================================================================
// Set the values in cache
function getCache_(lockWaitTime) {
  try{
    var outputRows = [];
    var cache = CacheService.getScriptCache();
    var lock = LockService.getScriptLock();
    
    lock.waitLock(lockWaitTime);
    outputRows =  JSON.parse(cache.get(cacheOutputs));
    if (outputRows === undefined || outputRows === null ||
        outputRows[0] === undefined || outputRows[0] === null) {
      outputRows = JSON.parse(cache.get(cacheOutputs));
    }
    lock.releaseLock();
  } catch (e) {
    SpreadsheetApp.getActiveSpreadsheet().toast('Timed out!', 'Status', -1);
  }
  return outputRows;
}
// ===========================================================================================================
// Delete the global cache
function deleteCache_() {
  try{
    var cache = CacheService.getScriptCache();
    var lock = LockService.getScriptLock();
    
    lock.waitLock(this.lockWaitTime);
    cache = CacheService.getScriptCache();
    cache.remove(cacheOutputs);
    lock.releaseLock();
  } catch (e) {
    Logger.log('Failed to delete cache! ' + e.toString());
    SpreadsheetApp.getActiveSpreadsheet().toast('Failed to delete cache! Try again in a few minutes.');
  }
}
// ===========================================================================================================
// Delete triggers
function deleteTriggers_() {
  var triggers = ScriptApp.getProjectTriggers();
  try{
    for (var i = 0; i < triggers.length; i++) {
      if (triggers[i].getHandlerFunction() === "run") {
        ScriptApp.deleteTrigger(triggers[i]);
      }
    }
  } catch (e) {
    Logger.log('Failed to delete triggers! ' + e.toString());
    SpreadsheetApp.getActiveSpreadsheet().toast('Failed to delete triggers! Try again in a few minutes.');
  }
}
// ===========================================================================================================
// Set kill flag
function setKillFlag_(state, cacheTimeout) {
  var lock = LockService.getScriptLock();
  try{
    lock.waitLock(this.lockWaitTime);
    cache = CacheService.getScriptCache();
    cache.put(cacheKillFlag, state, cacheTimeout);
    lock.releaseLock();
  } catch (e) {
    SpreadsheetApp.getActiveSpreadsheet().toast('Failed to set kill flag! Try again in a few minutes.');
  }
}

// ===========================================================================================================
// Get kill flag
function getKillFlag_() {
  killFlag = false;
  try {
    cache = CacheService.getScriptCache();
    //lock.waitLock(this.lockWaitTime);
    killFlag = cache.get(cacheKillFlag) === 'true';
    //lock.releaseLock();
  } catch (e) {
    SpreadsheetApp.getActiveSpreadsheet().toast('Failed to set kill flag! Try again in a few minutes.');
  }
  return killFlag;
}