'strict';
var host = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');

function App() {
    let _self = this;
    this.Words = ko.observableArray([]);

    _self.Words.push(new ChunkViewModel({ text: 'Where Words', font: 'Lobster' }));
    _self.Words.push(new ChunkViewModel({ text: 'Fail', font: 'PermanentMarker' }));
    _self.Words.push(new ChunkViewModel({ text: 'Music', font: 'DancingScript' }));
    _self.Words.push(new ChunkViewModel({ text: 'Potato', font: 'SpecialElite' }));

    this.AddChunk = function () {
        let newChunk = new ChunkViewModel();
        _self.Words.push(newChunk);
    };
}

function ChunkViewModel(model) {
    let _self = this;
    this.Text = ko.observable('');
    this.Font = ko.observable('Lobster');

    this.SetFromModel = function (model) {
        if (model.text)
            _self.Text(model.text);

        if (model.font)
            _self.Font(model.font);
    };

    this.DeleteChunk = function () {
        app.Words.remove(_self);
    };

    if (model)
        _self.SetFromModel(model);

}