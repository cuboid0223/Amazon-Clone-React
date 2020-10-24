export const initialState = {
  basket: [], // 每個 專案 initialState 不一樣
  user: null,
};

//selector
// 計算總價
export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0);

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "ADD_TO_BASKET": // 每個 專案 case 不一樣
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
    case "EMPTY_BASKET":
      return {
        ...state,
        basket: [],
      };

    case "REMOVE_FROM_BASKET":
      // 使用下方這行，會造成同一品項的所有東西都被刪除
      // return {
      //   ...state,
      //   basket: state.basket.filter((item) => item.id !== action.id),
      // };

      const index = state.basket.findIndex(
        // 可以看 test.js
        (basketItem) => basketItem.id === action.id
      ); // action.id 即是按下移除傳送的 該物品 id
      // findIndex() 會找到 第一個符合描述的物品
      let newBasket = [...state.basket]; // 建立一個新的陣列
      if (index >= 0) {
        newBasket.splice(index, 1); // 假設 index 是 2， 即刪除 index ＝ 2 ，1 次
      } else {
        console.warn(`無法刪除 該商品（ ID: ${action.id}）`);
      }
      return {
        ...state,
        basket: newBasket,
      };

    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
};

export default reducer;
