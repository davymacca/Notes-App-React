

    var Sidebar = React.createClass({

        loadNotesFromDataStore: function () {
            var newData = getAllData();
            this.setState({ data: newData });
        },

        handleNewNoteClick: function (note) {
            var id = addData(note.text);
            this.loadNotesFromDataStore();
            $(document).trigger('APP.changeNote', { id: id });
        },

        getInitialState: function() {
            return { data: [] };
        },

        componentDidMount: function() {
            this.loadNotesFromDataStore();
        },

        render: function() {
            return (
                <div>
                    <SidebarList data={ this.state.data } />
                    <SidebarControl onNewNoteClick={ this.handleNewNoteClick } />
                </div>
            );
        }

    });


    var SidebarList = React.createClass({

        render: function() {

            var itemNodes = this.props.data.map(function (item) {
                return (
                    <SidebarItem key={ item.id } noteID={ item.id }>
                        { item.name }
                    </SidebarItem>
                );
            });

            return (
                <ul className="nav nav-list">
                    { itemNodes }
                </ul>
            );
        }

    });


    var SidebarItem = React.createClass({

        handleItemClick: function (event) {
            event.preventDefault();
            $(document).trigger('APP.changeNote', { id: this.props.noteID })
        },

        render: function() {
            return (
                <li className="sidebar-items"><a onClick={ this.handleItemClick }><span className="glyphicon glyphicon-file"></span> { this.props.children } </a></li>
            );
        }

    });


    var SidebarControl = React.createClass({

        handleClick: function(event) {
            event.preventDefault();
            this.props.onNewNoteClick({ text: '' });
        },

        render: function() {
            return (
                <div className="sidebar-controls">
                    <button className="btn btn-lg btn-default" onClick={ this.handleClick }>
                        <span className="glyphicon glyphicon-plus"></span> Add
                    </button>
                </div>
            );
        }

    });


    React.render(
        <Sidebar />,
        document.getElementById('sidebar')
    );




