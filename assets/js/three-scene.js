(function() {

  'use strict';



  var heroSection = document.querySelector('.hero-section');

  if (!heroSection) return;



  // --- Setup ---

  var scene = new THREE.Scene();



  var camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.x = 2.0;
  camera.position.z = 10;
  camera.position.y = 1;
  camera.lookAt(0, 0, 0);



  var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

  renderer.setSize(window.innerWidth, window.innerHeight);

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  renderer.setClearColor(0x000000, 0);

  renderer.toneMapping = THREE.NoToneMapping;



  var canvas = renderer.domElement;

  canvas.style.cssText = 'position:absolute;top:0;right:0;width:60%;height:100%;z-index:1;pointer-events:none;';

  var heroSection = document.querySelector('.hero-section');
  if (heroSection) {
    heroSection.insertBefore(canvas, heroSection.firstChild);
  } else {
    document.body.insertBefore(canvas, document.body.firstChild);
  }



  // --- Lights (professional cool palette) ---

  var ambientLight = new THREE.AmbientLight(0x222244, 0.8);

  scene.add(ambientLight);



  var light1 = new THREE.DirectionalLight(0xaabbff, 1.0);

  light1.position.set(5, 5, 4);

  scene.add(light1);



  var light2 = new THREE.DirectionalLight(0xd8b4fe, 0.7);

  light2.position.set(-5, -2, 3);

  scene.add(light2);



  var light3 = new THREE.DirectionalLight(0x8b5cf6, 0.3);

  light3.position.set(0, 4, -4);

  scene.add(light3);



  // --- Objects ---

  var mainGroup = new THREE.Group();

  scene.add(mainGroup);



  // --- OPTIMIZED: Bug-Free Glass Material & Precise Geometry Traversal ---

  var myModel;

  var loader = new THREE.GLTFLoader();



  loader.load(

    'assets/models/lightbulb.glb',

    function(gltf) {

      myModel = gltf.scene;



      myModel.scale.set(3.0, 3.0, 3.0);

      myModel.position.set(0, -2.2, 0);



      // --- ILLUMINATED GLASS MATERIAL ---

      var highEndGlass = new THREE.MeshPhysicalMaterial({

        color: 0x94a9ce,

        emissive: 0x94a9ce,

        emissiveIntensity: 0.5,

        metalness: 0.0,

        roughness: 0.05,

        ior: 1.0,

        transmission: 0.35,

        transparent: true,

        opacity: 0.9,

        clearcoat: 1.0,

        clearcoatRoughness: 0.02,

        side: THREE.FrontSide,

      });



      var polishedMetal = new THREE.MeshPhysicalMaterial({

        color: 0x94a3b8,

        metalness: 0.9,

        roughness: 0.18,

        clearcoat: 0.5,

        clearcoatRoughness: 0.1,

      });



      myModel.traverse(function(child) {

        if (child.isMesh) {

          if (!child.geometry.boundingBox) child.geometry.computeBoundingBox();

          var maxY = child.geometry.boundingBox.max.y;



          if (maxY > 0.3 || child.name.toLowerCase().includes('glass') || child.name.toLowerCase().includes('bulb')) {

            child.material = highEndGlass;

          } else {

            child.material = polishedMetal;

          }



          child.material.map = null;

          child.material.needsUpdate = true;

        }

      });



      mainGroup.add(myModel);



      // --- UPDATED INTERNAL LIGHT SOURCE ---

      var innerLight = new THREE.PointLight(0xffa500, 3.0, 10.0);

      innerLight.position.set(0, 0.7, 0);

      myModel.add(innerLight);



      // --- UPDATED GLOWING FILAMENT ---

      var filamentGeo = new THREE.CylinderGeometry(0.005, 0.005, 0.25, 8);

      filamentGeo.rotateZ(Math.PI / 2);



      var filamentMat = new THREE.MeshStandardMaterial({

        color: 0xffa500,

        emissive: 0xff8c00,

        emissiveIntensity: 0.5,

        toneMapped: false,

      });



      var glowingFilament = new THREE.Mesh(filamentGeo, filamentMat);

      glowingFilament.position.set(0, 0.7, 0);

      myModel.add(glowingFilament);

    },

    undefined,

    function(error) {

      console.error('Error loading your 3D model:', error);

    }

  );



  // --- High-end energy core (electric aura around model) ---

  var coreMatBright = new THREE.MeshPhysicalMaterial({

    color: 0xa78bfa, metalness: 0.1, roughness: 0.1,

    transparent: true, opacity: 0.9,

    emissive: 0xa78bfa, emissiveIntensity: 2.5,

  });

  var ringMat = new THREE.MeshPhysicalMaterial({

    color: 0x001845, metalness: 0.6, roughness: 0.2,

    transparent: true, opacity: 0.3,

    emissive: 0x001845, emissiveIntensity: 0.15,

    side: THREE.DoubleSide,

  });

  var ringMatGlow = new THREE.MeshPhysicalMaterial({

    color: 0x001845, metalness: 0.4, roughness: 0.1,

    transparent: true, opacity: 0.2,

    emissive: 0x001845, emissiveIntensity: 0.4,

    side: THREE.DoubleSide,

  });



  var energyCore = new THREE.Group();



  var ring1 = new THREE.Mesh(new THREE.TorusGeometry(2.2, 0.02, 8, 48), ringMat);

  energyCore.add(ring1);



  var ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.5, 0.015, 8, 48), ringMatGlow);

  ring2.rotation.x = Math.PI / 2;

  energyCore.add(ring2);



  var ring3 = new THREE.Mesh(new THREE.TorusGeometry(2.8, 0.01, 8, 48), ringMat);

  ring3.rotation.x = Math.PI / 3;

  energyCore.add(ring3);



  function makeOrbiters(radius, count, color, size) {

    var g = new THREE.Group();

    for (var i = 0; i < count; i++) {

      var a = (i / count) * Math.PI * 2;

      var s = new THREE.Mesh(

        new THREE.SphereGeometry(size || 0.04, 6, 6),

        new THREE.MeshPhysicalMaterial({ color: color, emissive: color, emissiveIntensity: 1.5, transparent: true, opacity: 1.0 })

      );

      s.position.set(Math.cos(a) * radius, 0, Math.sin(a) * radius);

      g.add(s);

    }

    return g;

  }

  energyCore.add(makeOrbiters(2.2, 6, 0x001845, 0.03));

  energyCore.add(makeOrbiters(2.8, 10, 0x001845, 0.015));



  energyCore.position.set(0, 0, 0);

  mainGroup.add(energyCore);



  // --- Ring particles (oval sprites) ---

  function makeCircleTexture() {
    var canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    var ctx = canvas.getContext('2d');
    var gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.4, 'rgba(255,255,255,0.8)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(canvas);
  }

  var dotTexture = makeCircleTexture();
  var ringGroup = new THREE.Group();

  var ringCount = 100;

  for (var i = 0; i < ringCount; i++) {
    var angle = (i / ringCount) * Math.PI * 2;
    var radius = 4.0 + Math.random() * 1.5;
    var spriteMat = new THREE.SpriteMaterial({
      map: dotTexture,
      color: 0x001845,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    var sprite = new THREE.Sprite(spriteMat);
    var sx = 0.05 + Math.random() * 0.03;
    var sy = 0.03 + Math.random() * 0.015;
    sprite.scale.set(sx, sy, 1);
    sprite.position.set(
      Math.cos(angle) * radius,
      (Math.random() - 0.5) * 1.5,
      Math.sin(angle) * radius
    );
    ringGroup.add(sprite);
  }

  mainGroup.add(ringGroup);



  // --- Mouse tracking ---

  var mouseX = 0;

  var mouseY = 0;

  document.addEventListener('mousemove', function(e) {

    mouseX = (e.clientX / window.innerWidth) * 2 - 1;

    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;

  });



  // --- Animation loop ---

  var clock = new THREE.Clock();



  function animate() {

    requestAnimationFrame(animate);

    var t = clock.getElapsedTime();



    // Rotate custom model

    if (myModel) {

      myModel.rotation.y = t * 0.15;

      myModel.position.y = -2.2 + Math.sin(t * 0.5) * 0.15;

    }



    // Rotate energy field rings

    energyCore.rotation.y = t * 0.25;

    ring1.rotation.z += 0.003;

    ring2.rotation.y += 0.005;

    ring3.rotation.x += 0.004;



    // Rotate orbiters

    energyCore.children.forEach(function(child, i) {

      if (child.isGroup) {

        child.rotation.y += 0.01 * (i + 1);

      }

    });

    // Rotate background particles

    ringGroup.rotation.y = t * 0.03;

    // Mouse interaction

    mainGroup.position.x += (mouseX * 1.0 - mainGroup.position.x) * 0.05;

    mainGroup.position.y += (mouseY * 0.6 - mainGroup.position.y) * 0.05;



    renderer.render(scene, camera);

  }

  animate();



  // --- Resize handler ---

  var isNarrow = function() { return window.innerWidth <= 576; };

  window.addEventListener('resize', function() {

    if (isNarrow()) return;

    var w = window.innerWidth;

    var h = window.innerHeight;

    camera.aspect = w / h;

    camera.updateProjectionMatrix();

    renderer.setSize(w, h);

  });



})();