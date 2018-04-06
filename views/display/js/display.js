let container;
let camera, scene, renderer;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

let rotationspeed = 0.03;
let object;


function init(modelName, textureName) {

    container = document.createElement( 'div' );
    document.body.appendChild( container );
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
    camera.position.z = 250;
    // scene
    scene = new THREE.Scene();
    let ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
    scene.add( ambientLight );
    let pointLight = new THREE.PointLight( 0xffffff, 0.8 );
    camera.add( pointLight );
    scene.add( camera );
    // texture
    let manager = new THREE.LoadingManager();
    manager.onProgress = function ( item, loaded, total ) {
        console.log( item, loaded, total );
    };
    let textureLoader = new THREE.TextureLoader( manager );
    let texture = textureLoader.load( 'display/files/' + textureName );
    // model
    let onProgress = function ( xhr ) {
        if ( xhr.lengthComputable ) {
            let percentComplete = xhr.loaded / xhr.total * 100;
            console.log( Math.round(percentComplete, 2) + '% downloaded' );
        }
    };
    let onError = function ( xhr ) {
    };
    let loader = new THREE.OBJLoader( manager );
    loader.load( 'display/files/' + modelName, function ( model ) {
        object = model;
        object.traverse( function ( child ) {
            if ( child instanceof THREE.Mesh ) {
                child.material.map = texture;
            }
        } );
        object.position.x = 0;
        object.position.y = 0;
        object.position.z = 0;
        scene.add( object );
    }, onProgress, onError );

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    window.addEventListener( 'resize', onWindowResize, false );

    animate();
}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
    requestAnimationFrame( animate );
    render();
}

function render() {
    object.rotateY(rotationspeed);
    camera.lookAt( scene.position );
    renderer.render( scene, camera );
}