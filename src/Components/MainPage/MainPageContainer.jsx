import { connect } from 'react-redux';
import MainPage from './MainPage';
import React from 'react';
import * as axios from 'axios';
import { setCurrentPageAC, setFetchingStatusAC, setLikedStatusAC, setTotalUsersCountAC, setUsersAC, setDisLikedStatusAC } from '../../redux/main-page-reducer';

class MainPageAPI extends React.Component {
  constructor(props) {
    super(props);
  }
  getData = () => {
    axios.get(`https://randomuser.me/api/?page=1&results=5000`).then((response) => {

      let userData = response.data.results.map((user) => {
        return {
          title: user.name.title,
          surname: user.name.last,
          name: user.name.first,
          phone: this.randomString(9, '123456789'),
          vehicleNumber: this.randomString(3, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ') + this.randomString(3, '123456789'),
          driverSpeed: this.getRandomSpeed(60, 200),
          Latitude: this.generateRandomLatitude(49, 54),
          Longtitude: this.generateRandomLongtitude(14, 52),
          liked: false
        }
      })
      this.props.setUsers(userData);
    });

  }
  componentDidMount() {
    this.getData();
    this.interval = setInterval(() => {
      this.changePositionN(this.props.users.Latitude, this.props.users.driverSpeed);
      this.changePositionE(this.props.users.Longtitude, this.props.users.driverSpeed);
    }, 3000)
  }

  componentDidUpdate() {
    localStorage.setItem('', this.props);
    console.log(localStorage);
    debugger;
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getRandomSpeed(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
  generateRandomLatitude(min, max) {
    min = Math.ceil(min);
    max = Math.ceil(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
  generateRandomLongtitude(min, max) {
    min = Math.ceil(min);
    max = Math.ceil(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  changePositionN(N, carSpeed) {
    return N * (carSpeed / 68.4);
  }
  changePositionE(E, carSpeed) {

    return E * (carSpeed / 68.4);
  }
  onButtonMoreClick = (phone) => {
      alert('Tu masz numer kierowcy :' + phone);
  }

  randomString = (len, charSet) => {
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (let i = 0; i < len; i++) {
      let randomPoz = Math.floor(Math.random() * charSet.length);
      randomString += charSet.substring(randomPoz, randomPoz + 1);
    }
    return randomString;
  };

  render() {
    return (
      <>
        <MainPage
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          users={this.props.users}
          like={this.props.setLikedStatus}
          dislike={this.props.setDisLikedStatus}
          changePositionN={this.changePositionN}
          changePositionE={this.changePositionE}
          onButtonMoreClick={this.onButtonMoreClick}

        />
      </>
    );
  }
}

let mapStateToProps = (state) => {
  let { mainPage } = state;
  return {
    users: mainPage.users,
    carNumber: mainPage.carNumber,
    pageSize: mainPage.pageSize,
    currentPage: mainPage.currentPage,
    isFetching: mainPage.isFetching,
    totalUsersCount: mainPage.totalUsersCount,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    setUsers: (users) => {
      dispatch(setUsersAC(users));
    },
    setFetchingStatus: (isFetching) => {
      dispatch(setFetchingStatusAC(isFetching));
    },
    setCurrentPage: (currentPage) => {
      dispatch(setCurrentPageAC(currentPage));
    },
    setTotalUsersCount: (usersCount) => {
      dispatch(setTotalUsersCountAC(usersCount));
    },
    setLikedStatus: (likedStatus) => {
      dispatch(setLikedStatusAC(likedStatus))
    },
    setDisLikedStatus: (likedStatus) => {
      dispatch(setDisLikedStatusAC(likedStatus))
    }
  }
};

const MainPageContainer = connect(mapStateToProps, mapDispatchToProps)(MainPageAPI);

export default MainPageContainer;
