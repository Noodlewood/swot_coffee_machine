var functionsInfo = {
    "functions": [{
        "name": "Coffee Machine",
        "url": "http://localhost:3000/action/cook",
        "available": true,
        "parameters": [
            {
                "name": "drink",
                "type": "Choice",
                "choices": [
                    "Coffee", "Coffee x2", "Espresso", "Espresso x2",
                    "Macchiato", "Macchiato x2", "Cappuccino", "Cappuccino x2"
                ],
                "required": true,
                "constraints": [
                    {
                        "type": "NotBlank",
                        "message": "Move may not be blank"
                    }
                ]
            }
        ]
}]};

module.exports = functionsInfo;