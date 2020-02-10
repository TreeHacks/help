var ENDPOINT_URL = "https://root.dev.treehacks.com/api"

function getProfileFromJwt(jwt) {
  const result = HTTP.get(ENDPOINT_URL + "/user_profile", {
    "headers": {"Authorization": jwt}
  })
  if (result.statusCode === 200 && result.content.profile && result.content.profile.id) {
    return result.content;
  }
  return null;
}
  
function _treehacksLoginHandler (options) {
  if (!options.jwt) {
    return undefined;
  }
  const profile = getProfileFromJwt(jwt);
  var newProfile = {
    email: profile.email,
    name: profile.first_name + " " + profile.last_name,
    first_name: profile.first_name,
    last_name: profile.last_name
  };
  if (!profile) {
    return undefined;
  }
  if (profile.groups.indexOf("admin") > -1) {
    // Admin
    // TODO: don't use profile
    newProfile.admin = true;
  }
  else if (profile.status !== "ADMISSION_CONFIRMED") {
    // Only admitted applicants can login.
    return null;
  }

  var options = {
    "profile": newProfile
  };
  var user = Accounts.updateOrCreateUserFromExternalService("treehacks", profile, options)
  return user;
  };