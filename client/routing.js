Router.configure({
	layoutTemplate:'layout',
	notFoundTemplate: 'loader',
	loadingTemplate: 'loader',
	trackPageView: true
});

var SEO_options = {
  title: "ex Populi",
  suffix: 'xPop',
  separator: '·',
  description: 'eX Populi. By the people, for the people.',        // Will apply to meta, Twitter and OpenGraph.
  image: 'http://betterbetterbetter.org/wp-content/uploads/2015/12/common-205x205-7931.png',// Will apply to Twitter and OpenGraph.
  meta: {
    keywords: ['social business','capitalism','marketing','business directory']
  },
  twitter: {
    card: 'eX Populi. By the people, for the people.',
    creator: '@betterbetterbe'
  },
  og: {
    site_name: 'eX Populi',
    image: 'http://betterbetterbetter.org/wp-content/uploads/2015/12/common-205x205-7931.png'
  }
};
/*
Router.plugin('seo', 
	{defaults: SEO_options}
	);
*/

Router.route('/', {
    name: 'home',
    template: 'home',
    yieldTemplates: {
      'home': {to: 'article'}
    }
});
Router.route('/privacy', {
    name: 'privacy',
    template: 'privacy',
    yieldTemplates: {
      'privacy': {to: 'article'}
    },
    seo: {
 	   title: {
      text: 'Privacy'
    	}
    }
});
Router.route('/accounts', {
    name: 'accounts',
    template: 'nav',
    yieldTemplates: {
      'nav': {to: 'article'}
    },
    seo: {
     title: {
      text: 'Accounts'
      }
    }
});
Router.route('/listings', {
    name: 'allListings',
    template: 'allListings',
    subscriptions: function(){
    	return Meteor.subscribe("listings");
    },
    yieldTemplates: {
      'allListings': {to: 'article'}
    },
    seo: {
 	   title: {
      text: 'eX Populi'
    	}
    }
});
Router.route('/new', {
    name: 'new',
    template: 'createListing',
    subscriptions: function(){
      return Meteor.subscribe("listings");
    },
    yieldTemplates: {
      'skipMain': {to: 'main'},
      'createListing': {to: 'article'}
    },
    seo: {
     title: {
      text: 'New Listing'
      }
    }
});


Router.route('/places/:placeId', {
  name: 'place',
  template: 'places',
  waitOn: function () {
    return Meteor.subscribe('listings');
  },
  yieldTemplates: {
    'places': {to: 'main'},
    'places': {to: 'article'}
  },
  data: function(){
    return this.params.placeId;
    }
});


Router.route('/places', {
  name: 'places',
  template: 'matchingList',
  waitOn: function () {
    return Meteor.subscribe('listings');
  },
  yieldTemplates: {
    'matchingList': {to: 'main'},
    'matchingList': {to: 'article'}
  }
});


Router.route('/profile/:bizNameUrl', {
	name: 'profile',
	template: 'profile',
	waitOn: function () {
    return Meteor.subscribe('listings');
  },
  yieldTemplates: {
    'profile': {to: 'article'}
  },
	data: function(){
	    var currentBiz = this.params.bizNameUrl;
	    return Listings.findOne({ bizNameUrl: currentBiz });
	},
  seo: {
    title: function() {
      return this.data().bizName;
    },
    meta: {
      keywords: function(){
      	var socialM = this.data().socialMission;
      	var kwordsArray = new Array();
      	kwordsArray = socialM.match(/<strong>(.*?)<\/strong>|<b>(.*?)<\/b>/g).map(function(val){
				   return val.replace(/<\/?strong>|<\/?b>/g,'');
				});
      	console.log('Keywords: '+kwordsArray);
      	return kwordsArray;
      },
      author: function(){
      	var first = this.data().firstName;
      	var last = this.data().lastName;
      	var ownerName = first+" "+last;
      	console.log('Owner\'s Name: '+ownerName);
      	return ownerName;
      }
    },
    description: function() {
    	var socialM = this.data().socialMission;
    	var smParsed = socialM.replace(/<.*?>/gi, "");
			var maxLength = 400;
			var trimmedString = smParsed.substr(0, maxLength);
			var description = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")));
    	console.log('Description: '+description);
      return description;
    },
    image: function() {
    	var img = "https://wedobusinessbetter.com"+this.data().logo;
      return img;
    },
    twitter: {
      creator: function() {
        var twitUrl = this.data().twitterBusiness;
        var twitHandle = twitUrl.replace('https://twitter.com/', '');
        return twithandle;
      }
    },
    og: {
      type: 'business.business',
   	  image: function() {
        	var img = "https://wedobusinessbetter.com"+this.data().logo;
      		return img;
    	}
    }
  }
});

Router.route('/profile/edit/:bizNameUrl', {
	name: 'updateListing',
	template: 'updateListing',
  waitOn: function () {
  	return Meteor.subscribe('listings')
  },
	data: function(){
		if(this.ready()){
			var currentBiz = this.params.bizNameUrl;
	    return Listings.findOne({ bizNameUrl: currentBiz });
	  }
	},
  yieldTemplates: {
    'updateListing': {to: 'article'}
  },
  seo: {
    title: function() {
      return this.data().bizName;
    },
    meta: {
      keywords: function(){
      	var socialM = this.data().socialMission;
      	var kwordsArray = new Array();
      	kwordsArray = socialM.match(/<strong>(.*?)<\/strong>|<b>(.*?)<\/b>/g).map(function(val){
				   return val.replace(/<\/?strong>|<\/?b>/g,'');
				});
      	console.log('Keywords: '+kwordsArray);
      	return kwordsArray;
      },
      author: function(){
      	var first = this.data().firstName;
      	var last = this.data().lastName;
      	var ownerName = first+" "+last;
      	console.log('Owner\'s Name: '+ownerName);
      	return ownerName;
      }
    },
    description: function() {
    	var socialM = this.data().socialMission;
    	var smParsed = socialM.replace(/<.*?>/gi, "");
			var maxLength = 400;
			var trimmedString = smParsed.substr(0, maxLength);
			var description = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")));
    	console.log('Description: '+description);
      return description;
    },
    image: function() {
    	var img = "https://wedobusinessbetter.com"+this.data().logo;
      return img;
    },
    twitter: {
      creator: function() {
        var twitUrl = this.data().twitterBusiness;
        var twitHandle = twitUrl.replace('https://twitter.com/', '');
        return twithandle;
      }
    },
    og: {
      type: 'business.business',
   	  image: function() {
        	var img = "https://wedobusinessbetter.com"+this.data().logo;
      		return img;
    	}
    }
  }
});

Router.route('/url/:url', {
  name: 'urlFrame',
  template: 'urlFrame',
  waitOn: function () {
    return Meteor.subscribe('listings');
  },
  yieldTemplates: {
    'urlFrame': {to: 'article'}
  },
  data: function(){
      return this.params;
  }
});

Router.route('/invites', {
    /*onBeforeAction: function(){
      if(!Meteor.userId() || !Meteor.user().registered_emails) {
        this.render('notfound');
      } else if(Meteor.user().registered_emails[0].address == "my@email.com"){
        this.next();
      }
    },*/
  name: 'inviteAdmin',
  template: 'inviteAdmin',
  yieldTemplates: {
    'inviteAdmin': {to: 'article'}
  }
});







Router.onBeforeAction('loading');

Router.onAfterAction(function() {
  if (this.ready()) {
    return Meteor.isReadyForSpiderable = true;
  }
});