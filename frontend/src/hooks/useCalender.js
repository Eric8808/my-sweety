import {useState} from 'react'

const useCalender = () => {
  const [mon, setMon] = useState(1)
  const [tue, setTue] = useState(1)
  const [wed, setWed] = useState(1)
  const [thu, setThu] = useState(1)
  const [fri, setFri] = useState(1)
  const [sat, setSat] = useState(1)
  const [sun, setSun] = useState(1)

  const day = [sun, mon, tue, wed, thu, fri, sat];
  const setDay = [setSun, setMon, setTue, setWed, setThu, setFri, setSat];

  return {day, setDay}

}

export default useCalender