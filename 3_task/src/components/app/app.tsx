import React, {useEffect, useState} from 'react';
import MyModal from "../modal/modal";
import 'antd/dist/antd.css';
import '../../styles/all.css'
import axios from "axios";
import {useMutation} from "react-query";
import ListEmployee from "../listEmployee/listEmployee";
import {useUsers} from "../../hooks/useUsers";


export interface Employee{
    phone: string,
    email: string,
    second_name: string,
    name: string,
    birth_date:string,
    start_work: string,
    gender: string,
    department: string,
    position: string,
    role:string,
    country: string,
    city: string,
    password: string,
    re_password: string
}

function App() {

    const [employees, setEmployees] = useState<Employee[]>({} as Employee[])


    return (

        <div className="App">
            <MyModal setEmployees={setEmployees} />
            <ListEmployee/>
        </div>
    );
}

export default App;
