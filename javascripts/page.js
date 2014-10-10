(function() {

    var map = this.map = new L.Map('map', {
        contextmenu: true,
        contextmenuItems: [{
            text: 'Bookmark this position',
            callback: function(evt) {
                this.fire('bookmark:new', {
                    latlng: evt.latlng
                });
            }
        }]
    }).setView([22.2670, 114.188], 13);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; ' +
            '<a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var data, storage = {

        // POST /bookmark/{:id}/
        setItem: function(id, item, callback) {
            // mimic AJAX, put your
            setTimeout(function() {
                data.push(item);
                callback(item);
            }, 1000);
        },

        // GET /bookmarks/{:id}
        getItem: function(id, callback) {
            // mimic AJAX
            setTimeout(function() {
                callback(data.filter(function(item) {
                    return item.id === id;
                })[0]);
            }, 1500);
        },

        // GET /bookmarks/
        getAllItems: function(callback) {
            reqwest({
                url: 'data/bookmarks.json',
                type: 'json',
                success: function(json) {
                    data = json;
                    callback(json);
                }
            });
        },

        // DELETE /bookmarks/{:id}
        removeItem: function(id, callback) {
            setTimeout(function() {
                var item;
                for (var i = 0, len = data.length; i < len; i++) {
                    if (data[i].id === id) {
                        item = data[i];
                        data.splice(i, 1);
                        break;
                    }
                }
                callback(item);
            }, 1000);
        }

    };

    this.storage = storage;

    var bookmarksControl = new L.Control.Bookmarks({
        storage: storage
    });
    map.addControl(bookmarksControl);

})();
