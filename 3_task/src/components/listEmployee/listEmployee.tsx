import React, {useEffect, useState} from 'react';
import DetailEmployee from "../detailEmployee/detailEmployee";
import {Employee} from "../app/app";
import {useUsers} from "../../hooks/useUsers";


const ListEmployee: React.FC = () => {
    const {isLoading, data: response} = useUsers()


    return (
        <>
            {isLoading ? <>isLoading</> : response?.data.length ? response?.data.map((employee, i)=> {
                return (


                    <DetailEmployee employee={employee} key={i}/>


                )
            }) : 'no data'}
        </>


    )
}

export default ListEmployee;