window.onload = function(){

	// Extract input forms and matrix coordinates
    let stract = extract_grid();
	coords = stract[0];
	inputs = stract[1];

	// Load matrix code and fill authentication form by using that
	chrome.storage.local.get({
    	code: ''
  	}, function(items) {
     	let code = items.code;
		fill_form(coords, inputs, code);
  	});


}

// A function that finds three matrix coordinates and input forms respectively
function extract_grid(){
    let auth_table = document.getElementById('authentication');
    let auth_tbody = auth_table.children[0];
    let tr_idx = [4,5,6];
    let coords = [];
    let inputs = [];
    for (let i = 0; i < tr_idx.length; i ++){
        let idx = tr_idx[i];
        let tr = auth_tbody.children[idx];
        let input = tr.getElementsByClassName('form-control')[0];
        inputs.push(input);

        let label = tr.children[0].textContent;
		console.log('Matrix coords: ' + label);
        let x = label.charCodeAt(1) - 65;
        let y = parseInt(label.slice(3, 4)) - 1;
        coords.push([x, y]);
    }

    return [coords, inputs];
}

// A function that fills form
function fill_form(coords, inputs, code){
    let cols = 10;
	let rows = 7;
	if (code.length != cols*rows){
		console.error('Invalid matrix code is stored. Please input it on the extension option page.');
		return;
	}

	for (let i = 0; i < coords.length; i ++){
        let x = coords[i][0];
        let y = coords[i][1];
        let idx = y * cols + x;
        let input = inputs[i];

        input.value = code[idx];
    }
}
