import React from 'react';
import {Form, Input, Button, Row, Col, Radio, DatePicker, DatePickerProps, Select} from 'antd';

import {IMask, MaskedInput} from "antd-mask-input";
import moment from 'moment';
import {useMutation} from "react-query";
import { UserService} from "../../services/user.service";
import {Employee} from "../app/app";
import {useUsers} from "../../hooks/useUsers";
const MyForm: React.FC<{setEmployees: React.Dispatch<React.SetStateAction<any>>}> = ({setEmployees}) => {

    const {isLoading, mutate} = useMutation('create user' ,(data: Employee) => UserService.post(data),{
        onSuccess: () =>{
            console.log('success');
        },
        onError: () => {
            console.log('fail');
        }
    })
    const { Option } = Select;
    const [form] = Form.useForm();

    const DATE_FORMAT = 'MM.DD.YYYY'
    const MASK_DATE = IMask.createMask({
        blocks: {
            DD: {from: 1, mask: IMask.MaskedRange, to: 31},
            MM: {from: 1, mask: IMask.MaskedRange, to: 12},
            YYYY: {from: 1900, mask: IMask.MaskedRange, to: 9999},
        },
        format: (date: Date) => moment(date).format(DATE_FORMAT),
        mask: Date,
        parse: (date: string) => moment(date, DATE_FORMAT),
        pattern: DATE_FORMAT,
    });


    const onFinish = async (values: any) => {

        await mutate(values)

        // const {isLoading, data: response} = useUsers()

        // setEmployees(response)



    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
    };

    const onFill = () => {
        form.setFieldsValue({
            phone: '77772810707',
            email: 'example@gmail.com',
            second_name: 'Surname',
            name: 'Diqosh',
            birth_date: moment("2090-10-10"),
            start_work: moment("2090-10-10"),
            gender: 'male',
            department: 'front',
            position: 'TeamLead',
            role:'some role',
            country: 'Kazakhstan',
            city: 'Almaty',
            password: 'password',
            re_password: 'password'

        });
    };

    return (
        <Form
            name="basic"
            form={form}
            layout={'vertical'}

            initialValues={{remember: true}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Row justify={'space-between'}>
                <Col span={11}>
                    <Form.Item
                        label="?????????? ????????????????"
                        name="phone"
                        rules={[
                            (form) => ({
                                validator(_, value) {
                                    if (value.slice(-1) === '_') {
                                        return Promise.reject(new Error('type valid number'));
                                    }
                                    return Promise.resolve();

                                },
                            }),

                        ]}
                    >
                        <MaskedInput

                            mask={'+7(000)000-00-00'}

                        />

                    </Form.Item>
                </Col>
                <Col span={11}>
                    <Form.Item
                        label="????. ??????????"
                        name="email"
                        rules={[
                            {
                                type: "email",
                                message: "The input is not valid E-mail!",
                            },

                        ]}
                    >
                        <Input placeholder={'??????????'}/>
                    </Form.Item>
                </Col>


            </Row>
            <Row justify={'space-between'}>
                <Col span={11}>
                    <Form.Item
                        label="??????????????"
                        name="second_name"
                    >
                        <Input placeholder={'??????????????'}/>
                    </Form.Item>
                </Col>
                <Col span={11}>
                    <Form.Item
                        label="??????"
                        name="name"
                    >
                        <Input placeholder={'??????'}/>
                    </Form.Item>
                </Col>


            </Row>
            <Row justify={'space-between'}>
                <Col span={11}>
                    <Form.Item
                        label="???????? ????????????????"
                        name="birth_date"
                    >


                        <DatePicker style={{width: '100%'}}
                                    onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                                        const input = event.target as HTMLInputElement
                                        input.value = MASK_DATE.resolve(input.value)
                                        console.log(MASK_DATE.resolve(input.value))
                                    }} onChange={onChange}
                                    picker="date"
                                    placeholder={'XX.XX.XXXX'}/>
                    </Form.Item>
                </Col>
                <Col span={11}>
                    <Form.Item
                        label="???????? ???????????? ????????????"
                        name="start_work"
                    >
                        <DatePicker onChange={onChange} style={{width: '100%'}}/>
                    </Form.Item>
                </Col>


            </Row>

        <Form.Item label="??????" name="gender" className={'gender'}>
            <Radio.Group value={'horizontal'} style={{ width: "100%" }}>

                <Row justify={'space-between'}>
                    <Col span={11}><Radio.Button value="male" style={{ width: "100%" }}>??????????????</Radio.Button></Col>
                    <Col span={11}><Radio.Button value="female" style={{ width: "100%" }}>??????????????</Radio.Button></Col>
                </Row>







            </Radio.Group>
        </Form.Item>


            <Row justify={'space-between'}>
                <Col span={11}>
                    <Form.Item
                        label="??????????"
                        name="department"
                    >
                        <Input placeholder={'??????????'}/>
                    </Form.Item>
                </Col>
                <Col span={11}>
                    <Form.Item
                        label="??????????????????"
                        name="position"
                    >
                        <Input placeholder={'??????????????????'}/>
                    </Form.Item>
                </Col>


            </Row>
            <Row justify={'space-between'}>
                <Col span={24}>
                    <Form.Item
                        label="????????"
                        name="role"
                    >
                        <Select  >
                            <Option value="1">????????????</Option>
                            <Option value="2">????????</Option>
                            <Option value="3">????????</Option>
                            <Option value="4">????????????</Option>
                        </Select>
                    </Form.Item>
                </Col>


            </Row>
            <Row justify={'space-between'}>
                <Col span={11}>
                    <Form.Item
                        label="????????????"
                        name="country"
                    >
                        <Select>
                            <Option value="KZ">??????????????????</Option>
                            <Option value="RU">????????????</Option>
                            <Option value="USA">??????</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={11}>
                    <Form.Item
                        label="??????????"
                        name="city"
                    >
                        <Select >
                            <Option value="1">?????????? 1</Option>
                            <Option value="2">?????????? 2</Option>
                            <Option value="3">?????????? 3</Option>
                        </Select>
                    </Form.Item>
                </Col>


            </Row>
            <Row justify={'space-between'}>
                <Col span={24}>
                    <Form.Item
                        label="????????????"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password  placeholder={'????????????'}/>
                    </Form.Item>
                </Col>


            </Row>
            <Row justify={'space-between'}>

                <Col span={24}>
                    <Form.Item
                        label="?????????????????????? ????????????"
                        name="re_password"
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject('The two passwords that you entered do not match!');
                                },
                            }),
                        ]}

                    >
                        <Input.Password placeholder={"?????????????????????? ????????????"}/>
                    </Form.Item>
                </Col>


            </Row>


            <Form.Item wrapperCol={{offset: 8, span: 16}}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
                <Button type="link" htmlType="button" onClick={onFill}>
                    Fill form
                </Button>
            </Form.Item>
        </Form>
    );
};

export default MyForm;