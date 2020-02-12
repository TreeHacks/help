var LOGIN_URL = "https://login.dev.treehacks.com";

// -----------------------------
// Mentor section of Nav
// -----------------------------
Template.navMentor.helpers({
  openTickets: function(){
    return Tickets.find({
      status: {
        $in: ["OPEN", "CLAIMED"]
      }
    }).fetch().length;
  }
});

// -----------------------------
// Account section of Nav
// -----------------------------
Template.navAccount.rendered = function(){
  $(this.findAll('.ui.dropdown')).dropdown();
};

Template.navAccount.events({
  'click #logout': function(){
    Meteor.logout(function() {
      sessionStorage.clearItem("jwt");
      window.location.href = LOGIN_URL + "/logout?redirect=${window.location.href}";
    });
  }
});

Template.navAccount.helpers({
  profile: function(){
    if (Meteor.user().profile.first_name){
      return Meteor.user().profile.first_name;
    }
    return "Profile";
  }
});
