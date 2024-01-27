import { faNoteSticky, faPenClip, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { v4 as uuidv4 } from 'uuid';
import { addNote, deleteNote, editNote } from '../Features/NotesSlice';



function NotesPage(props) {


    

    const [inptxt, setInptxt] = useState('')
    const [inptxt2, setInptxt2] = useState('')
    
    const [editmode, setEditmode] = useState(false);
    const [editedTitle, setEditedtitle] = useState('');
    const [editedContent, setEditedcontent] = useState('');
    const [editId, setEditid] = useState('');

    const DispBoxVal = useSelector((state) => state.NotesPageReducer)
    const dispatch = useDispatch()

    //////////////////////////////////////
    const handleChange = (e) => {


        setInptxt(e.target.value);



    }


    /////////////////////

    const handleChange2 = (e) => {


        setInptxt2(e.target.value);



    }

    ///////////////////////////////////////




    const handleClick = () => {

        const data = {
            id: uuidv4(),
            content1: inptxt,
            content2: inptxt2

        }
        dispatch(addNote(data))


        console.log(data)

        setInptxt('')
        setInptxt2('')

    }

    ////////////////////////////////////

    const handleDelete = (id) => {
        
        dispatch(deleteNote(id));


    

    }

    ///////////////////////


    const handleEdit = (id) => {

        if (editmode == true) {
            setEditmode(false)
        }

        else {
            console.log(id);
            setEditmode(true);
            setEditid(id);

            DispBoxVal.map((obj) => {

                if (obj.id == id) {


                    setEditedtitle(obj.content1);
                    setEditedcontent(obj.content2);
                    console.log(editedTitle);
                    return obj;
                }
                else
                    return obj;

            })




        }

        const contentInparr = useSelector((state) => state.NotesPageReducer.map(obj => {

            if (obj.id == id) {


                setEditedtitle(obj.content2);

                return obj;
            }
            else
                return obj;

        }


        ));




    }


    /////////////////////



    const handleSave = () => {
        setEditmode(false);


        const editData = {
            id: editId,
            Econtent1: editedTitle,
            Econtent2: editedContent
        }
        console.log(editData);

        dispatch(editNote(editData));

        setEditedtitle('');
        setEditedcontent('');
    }




    ///////////////////////////////////////////////


    const handleCancel = () => {


        setEditmode(false);

    }


    return (

        <div className=' addnoteboxmain container-fluid mt-5'>
            <div className='addnotebox container-fluid '>

                <h1 >Add a Note</h1>

                <input className='addnotetxtbox' type="text" placeholder='Title' value={inptxt} onChange={handleChange} />
                <input type="text" placeholder='Take a note...' value={inptxt2} onChange={handleChange2} className='mt-2 addnotetxtbox2' />


                <div className='timeclickbox'>



                    <button className='addclick mt-3' onClick={handleClick}>Add</button>

                    <button className='remtime mt-5 mb-2'> Today,10:10 AM</button>



                </div>



            </div>

            <div className='display-container mt-5'>
                <h1 className='mynotes'> <FontAwesomeIcon icon={faNoteSticky} /> My Notes</h1>

                {DispBoxVal.length > 0 ? (
                    <div className="card-container horizontal-card-list mt-1">
                        {DispBoxVal.map((BoxVal) => (
                            <div key={BoxVal.id} className="card">
                                <div className="card-body">

                                    <div className="card-title">
                                        <h4 className='addnotetxt'> {BoxVal.content1}</h4>

                                        <div className='btnicons '><FontAwesomeIcon icon={faPenClip} onClick={() => { handleEdit(BoxVal.id) }} />
                                            <button className="deletebtn" onClick={() => { handleDelete(BoxVal.id) }}>
                                                <FontAwesomeIcon icon={faTrashCan} />   </button>   </div>

                                    </div>

                                    <div className='card-content'>

                                        <p className='addnotetxt'>  {BoxVal.content2}</p>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>No notes added</div>
                )}
            </div>

            {editmode ? (

                <div className="editBox">


                    <input className='form-control form-control-sm' type="text" value={editedTitle} onChange={(e) => { setEditedtitle(e.target.value) }} placeholder='Edit title' />

                    <textarea rows={4} className='form-control form-control-sm mt-3 mb-3' type="text" value={editedContent} onChange={(e) => { setEditedcontent(e.target.value) }} placeholder='Edit content' />

                    <button type='button' className='btn     btn-success btn-sm  mx-2' onClick={handleSave}>save</button>
                    <button className='btn btn-sm btn-warning mx-2' onClick={handleCancel}>cancel</button>



                </div>


            ) : ""}

        </div>
    );
}

export default NotesPage;