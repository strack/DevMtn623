lists = new Mongo.Collection('lists');

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);
  
  function focusText(i){
    i.focus();
    i.select();
  }
  
  Template.categories.helpers({
    lists : function(){
      return lists.find({},{sort:{Category:1}});
    },
    new_cat : function(){
      //return true if adding_category == true
      return Session.equals('adding_category',true);
    }
  });
  Template.categories.events({
    'click #btnNewCat' : function (e, t){
      Session.set('adding_category', true);
      Tracker.flush();
       focusText(t.find("#add-category"));
    },
    'keyup #add-category' : function (e,t){
      if (e.which === 13)
      {
        var catVal = String(e.target.value || "");
        if (catVal){
          lists.insert({Category:catVal});
          Session.set('adding_category', false);
        }
          
      }
    },
    'focusout #add-category' : function (e,t){
      Session.set('adding_category', false);
    }
  });
  
  Template.list.helpers({
    items: function(){
      if (Session.equals('current_list',null)) {
        return null;
      } else {
        var cats = lists.findOne({
          _id: Session.get('current_list')
        });
        if (cats && cats.items){
          for (var i)
        }
      }
      
    }
  })
  
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
