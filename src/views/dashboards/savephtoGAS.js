function doPost(e) {
  upload(e)

//  return ContentService.createTextOutput(JSON.stringify(e))
//}
//
//function upload(e) {
  var destination_id = "14sjjC9Fjte2cwyuafH4dL6JUH3yh1T8k"; // Folder ID of destination folder
//  var contentType = 'image/jpeg';
//  var img = e.imageFile;
//  
//  var destination = DriveApp.getFolderById(destination_id);
//  var img = img.getAs(contentType);
//  destination.createFile(img);
//}

function upload(e) {
  //  if (!e.parameters.filename || !e.parameters.file) {
  //    return message("the photo was uploaded successfully");
  //  } else {
  var data = Utilities.base64Decode(e.parameters.file, Utilities.Charset.UTF_8);
  var blob = Utilities.newBlob(data, MimeType.PNG, e.parameters.filename);
  var destination = DriveApp.getFolderById("14sjjC9Fjte2cwyuafH4dL6JUH3yh1T8k");
  //  var img = img.getAs(contentType);
  //  destination.createFile(img);
  DriveApp.createFile(blob);
  return message("completed");
  return message("Error: no parameters");
}
function message(msg) {
  return ContentService.createTextOutput(JSON.stringify({result: msg})).setMimeType(ContentService.MimeType.JSON);

 }
}