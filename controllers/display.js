module.exports = app => {
    app.get('/display/:id', (request, response) => {
        let model = request.params.id;
        response.render('display/display', { modelName : 'hat_mario_model.obj', textureName : 'hat_mario_color.png' } );
        console.log('model requisition: ' + model);
        response.render('display/display', { modelName : modelinfo.modelname, textures : modelinfo.textures } );
    });
}