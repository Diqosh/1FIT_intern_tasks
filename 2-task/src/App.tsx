import * as React from "react"
import {
    ChakraProvider,
    Spacer,
    Progress,
    FormLabel,
    Container, Center,
    Flex,
    Button,
    Input,
    FormHelperText,
    theme,
    VStack,
    FormControl
} from "@chakra-ui/react"
import {SubmitHandler, useForm} from "react-hook-form";
import {CheckIcon, ViewIcon} from '@chakra-ui/icons'
import {useRef, useState} from "react";


type FormValues = {
    password: string;
    repassword: string;
};


function App() {
    const {register, handleSubmit, watch, formState: {errors}} = useForm<FormValues>();


    const [minLength, setminLength] = useState(false);
    const [bigAndSmall, setBigAndSmall] = useState(false);
    const [numeric, setNumeric] = useState(false);
    const [special, setSpecial] = useState(false);

    const onSubmit: SubmitHandler<FormValues> = (data) => {

        if (data.password === data.repassword) {
            console.log(data);
        } else {
            console.log("There is an error");
        }
    };
    const password = useRef({});
    password.current = watch("password", "");

    const changeTypeButtonById = (id: string) =>{
        let input = (document.getElementById(id) as HTMLInputElement);
        input.type = input.type == 'password' ? 'text' : 'password'
    }

    const check = (password: string) => {


        const moreEight = new RegExp(".{8,}")
        const digit = new RegExp("(?=.*?[0-9])")
        const spec = new RegExp("(?=.*?[#?!@$%^&_*-])")
        const lowerUpper = new RegExp("(?=.*?[A-Z])(?=.*?[a-z])")
        setminLength(moreEight.test(password))
        setNumeric(digit.test(password))
        setSpecial(spec.test(password))
        setBigAndSmall(lowerUpper.test(password))
        return minLength && bigAndSmall && numeric && special



        // setminLength(password.length >= 8)
        //
        //
        // //capital and small
        // if (password.match(new RegExp("[a-z]")) && password.match(new RegExp("[A-Z]"))) {
        //     setBigAndSmall(true)
        // } else {
        //     setBigAndSmall(false)
        // }
        //
        // //is numeric
        // if (password.match(new RegExp("[0-9]"))) {
        //     setNumeric(true)
        // } else {
        //     setNumeric(false)
        // }
        //
        //
        // if (password.match(new RegExp(/[!@#$%^&*()_+]/))) {
        //     setSpecial(true)
        // } else {
        //     setSpecial(false)
        // }




    }


    let progresNum = [special, numeric, bigAndSmall, minLength].sort().reverse()
    const progress = progresNum.map((item, i) => {
        let color = item ? 'green' : 'gray.500'
        return (
            <Progress w={'full'} m={1} value={100} size='xs' colorScheme={color} key={i}/>
        )
    })


    return (
        <ChakraProvider theme={theme}>
            <Center bgColor={'gray.200'} w={'100%'} h={'100vh'} maxWidth={'full'} maxH={'100vh'}>
                <Container maxWidth={"container.sm"} bgColor={"white"} p={10} borderRadius={10}>
                    <form action="" onSubmit={handleSubmit(onSubmit)}>
                        <FormControl>
                            <VStack fontSize='4xl' spacing={0} mb={4}>
                                <Center>Установка </Center>
                                <Center>новой пороли</Center>
                            </VStack>
                            <VStack>
                                <FormLabel w='full' mr={0}>Подтвердите пароль</FormLabel>
                                <Flex w={'100%'} border='1px' borderColor='gray.200' borderRadius={10}>
                                    <Input border='none'  _focus={{ boxShadow: "none !important" }} bgColor={'rgba(0,0,0,0)'}
                                           textAlign={'left'}
                                    id='password' type='password'
                                    placeholder="Новый пароль..."
                                    {...register('password', {
                                        required: "password is required",
                                        validate:  (value: any): boolean =>  check(value)
                                    })}
                                    onChange={(e) => {
                                        check(e.target.value)
                                    }}
                                />
                                    <Button bgColor={'rgba(0,0,0,0)'} _focus={{ boxShadow: "none !important" }}
                                            onClick={() => {
                                                changeTypeButtonById('password')
                                            }}><ViewIcon/></Button>

                                </Flex>


                                <Flex w={'full'}>
                                    {progress}
                                </Flex>


                                <Flex w='full'><FormHelperText>Минимум 8 символов</FormHelperText>
                                    <Spacer/>{minLength && <CheckIcon/>}</Flex>
                                <Flex w='full'><FormHelperText>Прописные и строчне
                                    буквы</FormHelperText><Spacer/>{bigAndSmall && <CheckIcon/>}</Flex>
                                <Flex w='full'><FormHelperText>Цифры</FormHelperText><Spacer/>{numeric && <CheckIcon/>}
                                </Flex>
                                <Flex w='full'><FormHelperText>Специальные символы</FormHelperText><Spacer/>{special &&
                                    <CheckIcon/>}</Flex>
                                <FormLabel w='full' mt={3}>Подтвердите пароль</FormLabel>

                                <Flex w={'100%'} border='1px' borderColor='gray.200' borderRadius={10}>
                                    <Input   border='none'  _focus={{ boxShadow: "none !important" }} bgColor={'rgba(0,0,0,0)'}
                                        id='repassword' type='password'
                                             textAlign={'left'}
                                        {...register('repassword', {
                                            required: "password did not match",
                                            validate: (value: string): boolean => {
                                                // if (value == '') {
                                                //     return false || 'enter something' as unknown as boolean
                                                // }
                                                return value === password.current || 'password did not match' as unknown as boolean
                                            }

                                        })}
                                    />
                                    <Button bgColor={'rgba(0,0,0,0)'} _focus={{ boxShadow: "none !important" }}
                                            onClick={() => {
                                                changeTypeButtonById('repassword')
                                            }}><ViewIcon/></Button>
                                </Flex>
                                {errors.repassword && <p>{errors.repassword.message}</p>}

                                <Button colorScheme='blue' type="submit" w={'full'} >Изменить пароль</Button>
                            </VStack>


                        </FormControl>


                    </form>
                </Container>

            </Center>


        </ChakraProvider>

    );
}

export default App