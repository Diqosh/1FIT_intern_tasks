import React, { useState } from 'react';
import { Modal, Button } from 'antd';

import MyForm from "../form/form";
const MyModal: React.FC<{setEmployees: React.Dispatch<React.SetStateAction<any>>}> = ({setEmployees}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Добавление сотрудника
            </Button>
            <Modal title="Добавление сотрудника"
                   visible={isModalVisible}
                   onOk={handleOk}
                   onCancel={handleCancel}
                   width={'600px'}>
                <span>Введите данные для добавления</span>
                <MyForm setEmployees={setEmployees}/>
            </Modal>
        </>
    );
};

export default MyModal;