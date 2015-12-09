// 1. レンダラーの作成
var display = true;

  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);


// 2. シーンの作成

  var scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2( 0x000080, 0.0006); 


// 3. カメラの作成

  var camera = new THREE.PerspectiveCamera(105, window.innerWidth / window.innerHeight,1, 3000);
  camera.position.z = 1200;
  scene.add(camera);



// 4. マウスによる操作の設定

 var controls = new THREE.OrbitControls(camera);





// 5. ライトの作成

  var light = new THREE.AmbientLight(0xaaaaaa);
  light.position.set(500, -500, 0);
  scene.add(light);
  var light = new THREE.AmbientLight(0xaaaaaa);
  light.position.set(-500, 500, 200);
  scene.add(light);
  var light = new THREE.AmbientLight(0xaaaaaa);
  light.position.set(500, -500, -400);
  scene.add(light);
  var light = new THREE.AmbientLight(0xaaaaaa);
  light.position.set(-500, 500, 600);
  scene.add(light);






// 6. 地球の作成

  var geometry = new THREE.SphereGeometry(300, 320, 32);
  var material = new THREE.MeshPhongMaterial({
      ambient: 0xddddff, 
      specular: 0xcccccc, 
      shininess:100, 
      metal:true,
      map: THREE.ImageUtils.loadTexture("img/1_earth_8k.jpg") 
    });
  var mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(0,0,0);
  scene.add(mesh);





//太陽の作成
var geometry2 = new THREE.SphereGeometry(300, 32, 32);
var material2 = new THREE.MeshPhongMaterial({
color:0,
ambient:0,
specular:0,
shininess:5,
emissive:0xff0000,
metal:true,
distance:0, 
bumpMap:THREE.ImageUtils.loadTexture('http://jsrun.it/assets/x/3/p/U/x3pUc.png'),
bumpScale: 0.5,
map:THREE.ImageUtils.loadTexture('http://jsrun.it/assets/x/3/p/U/x3pUc.png')
        });

  var star = new THREE.Mesh(geometry2, material2);
  star.position.set(500,500,-300);
  scene.add(star);


//惑星の作成2
var geometry3 = new THREE.SphereGeometry(100, 32, 32);
var material3 = new THREE.MeshPhongMaterial({

    ambient: 0xddddff, 
    specular: 0xcccccc, 
    shininess:10,
    metal:true,
    map: THREE.ImageUtils.loadTexture("img/moon_1024.jpg")
        });

  var star2 = new THREE.Mesh(geometry3, material3);
  star2.position.set(-300,-300,-300);
  scene.add(star2);



//3Dモデルデータの生成
var obj;
var loader = new THREE.ObjectLoader();
loader.load("obj/star-wars-vader-tie-fighter.json",function ( obj ) {
    obj.scale.set( 5, 5, 5 );
    
     // モデルをダミーオブジェクトで包む（へそ中心に回転したいため）
        chara = new THREE.Object3D();
        chara.add(obj);
        chara.position.set(0,-50,1000);
    scene.add(chara);
});


//パーティクル
      makeParticles();

function makeParticles(){       
    // パーティクルの数
    particleCount = 30000;
    particles = new THREE.Geometry();
    // マテリアルの設定
    var material = new THREE.PointCloudMaterial({
        color: 0xFFFFFF,
        size: 0.1,
        //map: texture,
        transparent: true
    });

    // パーティクルの位置の設定
    for (var i = 0; i < particleCount; i++) {
      var px = Math.random() * 2000 - 500,
          py = Math.random() * 2000 - 500,
          pz = Math.random() * 2000 - 500;
      particle = new THREE.Vector3( px, py, pz);

      // パーティクルのべロシティの設定
      particle.velocity = new THREE.Vector3( 0, -Math.random(), 0 );
      particles.vertices.push( particle );
    }
    pointCloud = new THREE.PointCloud( particles, material );
    // パーティクルの深さを毎フレームソート
    pointCloud.sortParticles = true;
    scene.add( pointCloud );
    }




