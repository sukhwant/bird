function start() {
	var keyPressed = 0;
	var planeArr = [];
	var yTop = 2.5,
	yBottom = -2.5,
	currentYTop = 2,
	currentYBottom = -2,
	moveForward = 0,
	totalPlane = 24,
	gameNotEnd = 0,
	last;
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	var geometry = new THREE.BoxGeometry(1, 1, 1);
	var texture = THREE.ImageUtils.loadTexture( "tinkle.png" );
	var tunnel = THREE.ImageUtils.loadTexture( "tunnel.png" );
	
	var material = new THREE.MeshBasicMaterial({
			//color : 0x00ff00
			map: texture,
			side : THREE.DoubleSide,
			transparent: true
		});
	var cube = new THREE.Mesh( new THREE.PlaneGeometry(1, 1, 1), material );
	
	cube.position.x = -4;
	
	scene.add(cube);

	camera.position.z = 5;

	window.addEventListener("keydown", dealWithKeyboard, false);

	function dealWithKeyboard(e) {
		
		if (e.keyCode == "38") {
			keyPressed = 1;
		}
		else if(e.keyCode == "39"){
			moveForward = 1;
		}
	}
	
	for(var i=0;i<totalPlane;i++){
		var geometry = new THREE.PlaneGeometry(1, 4, 8);
		var material = new THREE.MeshBasicMaterial({
				//color : 0xffff00,
				map: tunnel,
				side : THREE.DoubleSide,
				transparent: true
			});
		var plane = new THREE.Mesh(geometry, material);
		planeArr.push(plane);
		var rand = Math.random()*2;
		
		if(i%2==0){
			plane.position.y = yTop;
			plane.position.y += rand;
			plane.rotation.x += Math.PI;
		}
		else{
			plane.position.y = yBottom;
			plane.position.y -= rand;
		}
		
		plane.position.x = i ;
		scene.add(plane);
	}
	last=i-1;
	currentX = planeArr[totalPlane-1].position.x;	

	var render = function () {
		
		if(!gameNotEnd){
			requestAnimationFrame(render);
		}

		//cube.rotation.x += 0.02;
		//cube.rotation.y += 0.02;

		if (keyPressed == 1) {

			keyPressed = 0;
			cube.position.y += 0.5;
		} else {

			cube.position.y -= 0.04;
		}
		
		if(moveForward == 1){
			moveForward = 0;
			cube.position.x += 0.1;
		}
		
		for(var i=0;i<totalPlane;i++){
			
			planeArr[i].position.x -= 0.03;
			if(planeArr[i].position.x < -10){
				planeArr[i].position.x = planeArr[last].position.x+1;
				last=i;
			}
			
			if(planeArr[i].position.x == cube.position.x){
				planeArr[i].material.color=0xFF0000;
				if(planeArr[i].position.y>0)
					currentYTop = planeArr[i].position.y;
				else
					currentYBottom = planeArr[i].position.y;
			}
		}
		detectionCollision();
		
		renderer.render(scene, camera);
	};

	render();
	
	function detectionCollision(){
		
		if(cube.position.y >= currentYTop || cube.position.y <= currentYBottom){
			gameNotEnd = 1;
			alert("Collision Game Ends. Start Again");
		}
	}
}
