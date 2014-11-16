

    //
    // Super complicated data layer
    //

    var dataStore = [
        { id: 0, name: 'Note 1', text: 'Hello "HMTL"' }
    ];
    var counter = dataStore.length;
    var tempCurrentNotes = '';

    function getAllData() {
        return dataStore;
    }

    function getData(id) {
        return _.find(dataStore, function (obj) { return obj.id === id; });
    }

    function addData(text) {
        var id = counter ++;
        dataStore.push({ id: id, name: 'Note ' + (id + 1), text: text });
        return id;
    }

    function saveData(id, text) {
        var item = getData(id);
        item.text = text;
    }

    //
    // End of super complicated data layer
    //



