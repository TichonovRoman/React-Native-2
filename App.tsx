import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, TouchableWithoutFeedback, FlatList, View, Keyboard, ListRenderItem, StyleSheet, Text, TextInput, TouchableOpacity, Pressable } from 'react-native';
import { MemoIcon1 } from './icon/icon1';
import { MemoIcon2 } from './icon/icon2';
import { MemoIcon3 } from './icon/icon3';




export default function App() {

  type TasksType = {
    id: number,
    title: string,
    isDone: boolean
  }

const [tasks, setTasks] = useState<TasksType[]>([
  {id: 1, title: 'HTML', isDone: true},
  {id: 2, title: 'CSS', isDone: true},
  {id: 3, title: 'JS', isDone: true},
  {id: 4, title: 'React', isDone: true},
  {id: 5, title: 'React Native', isDone: false},
])

const [inputValue, setInputValue] = useState<string>('')

const changeStatus = (id: number) => {
  const changedTasksStatusArray = tasks.map((task)=> task.id  === id ? {...task, isDone: !task.isDone} : task)
  setTasks(changedTasksStatusArray)

}

const render: ListRenderItem<TasksType> = ({item})=>{
  return <TouchableWithoutFeedback onPress={()=>changeStatus(item.id)}>
<View
    style={[styles.task, {
    borderWidth: 2,
    opacity: item.isDone ? 0.4 : 1,
    borderColor: item.isDone ? 'green' : 'red'
   
    }]}>
      <Text style={{fontSize: 24, fontWeight: '500', paddingVertical: 10}}>
        {item.title}
      </Text>
       </View>
  </TouchableWithoutFeedback> 
 }
 const addTask = ()=>{
  if (inputValue.length>0) {
    const newTasks: TasksType[] = [{id: tasks.length + 1, title: inputValue, isDone: false}, ...tasks]
    setTasks(newTasks)
    setInputValue('')
    //закрываем клавиатуру
    Keyboard.dismiss()
    
  } else Alert.alert('введите название задачи')
 
 }

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <TextInput style={styles.input} value={inputValue} onChangeText={setInputValue}/>
        <TouchableOpacity onPress={addTask}>
          <Text>
            Add
          </Text>
        </TouchableOpacity>
      </View>
     
      <FlatList<TasksType>
        style={{marginTop: 10}}
        data={tasks}
        keyExtractor={(item)=>item.id.toString()}
        renderItem={render}
     
     />
     <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      {/* //для того чтобы нажимать на svg нужно ее оборавичать в Pressable */}
      {/* а если элементмаленькьй и неудобно на него нажимать то развигаем  границы с помощью hitSlop */}
      <Pressable hitSlop={10} onPress={()=> Alert.alert('kkk')}>
        <MemoIcon1/>
      </Pressable> 
      <MemoIcon2/>
      <MemoIcon3/>
     </View>
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  input: {
    height: 28,
    width: 200,
    borderWidth: 1
  },
  task: {
    borderWidth: 1, 
    borderBottomLeftRadius: 20, 
    borderTopRightRadius: 20, 
    alignItems: 'center', 
    marginVertical: 5

  }
});
