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
      sessionStorage.removeItem("jwt");
      sessionStorage.setItem("logging_out", "1");
      window.location.href = window["CONSTANTS"]["LOGIN_URL"] + "/logout?redirect=" + window.location.href;
    });
  }
});

Template.navAccount.helpers({
  profile: function(){
    if (Meteor.user().profile.name){
      return Meteor.user().profile.name.split(" ")[0];
    }
    return "Profile";
  }
});
