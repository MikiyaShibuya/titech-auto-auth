// Saves options to chrome.storage
function save_options() {
  var code = document.getElementById('code').value;
  if (code[0] == '*'){
    return;
  }
  chrome.storage.local.set({
    code: code
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.local.get({
    code: ''
  }, function(items) {
      //document.getElementById('code').value = items.code;
      document.getElementById('code').value = '********';
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
