var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Jesus204130!",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    start();
});

var divider = "---------------------------------------------"

function start() {
    console.log(divider)
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        choiceArray = []
        for (var i = 0; i < res.length; i++) {
            console.log("Product: " + res[i].product_name + "|| Department: " + res[i].department_name + " || Price: " + res[i].price + " || Stock Quantity: " + res[i].stock_quantity);
            choiceArray.push(res[i].product_name);
        }
        choiceArray.push("EXIT")
        console.log(divider)
        inquirer
            .prompt({
                name: "whichProduct",
                type: "list",
                message: "Which item would you like to buy?",
                choices: choiceArray
            })
            .then(function (answer) {
                switch (answer.whichProduct) {
                    case choiceArray[0]:
                        howMany(res[0]);
                        break;
                    case choiceArray[1]:
                        howMany(res[1]);
                        break;
                    case choiceArray[2]:
                        howMany(res[2]);
                        break;
                    case choiceArray[3]:
                        howMany(res[3]);
                        break;
                    case choiceArray[4]:
                        howMany(res[4]);
                        break;
                    case choiceArray[5]:
                        howMany(res[5]);
                        break;
                    case choiceArray[6]:
                        howMany(res[6]);
                        break;
                    case choiceArray[7]:
                        howMany(res[7]);
                        break;
                    case choiceArray[8]:
                        howMany(res[8]);
                        break;
                    case choiceArray[9]:
                        howMany(res[9]);
                        break;
                    case "EXIT":
                        connection.end();
                        break;
                }
            });
    }
    )
}

function howMany(item) {
    console.log(divider)
    inquirer
        .prompt({
            name: "quantity",
            type: "input",
            message: "How many of the product: " + item.product_name + " would you like?",
            validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
              }
        })
        .then(function (answer) {
            if (parseInt(answer.quantity) > item.stock_quantity) {
                console.log("Insufficient quantity! Only " + item.stock_quantity + " " + "left! Try again...");
                console.log(divider)
                start();
            }
            else if (parseInt(answer.quantity) <= item.stock_quantity) {
                var difference = item.stock_quantity - parseInt(answer.quantity)
                connection.query("update products set ? where ?",
                    [
                        {
                            stock_quantity: difference
                        },
                        {
                            product_name: item.product_name
                        }
                    ],
                    function (error) {
                        if (error) throw err;
                        console.log(divider)
                        console.log("Your cart shows " + answer.quantity + " " + item.product_name + "(s). Your total is " + (item.price * answer.quantity) + " dollars.");
                        console.log(divider)
                        start();
                    }
                )
            }
        })
}