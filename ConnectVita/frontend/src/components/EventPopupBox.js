import React, { useState } from 'react'
import './Event.css'
import './BouncingLoader.css'; // Styles for the loader
import camera from '../assests/camera.png'
import { useDispatch, useSelector } from 'react-redux';
import { saveEvent } from '../redux/features/EventSlice';
const EventPopupBox = ({onClose1}) => {
    const { user } = useSelector((state) => ({...state?.auth?.data?.data}));
    const dispatch = useDispatch();
    const [loading , setloading] = useState(false);
    const [eventData, setEventData] = useState({
        eventType: '',
        eventFormat: '',
        eventName: '',
        timezone: '',
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
        description: '',
        speaker: '',
        coverImage: null, // To store the selected image
        coverImagePreview: null ,// To store the image preview,
        externalLink:'',
        id:user?._id
      });
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEventData(prevData => ({
          ...prevData,
          [name]: value
        }));
      };
      const handleImageChange = (e) => {
        const file = e.target.files[0]; // Get the selected file
        if (file) {
          const reader = new FileReader();
          reader.onload = () => {
            setEventData(prevData => ({
              ...prevData,
              coverImage: file,
              coverImagePreview: reader.result
            }));
          };
          reader.readAsDataURL(file);
        }
      };

    //   console.log(eventData);

      const handleSave = () => {
        // console.log(eventData);
        const formdata = new FormData();
        formdata.append('image',eventData?.coverImage);
        formdata.append('eventtype',eventData?.eventType);
        formdata.append('eventformat',eventData?.eventFormat);
        formdata.append('eventName',eventData?.eventName);
        formdata.append('timezone',eventData?.timezone);
        formdata.append('startdate',eventData?.startDate);
        formdata.append('startTime',eventData?.startTime);
        formdata.append('endDate',eventData?.endDate);
        formdata.append('endTime',eventData?.endTime);
        formdata.append('description',eventData?.description);
        formdata.append('speaker',eventData?.speaker);
        formdata.append('_id',eventData?.id);
        if(eventData?.externalLink != ''){
            formdata.append('externalLink',eventData?.externalLink);
        }
        dispatch(saveEvent(formdata)).
        then(()=>{
          setloading(false);
          window.location.reload();
        }).catch((error)=>{
          console.log(error);
        });;
        onClose1();
      };
  return (
    <div className="popup-background font-serif">
    <div className="popup-content bg-white rounded-md p-6 w-96 shadow-lg">
           {loading ? 
         <div className="bouncing-loader-container">
         <div className="bouncing-loader">
           <div></div>
           <div></div>
           <div></div>
         </div>
       </div>
      : <div>{/* Render the fetched data */}</div>}
      <button className="popup-close-button absolute top-3 right-3 text-gray-500" onClick={onClose1}>
        Close
      </button>
      <h2 className="text-xl font-semibold mb-4 textevent">Create Event</h2>
      <form className="popup-form">
        <div className="mb-4">
        <div className="imageadd">
              {eventData.coverImagePreview ? (
                <img src={eventData.coverImagePreview} alt="Cover Preview" />
              ) : (
                <label htmlFor="coverImage" className="cursor-pointer">
                  <img src={camera} className="imgup" alt="" />
                  <h3>Upload Cover Image</h3>
                </label>
              )}
              <input
                type="file"
                id="coverImage"
                name="coverImage"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          <label className="block mt-4 text-lg font-medium text-gray-600">Event Type</label>
          <div className="mt-1">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="eventType"
                value="online"
                onChange={handleInputChange}
                className="form-radio h-4 w-4 text-blue-500"
              />
              <span className="ml-2">Online</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input
                type="radio"
                name="eventType"
                value="inperson"
                onChange={handleInputChange}
                className="form-radio h-4 w-4 text-blue-500"
              />
              <span className="ml-2">In Person</span>
            </label>
          </div>
        </div>  
        {/* Other form fields */}
        <div className="mb-4">
            <label className="block mt-4 text-lg font-medium text-gray-600">
              Event Format
            </label>
            <select
              name="eventFormat"
              value={eventData.eventFormat}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md mt-1"
            >
              <option value="">Select Event Format...</option>
              <option value="External Link Events">External Link Events</option>
              <option value="Linkedin Audio Event">Linkedin Audio Event</option>
              <option value="Linkedin Live">Linkedin Live</option>
            </select>
          </div>
          <div className='mb-4'>
          <label className="block mt-4 text-lg font-medium text-gray-600">
              Event Name
            </label>
            <input type="text" name='eventName' value={eventData.eventName} onChange={handleInputChange} className='w-full p-2  border rounded-md' />
          </div>
          <div className="mb-4">
            <label className="block mt-4 text-lg font-medium text-gray-600">
              TimeZone
            </label>
            <select
              name="timezone"
              value={eventData.timezone}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md mt-1"
            >
              <option value="">Select TimeZone...</option>
              <option value="UTC-12:00">UTC-12:00</option>
              <option value="UTC-11:00">UTC-11:00</option>
              <option value='UTC-10:00'>UTC-10:00</option>
            </select>
          </div>
          <div className="mb-4 flex">
            <div className='w-11/12 mr-2'>
            <label className="block mt-4 text-lg font-medium text-gray-600">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={eventData.startDate}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md mt-1"
              />
            </div>
            <div className='w-full'>
            <label className="block mt-4 text-lg font-medium text-gray-600">
              Start Time
            </label>
            <input
              type="time"
              name="startTime"
              value={eventData.startTime}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md mt-1"
              />
              </div>
          </div>
          <div className="mb-4 flex">
            <div className='w-11/12 mr-2'>
            <label className="block mt-4 text-lg font-medium text-gray-600">
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              value={eventData.endDate}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md mt-1"
              />
            </div>
            <div className='w-full'>
            <label className="block mt-4 text-lg font-medium text-gray-600">
              End Time
            </label>
            <input
              type="time"
              name="endTime"
              value={eventData.endTime}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md mt-1"
              />
              </div>
          </div>
          <div className='mb-4'>
          <label className="block mt-4 text-lg font-medium text-gray-600">
              Description
            </label>
            <textarea name="description" value={eventData.description} onChange={handleInputChange} className='description border-2 border-slate-200 p-4 text-xl rounded-md' id="" cols="43" rows="6"></textarea>
          </div> 
          <div className='mb-4'>
          <label className="block mt-4 text-lg font-medium text-gray-600">
              Speaker
            </label>
            <input type="text" name='speaker' value={eventData.speaker} onChange={handleInputChange} className='w-full p-2  border rounded-md' />
          </div>
          {
            eventData.eventFormat == 'External Link Events'
            ?
            <div className='mb-4'>
            <label className="block mt-4 text-lg font-medium text-gray-600">
            External Link 
              </label>
              <input type="text" name='externalLink' value={eventData.externalLink} onChange={handleInputChange} className='w-full p-2  border rounded-md' />
            </div>
            :
            <></>
          }
          <p className='text-slate-400 text-sm'>Add connections to speak at the event. Speakers can join the event early and will be shown in the event’s Details section and presenter area. They cannot allow attendees to speak or end the event.</p>
        {/* ... */}
        <div className="mt-6">
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default EventPopupBox
