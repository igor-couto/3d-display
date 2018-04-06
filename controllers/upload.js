const fs = require('fs');
const formidable = require('formidable');
const path = require('path');

const pathtosave = path.join('./','views', 'display','files');

module.exports = app => {
    app.post('/upload', (request, response) => {
        let form = new formidable.IncomingForm();
        let files = [];

        let modelinfo = new Object();
        let textures = [];

        form
            .on('field', (field, value) => {
                if ( field === 'modelName') {
                    modelinfo.name = value;
                } else
                if ( field === 'folder' ) {
                    modelinfo.folder = value;
                }
            })
            .on('file', (field, file) => {
                files.push(file);
            })
            .on('end',  () => {
                files.forEach( newfile => {
                    let tempPath = String(newfile.path);
                    let newpath = path.join(pathtosave, newfile.name);
                    fs.rename(tempPath, newpath, err => { if (err) throw err; });

                    let extension = path.extname(newfile.name);
                    console.log(' - Extension: ' + extension);
                    if ( extension === '.png' || extension === '.jpg') {
                        textures.push(newfile.name);
                        console.log(' - Texture found: ' + newfile.name);
                    } else
                    if ( extension === '.obj'  ) {
                        console.log('- Obj found: '+ newfile.name);
                        modelinfo.modelname = newfile.name; // TODO: Remove extension;
                        modelinfo.extension = extension;
                    }
                    console.log('- Upload of ' + newfile.name + ' done at ' + pathtosave);
                });

                modelinfo.textures = textures;

                // TODO: Create DAO and save the new model info modelJSONstring --igorcouto 04/04/2018
                let modelJSONstring= JSON.stringify(modelinfo);

                const generatedURL = path.join('./','views', 'display', modelinfo.folder ,modelinfo.name);

                response.render('display/display', { modelName : modelinfo.modelname, textures : modelinfo.textures } );
            });
        form.parse(request);
    });
}