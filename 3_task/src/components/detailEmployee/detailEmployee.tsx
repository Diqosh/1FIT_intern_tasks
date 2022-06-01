import React from "react";
import {Employee} from "../app/app";





const DetailEmployee: React.FC<{employee: Employee}> = ({employee}) => {
    return (
        <div>
            {employee.name}
        </div>
    )
}

export default DetailEmployee