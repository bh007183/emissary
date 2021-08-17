import React, {useRef, useState, useEffect} from "react";
import "./style.css";
import { setInputEditAccount, getUser, editUser } from "../../store/userActions";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit';
import Modal from '@material-ui/core/Modal';

export default function ManageAccount() {
    const dispatch = useDispatch()
  const user = useSelector((state) => state.Store.User.EditAccount);
  const fn = useRef(null)
  const ln = useRef(null)
  const em = useRef(null)
  const pw = useRef(null)

  const [open, setOpen] = React.useState(false);
  const [password, setPassword] = useState("")

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
 console.log(user)
 const handleChange = (event) => {
     
     dispatch(setInputEditAccount({key: event.target.dataset.id, value: event.target.value}))

 }
 const handleSetPassword = (event) => {
     
     setPassword(event.target.value)

 }
 useEffect(() => {
     (function(){
        dispatch(getUser())
     })()
     
 }, [])


  const editFN = () => {
      if(fn.current.disabled === true){
        fn.current.disabled = false
      }else{
        fn.current.disabled = true
      }
      
    //   console.log(fn.current.disabled)
  }
  const editLN = () => {
    if(ln.current.disabled === true){
        ln.current.disabled = false
      }else{
        ln.current.disabled = true
      }
      
    //   console.log(fn.current.disabled)
  }
  const editEM = () => {
    if(em.current.disabled === true){
        em.current.disabled = false
      }else{
        em.current.disabled = true
      }
      
    //   console.log(fn.current.disabled)
  }
  const editPW = () => {
    if(pw.current.disabled === true){
        pw.current.disabled = false
      }else{
        pw.current.disabled = true
      }
      
    //   console.log(fn.current.disabled)
  }

  const submitEdit = () => {
      dispatch(editUser({password: password, newdata: user}))
  }

  return (
    <div id="manageAccountContain">
      <div id="editContain">
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
        <div className="centerFlex editAccountInput">
          <input onChange={handleChange} placeholder="First Name" data-id={"firstName"} ref={(element) => (fn.current = element)} disabled={true} value={user.firstName}></input>
          <IconButton onClick={editFN}><EditIcon/></IconButton>
        </div>
        <div className="centerFlex editAccountInput">
          <input onChange={handleChange} placeholder="Last Name"  data-id={"lastName"} ref={(element) => (ln.current = element)} disabled={true} value={user.lastName}></input>
          <IconButton onClick={editLN}><EditIcon/></IconButton>
        </div>
        <div className="centerFlex editAccountInput">
          <input onChange={handleChange} placeholder="Email"  data-id={"email"} ref={(element) => (em.current = element)} disabled={true} value={user.email}></input>
          <IconButton onClick={editEM }><EditIcon/></IconButton>
        </div>
        <div className="centerFlex editAccountInput">
          <input type="password"onChange={handleChange} placeholder="Enter New Password"  data-id={"newPassword"} ref={(element) => (pw.current = element)} disabled={true}></input>
          <IconButton onClick={editPW }><EditIcon/></IconButton>
        </div>
        
        <button onClick={handleOpen} id="saveChangesButton">
            Save Changes
        </button>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div id="modalContain">
            <p>Submit Changes</p>
            <div id="confirmEditInput" className="centerFlex">
                <input onChange={handleSetPassword} type="password" placeholder="password" value={password}></input>
            </div>
            <div id="confirmEditButton" className="centerFlex">
                <button onClick={submitEdit}>Submit</button>
            </div>
        </div>
      </Modal>
      </div>
    </div>
  );
}
