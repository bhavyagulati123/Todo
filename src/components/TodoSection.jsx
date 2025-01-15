    import "./todo.css";
    import { v4 as uuidv4 } from 'uuid';
    import { useState ,useRef,useEffect} from "react";
    import { CiEdit } from "react-icons/ci";
    import { MdDeleteForever } from "react-icons/md";
    const TodoSection = () => {
        const ref=useRef("null");
        const [todo, settodo] = useState("");
        const [todos, settodos] = useState([]);
    
        useEffect(()=>{
            
            let storedtodos=JSON.parse(localStorage.getItem("todos"));

            if(storedtodos){

                settodos(storedtodos)
            }
        },[]);
        useEffect(() => {
            localStorage.setItem("todos", JSON.stringify(todos));
          }, [todos]);
    const handletext = (e) => {
        settodo(e.target.value);
    };
    const handleadd = () => {
        if(todo){

            settodos([...todos, { id: uuidv4(),todo, iscomplete: false}]);
            settodo("");
        }
        else{
            alert("todo is empty")
        }
    };
    const handleradio=(e)=>{
        let id=e.target.name;
        let index=todos.findIndex(item=>{
            return item.id===id;
        })
    let newtodos=[ ...todos]
        newtodos[index].iscomplete=!newtodos[index].iscomplete;
        settodos(newtodos)
    }

    const handleedit = (e,id) => {
        let t=todos.findIndex(item=>{
            return item.id===id;
        })
        console.log(todos[t].todo)
        settodo(todos[t].todo)
        let newtodos=todos.filter((item)=>{
            return item.id!==id;
        })

        settodos(newtodos)
    };
    const handledelete = (e,id) => {
        
        let newtodos=todos.filter((item)=>{
            return item.id!==id;
        })
        settodos(newtodos)

    };

    return (
        <div className="sahil">
        <div className="todo_sec">
        <div className="add">
            <h3>Add a Todo</h3>
            <input type="text" onChange={handletext} className="text" value={todo} />
            <button className="btn" onClick={handleadd}>
            Add
            </button>
        </div>
            <h3>Your Todo</h3>
        <div className="display_cont">
            {todos.length==0 && "Todo is Empty"}
            {todos.map((item) => {
            return (
                <div key={item.id} className="display">
                    <div style={{display:"flex", gap:"10px"}}> 

                    <input type="checkbox" name={item.id} checked={item.iscomplete}  onChange={handleradio}/>
                <div className="text" style={{textDecoration:item.iscomplete?"line-through" : "none"}} >{item.todo}</div>
                    </div>
                <div className="button">
                    <button className="btn" onClick={(e)=>{handleedit(e,item.id)}}>
                    <CiEdit />
                    </button>
                    <button className="btn" onClick={(e)=>{handledelete(e,item.id)}}>
                    <MdDeleteForever />
                    </button>
                </div>
                </div>
            );
            })}
        </div>
        </div>
        </div>
    );
    };

    export default TodoSection;
