'strict';
var host = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');

function App() {
    let _self = this;
    this.SplitSentence = ko.observableArray([]);
    this.InputSentence = ko.observable('');

    this.ProcessSentence = function () {

        _self.SplitSentence([]);

        let splitSentence = _self.SplittingSentence(_self.InputSentence());

        splitSentence.forEach(chunk => {
            if (chunk) {
                _self.SplitSentence.push(new ChunkViewModel({ text: chunk }));
            }
        });
       
                       
    };

    this.SplittingSentence = function (sentence) {
        let resultSplitSentence = [];

        let splitInput = sentence.split(' ');
        let i = splitInput.length-1;
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

    _self.InputSentence('What even is this thing?');
    _self.ProcessSentence();
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

    if (model)
        _self.SetFromModel(model);

}