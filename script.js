function openFeatures(){
    var allElems =document.querySelectorAll('.elem');
    var fullElemPage =document.querySelectorAll('.fullElem');
    var fullElemPageBackBtn = document.querySelectorAll('.fullElem .back');


    allElems.forEach(function(elem){
        elem.addEventListener('click',function(){
        fullElemPage[elem.id].style.display ='block'
        })
    })

    fullElemPageBackBtn.forEach(function(back){
        back.addEventListener('click',function(){ 
            fullElemPage[back.id].style.display ='none'
        })
    })
}

openFeatures();

function todoList(){

    var currentTask = []

    if(localStorage.getItem('currentTask')){
        currentTask = JSON.parse(localStorage.getItem('currentTask'))
    }
    else{
        console.log('Task list is Empty');
    }

    function renderTask(){

        let allTask= document.querySelector('.allTask')

        let sum =''
        
        currentTask.forEach(function(elem,idx){
            sum = sum+`<div class="task">
            <h5>${elem.task}<span class=${elem.imp}>imp</span></h5>
            <button id=${idx}>Mark as Completed</button>
        </div>`
        })

        allTask.innerHTML = sum

        localStorage.setItem('currentTask', JSON.stringify(currentTask))

        document.querySelectorAll('.task button').forEach(function(btn){
            btn.addEventListener('click',function(){
                currentTask.splice(btn.id,1)
                renderTask()
            
            })
        })
    }

    renderTask();

    let form =document.querySelector('.addTask form')
    let taskInput = document.querySelector('.addTask form #task-input')
    let taskDetailsInput = document.querySelector('.addTask form textarea')
    let taskCheckbox = document.querySelector('.addTask form #check')

    form.addEventListener('submit', function(e){
        e.preventDefault()

        currentTask.push(
            {
                task:taskInput.value,
                details:taskDetailsInput.value,
                imp:taskCheckbox.checked
            }
        )
        renderTask();

        taskCheckbox.checked = false
        taskInput.value = ''
        taskDetailsInput.value = ''
        

    })
}
todoList();

function dailyPlanner() {
    var dayPlanner = document.querySelector('.day-planner')

    var dayPlanData = JSON.parse(localStorage.getItem('dayPlanData')) || {}

    var hours = Array.from({ length: 18 }, (_, idx) => `${6 + idx}:00 - ${7 + idx}:00`)


    var wholeDaySum = ''
    hours.forEach(function (elem, idx) {

        var savedData = dayPlanData[idx] || ''

        wholeDaySum = wholeDaySum + `<div class="day-planner-time">
    <p>${elem}</p>
    <input id=${idx} type="text" placeholder="..." value=${JSON.stringify(savedData)}>
</div>`
    })

    dayPlanner.innerHTML = wholeDaySum


    var dayPlannerInput = document.querySelectorAll('.day-planner input')

    dayPlannerInput.forEach(function (elem) {
        elem.addEventListener('input', function () {
            
            dayPlanData[elem.id] = elem.value

            localStorage.setItem('dayPlanData', JSON.stringify(dayPlanData))
        })
    })
}

dailyPlanner()

function motivationalQuote() {
    var motivationQuote =document.querySelector('.motivation-2 h2')
    var motivationAuthor =document.querySelector('.motivation-3 h3')

    async function fetchQuote(){
        let response = await fetch('https://quotes-api-self.vercel.app/quote')
        let data = await response.json()

        motivationQuote.innerHTML = data.quote
        motivationAuthor.innerHTML ='- '+data.author

    }

    fetchQuote()
}

motivationalQuote()



