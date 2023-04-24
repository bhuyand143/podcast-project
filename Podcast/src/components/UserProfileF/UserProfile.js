// import React, { useState } from "react";
// import "./UserProfile.css";

// function UserProfile() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [profilePicture, setProfilePicture] = useState("");

//   const handleNameChange = (event) => {
//     setName(event.target.value);
//   };

//   const handleEmailChange = (event) => {
//     setEmail(event.target.value);
//   };

//   const handlePasswordChange = (event) => {
//     setPassword(event.target.value);
//   };

//   const handleProfilePictureChange = (event) => {
//     setProfilePicture(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Handle form submission
//   };

//   return (
//     <div className="body">
//       <h1 className="formheading">Profile Settings</h1>
//       <div className="formbody">
//         <form onSubmit={handleSubmit}>
//           <label className="formlabel">
//             Name:&nbsp;&nbsp;
//             <input
//               className="formInput"
//               type="text"
//               value={name}
//               onChange={handleNameChange}
//             />
//           </label>
//           <br />
//           <label className="formlabel">
//             Email:&nbsp;&nbsp;
//             <input
//               className="formInput"
//               type="email"
//               value={email}
//               onChange={handleEmailChange}
//             />
//           </label>
//           <br />
//           <label className="formlabel">
//             Password:&nbsp;&nbsp;
//             <input
//               className="formInput"
//               type="password"
//               value={password}
//               onChange={handlePasswordChange}
//             />
//           </label>
//           <br />
//           <label className="formlabel">
//             Profile Picture:&nbsp;&nbsp;
//             <input
//               className="formInput"
//               type="file"
//               value={profilePicture}
//               onChange={handleProfilePictureChange}
//             />
//           </label>
//           <br />
//           <div class="button-container">
//             <button className="formbutton">Cancel</button>
//             <button className="formbutton" type="submit">
//               Save
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default UserProfile;


import React, { useState,useEffect } from "react";
import "./UserProfile.css";
import { useNavigate } from "react-router";
import storage from '../../firebase';
import axios from "axios";

function UserProfile({props}) {
  const [credentials, setCredentials] = useState(JSON.parse(localStorage.getItem('users')));
  const [profilePic, setProfilePic] = useState(null);
  const [uploaded,setuploaded] = useState(0);
  let navigate = useNavigate();

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
   
  const handleUpload  = (e)=>{  
    e.preventDefault();
    if(profilePic)
    {
    upload(
      {file : profilePic, label :'profilePic'}
    )
    }
    else{
      submit();
    }
  }

  const upload = (item)=>{
     const filename = new Date().getTime() + item.label + item.file.name;
     const uploadTask = storage.ref(`/items/${filename}`).put(item.file);
     uploadTask.on("state_changed",
     (snapshot)=>{
         console.log(snapshot);
         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
         console.log("Upload is " + progress + "% done.");
      },
      (err)=>{
         console.log(err);
      },
      ()=>{
         uploadTask.snapshot.ref.getDownloadURL().then((url)=>{
             setCredentials((prev)=>{
                 return { ...prev, [item.label]: url};
             });
            setuploaded((prev)=> prev+1);
         });
      }
      );
 }
 const submit = async()=>{
  try {
    const res = await axios.put('http://localhost:8900/api/users/'+JSON.parse(localStorage.getItem('users'))._id,credentials,{
      headers : {
          token : "Bearer " + JSON.parse(localStorage.getItem("users")).accessToken,
      },
  });
  // props.showAlert('Account Updated Successfully','success');
  localStorage.setItem('users',JSON.stringify(res.data));
  navigate('/');

  } catch (error) {
    // props.showAlert("Error in updating","danger");
  }
}
useEffect(() => {
  
  if(uploaded === 1)
  {
    submit();
    
  }
}, [uploaded])

  
  
  return (
    <div className="body">
      <h1 className="formheading">Profile Settings</h1>
      <div className="formbody">
        <form>
          <label className="formlabel">
            Name:&nbsp;&nbsp;
            <input type="text" id="name" name='username' className="form-control" onChange={onChange} value={credentials.username} required  minLength={3}/>
          </label>
          <br />
          <label className="formlabel">
            Email:&nbsp;&nbsp;
            <input type="email" id="email" className="form-control" name="email" value={credentials.email} onChange={onChange} required/>
          </label>
          <br />
          <label className="formlabel">
            Password:&nbsp;&nbsp;
            <input type="text" name='password' className="form-control" id="password" value={credentials.password} onChange={onChange} required minLength={5}/>
          </label>
          <br />
          <label className="formlabel">
            Profile Picture:&nbsp;&nbsp;
            <input className="formInput" type="file" name="profilePicture" onChange={(e)=>{setProfilePic(e.target.files[0])}}/>
          </label>
          <br />
          <div class="button-container">
            <button className="formbutton">Cancel</button>
            <button className="formbutton" type="button" onClick={handleUpload}>Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserProfile;

