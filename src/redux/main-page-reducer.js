const SET_LIKED = 'SET_LIKED';
const SET_DISLIKED = 'SET_DISLIKED';
const SET_USERS = 'SET_USERS';
const SET_FETCHING_STATUS = 'SET_FETCHING_STATUS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';

let initialState = {
    users:[],
    pageSize: 20,
    currentPage:1,
    isFetching: true,
    totalUsersCount:500,
}


const mainPageReducer = (state = initialState, action) => {
    switch (action.type) {
        
        case SET_USERS: {
            return {
                ...state,
                users: action.users
            }
        }
        case SET_FETCHING_STATUS: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }

        case SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.currentPage
            }
        }

        case SET_TOTAL_USERS_COUNT: {
            return {
                ...state,
                totalUsersCount: action.count
                
            }
        
        }
        case SET_LIKED: {
            return {
                ...state,
               liked:state.users.map(u=>{
                   if(u.liked === action.likedStatus){
                       return {...u, liked:true}
                   }
                   return u
               })
            }
        }
        case SET_DISLIKED: {
            return {
                ...state,
               liked:state.users.map(u=>{
                   if(u.liked === action.likedStatus){
                       return {...u, liked:false}
                   }
                   return u
               })
            }
        }
        default:
            return state;
    }

}


export default mainPageReducer;

export const  setUsersAC = (users) => ({type:SET_USERS, users});

export const setFetchingStatusAC = (isFetching) => ({type:SET_FETCHING_STATUS, isFetching});

export const setCurrentPageAC = (currentPage) => ({type:SET_CURRENT_PAGE, currentPage});

export const setTotalUsersCountAC = (totalUsersCount) => ({type:SET_TOTAL_USERS_COUNT, count:totalUsersCount});

export const setLikedStatusAC = (likedStatus) => ({type:SET_LIKED, likedStatus});

export const setDisLikedStatusAC = (likedStatus) => ({type:SET_DISLIKED, likedStatus});


