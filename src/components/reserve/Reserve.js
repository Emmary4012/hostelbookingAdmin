import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "./reserve.css";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useEffect } from "react";

const Reserve = ({ setOpen, propertyId, dat}) => {
  useEffect(()=>{ gsap.fromTo (".reserve", {x:-200, opacity:0, }, {x:0, opacity:1, duration: 3, ease: "bounce.out",});
                gsap.fromTo (".rItem", {x:200, opacity:0, }, {x:0, opacity:1, duration: 7, ease: "bounce.out",});
              },[]);
  const { data, loading, error } = useFetch(`https://hostel7booking.herokuapp.com/api/${dat.type}s/room/${propertyId}`);
  console.log(data)
  

  const navigate = useNavigate();

  return (
    <div className="reserve">
      {data.length?
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
        <span className="rDesc">{dat.roomsdesc && dat.roomsdesc}</span>
        {data && data.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo" key={item._id}>
              {item.title && <div className="rTitle">{item.title}</div>}
              {item.desc && <div className="rDesc">{item.desc}</div>}
              {item.maxPeople && <div className="rMax">
                Max people: <b>{item.maxPeople}</b>
              </div>}
              {item.price && <div className="rPrice">usx {item.price}</div>}
            </div>
            <div className="rSelectRooms">
              {item.roomNumbers.map((roomNumber) => (
                <div className="room" key={roomNumber.number}>
                  <label>{roomNumber.number}</label>
                  <input 
                    type="checkbox"
                    value={roomNumber.number}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button onClick={()=>navigate(`/properties/${dat.type}s/view/${propertyId}`)} className="rButton">
          View {dat.name} {dat.type}
        </button>
      </div>:
      <div className="rContainer">
        <span className="rDesc">{dat.roomsdesc && dat.roomsdesc}</span><br/>
        Sorry, we haven't yet uploaded rooms for {dat.name} {dat.type}. Certainly, we shall be done by this week.
        Otherwise, we have almost all the details you need to know about {dat.name} {dat.type}. So you can proceed to reserve and specify your 
        interest within the message on our reserve confirmation page.<br/> 
        <button onClick={()=>navigate(`/properties/${dat.type}s/view/${propertyId}`)} className="rButton">
        View {dat.name} {dat.type}
        </button>
      </div>
      }
    </div>
  );
};

export default Reserve;