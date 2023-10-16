import { useState, useRef, useEffect } from "react";
import Topbar from "../components/Topbar";
import axios from "axios";
import { Button } from "react-bootstrap";

const Cat01 = () => {

    //api
    const apiClicked = async () => {
        const result = await axios.post(
            //"http://private-06de82-bee3083.apiary-mock.com/api/users/login",
            "http://private-06de82-bee3083.apiary-mock.com/api/some-endpoint",
            {

            }
        ).then((response) => {
            alert(response.status)
            console.log(response)
        })
    }

    const [data, setData] = useState(null);

    const apiGetCategories = () => {
        axios.get('http://private-bc2ca0-bee3083.apiary-mock.com/api/themes/')
          .then((response) => {
            setData(response.data);
          })
          .catch((error) => {
            console.error('API GET request error:', error);
          });
      };

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
            <Button onClick={apiGetCategories}>Test API Request</Button>
      
            <div>
                {menus && 
                    menus.map((item, idx) => (
                        <div key={idx} id={idx}
                            style={{
                                //backgroundColor: 'lightblue',
                                border: '1px solid black',
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