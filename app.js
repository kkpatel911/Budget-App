/* **********************************************************************  BUDGET  CONTROLLER MODULE  ********************************************************************** */

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
            ID = 0;

            if (type === 'exp') {
                newItem = new Expense(ID, ded, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, ded, val);
            }
            data.allItems[type].push(newItem);
            return newItem;

        }
    };

})();




/* **********************************************************************  UI  CONTROLLER MODULE  ********************************************************************** */
var UIController = (function () {

    //Adding this cause this will helps a lot of i change the HTML
    var DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    }

    //We want to acces thos outside uicontrol so
    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMStrings.inputType).value, // will be either inc or exp
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: document.querySelector(DOMStrings.inputValue).value
            };
        },

        //Adding this so i can use it inside controller Module
        getDOMStrings: function () {
            return DOMStrings;
        }
    };

})();

/* **********************************************************************   CONTROLLER MODULE  ********************************************************************** */
var controller = (function (budgetCtrl, UICtrl) {


    var setUpEventListner = function () {

        var DOM = UICtrl.getDOMStrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function (event) {

            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
    };


    var ctrlAddItem = function () {

        //1. Get the filled input data
        var input = UICtrl.getInput();

        //2. Add item to the budget controller

        //3.Add the new item to the UI

        //4. Calculate the budget

        //5. Display the budget

    };

    return {
        init: function () {
            console.log('App has started');
            setUpEventListner();
        }
    };


})(budgetController, UIController);


controller.init();































