//Function for easy collision detection
function collides(a, b, xinc, yinc) {
	if (distance(a, b)<((a.width/2)+(b.width/2)))
		return true;
	else
		return false;
};

//Calculate gravitational force on two objects
function gravForce(a, b) {
	return .000000000667384 * (b.height * b.width * b.density) / (Math.pow(distance(a, b), 2));
};

//Calculate distance between two objects
function distance(a, b) {
	var ca = center(a);
	var cb = center(b);
	return Math.sqrt(Math.pow(ca.x - cb.x, 2) + Math.pow(ca.y - cb.y, 2));
};

//Calculate distance between two objects
function basic_distance(ca, cb) {
	return Math.sqrt(Math.pow(ca.x - cb.x, 2) + Math.pow(ca.y - cb.y, 2));
};

//Calculate the center of an object
function center(a) {
	return {
		x : (a.x + (a.width / 2)),
		y : (a.y + (a.height / 2))
	};
};

//Move object based on gravitational pull of every other item
function gravMove(obj, objects) {
	
	//For every object in the list
	for (var i = 0; i < objects.length; i++) {
		
		var ca = center(obj);
		var cb = center(objects[i]);
		var gravitationalPull = gravForce(obj, objects[i]);
    
		if (ca.x == cb.x && ca.y == cb.y)
			continue;
		obj.setVelocity((obj.velocity.x + (cb.x - ca.x) * gravitationalPull), (obj.velocity.y + (cb.y - ca.y) * gravitationalPull));

	}

	return;
};

//Checks which object is bigger than the other
function bigger(a, b) {
	if ((a.height * a.width * a.density) > (b.height * b.width * b.density))
		return true;
};

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
