import { Alert, FlatList, Keyboard, Modal, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { useEffect, useState } from 'react';
import Button from '../components/Buttons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import UseTodoApi from '../helpers/api/todo';
import LottieView from 'lottie-react-native';
import Layout from '../components/Layouts';

export default function Todo() {
    // seharusnya disini router tapi anggep aja halaman karena baru ada satu 
    const [todos, setTodos] = useState([
        {
            action: 'Take a bath',
            key: 1,
        },
        {
            action: 'Wash dishes',
            key: 2,
        },
        {
            action: 'Study react native',
            key: 3,
        },
    ])

    const { GetTodoAll, StoreTodo, DeleteTodo, UpdateTodo } = UseTodoApi()

    const [action, setAction] = useState('')

    const [todo, setTodo] = useState({});
    const [openModal, setOpenModal] = useState('');

    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState('')

    const handleOpenDetail = (item) => {
        setOpenModal('detail')
        setTodo(item)
    }

    const handleOpenCreate = () => {
        setOpenModal('open')
    }

    const handleOpenEdit = (item) => {
        setOpenModal('edit')
        setTodo(item)
        setAction(item.action)
    }

    const handleOpenDelete = (item) => {
        setOpenModal('delete')
        setTodo(item)
    }

    // validation error handler 
    const todoValidator = (data) => {
        if (data.action == '' || data.action == null || data.action == 'undefined') {
            Alert.alert('Validation Error', 'Action must not be empty', [
                {
                    text: 'Dismiss',
                    onPress: () => console.log('dismiss error')
                }
            ])
            return false
        }
        return true
    }

    const handleCreate = async () => {
        const data = {
            action: action,
        }

        // validation error 
        if (!todoValidator(data)) {
            return
        }

        // store to async storage
        const res = await StoreTodo(setIsLoading, setIsError, data)
        handleFetchAllTodos()
        setOpenModal('')
        setAction('')
    }

    const handleDelete = async () => {
        const data = {
            key: todo.key
        }
        const res = await DeleteTodo(setIsLoading, setIsError, data)
        handleFetchAllTodos()
        setOpenModal('')
        setTodo({})
    }

    const handleUpdate = async () => {
        const data = {
            key: todo.key,
            action: action,
        }

        if (!todoValidator(data)) {
            return
        }

        const res = await UpdateTodo(setIsLoading, setIsError, data)
        handleFetchAllTodos()
        setOpenModal('')
        setAction('')
        setTodo({})
    }

    const handleFetchAllTodos = async () => {
        const res = await GetTodoAll(setIsLoading, setIsError)
        setTodos(res)
    }

    useEffect(() => {
        handleFetchAllTodos()
    }, [])

    // system error handler 
    useEffect(() => {
        if (isError) {
            Alert.alert('Error', isError.message, [
                {
                    text: 'Dismiss',
                    onPress: () => console.log('dismiss error')
                }
            ])
            setIsError('')
        }
    }, [isError])

    return (
        <Layout>
            {/* modals */}

            <Modal
                animationType='fade'
                visible={openModal === 'detail' ? true : false}
                onRequestClose={() => {
                    setOpenModal({})
                    setTodo({})
                }}
                transparent={true}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalOverlay} />
                    <View style={styles.modal}>
                        <Text style={{ fontSize: 25 }}>
                            Detail
                        </Text>
                        <Text>
                            {todo.action}
                        </Text>
                        <View>
                            <Button title="Close" action={() => {
                                setOpenModal({})
                                setTodo({})
                            }} color='red' />
                        </View>

                    </View>
                </View>
            </Modal>

            <Modal
                animationType='fade'
                visible={openModal === 'open' ? true : false}
                onRequestClose={() => {
                    setOpenModal({})
                    setAction('')
                }}
                transparent={true}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalOverlay} />
                    <View style={styles.modal}>
                        <Text style={{ fontSize: 25 }}>
                            Create
                        </Text>
                        <View>
                            <Text>
                                Action
                            </Text>
                            <TextInput value={action} onChangeText={(val) => setAction(val)} style={styles.textInput} />
                        </View>
                        <View>
                            <Button title='Submit' action={handleCreate} color='green' />
                            <Button title='Close' action={() => {
                                setOpenModal({})
                                setAction('')
                            }} color='red' />
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType='fade'
                visible={openModal === 'edit' ? true : false}
                onRequestClose={() => {
                    setOpenModal({})
                    setAction('')
                }}
                transparent={true}
            >
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalOverlay} />
                        <View style={styles.modal}>
                            <Text style={{ fontSize: 25 }}>
                                Edit
                            </Text>
                            <View>
                                <Text>
                                    Action
                                </Text>
                                {/* old value */}
                                <TextInput value={action} onChangeText={(val) => setAction(val)} style={styles.textInput} />
                            </View>
                            <View>
                                <Button title='Submit' action={handleUpdate} color='green' />
                                <Button title='Close' action={() => {
                                    setOpenModal({})
                                    setAction('')
                                }} color='red' />
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            <Modal
                animationType='fade'
                visible={openModal === 'delete' ? true : false}
                onRequestClose={() => {
                    setOpenModal({})
                    setAction('')
                }}
                transparent={true}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalOverlay} />
                    <View style={styles.modal}>
                        <Text style={{ fontSize: 25 }}>
                            Delete
                        </Text>
                        <View>
                            <Text>
                                *Are you sure you want to delete this item?
                            </Text>
                        </View>
                        <View>
                            <Button title='Yes' action={handleDelete} color='red' />
                            <Button title='No' action={() => {
                                setOpenModal({})
                                setAction('')
                            }} color='green' />
                        </View>
                    </View>
                </View>
            </Modal>

            <Button title='Create' action={handleOpenCreate} color='green' />

            <TextInput />

            {isLoading ?
                <LottieView
                    source={{ uri: "https://lottie.host/806c1a0d-9358-47ea-8fbe-fe4588dfb10e/Z6ePzFL45L.json" }}
                    style={{ width: "100%", height: 100 }}
                    autoPlay
                    loop
                /> :
                <FlatList
                    style={{ flex: 1 }}
                    data={todos}
                    renderItem={({ item }) => (
                        <View style={styles.list}>
                            <Text>
                                {item.action}
                            </Text>
                            <View style={{ flexDirection: 'row', gap: 10 }}>
                                <TouchableOpacity onPress={() => handleOpenDetail(item)}>
                                    <FontAwesome6 name='eye' color={'blue'} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleOpenEdit(item)}>
                                    <FontAwesome6 name='edit' color={'orange'} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleOpenDelete(item)}>
                                    <FontAwesome6 name='trash' color={'red'} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                    }
                >
                </FlatList >
            }
        </Layout >
    );
}

const styles = StyleSheet.create({
    list: {
        padding: 20,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: 'green',
        borderStyle: 'dashed',
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    // posisinya 
    modalContainer: {
        flex: 1, justifyContent: 'center', alignItems: 'center',
    },
    // backgroundnya
    modalOverlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    // modalnya 
    modal: {
        width: 300, backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2,
        borderRadius: 10,
        padding: 10,
        gap: 10,
    },
    textInput: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: 'green',
        borderRadius: 10,
    }
})