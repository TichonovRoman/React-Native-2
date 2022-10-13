import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import 'react-native-gesture-handler';
import { Alert, TouchableWithoutFeedback, FlatList, View, Keyboard,
    ListRenderItem, StyleSheet, Text, TextInput, TouchableOpacity, Pressable, Animated } from 'react-native';
import { MemoIcon1 } from './icon/icon1';
import { MemoIcon2 } from './icon/icon2';
import { MemoIcon3 } from './icon/icon3';
import Swipeable from 'react-native-gesture-handler/Swipeable'
import {GestureHandlerRootView} from 'react-native-gesture-handler'



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

const Right = () =>{
  return <View><Text>Right</Text></View>
}

// const Right = () =>{
//   return <View style={{flexDirection: 'row', marginVertical: 5}}>
//     <Text style={{backgroundColor: 'red'}}>Delete</Text>
//     <Text style={{backgroundColor: 'green'}}>Select</Text>
//     <Text style={{backgroundColor: 'grey'}}>Pin</Text>
//     </View>
// }


const [inputValue, setInputValue] = useState<string>('')

const changeStatus = (id: number) => {
  const changedTasksStatusArray = tasks.map((task)=> task.id  === id ? {...task, isDone: !task.isDone} : task)
  setTasks(changedTasksStatusArray)
}

const render: ListRenderItem<TasksType> = ({item})=>{
  return <Swipeable renderLeftActions={(progressAnimatedValue, dragAnimatedValue)=>{
      const trans = dragAnimatedValue.interpolate({
          inputRange: [-80,0],
          outputRange: [1,0],
          extrapolate: 'clamp'
      });
      return <View style={{flexDirection: 'row', marginVertical: 5}}>
          <Animated.Text style={[{backgroundColor: 'red', width: 10}, {transform: [{ scale: trans }]}]}>Delete</Animated.Text>
          <Animated.Text style={[{backgroundColor: 'green', width: 10}, {transform: [{ scale: trans }]}]}>Select</Animated.Text>
          <Animated.Text style={[{backgroundColor: 'grey', width: 10}, {transform: [{ scale: trans }]}]}>Pin</Animated.Text>
      </View>
  }} renderRightActions={Right}>
    <TouchableWithoutFeedback onPress={()=>changeStatus(item.id)}>
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
    </Swipeable> 
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
 // flex: 1 означает что эта обертка занимает все пространство экрана
  return (
    
    <GestureHandlerRootView style={{flex: 1}}>
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
    </GestureHandlerRootView>
    
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
    backgroundColor: '#fff',
    borderBottomLeftRadius: 20, 
    borderTopRightRadius: 20, 
    alignItems: 'center', 
    marginVertical: 5
  }
});
