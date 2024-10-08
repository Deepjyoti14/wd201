/* eslint-disable no-undef */
const todoList = require('../todo');

const {all, markAsComplete, add, overdue, dueToday, dueLater} = todoList();

describe("TodoList test suite", () => {
    beforeEach( () => {
        while(all.length){
            all.pop();
        }
        add({
            title: "test todo",
            completed: false,
            dueDate: new Date().toISOString()
        });
    })
    test("should add new todo", () => {
        const todoItemCount = all.length;
        add(
            {
                title: "Test todo",
                completed: false,
                dueDate: new Date().toDateString()
            }
        );
        expect(all.length).toBe(todoItemCount + 1);
    })
    test("should mark a todo as completed", () => {
        expect(all[0].completed).toBe(false);
        markAsComplete(0);
        expect(all[0].completed).toBe(true);
    })
    test("should retrieve overdue items", () => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        add(
            {
                title: "overdue task",
                completed: false,
                dueDate: yesterday.toISOString().split('T')[0] 
            }
        )
        const overDueItem = overdue();
        expect(overDueItem.length).toBe(1);
        expect(new Date(overDueItem[0].dueDate) < new Date()).toBe(true);
    })
    test("should retrieve duetoday items", () => {
        const today = new Date().toISOString().split('T')[0];
        add(
            {
                title: "duetoday task",
                completed: false,
                dueDate: today
            }
        )
        const dueTodayItem = dueToday();
        expect(dueTodayItem.length).toBe(1);
        expect(new Date(dueTodayItem[0].dueDate).toISOString().split('T')[0]).toBe(today);
    })
    test("should retrieve duelater items", () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1)
        add(
            {
                title: "duelater task",
                completed: false,
                dueDate: tomorrow.toISOString().split('T')[0]
            }
        )
        const duelaterItem = dueLater();
        expect(duelaterItem.length).toBe(1);
        expect(new Date(duelaterItem[0].dueDate) > new Date()).toBe(true);
    })
    function toDisplayableList(todos) {
        return todos.map(todo => {
            const completionStatus = todo.completed ? "[x]" : "[ ]";
            const dueDate= todo.dueDate ? new Date().toISOString() : ' ';
            return `${completionStatus} ${todo.title}${dueDate ? ` ${dueDate}` : ''}`;
          }).join("\n");
    }

})
