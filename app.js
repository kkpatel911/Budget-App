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

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
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
        expensesContainer: ".expenses__list"
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

                html = ` <div class="item clearfix" id = "income-%id%" >
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

                html = `<div class="item clearfix" id="expense-%id%">
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
    };


    var updateBudget = function () {
        ///1. calculate the budget

        //2.return teh budget

        //.display the budget
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


    return {
        init: function () {
            console.log("Application has been started");
            setupEventListeners();
        }
    }


})(budgetController, UIController);

controller.init();



































































































































