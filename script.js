let expenses =
    JSON.parse(localStorage.getItem("expenses")) || [];
const expenseForm =
    document.getElementById("expenseForm");
const expenseName =
    document.getElementById("expenseName");
const expenseAmount =
    document.getElementById("expenseAmount");
const expenseCategory =
    document.getElementById("expenseCategory");
const expenseList =
    document.getElementById("expenseList");
const totalExpense =
    document.getElementById("totalExpense");
const expenseCount =
    document.getElementById("expenseCount");
const categoryFilter =
    document.getElementById("categoryFilter");
expenseForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const name = expenseName.value.trim();
    const amount = Number(expenseAmount.value);
    const category = expenseCategory.value;
    if (name === "" || amount <= 0) {
        alert("Please enter valid expense details.");
        return;
    }
    const expense = {
        id: Date.now(),
        name: name,
        amount: amount,
        category: category,
        date: new Date().toLocaleDateString()
    };
    expenses.push(expense);
    saveExpenses();
    displayExpenses();
    expenseForm.reset();
});
function saveExpenses() {
    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );
}
function displayExpenses() {
    expenseList.innerHTML = "";
    const filter =
        categoryFilter.value;
    let filteredExpenses = expenses;
    if (filter !== "All") {
        filteredExpenses =
            expenses.filter(
                expense => expense.category === filter
            );
    }
    if (filteredExpenses.length === 0) {
        expenseList.innerHTML =
            "<p>No expenses found.</p>";
        updateSummary();
        return;
    }
    filteredExpenses.forEach(function(expense) {
        const expenseItem =
            document.createElement("div");
        expenseItem.className =
            "expense-item";
        expenseItem.innerHTML = `
            <div class="expense-info">
                <h3>${expense.name}</h3>
                <p>
                    ${expense.category}
                    •
                    ${expense.date}
                </p>
            </div>
            <div class="expense-right">
                <span class="amount">
                    ₹${expense.amount}
                </span>
                <button
                    class="delete-btn"
                    onclick="deleteExpense(${expense.id})">
                    Delete
                </button>
            </div>
        `;
        expenseList.appendChild(expenseItem);
    });
    updateSummary();
}
function deleteExpense(id) {
    expenses =
        expenses.filter(
            expense => expense.id !== id
        );
    saveExpenses();
    displayExpenses();
}
function updateSummary() {
    const total =
        expenses.reduce(
            (sum, expense) =>
                sum + expense.amount,
            0
        );
    totalExpense.textContent =
        `₹${total}`;
    expenseCount.textContent =
        expenses.length;
}
categoryFilter.addEventListener(
    "change",
    displayExpenses
);
displayExpenses();