function pomodoroTimer() {


    let timer = document.querySelector('.pomo-timer h1')
    var startBtn = document.querySelector('.pomo-timer .start-timer')
    var pauseBtn = document.querySelector('.pomo-timer .pause-timer')
    var resetBtn = document.querySelector('.pomo-timer .reset-timer')
    var session = document.querySelector('.pomodoro-fullpage .session')
    var isWorkSession = true

    let totalSeconds = 25 * 60
    let timerInterval = null

    function updateTimer() {
        let minutes = Math.floor(totalSeconds / 60)
        let seconds = totalSeconds % 60

        timer.innerHTML = `${String(minutes).padStart('2', '0')}:${String(seconds).padStart('2', '0')}`
    }

    function startTimer() {
        clearInterval(timerInterval)

        if (isWorkSession) {

            timerInterval = setInterval(function () {
                if (totalSeconds > 0) {
                    totalSeconds--
                    updateTimer()
                } else {
                    isWorkSession = false
                    clearInterval(timerInterval)
                    timer.innerHTML = '05:00'
                    session.innerHTML = 'Take a Break'
                    session.style.backgroundColor = 'var(--blue)'
                    totalSeconds = 5 * 60
                }
            }, 1000)
        } else {


            timerInterval = setInterval(function () {
                if (totalSeconds > 0) {
                    totalSeconds--
                    updateTimer()
                } else {
                    isWorkSession = true
                    clearInterval(timerInterval)
                    timer.innerHTML = '25:00'
                    session.innerHTML = 'Work Session'
                    session.style.backgroundColor = 'var(--green)'
                    totalSeconds = 25 * 60
                }
            }, 1000)
        }

    }

    function pauseTimer() {
        clearInterval(timerInterval)
    }
    function resetTimer() {
        totalSeconds = 25 * 60
        clearInterval(timerInterval)
        updateTimer()

    }
    startBtn.addEventListener('click', startTimer)
    pauseBtn.addEventListener('click', pauseTimer)
    resetBtn.addEventListener('click', resetTimer)



}

pomodoroTimer()

function weatherFunctionality() {


    var apiKey = 'fbff34d8e3d6ab3415fbdb9d710aa23b'
    var city = 'Panipat'
    
    var header1Time = document.querySelector('.header1 h1')
    var header1Date = document.querySelector('.header1 h2')
    var header2Temp = document.querySelector('.header2 h2')
    var header2Condition = document.querySelector('.header2 h4')
    var precipitation = document.querySelector('.header2 .precipitation')
    var humidity = document.querySelector('.header2 .humidity')
    var wind = document.querySelector('.header2 .wind')
    
    var data = null
    
    async function weatherAPICall() {
        try {
            var response = await fetch(`https://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`)
            data = await response.json()
            if (data.error) {
                console.error('API Error:', data.error)
                return
            }
    
            header2Temp.innerHTML = `${data.current.temperature}°C`
            header2Condition.innerHTML = data.current.weather_descriptions[0]
            wind.innerHTML = `Wind: ${data.current.wind_speed} km/h`
            humidity.innerHTML = `Humidity: ${data.current.humidity}%`
            precipitation.innerHTML = `Precipitation: ${data.current.precip} mm`
    
        } catch (error) {
            console.error('Error fetching weather:', error)
        }
    }
    
    weatherAPICall()


    function timeDate() {
        const totalDaysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        var date = new Date()
        var dayOfWeek = totalDaysOfWeek[date.getDay()]
        var hours = date.getHours()
        var minutes = date.getMinutes()
        var seconds = date.getSeconds()
        var tarik = date.getDate()
        var month = monthNames[date.getMonth()]
        var year = date.getFullYear()

        header1Date.innerHTML = `${tarik} ${month}, ${year}`

        if (hours > 12) {
            header1Time.innerHTML = `${dayOfWeek}, ${String(hours - 12).padStart('2', '0')}:${String(minutes).padStart('2', '0')}:${String(seconds).padStart('2', '0')} PM`

        } else {
            header1Time.innerHTML = `${dayOfWeek}, ${String(hours).padStart('2', '0')}:${String(minutes).padStart('2', '0')}:${String(seconds).padStart('2', '0')} AM`
        }
    }

    setInterval(() => {
        timeDate()
    }, 1000);

}

weatherFunctionality()

function changeTheme() {

    var theme = document.querySelector('.theme')
    var rootElement = document.documentElement

    var flag = 0
    theme.addEventListener('click', function () {

        if (flag == 0) {
            rootElement.style.setProperty('--pri', '#071952')
            rootElement.style.setProperty('--sec', '#3B666A')
            rootElement.style.setProperty('--tri1', '#DDF2FD')
            rootElement.style.setProperty('--tri2', '#393E46')
           // rootElement.style.setProperty('--black','white')
            flag = 1
        } else if (flag == 1) {
            rootElement.style.setProperty('--pri', '#F1EFEC')
            rootElement.style.setProperty('--sec', '#030303')
            rootElement.style.setProperty('--tri1', '#547792')
            rootElement.style.setProperty('--tri2', '#123458')
            rootElement.style.setProperty('--black','#27445D')
            flag = 2
        } else if (flag == 2) {
            rootElement.style.setProperty('--pri', '#F1FFE1')
            rootElement.style.setProperty('--sec', '#5A827E')
            rootElement.style.setProperty('--tri1', '#84AE92')
            rootElement.style.setProperty('--tri2', '#24512D')
            
            flag = 0
        }

    })


}

changeTheme()
