





AdminConfig = {
  name: 'IXtopia',
  adminEmails: ['jeremy@betterbetterbetter.org'],
  collections: {
    Listings: {
      color: 'red',
      icon: 'map-pin',
      tableColumns: [
        { label: 'Name', name: 'bizName' }
       ]
    },
    Keywords: {
      color: 'yellow',
      icon: 'key',
      tableColumns: [
        { label: 'Keyword', name: 'keyword' }
       ]
    },
    SavedSearches: {
      color: 'green',
      icon: 'search',
      tableColumns: [
        { label: 'Search Query', name: 'searchQ' }
       ]
    },
    Comments_: {
      color: 'purple',
      icon: 'comments',
      tableColumns: [
        {label: 'Username', name: 'user'},
        {label: 'Comment', name: 'content'}
       ]
    },
    Invites_: {
      color: 'teal',
      icon: 'envelope',
      tableColumns: [
        {label: 'Email', name: 'email'},
        {label: 'Invited On', name: 'createdAt'}
       ]
    },
    SavedUrls: {
      color: 'olive',
      icon: 'desktop',
      tableColumns: [
        {label: 'Name', name: 'name'},
        {label: 'Keywords', name: 'keywords'}
       ]
    }
  },   
  skin: 'red'
};


Listings = new Mongo.Collection("listings"); 
Listings.permit(['insert', 'update', 'deleter']).ifLoggedIn();


ClientOnlyListings = new Mongo.Collection("clientOnlyListings"); 



Keywords = new Mongo.Collection("keywords");
Keywords.permit(['addKeyword']).ifLoggedIn();

SavedUrls = new Mongo.Collection("savedUrls");
Keywords.permit(['addUrl']).ifLoggedIn();


SavedSearches = new Mongo.Collection("savedSearches");
SavedSearches.permit(['addSavedSearches']).ifLoggedIn();


CommentsCollection = Comments.getCollection();
Comments_ = CommentsCollection;
Invites_ = InvitesCollection;



mapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#181818"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1b1b1b"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#2c2c2c"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8a8a8a"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#373737"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3c3c3c"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#4e4e4e"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#000000"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3d3d3d"
      }
    ]
  }
];






















Listings.attachSchema(new SimpleSchema({
 bizName: {
  type: String,
  label: 'Link Name',
  max: 200
 },
 bizNameUrl: {
  type: String,
  label: 'Business Name, URL Friendly',
  max: 200,
  index: 1
 },
 email: {
  type: String,
  label: 'Customer-facing Email',
  regEx: SimpleSchema.RegEx.Email,
  optional: true
 },
 phone: {
  type: Number,
  label: 'Customer-facing Phone',
  optional: true
 },
 website: {
   type: String,
   regEx: SimpleSchema.RegEx.Url,
   optional: true
  },
 keywords: {
    type: [String],
    label: "Keywords"
 },
 details: {
  type: String,
  label: 'Details',
  optional: true,
   autoform: {
      type: "froalaEditor",
      afFieldInput:{
        froalaOptions:{
          theme: 'red',
          inlineMode: true,
          buttons: ['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', '|', 'color', 'emoticons', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', '-', 'insertLink', 'insertVideo', 'insertTable', '|', 'quote', 'insertHR', 'undo', 'redo', 'clearFormatting', 'selectAll', 'html'],
          height: '400'
         },
       },
     },
 },
 location: {
    type: [Number],
    decimal: true,
    autoform:{
      type: 'map',
      afFieldInput:{
        zoom: 8,
        geolocation: true,
        searchBox: true,
        autolocate: true,
        mapType: 'satellite',
        googleMap: {
         height: '450px',
         width: "66%",
         backgroundColor: '#800080',
         mapTypeId: 'hybrid',
         styles: mapStyle,
         streetViewControl: true,
         zoom: 8
        }
      },
     },
  },
 userId: {
  type: String,
  label: 'User Id'
 },
 createdAt: {
  type: Date,
  label: 'Created At:'
 }

}));



Keywords.attachSchema(
 new SimpleSchema({
  keyword: {
    type: String,
    label: 'Keyword',
    max: 200
  },
   preceding: {
    type: [String],
    label: 'Preceding',
    optional: true,
    defaultValue: []
   },
   proceeding: {
    type: [String],
    label: 'Proceeding',
    optional: true,
    defaultValue: []
   },
   type: {
    type: String,
    label: 'Type',
    optional: true,
    defaultValue: 'generic'
   },
   userId: {
    type: String,
    label: 'User Id'
   },
   createdAt: {
    type: Date,
    label: 'Created At:'
   }
 })
);


SavedUrls.attachSchema(
 new SimpleSchema({
   name: {
    type: String,
    label: 'Link Name',
    max: 200
   },
   url: {
    type: String,
    regEx: SimpleSchema.RegEx.Url,
    label: 'URL'
   },
   keywords: {
    type: [String],
    label: "Keywords",
    optional: true
   },
   userId: {
    type: String,
    label: 'User Id'
   },
   createdAt: {
    type: Date,
    label: 'Created At:'
   }
 })
);
















Meteor.methods({


 deleter: function (id){
  Listings.remove(id);
 },

 update: function(_id, bizName, bizNameUrl, keywords, location, website, details, userId){


  Listings.update({_id: _id},{$set:{
   bizName: bizName,
   bizNameUrl: bizNameUrl,
   website: website,
   keywords: keywords,
   location: location,
   details: details,
   userId: userId
  }});
 },

 removeKeyword: function(id){
  Keywords.remove(id);
 },

 rmKeywordProc: function(id, kw){
  var proceeding = Keywords.findOne({_id: id}).proceeding;
  //var kwArr = [kw];
  //var updateP = preceding.concat(kwArr);
  var updateP = proceeding.filter(e => e !== kw);
  Keywords.update(
    {_id: id},{$set:{
      proceeding: updateP}
  });
 },

 rmKeywordPrec: function(id, kw){
  var preceding = Keywords.findOne({_id: id}).preceding;
  var updateP = preceding.filter(e => e !== kw);

  Keywords.update(
    {_id: id},{$set:{
      preceding: updateP}
  });
 },

  addKeywordPrec: function(id, kw){
  var preceding = Keywords.findOne({_id: id}).preceding;
  var kwArr = [kw];
  var updateP = preceding.concat(kwArr);

  Keywords.update(
    {_id: id},{$set:{
      preceding: updateP}
  });
 },  

  addKeywordProc: function(id, kw){
  var proceeding = Keywords.findOne({_id: id}).proceeding;
  var kwArr = [kw];
  var updateP = proceeding.concat(kwArr);

  Keywords.update(
    {_id: id},{$set:{
      proceeding: updateP}
  });
 }

});


var imageStore = new FS.Store.GridFS("images", {
 //this for options

});

Images = new FS.Collection("images", {
    stores: [imageStore]
});



/*
Comments.config({

});
*/