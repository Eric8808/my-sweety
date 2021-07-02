# My-sweety



![](https://i.imgur.com/35NTlgG.png)

My-sweety is your personal assistant.
She's a lovely girl who keeps you productive!

#### :clapper: Before getting started, watch a 6-mins demo video here!
> https://youtu.be/QRcVlVdssIo

#### :thumbsup: Try it on our deployed link!
> https://my-sweety.herokuapp.com/



## Table of Contents
- [My-sweety](#My-sweety)
  - [What is My-sweety?](#bulb-what-is-my-sweety)
  - [Why My-sweety ?](#date-why-my-sweety-)
  - [Packages/Tools for building My-sweety](#hammer-packagestools-for-building-my-sweety)
- [Getting Started](#Getting-Started)
  - [Installation](#Installation)
  - [Tutorial](#Tutorial)
    - [Login Page](#Login-Page)
    - [Main Page](#Main-Page)
    - [Almost the End](#Almost-the-End)
- [More about My-sweety](#More-about-My-sweety)
  - [3D Model Rendering](#3D-Model-Rendering)
  - [Scheduling Algorithm](#Scheduling-Algorithm)
  - [File Tree](#-File-Tree)
- [Contribution](#Contribution)


## :bulb: What is My-sweety?
It's a productivity app built for lazybones and those who suffer from procrastination. Users only need to tell Sweety two things:<br>
<b>
<br>:large_orange_diamond:1. What are your to-do events? (including deadline, priority, total needed time, etc.)
<br>:large_orange_diamond:2. What is your daily available time in a week?

</b>

With these information, our scheduling algorithm will arrange your segmented events to different days optimally.
In addition, we also provide progress and diligence analysis so that you can clearly see what you've done so far.

<br>

## :date: Why My-sweety ?

We've seen lots of productivity apps with calendar and todo-list functions. However, it's rare to find apps that can do auto-scheduling. Our goal is, by helping users schedule the events optimally in advance, <b>to force them to be aware of the total amounts of undone tasks, so that they won't misestimate the remaining time to work hard. </b> 
<br><br>
Also, with all stuffs and statistics displayed in clear chart and graph, users get to evaluate their own performances.
So we'll confidently say these are the advantages of our app:
<b>

:heavy_check_mark: Optimal Scheduling <br>
:heavy_check_mark: Schedule Visualization <br>
:heavy_check_mark: Workloads Clearly Showed <br>
:heavy_check_mark: Progress Evaluation and Supervision <br>
</b>

<br>

## :hammer: Packages/Tools for building My-sweety
In this app, we come up with functions and ideas by ourselves. We also develop our own scheduling algorithm. But for the css style, we benefit a lot from open source. For example, `nivo` provides a wonderful chart/graph, and `mixamo` gives us vigorous 3D model and animations. Last but not least, Material UI is also a big helper. Check out all the packages and tools we've used:
+ Frontend
  - ReactJS
  - React Router
  - Three
  - React Three Fiber
  - React Three Drei
  - React Draggable
  - React Icons
  - Material UI
  - Axios
  - Jwt Decode
  - [nivo](https://nivo.rocks/)
  - [mixamo](https://www.mixamo.com/) (with [blender](https://www.blender.org/) & [gltfjsx](https://github.com/pmndrs/gltfjsx))
+ Backend
  - Express
  - nodemon
  - cors
  - jwt
  - mongoose
  - bcrypt
  - babel
  - mongoDB



# Getting Started
## Installation
1. **Clone the repository**
    ```shell=
    git clone https://github.com/KaiwenJon/my-sweety.git
    ```
2. **Install the dependencies for the project**
    > go to the project directory (/my-sweety)
    ```shell=
    cd frontend
    yarn install
    ```
    ```shell=
    cd ../backend
    yarn install
    ```

3. **Start the project**
    > go to the project directory (/my-sweety)
    * open one terminal
    ```shell=
    yarn server
    ```
    :bulb:`note: We have prepared .env file for you, so you can directly run the server to connect to our mongoDB.`
    * open another terminal
    ```shell=
    yarn start
    ```

## Tutorial
If you haven't watched our demo video, go watch it and you'll know how easy to use our app:
>https://youtu.be/QRcVlVdssIo 
<br>

Alternatively, the following tutorial can help you navigate through our app:
<br>
Let's get started!

After running `yarn server` and `yarn start` in the project directory, if everything works fine, you'll see a home page like this. Then, simply click the phone button in the top center to continue.
![](https://i.imgur.com/YfLiNRK.png)

### Login Page
![](https://i.imgur.com/xgTacG1.png)
* Sign in/up your own account 
<br>(check out the author of the css style: https://www.florin-pop.com/)
<br>:bulb:`note: When signing up, since we are letting everyone to use our mongoDB right now, the username you typed may have been used. In such situation, please use another username to sign up.`
### Main Page
#### :calendar: Schedule Mode
![](https://i.imgur.com/Ahr9W6D.png)
#### 1. Adjust your daily available time.
Change the number under the calender.
#### 2. Add the tasks.
Press the `"Add"` button on the top to add a task in the TODO list. And you need to give some information about the task.
* Task name  
* Priority : `the order we schedule the task for you`
* Total time : `the time you need to complete the task`
* Separate : `the number of segments you want to break the task into` 
* Deadline  

:bulb:<b>note: please make sure </b>`Separate` <b>divides</b> `Total time`.

(You can add multiple tasks in the TODO list.)
#### 3. Schedule
Press the `"Schedule"` button. And we will schedule all the tasks in the TODO list. Your tasks will be moved to the "Scheduled List".

---

#### Following the steps 1~3 above, your schedule will be filled. Next, you can adjust the schedule.
![](https://i.imgur.com/Ia2kZt6.png)
* You can switch to another week using the arrows next to the dates.
* If you have completed any task, you can click it in the schedule and click ``"COMPLETED"`` in the pop up dialog. This will turn the task color into green.
* You can also remove the task by clicking it and click ``"REMOVE"``. 

<img src="https://i.imgur.com/TIS6JAt.png" width=70%>

* Click the tasks in the TODO/Scheduled list to show the information about it.
* The little boxes in the scheduled list show the rate of completion.  
(The green ones mean `completed`, and the red ones mean `uncompleted`)  
#### :zap: Additional feature:  If you didn't complete all tasks today, the undone tasks will be moved to the TODO list when you login tomorrow. At that time, feel free to schedule them again.  

---

#### :chart_with_upwards_trend: Evaluation mode
After adding several tasks and completing several segments in the schedule. Let's see how diligent you are this week and how far you've moved forward!

By clicking the mode-switching button in the bottom left, we can enter `Evaluation Mode`.
![](https://i.imgur.com/jIUnJ2l.png)

Then you'll see a dashboard composed of several charts in the page, like this:
![](https://i.imgur.com/SQ4gsJW.png)
In this page, feel free to browse and check your personal statistics. More specifically, you'll find 3 main components here:

:large_blue_diamond: Scheduled list composition (top left)<br>
:large_blue_diamond: Total completed rate (top right)<br>
:large_blue_diamond: Plot of `Available Time` and `Completed segments` for the past 7 days (bottom)<br>

Looking at these evaluation results, users get to realize how diligent they've been so far. Conversely, if the completion rate is low and only small amounts of segments had been completed, it's a good opportunity for users to reflect on themselves.


### Almost the End
So far we've gone through the main functions of our app. Other functions such as signing out, deleting account, error handling, and login authentication are, in my opinion, pretty trivial, so we'll not elaborate too much about them! By the way, the triggered animations of Sweety are all different when clicking different things. Feel free to try these additional functions!

# More about My-sweety
## 3D Model Rendering
In fact, our initial app was just a scheduling app. Then, we thought that it'll be more interesting and vigorous for the app to have a virtual assistant, just like Sweety! Thanks to [mixamo](https://www.mixamo.com/), we got a cool character and animations. However, we still need to do some preprocessing and write some code to embedded a 3D model into our app. Following the [tutorial](https://codeworkshop.dev/blog/2021-01-20-react-three-fiber-character-animation/?fbclid=IwAR1nMbHYSuauk2POh57G2vpFaDFsMfA8nVgyRZEMF-oczUHxl1_IJQ8IhKQ ) here: 

1. We first use a open-source 3D computer graphics software [blender](https://www.blender.org/) to stash animations to our character. Then we export it as a gltf file.
![](https://i.imgur.com/ilpJ4GU.png)

2. Then use a package called [gltfjsx](https://github.com/pmndrs/gltfjsx) to generate jsx related file based on the given gltf file. The result will be something like this: 
```javascript=+
import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export default function Model(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/girl.gltf')
  const { actions } = useAnimations(animations, group)
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[Math.PI / 2, 0, 0]} scale={[0.01, 0.01, 0.01]}>
        <primitive object={nodes.Hips} />
        <skinnedMesh
          geometry={nodes.Girl_Body_Geo.geometry}
          material={materials.Girl01_Body_MAT1}
          skeleton={nodes.Girl_Body_Geo.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Girl_Brows_Geo.geometry}
          material={materials.Girl01_Brows_MAT1}
          skeleton={nodes.Girl_Brows_Geo.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Girl_Eyes_Geo.geometry}
          material={materials.Girl01_Eyes_MAT1}
          skeleton={nodes.Girl_Eyes_Geo.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Girl_Mouth_Geo.geometry}
          material={materials.Girl01_Mouth_MAT1}
          skeleton={nodes.Girl_Mouth_Geo.skeleton}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/girl.gltf')
```

3. Next, use `react-three-fiber` to add a Canvas, Camera,and Light component to contain the given 3D model. Finally, with `useEffect` and `useRef`, we get to switch different animations among the model.


## Scheduling Algorithm
This is an algorithm which can turn all the added tasks into a well-arranged schedule. 
> **Input**:
> 
>   1. Tasks to be scheduled
>   
>   2. The time periods that is currently occupied by previously scheduled tasks.
>
>   3. The user's weekly available time

> **Output**: 
> 
> 1. A new schedule

Each input task has the following properties: _Name, Priority, Needtime, Separate, Deadline_.

When the backend server gets a calculation request, it calls our scheduling algorithm. The way we take `priority` into account is that we sort the tasks by their priorities in advance, which will make the subsequent permutation always arrange the high-priority task to an earlier date. Then, we basically use brute force to permute all possible events order. For each way of permutation, distribute them into different days. So far we just get a possible schedule. However, for each possible schedule, we set some rules to determine if it's legitimate. The rules are as follows: 

**Rules**
> * not legitimate if any event exceeds the deadline.
> * not legitimate if any event is repeated in one day.
> * not legitimate if the total working hours exceed the available time on that day.

Once a possible schedule is determined as legitimate, we will push it into an array. However, as the number of events goes even higher, the algorithm could spend too much time and memory. Therefore, we set a threshold of the length of that array. Once over the threshold, we stop calculating any possible schedule.

Right now we only have few information from users to do optimization. In the future, we hope to include more personal traits to do calculation, such as personality or week preference. Therefore, to evaluate a schedule, we temporily set a performance indicator like this:

**the pseudo code which calculates the performance indicator**
```javascript=+
let performance = 0
for day in schedule
    for event in day
        performance += day.date - event.dealine
    end
end
```
In this code, the `performance` measures how early the event is done. To make sure the tasks are arranged earlier so as to prevent procrastination, `performance` should be as large as possible. Luckily, in the permutation stage, we arrange events into schedule from present to future. So it's highly possible that the generated schedule already has a pretty good `performance`. As mentioned earlier, the schedules in the limited array, say 100 schedules, are relatively good.  We finally choose a schedule that has the highest `performance` among the 100 relatively good schedules to be the winner, that is, the output schedule of this algorithm. 


## :evergreen_tree: File Tree

:books:my-sweety                           
├─ :open_file_folder:backend                          
│  ├─ :open_file_folder:src                           
│  │  ├─ :open_file_folder:models                     
│  │  │  └─ :green_book:User.js                 
│  │  ├─ :open_file_folder:routes                     
│  │  │  ├─ :open_file_folder:api                     
│  │  │  │  ├─ :green_book:account.js           
│  │  │  │  ├─ :green_book:data.js              
│  │  │  │  ├─ :orange_book:index.js        
│  │  │  └─ :orange_book:index.js                
│  │  ├─ :green_book:main.js                    
│  │  ├─ :green_book:mongo.js                   
│  │  └─ :green_book:schedule.js                
│  └─ :ledger:package.json            
├─ :open_file_folder:frontend                                     
│  ├─ :open_file_folder:src                           
│  │  ├─ :open_file_folder:Components                 
│  │  │  ├─ :green_book:AddDialog.js            
│  │  │  ├─ :green_book:CalenderDates.js        
│  │  │  ├─ :green_book:CalenderDrawer.js       
│  │  │  ├─ :green_book:CalenderPopUpWindow.js  
│  │  │  ├─ :green_book:model3D.js              
│  │  │  ├─ :green_book:ModePanel.js            
│  │  │  ├─ :green_book:SignOutPanel.js         
│  │  │  ├─ :green_book:SignOutPopUpWindow.js   
│  │  │  ├─ :green_book:sweety.js               
│  │  │  └─ :green_book:TaskDialog.js           
│  │  ├─ :open_file_folder:containers                 
│  │  │  ├─ :open_file_folder:LoginPage               
│  │  │  │  ├─ :art:login.css            
│  │  │  │  ├─ :blue_book:LoginCard.js         
│  │  │  │  ├─ :blue_book:LoginPage.js         
│  │  │  │  └─ :blue_book:SweetyLoginPage.js   
│  │  │  ├─ :open_file_folder:mainPage                
│  │  │  │  ├─ :open_file_folder:EvalutationMode      
│  │  │  │  │  ├─ :green_book:EvalChart.js      
│  │  │  │  │  ├─ :green_book:EvalPie.js        
│  │  │  │  │  └─ :green_book:Evaluation.js     
│  │  │  │  ├─ :blue_book:Calender.js          
│  │  │  │  ├─ :blue_book:Calender_old.js      
│  │  │  │  ├─ :blue_book:Header.js            
│  │  │  │  ├─ :blue_book:Panel.js             
│  │  │  │  ├─ :blue_book:ScheduledList.js     
│  │  │  │  └─ :blue_book:TodoList.js          
│  │  │  ├─ :globe_with_meridians:api.js                  
│  │  │  ├─ :orange_book:App.js                  
│  │  │  └─ :orange_book:Authenticate.js         
│  │  ├─ :open_file_folder:hooks                      
│  │  │  ├─ :closed_book:useCalender.js          
│  │  │  ├─ :closed_book:useDisplayStatus.js     
│  │  │  └─ :closed_book:useTodoList.js          
│  │  ├─ :art:App.css               
│  │  ├─ :art:index.css                  
│  │  ├─ :orange_book:index.js           
│  └─ :ledger:package.json                 
└─ :ledger:package.json     


## Contribution
Oftentimes, we debug together, so for the following division of labor, we'll just list the "main parts" that each of us are responsible for.

* B06502028 莊立楷
    > - 前後端資料傳送 & DB
    > - 登入&登出系統
    > - 前端 display message
    > - 前端 home page, login page UI
    > - 前端 evaluation mode UI
    > - 前端 schedule mode 各種UI: todolist, scheduled list, popupWindow, mode switching 
    > - 3D model, animations製作與render
    > - README
    > - Demo影片
    > - FB貼文
* B06502155 陳冠綸
    > * 設計前端 UI 與各個component的互動
    > * TODO list 和 scheduled list 的增減
    > * 控制 schedule的available time 
    > * 將後端傳回的schedule 資料經過處理後 render到前端
    > * schedule上的事件標示為完成或是移除
    > * schedule 日期切換
    > * 處理前端會遇到的error情況
    > * 將網站 deploy 到 heroku
    > * README
* B07502003 馮其安
    > * schedule 排程設計
    > * schedule 傳送與接收
    > * 將schedule事件回歸todolist
    > * 刪除空events與更新畫面
    > * 3D model 加入頁面
    > * 將排程合併並更新
    > * 各種exception處理
    > * installation 測試
    > * README
    
