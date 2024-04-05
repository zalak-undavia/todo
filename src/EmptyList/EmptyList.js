import "./EmptyList.css";

export default function EmptyList() {
    return (
        <div className="main-empty-box">
            <img
                className="todo-empty-list"
                src="https://img.freepik.com/free-vector/home-garden-flat-composition-with-woman-lying-hammock-with-home-plants-vector-illustration_1284-63117.jpg?size=626&ext=jpg&ga=GA1.1.1700460183.1708387200&semt=ais"
            ></img>
            <div className="empty-text">
                Seat back and relax! <br />
                Your all tasks are done!
            </div>
        </div>
    );
}
