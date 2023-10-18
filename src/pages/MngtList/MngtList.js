import { useState, useRef, useEffect } from "react";
import ManageTopSideBar from '../../components/TopSidebar/ManageTopSideBar';
import axios from "axios";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import styles from "../../components/Text.module.css";

const MngtList = (props) => {
    const { themeSeq } = useParams();

    const [lists, setLists] = useState([]);

    const apiGetCategories = () => {
        axios.get('http://private-bc2ca0-bee3083.apiary-mock.com/api/themes/1')
          .then((response) => {
            setLists(response.data.themes[themeSeq].lists);
            console.log(lists)
          })
          .catch((error) => {
            console.error('API GET request error:', error);
          });
    };

    const dragItem = useRef();
    const dragOverItem = useRef();

    const dragStart = idx => {
        dragItem.current = idx;
    };
    
    const dragEnter = idx => {
        dragOverItem.current = idx;
    };
    
    const drop = () => {
        const copyListItems = [...lists];
        const dragItemConotent = copyListItems[dragItem.current];
        copyListItems.splice(dragItem.current, 1);
        copyListItems.splice(dragOverItem.current, 0, dragItemConotent);
        dragItem.current = null;
        dragOverItem.current = null;
        setLists(copyListItems);
    };

    useEffect(() => {
        // 컴포넌트가 마운트될 때 API 요청을 보냅니다.
        apiGetCategories();
    }, []);


    return (
        <div>
            <ManageTopSideBar Container={
                <div>
                    <h3 className={styles.h3}>목록 관리</h3>
                    {lists && 
                        lists.map((item, idx) => (
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
                                {item.listName}
                            </div>
                        ))}
                </div>
            } />
        </div>
    )
}

export default MngtList;