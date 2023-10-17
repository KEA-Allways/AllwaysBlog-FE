import { useState, useRef } from "react";
import Topbar from "../components/Topbar";

const Cat01 = () => {

    const dragItem = useRef();
    const dragOverItem = useRef();

    const [menus, setMenus] = useState ([
        { title : '양식 레시피'},
        { title : '일식 레시피'},
        { title : '한식 레시피'},
        { title : '디저트 레시피'}
    ]);

    const dragStart = idx => {
        dragItem.current = idx;
      };
    
      const dragEnter = idx => {
        dragOverItem.current = idx;
      };
    
      const drop = () => {
        const copyListItems = [...menus];
        const dragItemConotent = copyListItems[dragItem.current];
        copyListItems.splice(dragItem.current, 1);
        copyListItems.splice(dragOverItem.current, 0, dragItemConotent);
        dragItem.current = null;
        dragOverItem.current = null;
        setMenus(copyListItems);
      };

    return (
        <div>
            <Topbar />
            요리 카테고리 목록 관리
            <div>
                {menus && 
                    menus.map((item, idx) => (
                        <div key={idx} id={idx}
                            style={{
                                backgroundColor: 'lightblue',
                                margin: '20px 25%',
                                textAlign: 'center',
                                fontSize: '20px',
                            }}
                            onDragStart={() => dragStart(idx)}
                            onDragEnter={() => dragEnter(idx)}
                            onDragOver={e => e.preventDefault()}
                            onDragEnd={drop}
                            draggable>
                            {item.title}
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default Cat01;