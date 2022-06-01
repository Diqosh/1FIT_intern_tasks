
import "antd/dist/antd.css"
import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import MyForm from "../form/form";
import SecondForm from "../secondForm/secondForm";

const MyModalFrist: React.FC = () => {
    const [visible, setVisible] = useState(false);

    return (
        <>
            <Button type="primary" onClick={() => setVisible(true)}>
                Open First form
            </Button>
            <Modal
                title="Register"
                centered
                visible={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                width={1000}
            >
                <MyForm/>
            </Modal>
            {/*<SecondForm/>*/}
        </>
    );
};

export default MyModalFrist;