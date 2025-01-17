import PropTypes from 'prop-types'
import { useState } from 'react'
import { CreateEventAPI } from '../../services/event.service'
import ErrorMsg from '../common/ErrorMsg'
import { XMark } from '../common/Icons'

function EventForm({ handleForm }) {
  // DATA
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [showError, setShowError] = useState(false)

  // TITLE
  const handleTitle = (e) => {
    setTitle(e.target.value)
  }

  const validationTitle = () => {
    return (title.length > 4)
  }

  // DATE
  const handleDate = (e) => {
    setDate(e.target.value)
  }

  const validationDate = () => {
    const today = new Date();
    const event = new Date(date)

    return (event > today)
  }

  // START
  const handleStart = (e) => {
    setStart(e.target.value)
  }

  // END
  const handleEnd = (e) => {
    setEnd(e.target.value)
  }

  const validationEnd = () => {
    return (start < end)
  }

  // CREATE EVENT SERVICE
  const CreateEventService = async () => {
    const res = await CreateEventAPI(title, date, start, end)
    console.log(res)
    if (res) {
      window.location.href = window.location.href
    }
  }

  // ERROR 
  const showErrorMsg = () => {
    setShowError(true)
    setTimeout(() => { setShowError(false) }, 4000);
  }

  const hideErrorMsg = () => {
    setShowError(false)
  }

  // SUBMIT
  function submitForm(e) {
    e.preventDefault();
    if (
      validationTitle() &&
      validationDate() &&
      validationEnd()
    ) {
      CreateEventService()
    } else {
      setErrorMsg('Warning! Some fields are incorrect or empty')
      showErrorMsg()
    }
  }

  return (
    <div className="rounded-lg bg-white border transform translate-x-[-50%] left-[50%] top-10 sm:top-[40%] absolute border-gray-300 p-5 w-11/12 lg:w-2/5 xl:w-1/5 py-[50px] px-10 shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)] ">
      <div onClick={handleForm} className="bg-white cursor-pointer rounded-md p-2 inline-flex absolute items-center justify-center top-4 right-4 text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
        <span className="sr-only">Close menu</span>
        <XMark className='h-6 w-6' />
      </div>
      <h1 className="text-3xl font-medium">New event...</h1>
      <p className="text-sm">Just need some details to start</p>
      <form className="space-y-3 mt-5" onSubmit={(e) => submitForm(e)}>
        <input type="text" className="w-full h-12 border border-gray-800 rounded px-3" placeholder="Title*" onChange={handleTitle} />
        <span className={`m-0 p-0 ${!validationTitle() && title !== '' ? 'visible' : 'hidden'} text-red-600 text-xs`}>Please provide a valid title.</span>
        <input className="w-full h-12 border border-gray-800 rounded px-3" type='date' placeholder="Date*" onChange={handleDate}/>
        <span className={`m-0 p-0 ${!validationDate() && date !== '' ? 'visible' : 'hidden'} text-red-600 text-xs`}>Please provide a valid date.</span>
        <div className="flex gap-5">
          <input className="w-full h-12 border border-gray-800 rounded px-3" type='time' placeholder="Start time*" onChange={handleStart}/>
          <input className="w-full h-12 border border-gray-800 rounded px-3" type='time' placeholder="End time*"  onChange={handleEnd}/>
        </div>
        <span className={`m-0 p-0 ${!validationEnd() && end !== '' ? 'visible' : 'hidden'} text-red-600 text-xs`}>End time must be after start time.</span>
        {showError &&
          <ErrorMsg message={errorMsg} hide={hideErrorMsg}/>
        }
        <button className="text-center w-full bg-secondary bg-opacity-70 rounded-lg py-3 font-medium" type='submit'>Start</button>
      </form>
    </div>
  )
}

// props validation
EventForm.propTypes = {
  handleForm: PropTypes.func,
}


export default EventForm