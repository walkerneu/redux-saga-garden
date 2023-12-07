import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';


function PlantList() {
    const dispatch = useDispatch();

    const plantList = useSelector(store => store.plantList);

    useEffect(() => {
        dispatch({
            type: 'SAGA/GET_PLANTS'
        })
    }, []); 
    console.log(plantList);

    return (
        <div>
            <h3>This is the plant list</h3>
           {plantList.map((plant) => (
            <div key={plant.id}>{plant.name}</div>
           ))}
        </div>
    );
}

export default PlantList;
