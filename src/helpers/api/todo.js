import AsyncStorage from '@react-native-async-storage/async-storage';
import generateRandomId from '../../utils/generateRandomId';

export default function UseTodoApi() {
    const GetTodoAll = async (setIsLoading, setIsError) => {
        setIsLoading(true)

        // get all keys 
        const keys = await AsyncStorage.getAllKeys()
            .then(res => {
                return res
            }).catch(err => {
                setIsError(err)
            })

        // get all items 
        const items = []
        await Promise.all(keys.map(async key => {
            const item = await AsyncStorage.getItem(key)
                .then(res => {
                    return res
                }).catch(err => {
                    setIsError(err)
                })
            items.push(JSON.parse(item))
        }))

        console.log("[api][todo][GetTodoAll]", items)
        setIsLoading(false)
        return items
    }

    const StoreTodo = async (setIsLoading, setIsError, data) => {
        setIsLoading(true)

        // generate random key  
        const key = generateRandomId(5)

        // store item 
        const json = JSON.stringify({ key: key, ...data })
        await AsyncStorage.setItem(key, json)
            .then(res => {
                return res
            }).catch(err => {
                setIsError(err)
            })

        const item = await AsyncStorage.getItem(key)
            .then(res => {
                return res
            }).catch(err => {
                setIsError(err)
            })

        console.log("[api][todo][StoreTodo]", item);
        setIsLoading(false)
    }

    const UpdateTodo = async (setIsLoading, setIsError, data) => {
        setIsLoading(true)

        console.log("[api][todo][UpdateTodo]", data);

        const json = JSON.stringify(data)
        await AsyncStorage.setItem(data.key, json)
            .then(res => {
                return res
            }).catch(err => {
                setIsError(err)
            })

        const item = await AsyncStorage.getItem(data.key)
            .then(res => {
                return res
            }).catch(err => {
                setIsError(err)
            })

        console.log("[api][todo][UpdateTodo]", item);
        setIsLoading(false)
    }



    const DeleteTodo = async (setIsLoading, setIsError, data) => {
        setIsLoading(true)

        console.log("[api][todo][DeleteTodo]", data.key);

        await AsyncStorage.removeItem(data.key)
            .then(res => {
                return res
            }).catch(err => {
                setIsError(err)
            })

        setIsLoading(false)
    }

    return {
        GetTodoAll,
        StoreTodo,
        DeleteTodo,
        UpdateTodo,
    }
}
