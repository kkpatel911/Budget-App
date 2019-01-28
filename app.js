//////////////////////////////Budget Controller//////////////////////////////////////////
var budgetController = (function () {

    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };


    var calcuateTotal = function (type) {
        var sum = 0;
        data.allItems[type].forEach(function (cur) {
            sum = sum + cur.value;
        });
        data.totals[type] = sum;
    }
    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    };



    return {
        addItem: function (type, des, val) {
            var newItem, ID;
            // ID = 0;

            //Create new  ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }


            //Create new item based on inc or exp type
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }

            //Push it into data structure
            data.allItems[type].push(newItem);

            //return the new elelemnt
            return newItem;
        },

        deleteItem: function (type, id) {
            var ids, index;
            ids = data.allItems[type].map(function (current) {
                return current.id;
            });

            index = ids.indexOf(id);

            if (index !== -1) {
                data.allItems[type].splice(index, 1)
            }
        },

        calculateBudget: function () {

            //Calculate total income and expensse
            calcuateTotal('exp');
            calcuateTotal('inc');

            //calcuthe budget (income - expense)
            data.budget = data.totals.inc - data.totals.exp;

            if (data.totals.inc > 0) {


                //calcualte the percentage of the income that we spend
                data.percentage = Math.floor((data.totals.exp / data.totals.inc) * 100);

            } else {
                data.percentage = -1;
            }

        },
        getBudget: function () {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            }
        },


        testing: function () {
            console.log(data);
        }
    };

})();



/////////////////////////////////////UI Controller///////////////////////////////////////
var UIController = (function () {
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: ".income__list",
        expensesContainer: ".expenses__list",
        budgetLabel: ".budget__value",
        incomeLabel: ".budget__income--value",
        expenseLabel: ".budget__expenses--value",
        percentageLabel: ".budget__expenses--percentage",
        container: ".container"
    }


    return {
        getinput: function () {
            return {
                type: document.querySelector(DOMstrings.inputType).value, // Will be either income or expense
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };
        },

        addListItem: function (obj, type) {
            var html, newHtml, element;
            //1.HTML String with placeholder
            if (type === 'inc') {
                element = DOMstrings.incomeContainer;

                html = ` <div class="item clearfix" id = "inc-%id%" >
                        <div class="item__description">%description%</div>
                            <div class="right clearfix">
                                <div class="item__value">%value%</div>
                                <div class="item__delete">
                                <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                            </div>
                        </div>
                    </div > `

            } else if (type === 'exp') {
                element = DOMstrings.expensesContainer;

                html = `<div class="item clearfix" id="exp-%id%">
                        <div class="item__description">%description%</div>
                            <div class="right clearfix">
                                <div class="item__value">%value%</div>
                                <div class="item__percentage">21%</div>
                                <div class="item__delete">
                                <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                            </div>
                        </div>
                  </div>`
            }

            //2.replace the placeholder text with actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);


            //3.insert the html to the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

        },

        deleteListItem: function (selectorId) {

            var el = document.getElementById(selectorId)
            el.parentNode.removeChild(el);


        },

        //Clear the fields
        clearFields: function () {
            var fields, fieldsArr;

            fields = document.querySelectorAll(DOMstrings.inputDescription + ',' + DOMstrings.inputValue);

            fieldsArr = Array.prototype.slice.call(fields);
            // console.log(fields);
            // console.log(Array);

            fieldsArr.forEach(function (current, index, array) {
                current.value = '';

            });

            fieldsArr[0].focus();
        },

        displayBudget: function (obj) {
            //objecctto call the data
            document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
            document.querySelector(DOMstrings.expenseLabel).textContent = obj.totalExp;

            if (obj.percentage > 0) {
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + "%";
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent = "_-_";

            }

        },

        getDOMStrings: function () {
            return DOMstrings;
        }
    };


})();

/////////////////////////////Global app controller/////////////////////////////////////
var controller = (function (budgetCtrl, UIctrl) {

    var setupEventListeners = function () {

        var DOM = UIctrl.getDOMStrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13) {
                ctrlAddItem();
            }
        });
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem)

    };


    var updateBudget = function () {
        ///1. calculate the budget
        budgetCtrl.calculateBudget();
        //2.return teh budget
        var budget = budgetCtrl.getBudget();
        console.log(budget)

        //.display the budget
        UIctrl.displayBudget(budget);
    }

    var ctrlAddItem = function () {
        var input, newItem;

        //1.get the input data
        input = UIctrl.getinput();

        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {



            //2.add the item to the controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            //3.add the new item to the ui
            UIctrl.addListItem(newItem, input.type);

            //Clear the fields
            UIctrl.clearFields();

            //calcualte the budget
            updateBudget();
        }

    };

    var ctrlDeleteItem = function (event) {
        var itemId, splitID, type, id;
        // console.log(event.target);
        itemId = event.target.parentNode.parentNode.parentNode.parentNode.id;
        if (itemId) {

            //inc-1
            splitID = itemId.split('-');
            type = splitID[0];
            id = parseInt(splitID[1]);


            //1.delete the item
            budgetCtrl.deleteItem(type, id);

            //2.delete the item from ui
            UIctrl.deleteListItem(itemId);
            //3.update the new total or budgets
            updateBudget();
        }
    };

    return {
        init: function () {
            console.log("Application has been started");
            UIctrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
            setupEventListeners();
        }
    }


})(budgetController, UIController);

controller.init();



































































































































