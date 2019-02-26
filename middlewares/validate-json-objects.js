
function validateJsonObjects(request) {

try {
        JSON.parse(request.json)
        JSON.parse(request.jsonPatch)
    } catch (e) {
        return false;
    }
    return true;
}
module.exports=validateJsonObjects