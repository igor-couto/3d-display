let container;
let camera, scene, renderer;
let mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;


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
    loader.load( 'display/files/' + modelName, function ( object ) {
        object.traverse( function ( child ) {
            if ( child instanceof THREE.Mesh ) {
                child.material.map = texture;
            }
        } );
        object.position.y = - 95;
        scene.add( object );
    }, onProgress, onError );

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );
    document.addEventListener( 'mousedown', onDocumentMouseMove, false );

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

function onDocumentMouseMove( event ) {
    mouseX = ( event.clientX - windowHalfX ) / 2;
    mouseY = ( event.clientY - windowHalfY ) / 2;
}
//
function animate() {
    requestAnimationFrame( animate );
    render();
}

function render() {
    camera.position.x += ( mouseX - camera.position.x ) * .05;
    camera.position.y += ( - mouseY - camera.position.y ) * .05;
    camera.lookAt( scene.position );
    renderer.render( scene, camera );
}