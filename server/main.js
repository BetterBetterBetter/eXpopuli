import { Meteor } from 'meteor/meteor';
import {FS} from 'meteor/cfs:standard-packages';
import {GridFS} from 'meteor/cfs:gridfs';






Meteor.startup(function(){




Invites.config({
  from: "MyApp <notifications@myapp.io>",
  inviteRequest: {
      subject: "Thanks for requesting an invitation to MyApp Beta",
      body: "Thanks for your interest in MyApp! We'll let you know when you've been invited."
    },
    invite: {
      subject: "Welcome to MyApp Beta",
      body: "You've been invited to MyApp!"
    }
});












  Meteor.publish("listings", function(){
   //Meteor._sleepForMs(5000);
   return Listings.find({}, {
    sort: {createdAt: -1}
   });
  });

  Meteor.publish("savedSearches", function(){
   return SavedSearches.find({}, {
    sort: {createdAt: -1}
   });
  });

Meteor.publish("keywords", function(){
   return Keywords.find({}, {
    sort: {createdAt: -1}
   });
  });



  Listings._ensureIndex({ "_id": 1});

  Meteor.publish('images', function () { 
    Meteor.Images.find({});
  });

  reCAPTCHA.config({
    privatekey: '6LeLvyITAAAAAH4-TlJbuZl69v4tNwS-00yJ34HX'
   });

  Accounts.config({
   sendVerificationEmail: true, 
   forbidClientAccountCreation: false}); 


  smtp = {
    username: 'jeremy@betterbetterbetter.org',   // eg: server@gentlenode.com
    password: 'Qazsxdrewazx1',   // eg: 3eeP1gtizk5eziohfervU
    server:   'smtp.gmail.com',  // eg: mail.gandi.net
    port: 25
  }

  process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;


});

Images.allow({
    insert: function (userId, doc) {
        return true;
    },
    update: function (userId, doc) {
        return true;
    },
    download: function (userId) {
        return true;
    }
}); 

Listings.allow({
    insert: function (userId, doc) {
        return true;
    },
    update: function (userId, doc) {
        return true;
    }
});

SavedSearches.allow({
  insert: function (userId, doc) {
      return true;
  }
});

Keywords.allow({
  insert: function (userId, doc) {
      return true;
  },
  update: function (userId, doc) {
      return true;
  }
});



Meteor.methods({

 insert: function (bizName, bizNameUrl, industry, location, website, socialMission, userId, createdAt, captchaData){

   var self = this;

   var clientIP = headers.methodClientIP(self);

   var verifyCaptchaResponse = reCAPTCHA.verifyCaptcha(clientIP, captchaData);


   if (!verifyCaptchaResponse.success) {
       console.log('reCAPTCHA check failed!', verifyCaptchaResponse);
       throw new Meteor.Error(422, 'reCAPTCHA Failed: ' + verifyCaptchaResponse.error);
   }

  Listings.insert({
   bizName: bizName,
   bizNameUrl: bizNameUrl,
   website: website,
   industry: industry,
   location: location,
   socialMission: socialMission,
   userId: userId,
   createdAt: new Date()
  });

 },
  insertInsecure: function (bizName, bizNameUrl, industry, location, website, socialMission, userId, createdAt){


  Listings.insert({
   bizName: bizName,
   bizNameUrl: bizNameUrl,
   website: website,
   industry: industry,
   location: location,
   socialMission: socialMission,
   userId: userId,
   createdAt: new Date()
  });

 },



 addSavedSearches: function (searchQ, userId, createdAt){

  SavedSearches.insert({
   searchQ: searchQ,
   userId: userId,
   createdAt: new Date()
  });

 },

addKeyword: function (keyword, pre, pro, tier, path, userId, createdAt){

  Keywords.insert({
   keyword: keyword, 
   preceding: pre,
   proceeding: pro,
   tier: tier, 
   path: path,
   userId: userId,
   createdAt: createdAt
  });

 }
 







});




















