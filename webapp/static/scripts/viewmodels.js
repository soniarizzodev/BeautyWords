'strict';
var host = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');

function App() {
    let _self = this;
    this.SplitSentence = ko.observableArray([]);
    this.InputSentence = ko.observable('');
    this.Fonts = ko.observableArray(['Lobster', 'LobsterTwo', 'PermanentMarker', 'DancingScript', 'SpecialElite', 'Satisfy']);

    this.AddChunk = function () {
        let newChunk = new ChunkViewModel();
        _self.SplitSentence.push(newChunk);
    };

    this.ProcessSentence = function () {

        _self.SplitSentence([]);

        let splitSentence = _self.SplittingSentence(_self.InputSentence());

        splitSentence.forEach(chunk => {
            if (chunk) {
                _self.SplitSentence.push(new ChunkViewModel({ text: chunk, font: _self.GetRandomFont(_self.Fonts()) }));
            }
        });


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
                let twoWordsChunk = splitInput[i];
                if (splitInput[i - 1])
                    twoWordsChunk = [splitInput[i - 1], twoWordsChunk].join(' ');

                resultSplitSentence.unshift(twoWordsChunk);
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

    _self.SplitSentence.push(new ChunkViewModel({ text: 'Life is', font: 'LobsterTwo' }));
    _self.SplitSentence.push(new ChunkViewModel({ text: 'tough', font: 'PermanentMarker' }));
    _self.SplitSentence.push(new ChunkViewModel({ text: 'but', font: 'LobsterTwo' }));
    _self.SplitSentence.push(new ChunkViewModel({ text: 'so are', font: 'SpecialElite' }));
    _self.SplitSentence.push(new ChunkViewModel({ text: 'you', font: 'SpecialElite' }));

    _self.InputSentence('Life is tough but so are you');
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