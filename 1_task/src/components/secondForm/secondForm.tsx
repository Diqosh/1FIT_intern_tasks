import React from "react";
import InputMask from "react-input-mask";
// import InputMask from "react-text-mask";
import {useForm, Controller} from "react-hook-form";

import './secondForm.css'

export default function SecondForm() {
    const [user, setUser] = React.useState({});
    const {register, handleSubmit, control} = useForm();


    function onSubmit(data: any) {
        console.log(data);
    }

    return (
        <div className="App">
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    name="name"
                    placeholder="User full name"

                />
                <input
                    type="email"
                    name="email"
                    placeholder="User email"

                />
                <InputMask mask="7(999)999-99-99"
                           {...register('phone', {
                               required: "password is required",
                               validate: (value: any): boolean => {
                                   console.log(value)
                                   return true
                               }
                           })}/>
                <button type="submit">SEND</button>
            </form>
        </div>
    );
}
