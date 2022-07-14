import {useSelector, useDispatch} from "react-redux";
import { useState, useEffect} from "react";
import { TextField, Button, FormControlLabel, Checkbox  } from '@mui/material';
import {editProfileThunk, initTrackingProfile} from "../../store/profile"
import "./profile.scss";


function Profile(){
    const {name, surname, isVisibleInfo} = useSelector((state)=>{ return state.profile });
    const dispatch = useDispatch();
    const [nameValue, setNameValue] = useState("");
    const [surnameValue, setSurnameValue] = useState("");

    const changeName = (event)=>{
        setNameValue(event.target.value)
    }

    const changeSurname = (event) =>{
        setSurnameValue(event.target.value)
    }

    const changeVisible = () =>{
        dispatch(editProfileThunk({name: name, surname: surname, isVisibleInfo: !isVisibleInfo}));
        
    }

    const saveProfile = () => {
        if(nameValue || surnameValue){
            const profile = {
                name: nameValue ?? name,
                surname: surnameValue ?? surname,
                isVisibleInfo: isVisibleInfo
            }
            dispatch(editProfileThunk(profile));

            setNameValue('');
            setSurnameValue('');
        }
    }

    useEffect(()=>{
        dispatch(initTrackingProfile());
    },[])

    return(
        <main className="content">
            <div className="profile">
          <div className="info">
               <h4 className="profile__heading">Ваши данные</h4>
               { isVisibleInfo && (<div className="info__container">
                    <p className="info__item">Имя: <span className="info__content">{name}</span></p>
                    <p className="info__item">Фамилия: <span className="info__content">{surname}</span></p>
                </div>)}

                {!isVisibleInfo && (<div className="info__container">
                    <p className="info__item">Информация скрыта.</p>
                </div>)}
            </div> 
            
            <div className="change__profile">
                <h4 className="profile__heading">Редактирование данных</h4>
                <TextField 
                autoComplete="off"
                label="Имя"
                className="change__input"
                placeholder="Имя" 
                value={nameValue} 
                onChange={(event)=>{changeName(event)}}/>

                <TextField 
                autoComplete="off"
                label="Фамилия"
                className="change__input"
                placeholder="Фамилия" 
                value={surnameValue} 
                onChange={(event)=>{changeSurname(event)}}/>    
                <Button className="btn-save" onClick={saveProfile}>Сохранить</Button>

                <div className="change__visible">
                    <h4 className="profile__heading">Видимость</h4>
                    <FormControlLabel 
                    control={<Checkbox defaultChecked={!isVisibleInfo} onChange={changeVisible}/>}
                    label="Скрыть информацию"/>
                </div>
            </div>
            </div>
        </main>
    )
}

export default Profile;