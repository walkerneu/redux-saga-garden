import React, { useState }from 'react';
import { useDispatch } from 'react-redux';

const PlantForm = () => {
    const dispatch = useDispatch();
    
    // ("name", "kingdom", "clade", "order", "family", "subfamily", "genus")
    //Initial state is an OBJECT, with keys id and name
    let [newPlant, setPlant] = useState( 
        {   name: '',
            kingdom: '',
            clade: '',
            order: '',
            family: '',
            subfamily: '',
            genus: ''});

    const handleNameChange = (event, num) => {
        if (num === 1){
        setPlant({...newPlant, name: event.target.value})
        } else if (num === 2) {
            setPlant({...newPlant, kingdom: event.target.value})
        } else if (num === 3) {
            setPlant({...newPlant, clade: event.target.value})
        } else if (num === 4) {
            setPlant({...newPlant, order: event.target.value})
        } else if (num === 5) {
            setPlant({...newPlant, family: event.target.value})
        } else if (num === 6) {
            setPlant({...newPlant, subfamily: event.target.value})
        } else if (num === 7) {
            setPlant({...newPlant, genus: event.target.value})
        }
    }

    const addNewPlant = event => {
        event.preventDefault();
        dispatch({ 
            type: 'SAGA/POST_PLANT', 
            payload: newPlant });
       
    }
    return (
        <div>
            <h3>This is the form</h3>
            <form onSubmit={addNewPlant}>
                <input 
                    type='text' 
                    value={newPlant.name}
                    placeholder='name'
                    onChange={() => handleNameChange(event, 1)}/>
                <input 
                    type='text' 
                    value={newPlant.kingdom}
                    placeholder='kingdom'
                    onChange={() => handleNameChange(event, 2)}/>
                <input 
                    type='text' 
                    value={newPlant.clade}
                    placeholder='clade'
                    onChange={() => handleNameChange(event, 3)}/>
                <input 
                    type='text' 
                    value={newPlant.order}
                    placeholder='order'
                    onChange={() => handleNameChange(event, 4)}/>
                <input 
                    type='text' 
                    value={newPlant.family}
                    placeholder='family'
                    onChange={() => handleNameChange(event, 5)}/>
                <input 
                    type='text' 
                    value={newPlant.subfamily}
                    placeholder='subfamily'
                    onChange={() => handleNameChange(event, 6)}/>
                <input 
                    type='text' 
                    value={newPlant.genus}
                    placeholder='genus'
                    onChange={() => handleNameChange(event, 7)}/>
                <input type='submit' value='Add New Plant' />
            </form>
        </div>
    );
}


export default PlantForm;
