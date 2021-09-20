import React from 'react';
import style from './MainPage.module.css';

const MainPage = (props) => {
  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  return (
    <>
      <div>{props.users.length && props.users.map((user) => (
        <div className={style.wrapper} key={user.cell}>
          <div className={style.userIMG}>
            <img src="https://picsum.photos/536/354" alt="User Avatar" />
          </div>
          <div className={style.driverNumber}><span>Numer rejestracyjny:{user.vehicleNumber}</span></div>
          <div className={style.buttons}>
            <div className={style.btnMore}>
              <button onClick={()=>{props.onButtonMoreClick(user.phone)}}>Wiecej</button>
            </div>
            <div className={style.btnLike}>
                      {user.liked
                        ? <button onClick={() => { props.like(user.liked) }} >DIDNT FOLLOW</button>
                        : <button onClick={() => { props.dislike(user.liked) }}><img className={style.closeImage} src="https://i.imgur.com/acUfg7y.png" alt = "ALT" /></button>}
            </div>
          </div>
          <div className={style.userInfo}>
            <span>Kierowca:<b>{user.name}</b> </span>
            <span> <b>{user.surname}</b></span>
            <span> Numer Kontaktowy: <b>{user.phone}</b> </span>
            <span>Driver Speed: <b>{user.driverSpeed}(km/h)</b></span>
            <span> Współrzędne geograficzne : <b>{user.Latitude}N </b></span> <span> <b>{user.Longtitude}E</b></span>
            
          </div>
        </div>
      ))}</div>
    </>
  );
};

export default MainPage;