//// 7. 周囲の銀河の作成
//
//   var geometry = new THREE.Geometry();
//
//  for (i = 0; i < 10000; i ++) { 
//      var vertex = new THREE.Vector3();
//      vertex.x = Math.random()*2000 + 30;
//      vertex.y = Math.random()*2000 + 30;
//      vertex.z = Math.random()*800+50;
//
//      if (Math.random() < 0.5) vertex.x *= -1;
//      if (Math.random() < 0.5) vertex.y *= -1;
//      if (Math.random() < 0.5) vertex.z *= -1;
//      geometry.vertices.push( vertex );
//  }
//
//
//  var material = new THREE.PointCloudMaterial( { size: 4, color:0xddddff});
//  var rot_xy = 0;
//  var rot_z = 10;
//
//  for (i = 0; i < 3; i++) {
//    var particles = new THREE.PointCloud( geometry, material );
//    particles.rotation.x = Math.random() * rot_xy;
//    particles.rotation.y = Math.random() * rot_xy;
//    particles.rotation.z = Math.random() * rot_z;
//    scene.add( particles ); 
//  }
//
//  var material = new THREE.PointCloudMaterial( { size: 5, color:0xddddff});
//
//  for (i = 0; i < 3; i++) {
//    var particles = new THREE.PointCloud( geometry, material );
//    particles.rotation.x = Math.random() * rot_xy;
//    particles.rotation.y = Math.random() * rot_xy;
//    particles.rotation.z = Math.random() * rot_z;
//    scene.add( particles ); 
//  }



// 8. レンダラーにシーン・カメラ設置

  var container = document.createElement('div');
  document.body.appendChild( container );
  container.appendChild( renderer.domElement );
　renderer.render( scene, camera );


//VR表示へ変換
var	effect = new THREE.StereoEffect(renderer);



// スマートフォンの場合はジャイロセンサーでの操作へ変更
		window.addEventListener("deviceorientation", setOrientationControls, true);

/**
	 * ジャイロセンサーでの操作へ変更します。
	 */
	function setOrientationControls(e) {
		if (!e.alpha) {
			return;
		}

		controls = new THREE.DeviceOrientationControls(camera, true);
		controls.connect();
		controls.update();

		element.addEventListener("click", fullscreen, false);

		window.removeEventListener("deviceorientation", setOrientationControls, true);
	}



// 9. 銀河・地球の回転


  render();

  var baseTime = +new Date;


function render() {
    requestAnimationFrame( render );
    camera.updateProjectionMatrix();
    controls.update();

    mesh.rotation.z = 0.04 * (+new Date - baseTime) / 500;
    renderer.render(scene, camera);  

    for ( i = 0; i < scene.children.length; i ++ ) {

      var object = scene.children[i];

      if ( object instanceof THREE.PointCloud ) {

        object.rotation.z = 0.02 * (+new Date - baseTime) / 1000;

      }
    }
    
    if(display == "true"){
        renderer.render( scene, camera );
    }else if(display == "false"){
        renderer.render( scene, camera );
        effect.render(scene, camera);
    }

  }




// 10. リサイズ用

//リサイズ処理

window.addEventListener( 'resize', onWindowResize, false );
onWindowResize(); 

if(display == "true"){
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );

  }
}else if(display == "false"){
  function onWindowResize() {
    var width = container.offsetWidth;
    var height = container.offsetHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
    effect.setSize(width, height);
  }
}








/**
	 * フルスクリーン表示へ切り替えます。
	 */
	function fullscreen() {
		if (container.requestFullscreen) {
			container.requestFullscreen();
		} else if (container.msRequestFullscreen) {
			container.msRequestFullscreen();
		} else if (container.mozRequestFullScreen) {
			container.mozRequestFullScreen();
		} else if (container.webkitRequestFullscreen) {
			container.webkitRequestFullscreen();
		}
	}

//window.addEventListener("DOMContentLoaded", init, false);



//-----------------------------------------




function InputKeyboard(){

		// ------------------------------------------------------------
		// プライベートな変数
		// ------------------------------------------------------------
		var _input_key_buffer = null;

		// ------------------------------------------------------------
		// プライベートな関数
		// ------------------------------------------------------------
		function KeyDownFunc (e){
			_input_key_buffer[e.keyCode] = true;
		}
		function KeyUpFunc (e){
			_input_key_buffer[e.keyCode] = false;
		}
		function BlurFunc (e){
			_input_key_buffer.length = 0;
		}

		// ------------------------------------------------------------
		// キーコードを指定して入力状態を取得する
		// ------------------------------------------------------------
		this.isDown = function (key_code){
			if(_input_key_buffer[key_code])	return true;
			return false;
		};

		// ------------------------------------------------------------
		// 解放する
		// ------------------------------------------------------------
		this.release = function (){
			if(window.removeEventListener){
				document.removeEventListener("keydown",KeyDownFunc);
				document.removeEventListener("keyup",KeyUpFunc);
				window.removeEventListener("blur",BlurFunc);
			}else if(window.detachEvent){
				document.detachEvent("onkeydown",KeyDownFunc);
				document.detachEvent("onkeyup",KeyUpFunc);
				window.detachEvent("onblur",BlurFunc);
			}
		};

		// ------------------------------------------------------------
		// 初期化
		// ------------------------------------------------------------
		(function (){
 			_input_key_buffer = new Array();

			if(window.addEventListener){
				document.addEventListener("keydown",KeyDownFunc);
				document.addEventListener("keyup",KeyUpFunc);
				window.addEventListener("blur",BlurFunc);
			}else if(window.attachEvent){
				document.attachEvent("onkeydown",KeyDownFunc);
				document.attachEvent("onkeyup",KeyUpFunc);
				window.attachEvent("onblur",BlurFunc);
			}
		})();
	}



	// ------------------------------------------------------------
	// 初期化
	// ------------------------------------------------------------
	// InputKeyboard オブジェクトを作成
	var input_key = new InputKeyboard();

	// id 属性が、"aaa" であるエレメントを取得
