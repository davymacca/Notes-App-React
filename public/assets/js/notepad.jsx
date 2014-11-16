

    var Notepad = React.createClass({

        currentId: null,

        loadNoteFromDataStore: function (id) {
            var data = getData(id);
            this.currentId = id;
            this.setState({ noteText: data.text });
        },

        handleNoteSave: function () {
            saveData(this.currentId, this.state.noteText);
            this.setState({ isSaved: true });
        },

        handleNoteChanged: function (value) {
            this.setState({ noteText: value, isSaved: false });
        },

        getInitialState: function() {
            return { noteText: '', isSaved: true };
        },

        componentDidMount: function() {
            var self = this;

            // default to first note
            self.loadNoteFromDataStore(0);

            // listen for change note events
            $(document).on('APP.changeNote', function (event, obj) {
                self.loadNoteFromDataStore(obj.id);
            });
        },

        render: function() {
            return (
                <div>
                    <NotepadText noteText={ this.state.noteText } onNoteChange={ this.handleNoteChanged } />
                    <NotepadControls onNoteSaveClick={ this.handleNoteSave } isSaved={ this.state.isSaved } />
                </div>
            );
        }

    });


    var NotepadText = React.createClass({

        handleChange: function (event) {
            this.props.onNoteChange(event.target.value);
        },

        render: function () {
            return (
                <textarea value={ this.props.noteText } onChange={ this.handleChange } className="form-control text-large" rows="10" />
            );
        }

    });


    var NotepadControls = React.createClass({

        handleClick: function(event) {
            event.preventDefault();
            this.props.onNoteSaveClick();
        },

        render: function () {
            var cx = React.addons.classSet;
            var classes = cx({
                'btn btn-lg btn-primary': true,
                'btn-danger': !this.props.isSaved
            });
            var marker = !this.props.isSaved ? '*' : '';

            return (
                <div className="main-controls">
                    <button onClick={ this.handleClick } type="button" className={ classes }>Save { marker }</button>
                </div>
            )
        }

    });


    React.render(
        <Notepad />,
        document.getElementById('notepad')
    );

