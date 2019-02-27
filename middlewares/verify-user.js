 /// <summary>
 /// Verifies that the user information is in a valid format and not empty
 /// </summary>
 /// <param name="user"></param>
 /// <returns>true for a valid user and false for an invallid user</returns>
function loginIsValid(user){
    if (typeof user.username === "string" &&
        user.username.trim() !== '' &&
        typeof user.password === "string" &&
        user.password.trim() !== '') {
        return true;
    }
    return false;
}
module.exports = loginIsValid;