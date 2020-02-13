// From https://github.com/youbastard/jquery.getQueryParameters/blob/master/qp.js
var getQueryParameters = function(str) {
  return (str || document.location.search).replace(/(^\?)/,'').split("&").map(function(n){return n=n.split("="),this[n[0]]=n[1],this;}.bind({}))[0];
};

Template.login.onCreated(function(){
  this.error = new ReactiveVar();

  var hash = getQueryParameters(window.location.hash.substring(1)); // remove starting # from hash
  if (hash && hash.jwt) {
    sessionStorage.setItem("jwt", hash.jwt);
    window.location.hash = "";
  } else if (!sessionStorage.getItem("jwt")) {
    login();
  }
  checkLoginStatus(this);
});

Template.login.helpers({
  error: function(){
    return Template.instance().error.get();
  }
});


function login() {
  window.location.href = window["CONSTANTS"]["LOGIN_URL"] + "?redirect=" + window.location.href;
}

function checkLoginStatus(t) {
  var jwt = sessionStorage.getItem("jwt");
  Accounts.callLoginMethod({
    methodArguments: [
      {
        jwt: jwt
      }],
    userCallback: function (error) {
      if (error) {
        console.log(error);
        sessionStorage.removeItem("jwt");
        t.error.set("Sorry, there was an error logging you in.");
        }
      }
    }
  );
}