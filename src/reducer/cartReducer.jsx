const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      let { id, amount, product } = action.payload;
      console.log("hemu");

      // tackle the existing product

      let existingProduct = state.cart.find((curItem) => curItem.id === id);

      if (existingProduct) {
        let updatedProduct = state.cart.map((curElem) => {
          if (curElem.id === id) {
            let newAmount = curElem.amount + amount;

            if (newAmount >= curElem.max) {
              newAmount = curElem.max;
            }
            return {
              ...curElem,
              amount: newAmount,
            };
          } else {
            return curElem;
          }
        });
        return {
          ...state,
          cart: updatedProduct,
        };
      } else {
        let cartProduct = {
          id,
          // name: product.name,
          title: product.title,
          // color,
          amount,
          images: product.images[0],
          price: product.price,
          max: product.stock,
        };
        console.log("In cartReducer", product);
        return {
          ...state,
          cart: [...state.cart, cartProduct],
        };
      }

    case "SET_DECREMENT":
      // to set the increment and decrement
      let updated1Product = state.cart.map((curElem) => {
        if (curElem.id === action.payload) {
          let decAmount = curElem.amount - 1;

          if (decAmount <= 1) {
            decAmount = 1;
          }

          return {
            ...curElem,
            amount: decAmount,
          };
        } else {
          return curElem;
        }
      });
      return { ...state, cart: updated1Product };

    case "SET_INCREMENT":
      let updated2Product = state.cart.map((curElem) => {
        if (curElem.id === action.payload) {
          let incAmount = curElem.amount + 1;

          if (incAmount >= curElem.max) {
            incAmount = curElem.max;
          }

          return {
            ...curElem,
            amount: incAmount,
          };
        } else {
          return curElem;
        }
      });
      return { ...state, cart: updated2Product };

    case "REMOVE_ITEM":
      let updated3Cart = state.cart.filter(
        (curItem) => curItem.id !== action.payload
      );
      return {
        ...state,
        cart: updated3Cart,
      };

    case "CLEAR_CART":
      //to empty or to clear to cart
      return {
        ...state,
        cart: [],
      };

    case "CART_ITEM_PRICE_TOTAL":
      // METHOD TO PERFROM BOTH FUNCITONS IN ONE GO
      let { total_item, total_price } = state.cart.reduce(
        (accum, curElem) => {
          let { price, amount } = curElem;

          accum.total_item += amount;
          accum.total_price += price * amount;

          return accum;
        },
        {
          total_item: 0,
          total_price: 0,
        }
      );
      return {
        ...state,
        total_item,
        total_price,
      };

    default:
      return state;
  }

  // EITHER METHOD TO DO BOTH TASKS INDIVIDUALLY
  // if (action.type === "CART_TOTAL_ITEM") {
  //   let updatedItemVal = state.cart.reduce((initialVal, curElem) => {
  //     let { amount } = curElem;

  //     initialVal = initialVal + amount;
  //     return initialVal;
  //   }, 0);

  //   return {
  //     ...state,
  //     total_item: updatedItemVal,
  //   };
  // }

  // if (action.type === "CART_TOTAL_PRICE") {
  //   let total_price = state.cart.reduce((initialVal, curElem) => {
  //     let { price, amount } = curElem;

  //     initialVal = initialVal + price * amount;

  //     return initialVal;
  //   }, 0);

  //   return {
  //     ...state,
  //     total_price,
  //   };
  // }
};

export default cartReducer;

// https://stackoverflow.com/questions/63117470/how-to-return-two-values-in-reduce#:~:text=You%20cannot%20return%20two%20values%20in%20reduce%20.