//	var element = document.getElementById("aaa");


var color="";
var particle="";

	// ------------------------------------------------------------
	// 一定の時間隔で実行
	// ------------------------------------------------------------
	// 60 フレームレート間隔で実行
	setInterval(function (){

		// Wキーが押された
		if(input_key.isDown(87))	chara.position.z -= 10;

		// Sキーが押された
		if(input_key.isDown(83))	chara.position.z += 10;

		// Aキーが押された
		if(input_key.isDown(65))	chara.position.x -= 10;

		// Dキーが押された   
		if(input_key.isDown(68))	chara.position.x += 10;
        
        // Eキーが押された
		if(input_key.isDown(69))	chara.position.y += 10;
        
        // Xキーが押された
		if(input_key.isDown(88))	chara.position.y -= 10;
 
if(particle != ""){		 particle_obj(chara.position.x,chara.position.y,chara.position.z);        }
        
                        
if(color != ""){
 paint_obj(chara.position.x,chara.position.y,chara.position.z,color);

}
	},1000/60);




//function paint_obj(chara_x,chara_y,chara_z,color){
//    
//    //お絵かき用の球体連続生成
//var geometry5 = new THREE.SphereGeometry(10, 10, 10);
//var material5 = new THREE.MeshPhongMaterial({
//color:0,
//ambient:0,
////specular:color,
//shininess:30,
//opacity:0.9,
//transparent:true,
//emissive:color,
//metal:true,
//distance:0,
//bumpMap:THREE.ImageUtils.loadTexture('http://jsrun.it/assets/x/3/p/U/x3pUc.png'),
//bumpScale: 0.5,
//map:THREE.ImageUtils.loadTexture('http://jsrun.it/assets/x/3/p/U/x3pUc.png')
//        });
//
//  var star5 = new THREE.Mesh(geometry5, material5);
//    star5.position.x = chara_x;
//    star5.position.y = chara_y;
//    star5.position.z = chara_z;
//    
////  star5.position.set(500,100,100);
//  scene.add(star5);
//}



//パーティクル生成

function particle_obj(chara_x,chara_y,chara_z){
// 形状データを作成
var geometry6 = new THREE.Geometry();
var numParticles = 20;
var img;
for(var i = 0 ; i < numParticles ; i++) {
  geometry6.vertices.push(new THREE.Vector3(
    Math.random() * 20 - 10,
    Math.random() * 20 - 10,
    Math.random() * 20 - 10));
            
}
    
if(particle == 1){
    img = 'img/particle1.png';
}else if(particle == 2){
    img = 'img/particle2.png';
}else if(particle == 3){
    img = 'img/particle3.png';
}else if(particle == 4){
    img = 'img/particle4.png';
}else if(particle == 5){
    img = 'img/particle5.png';
}  
    
    
 
// マテリアルを作成
var texture6 =THREE.ImageUtils.loadTexture(img);
var material6 = new THREE.ParticleBasicMaterial({
  size: 10, color: 0xff8888, blending: THREE.AdditiveBlending,
  transparent: true, depthTest: false, map: texture6 });
 
// 物体を作成
var mesh6 = new THREE.ParticleSystem(geometry6, material6);
mesh6.position.x = chara_x;
mesh6.position.y = chara_y;
mesh6.position.z = chara_z;
    
//mesh6.sortParticles = false;
scene.add(mesh6);


//    particles.rotation.x = star5.position.x;
//    particles.rotation.y = star5.position.y;
//    particles.rotation.z = star5.position.z;
}


//操作方法の表示/非表示
function Click_text() {
	if (document.all.div1.style.display == "none") {
		document.all.div1.style.display = "block"
	} else {
		document.all.div1.style.display = "none"
	}
}


