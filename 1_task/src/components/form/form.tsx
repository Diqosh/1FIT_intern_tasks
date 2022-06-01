import "antd/dist/antd.css"
import 'antd-country-phone-input/dist/index.css';


import React, {useState} from 'react';


import {
    Form,
    Input,
    Button,

    TreeSelect,
    Select, FormInstance
} from 'antd';
import {MaskedInput} from "antd-mask-input";


const {Option} = Select;

const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};
const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
};


class MyForm extends React.Component {
    formRef = React.createRef<FormInstance>();
    onGenderChange = (value: string) => {
        switch (value) {
            case 'male':
                this.formRef.current!.setFieldsValue({note: 'Hi, man!'});
                return;
            case 'female':
                this.formRef.current!.setFieldsValue({note: 'Hi, lady!'});
                return;
            case 'other':
                this.formRef.current!.setFieldsValue({note: 'Hi there!'});
        }
    };

    onFinish = (values: any) => {
        console.log(values);
    };

    onReset = () => {
        this.formRef.current!.resetFields();
    };

    onFill = () => {
        this.formRef.current!.setFieldsValue({
            username: 'Diqosh123',
            email: 'example@gmail.com',
            password: '123412341234',
            // phone: '777342323',
            country: 'KZ',
            gender: 'male',
        });
    };


    render() {

        return (
            <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
                <Form.Item name="username" label="username" rules={[{required: true}, {min: 8, message: 'too short'}]}>
                    <Input/>
                </Form.Item>
                <Form.Item name="email" label="email"
                           rules={[{required: true}, {type: 'email', message: 'type correct email'}]}>
                    <Input/>
                </Form.Item>
                <Form.Item name="password" label="password"
                           rules={[{required: true}, {min: 8, message: 'min length 8'}]}>
                    <Input/>
                </Form.Item>
                <Form.Item name="country" label="country" rules={[{required: true}]}>
                    <TreeSelect
                        treeData={[
                            {
                                title: 'Kazakhstan',
                                value: 'KZ',
                                children: [{title: 'Almaty', value: 'Al'}, {
                                    title: 'Astana',
                                    value: 'As'
                                }, {title: 'Taldyk', value: 'td'}]
                            },
                            {
                                title: 'United States',
                                value: 'USA',
                                children: [{title: 'New York', value: 'New York'}, {
                                    title: 'Chicago',
                                    value: 'Chicago'
                                }, {title: 'Nashvile', value: 'Nashvile'}]
                            },
                        ]}
                    />
                </Form.Item>
                <Form.Item name="phone" label="phone"
                           rules={[
                    {required: true},
                    (form) => ({
                                   validator(_, value) {
                                       if (value.slice(-1) == '_') {
                                           return Promise.reject(new Error('type more'));
                                       }
                                       return Promise.resolve();

                                   },
                               }),

                           ]}
                //            rules={[
                //                ({ getFieldValue }) => ({
                //                    validator() {
                //                        if(getFieldValue('Number') !=undefined && getFieldValue("Number")[17]!="_" ){
                //                            console.log(getFieldValue("Number")[17])
                //                            return Promise.resolve();
                //                        }
                //                        if (getFieldValue('Number') != "+7 (___) ___--" && getFieldValue('Number') !=undefined) {
                //                            console.log(getFieldValue("Number"))
                //                            return Promise.reject(new Error('Please type your Number correct!'));
                //                        }
                //                        return Promise.reject(new Error('Please type your Number!'));
                //
                //                    },
                //                }),
                //
                //            ]}
                >

                    <MaskedInput

                        mask={'+7(000)000-00-00'}
                        // maskOptions={{
                        //     dispatch: function (appended, dynamicMasked) {
                        //         const isCellPhone = dynamicMasked.unmaskedValue[2] === '9';
                        //         return dynamicMasked.compiledMasks[isCellPhone ? 0 : 1];
                        //     },
                        // }}
                    />
                </Form.Item>


                <Form.Item name="gender" label="Gender" rules={[{required: true}]}>
                    <Select
                        placeholder="Select a option and change input text above"
                        onChange={this.onGenderChange}
                        allowClear
                    >
                        <Option value="male">male</Option>
                        <Option value="female">female</Option>
                        <Option value="other">other</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
                >
                    {({getFieldValue}) =>
                        getFieldValue('gender') === 'other' ? (
                            <Form.Item
                                name="customizeGender"
                                label="Customize Gender"
                                rules={[{required: true}]}
                            >
                                <Input/>
                            </Form.Item>
                        ) : null
                    }
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    <Button htmlType="button" onClick={this.onReset}>
                        Reset
                    </Button>
                    <Button type="link" htmlType="button" onClick={this.onFill}>
                        Fill form
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

export default MyForm