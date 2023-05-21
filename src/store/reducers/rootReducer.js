const initState = {
  users: [
    { id: 1, name: "Phong" },
    { id: 2, name: "Thanh" },
    { id: 3, name: "HTP" },
  ],
  isDangNhap: localStorage.getItem("dangnhap"),
  id_category: "ALL",
  id_product: "ALL",
  id_order: "",
};

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case "DELETE_USER":
      console.log("user can xoa: ", action.payload);
      // let users = state.users;
      // users = users.filter(item => item.id != action.payload.id)
      // console.log('>>>Check state: ', { ...state });
      // return { ...state, users };
      break;
    // case 'ADD_USER':
    //     let id = Math.floor(Math.random() * 1001)
    //     let user = { id: id, name: `random - ${id} ` }
    //     return { ...state, users: [...state.users, user] }
    //     break;
    case "daDangNhap":
      console.log("Da dang nhap:", action.payload);
      localStorage.setItem("dangnhap", true);
      return {
        ...state,
        isDangNhap: true,
      };
      break;
    case "dangXuat":
      // localStorage.setItem('dangnhap', false)
      localStorage.removeItem("dangnhap");
      localStorage.removeItem("user");
      return {
        ...state,
        isDangNhap: false,
      };
      break;
    case "id_category":
      console.log("Id category:", action.payload);
      return {
        ...state,
        id_category: action.payload,
      };
      break;
    case "id_product":
      return {
        ...state,
        id_product: action.payload,
      };
      break;
    case "id_order":
      return {
        ...state,
        id_order: action.payload,
      };
      break;
    default:
      return state;
  }
};

export default rootReducer;
