'strict';
var host = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');

function App() {
    let _self = this;
    this.SplitSentence = ko.observableArray([]);
    this.InputSentence = ko.observable('');
    this.Fonts = ko.observableArray(['Lobster', 'LobsterTwo', 'PermanentMarker', 'DancingScript', 'SpecialElite', 'Satisfy', 'FugazOne', 'Spinnaker', 'Cinzel']);
    this.Colors = ko.observableArray(
        ['color1', 'color2', 'color3', 'color4', 'color5', 'color6', 'color7', 'color8', 'color9', 'color10']
    );
    this.CurrentColor = ko.observable('color1');
    this.Canvas = ko.observable();
    this.IsProcessing = ko.observable(false);
    this.GenerationsCount = ko.observable();

    this.DownloadUrl = ko.computed(function () {
        return _self.Canvas() ? _self.Canvas().toDataURL() : '';
    });

    this.AddChunk = function () {
        let newChunk = new ChunkViewModel();
        _self.SplitSentence.push(newChunk);
    };

    this.ProcessSentence = function (addToCount = true) {

        _self.SplitSentence([]);

        let splitSentence = _self.SplittingSentence(_self.InputSentence());

        splitSentence.forEach(chunk => {
            if (chunk) {
                _self.SplitSentence.push(new ChunkViewModel({ text: chunk, font: _self.GetRandomFont(_self.Fonts()) }));
            }
        });

        if(addToCount)
            _self.AddGenerationToCount();
    };

    this.SplittingSentence = function (sentence) {
        let resultSplitSentence = [];

        let splitInput = sentence.split(' ');
        let i = splitInput.length - 1;
        let even = false;

        while (splitInput[i]) {
            if (!even) {
                resultSplitSentence.unshift(splitInput[i]);
                i -= 1;
            }
            else {
                resultSplitSentence.unshift(splitInput[i] + ' ' + splitInput[i - 1] ? splitInput[i - 1] : '');
                i -= 2;
            }

            even = !even;
        }

        return resultSplitSentence;
    };

    this.GetRandomFont = function (fonts) {
        let max = fonts.length - 1;
        let min = 0;
        let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        return fonts[randomNumber];
    };

    this.ChangeFonts = function () {
        _self.SplitSentence().forEach(chunk => {
            chunk.Font(_self.GetRandomFont(_self.Fonts()));
        });
    };

    this.MakeScreenshot = function () {
        _self.IsProcessing(true);

        const useWidth = document.querySelector('#canvas').offsetWidth;
        const useHeight = document.querySelector('#canvas').offsetHeight;
        
        html2canvas(document.querySelector('#canvas'), { scale: 5, width: useWidth, height: useHeight }).then(canvas => {
            canvas.id = "canvasID";
            _self.Canvas(canvas);
            $('#downloadModal').modal('show');
            _self.IsProcessing(false);
        });
    };

    this.GetGenerationsCount = function () {
        fetch(host + '/getgenerationscount')
            .then(function (response) {
                if (response.ok)
                    return response.json();

            }).then(function (response) {
                if (response.data.count) {
                    _self.GenerationsCount(response.data.count);
                }
            });
    };

    this.AddGenerationToCount = function () {
        fetch(host + '/addgeneration')
            .then(function (response) {
                if (response.ok)
                    return response.json();
                else
                    console.log("Failed to add generation to counter");

            }).then(function (response) {
                if (response.status === false)
                    console.log("Failed to add generation to counter");
            });
    };

    _self.InputSentence('What even is this thing?');
    _self.ProcessSentence(false);
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
        app.SplitSentence.remove(_self);
    };

    if (model)
        _self.SetFromModel(model);

}