
// For usage with XAMPP use localhost, e.g. :
//"post_messages": "http://localhost:8080/swot/web/app_dev.php/api/v1/thing/messages",
//"post_functions_update": "http://localhost:8080/swot/web/app_dev.php/api/v1/thing/functions/update",
//"post_info_update": "http://localhost:8080/swot/web/app_dev.php/api/v1/thing/information/update",
//"post_image_update" : "http://localhost:8080/swot/web/app_dev.php/api/v1/thing/profileimage/update"

var swotRestRoutes = {
    "routes": {
        "post_messages": "http://13.13.13.13/api/v1/thing/messages",
        "post_functions_update": "http://13.13.13.13/api/v1/thing/functions/update",
        "post_info_update": "http://13.13.13.13/api/v1/thing/information/update",
        "post_image_update" : "http://13.13.13.13/api/v1/thing/profileimage/update"
    }
};

module.exports = swotRestRoutes;
